/**
 * Pre-launch waitlist submission.
 *
 * Posts straight to PostgREST rather than pulling in @supabase/supabase-js —
 * the site has no other backend dependency and one insert doesn't justify the
 * client bundle. The anon key is meant to ship in client code; the table it
 * targets is insert-only with no select policy, and only its `email` column is
 * grantable, so this key can add an address and nothing else.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** Give up rather than leave the caller's button spinning forever. */
const TIMEOUT_MS = 12000;

/** False when the build lacks credentials — the form degrades instead of breaking. */
export const isWaitlistConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/**
 * Adds an address to the waitlist.
 *
 * Resolves on success and on duplicate. Rejects with a user-safe Error for
 * everything else; callers surface `error.message`, never a raw response.
 */
export const joinWaitlist = async (email) => {
  if (!isWaitlistConfigured) {
    throw new Error("The signup form isn't available right now.");
  }

  // Built outside the try so a TypeError here (a caller passing a non-string)
  // can't be logged and shown as a network failure, sending whoever debugs it
  // after a problem that doesn't exist.
  const body = JSON.stringify({ p_email: email.trim() });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response;
  try {
    // An RPC, not a table insert. The function returns the same thing whether
    // the address was new or already present, which is what hides list
    // membership: a caller who can tell "inserted" from "already there" can
    // test any address, and probing a non-member would add them. That has to
    // happen server-side, so anon holds no privilege on the table at all.
    response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/join_waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        Prefer: "return=minimal",
      },
      body,
      signal: controller.signal,
    });
  } catch (error) {
    if (error.name === "AbortError") {
      console.error("[joinWaitlist] request timed out:", { TIMEOUT_MS, error });
      throw new Error("That took too long. Try again in a moment.");
    }
    console.error("[joinWaitlist] network request failed:", { error });
    throw new Error("Couldn't reach the server. Check your connection.");
  } finally {
    clearTimeout(timeout);
  }

  if (response.ok) return;

  // Belt and braces: the function's ON CONFLICT DO NOTHING should make this
  // unreachable, but if anything ever routes back to a direct table insert,
  // "already on the list" is still not a failure worth showing a visitor.
  if (response.status === 409) return;

  // PostgREST puts the SQLSTATE in the body. Without it, every 400 looks like
  // a bad address when it could equally be malformed JSON or a schema-cache
  // fault, which would tell a visitor their perfectly good email is invalid.
  const detail = await response.json().catch(() => null);

  if (response.status === 400 && detail?.code === "23514") {
    console.error("[joinWaitlist] address rejected by constraint:", {
      status: response.status,
      detail,
    });
    throw new Error("That doesn't look like a valid email address.");
  }

  console.error("[joinWaitlist] submit failed:", {
    status: response.status,
    detail,
  });
  throw new Error("Something went wrong on our end. Try again in a moment.");
};
