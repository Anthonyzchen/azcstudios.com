import { useState } from "react";

import { isWaitlistConfigured, joinWaitlist } from "../../lib/waitlist";

const SUCCESS_MESSAGE =
  "You're on the list. We'll email you the day it launches.";

// Mirrors the table's char_length(email) between 6 and 254 so the shortest
// address the pattern allows (a@b.c) doesn't cost a round trip to be rejected.
const MIN_LENGTH = 6;
const MAX_LENGTH = 254;
const EMAIL_PATTERN = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * Launch-notification signup.
 *
 * Stands in for the App Store button until the app ships — pre-launch the page
 * otherwise has no action to take. When the build has no Supabase credentials
 * this renders the old "Coming to the App Store" chip instead of a form, so a
 * misconfigured deploy degrades rather than showing a broken input.
 */
export const WaitlistForm = ({ id, className = "" }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | done | error
  const [message, setMessage] = useState("");
  // Bots fill hidden fields; humans never see this one. Deliberately NOT named
  // company/organization/phone — those are names browser and password-manager
  // autofill match on, and a filled trap silently discards a real signup.
  const [trap, setTrap] = useState("");

  if (!isWaitlistConfigured) {
    return (
      <span className="inline-flex cursor-default items-center gap-2 rounded-full border border-line bg-paper-sunk px-6 py-3 text-sm font-medium text-graphite/70">
        Coming to the App Store
      </span>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "submitting") return;

    if (trap) {
      // Report success so a bot doesn't learn it was caught, but log it: if
      // this ever fires for a real visitor, their signup is being thrown away
      // and this line is the only way anyone would find out.
      console.error("[WaitlistForm] submission dropped by honeypot:", { id });
      setStatus("done");
      setMessage(SUCCESS_MESSAGE);
      return;
    }

    // noValidate is set so the browser's own bubble doesn't fight the inline
    // message, which makes this the check that stops an empty or malformed
    // address from costing a round trip. NFKC folds the non-breaking spaces
    // that survive a paste out of Word or Outlook, which would otherwise be
    // rejected here for a string that looks perfectly correct on screen.
    const candidate = email.normalize("NFKC").replace(/\s+/g, "");
    if (
      candidate.length < MIN_LENGTH ||
      candidate.length > MAX_LENGTH ||
      !EMAIL_PATTERN.test(candidate)
    ) {
      setStatus("error");
      setMessage("That doesn't look like a valid email address.");
      return;
    }

    setStatus("submitting");
    setMessage("");
    try {
      // The validated value, not the raw state: validating one string and
      // sending another is how they drift apart later.
      await joinWaitlist(candidate);
      setStatus("done");
      setMessage(SUCCESS_MESSAGE);
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(
        error?.message ?? "Something went wrong. Try again in a moment."
      );
    }
  };

  const handleChange = (event) => {
    setEmail(event.target.value);
    // Drop the previous verdict as soon as the input changes, so a stale
    // success or error doesn't sit under a field the visitor is retyping.
    if (message) {
      setMessage("");
      setStatus("idle");
    }
  };

  const inputId = id ? `${id}-email` : "waitlist-email";
  const messageId = `${inputId}-message`;

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} noValidate className="flex flex-wrap gap-3">
        <label htmlFor={inputId} className="sr-only">
          Email address
        </label>
        <input
          id={inputId}
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
          autoComplete="email"
          placeholder="you@example.com"
          disabled={status === "submitting"}
          aria-invalid={status === "error"}
          aria-describedby={messageId}
          className="min-w-0 flex-1 rounded-full border border-line bg-white/60 px-5 py-3 text-sm text-ink outline-none transition-colors duration-300 ease-ink placeholder:text-graphite/50 focus:border-rg disabled:opacity-60 sm:min-w-[16rem]"
        />

        {/* Honeypot. Off-screen rather than display:none, which some bots skip. */}
        <input
          type="text"
          name="hp_field_2"
          value={trap}
          onChange={(event) => setTrap(event.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center gap-2 rounded-full bg-rg px-6 py-3 text-sm font-medium text-white transition-colors duration-300 ease-ink hover:bg-rg-deep disabled:opacity-60"
        >
          {status === "submitting" ? "Adding you…" : "Notify me at launch"}
        </button>
      </form>

      <p
        id={messageId}
        aria-live="polite"
        className={`mt-3 min-h-[1.25rem] text-sm ${
          status === "error" ? "text-rg-deep" : "text-graphite/70"
        }`}
      >
        {message}
      </p>
    </div>
  );
};
