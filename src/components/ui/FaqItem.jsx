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
        // `wide` opts the answer out of the measure rule that caps every <p>
        // inside a .breakout at the 33rem prose token, so it fills the FAQ
        // container the way the question row above it already does. An answer
        // stopping halfway across a full-width disclosure row read as a broken
        // column rather than as a measure.
        //
        // This does put the answer past the 65-75 character target. Accepted
        // on the grounds that an FAQ answer is looked up and scanned for one
        // fact rather than read continuously, and that the row it belongs to
        // sets the width expectation.
        <p className="wide pb-5 pr-8 text-[0.95rem] leading-relaxed text-graphite">
          {answer}
        </p>
      )}
    </div>
  );
};
