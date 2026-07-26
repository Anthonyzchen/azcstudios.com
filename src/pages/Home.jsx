import { useEffect } from "react";
import { Link } from "react-router-dom";
import products from "../data/products.json";
import { usePageEntrance } from "../lib/usePageEntrance";
import { Section, Paragraph, CopyEmail } from "../components/ui";
import { LEGAL_ENTITY, SUPPORT_EMAIL, STUDIO_NAME } from "../lib/site";

const ProductCard = ({ product }) => (
  <Link
    to={product.href}
    className="group block rounded-2xl border border-line bg-white/50 p-8 transition-all duration-500 ease-ink hover:-translate-y-0.5 hover:border-ink/20 hover:bg-white sm:p-10"
  >
    <div className="mb-5 flex items-center gap-3">
      <span
        className={`h-2.5 w-2.5 rounded-full ${product.accentClass}`}
        aria-hidden="true"
      />
      <h3 className="font-Fraunces text-2xl font-normal text-ink">
        {product.name}
      </h3>
      <span className="ml-auto shrink-0 rounded-full border border-line px-3 py-1 text-xs text-graphite/70">
        {product.status}
      </span>
    </div>

    <p className="mb-4 text-lede text-ink/80">{product.tagline}</p>
    <Paragraph className="mb-6">{product.summary}</Paragraph>

    <span className="inline-flex items-center gap-2 text-sm font-medium text-ink">
      Read more
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className="transition-transform duration-300 ease-ink group-hover:translate-x-1"
      >
        <path
          d="M3 8h10M9 4l4 4-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  </Link>
);

const Home = () => {
  const entranceRef = usePageEntrance();

  useEffect(() => {
    document.title = `${STUDIO_NAME}`;
  }, []);

  return (
    <div ref={entranceRef}>
      {/* Hero */}
      <section className="px-gutter pb-16 pt-20 sm:pb-24 sm:pt-32">
        <div className="mx-auto max-w-content">
          <p className="mb-6 font-Inter text-eyebrow uppercase text-graphite/60">
            Independent software studio
          </p>
          <h1 className="mb-8 max-w-4xl font-Fraunces text-display font-normal text-ink">
            Software that earns its place on your phone.
          </h1>
          <p className="max-w-prose text-lede text-graphite">
            {STUDIO_NAME} builds consumer apps for people who want a tool to do
            one thing well and then get out of the way. No ads, no attention
            farming, no selling what we learn about you.
          </p>
        </div>
      </section>

      {/* Products */}
      <Section eyebrow="Products" title="What we're building" id="products">
        <div className="grid gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </Section>

      {/* Approach */}
      <Section eyebrow="Approach" title="How we work">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 font-Fraunces text-lg text-ink">
              Paid, not free
            </h3>
            <Paragraph>
              Our apps cost money because the alternative is selling your
              attention or your data. A subscription keeps the incentives
              pointed at you.
            </Paragraph>
          </div>
          <div>
            <h3 className="mb-3 font-Fraunces text-lg text-ink">
              Narrow on purpose
            </h3>
            <Paragraph>
              We would rather ship one feature that works every time than five
              that mostly work. Scope stays small so quality can stay high.
            </Paragraph>
          </div>
          <div>
            <h3 className="mb-3 font-Fraunces text-lg text-ink">
              Honest about limits
            </h3>
            <Paragraph>
              When a feature is still in progress or a data source is
              incomplete, we say so in the app and on this site rather than
              letting the marketing run ahead of the product.
            </Paragraph>
          </div>
        </div>
      </Section>

      {/* Contact */}
      <Section eyebrow="Contact" title="Get in touch" id="contact">
        <Paragraph className="mb-6 max-w-prose">
          Questions about a product, press, or partnerships — this address
          reaches us directly.
        </Paragraph>
        <CopyEmail email={SUPPORT_EMAIL} variant="button" />
        <p className="mt-8 text-sm text-graphite/70">
          {LEGAL_ENTITY} is a limited liability company registered in New York.
          The studio is run by{" "}
          <a
            href="https://anthonyzchen.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline decoration-line underline-offset-4 transition-colors duration-300 ease-ink hover:decoration-ink"
          >
            Anthony Chen
          </a>
          .
        </p>
      </Section>
    </div>
  );
};

export default Home;
