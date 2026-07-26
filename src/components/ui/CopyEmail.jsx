import { useState } from "react";

/**
 * Click-to-copy email. Ported from the personal site's AppLayout.
 *
 * `variant="button"` is the bordered CTA used on contact/support surfaces;
 * `variant="inline"` is the quiet footer treatment.
 */
export const CopyEmail = ({ email, variant = "inline", className = "" }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        // Clipboard access can be denied (insecure context, permissions).
        // Fall back to the mailto link rather than leaving a dead button.
        console.error("[CopyEmail] clipboard write failed:", { email, error });
        window.location.href = `mailto:${email}`;
      });
  };

  const styles =
    variant === "button"
      ? "inline-flex items-center gap-2 rounded-full border border-ink px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-300 ease-ink hover:bg-ink hover:text-paper"
      : "transition-colors duration-300 ease-ink hover:text-ink";

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${email} to clipboard`}
      className={`cursor-pointer ${styles} ${className}`}
    >
      {variant === "button" && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="shrink-0"
        >
          <rect
            x="1"
            y="3"
            width="14"
            height="10"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M2 4L8 9L14 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {copied ? "Copied" : email}
    </button>
  );
};
