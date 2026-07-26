import { useState } from "react";

/** Disclosure row for FAQ lists. Ported from the personal site's AppSupport. */
export const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="rule-bottom last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-4 text-left text-[0.95rem] font-medium text-ink transition-colors duration-300 ease-ink hover:text-graphite"
      >
        {question}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={`shrink-0 transition-transform duration-300 ease-ink ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen && (
        <p className="pb-5 pr-8 text-[0.95rem] leading-relaxed text-graphite">
          {answer}
        </p>
      )}
    </div>
  );
};
