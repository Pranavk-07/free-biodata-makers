import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Marriage Biodata Maker & Invitation Cards Online",
  description:
    "Create professional marriage biodata, stunning wedding invitations, birthday cards, and puja celebration cards online for free. Available in English, Hindi, and Marathi with instant PDF & PNG downloads.",
  alternates: {
    canonical: "https://freebiodatamakers.com",
  },
};

const tools = [
  {
    icon: "📜",
    title: "Marriage Biodata Maker",
    description:
      "Create beautiful marriage biodata with personal, education, astrological, and family details.",
    tag: "Popular",
    href: "/biodata",
  },
  {
    icon: "💌",
    title: "Wedding Invitation Maker",
    description:
      "Design breathtaking wedding invitations with your names, date, time, and venue.",
    tag: "Wedding",
    href: "/wedding-invitation",
  },
  {
    icon: "🎉",
    title: "Birthday & Puja Cards",
    description:
      "Create birthday party invitations, Ganesh Chaturthi, and religious puja ceremony cards.",
    tag: "Celebrations",
    href: "/birthday-cards",
  },
];

const featuredBlogs = [
  {
    title: "How to Create Marriage Biodata Online for Free",
    description: "Learn how to build a professional, complete, and attractive marriage biodata using online tools with no hidden charges.",
    slug: "create-marriage-biodata-online",
  },
  {
    title: "Marriage Biodata Format for Boys",
    description: "Discover standard professional layouts, key career details, and family background points to prioritize.",
    slug: "marriage-biodata-format-for-boys",
  },
  {
    title: "Marathi Marriage Biodata Format",
    description: "Learn how to construct a traditional Marathi marriage profile (लग्नपत्रिका बायोडाटा) with cultural phrases.",
    slug: "marathi-marriage-biodata-format",
  },
];

export default function Home() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "Free Biodata Makers",
        "url": "https://freebiodatamakers.com",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://freebiodatamakers.com/blog?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "name": "Free Biodata Makers",
        "url": "https://freebiodatamakers.com",
        "logo": "https://freebiodatamakers.com/favicon.ico",
        "sameAs": [],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-[#fffaf5] text-[#30251f]">
      {/* JSON-LD Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* NAVIGATION */}
      <header className="border-b border-orange-100 bg-white sticky top-0 z-50 shadow-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 text-xl font-bold text-white shadow">
              F
            </span>
            <span className="text-lg font-extrabold tracking-tight">
              FreeBiodata<span className="text-orange-600">Makers</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#tools" className="hover:text-orange-600 transition">Our Tools</a>
            <a href="#how-it-works" className="hover:text-orange-600 transition">How It Works</a>
            <Link href="/blog" className="hover:text-orange-600 transition">Blog & Guides</Link>
            <a href="#about" className="hover:text-orange-600 transition">About Us</a>
          </div>

          <a
            href="#tools"
            className="rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-orange-700 transition"
          >
            Get Started
          </a>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <span className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
            ✨ Free Online Design Tools
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl text-stone-900">
            Create Beautiful
            <span className="block text-orange-600">Cards & Biodata</span>
            <span className="block">For Every Occasion.</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-stone-600">
            Create your marriage biodata, wedding invitations, and celebration cards easily. Customize professional templates and download them for free in PDF or PNG.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#tools"
              className="rounded-full bg-orange-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-200 hover:bg-orange-700 transition"
            >
              Create Your Design →
            </a>
            <a
              href="#how-it-works"
              className="rounded-full border border-orange-200 bg-white px-7 py-3.5 font-semibold text-stone-700 hover:bg-orange-50 transition"
            >
              How It Works
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-sm font-medium text-stone-600">
            <span>✓ 100% Free to create</span>
            <span>✓ Easy to use builder</span>
            <span>✓ Instant PDF & PNG download</span>
          </div>
        </div>

        {/* HERO PREVIEW CARD */}
        <div className="relative rounded-3xl bg-orange-100 p-6 md:p-10 shadow-inner">
          <div className="rounded-2xl bg-white p-6 shadow-xl border border-orange-200/60 text-center">
            <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-orange-600">
              Trusted Platform
            </span>
            <h2 className="mt-4 text-2xl font-bold text-stone-900">
              Digital Stationery Studio
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              Generate exquisite matrimonial profiles and festive event invitations in English, Hindi, and Marathi.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs font-bold text-stone-700">
              <div className="rounded-xl bg-stone-50 p-3 border border-stone-200">📜 Biodata</div>
              <div className="rounded-xl bg-stone-50 p-3 border border-stone-200">💌 Weddings</div>
              <div className="rounded-xl bg-stone-50 p-3 border border-stone-200">🎉 Festivals</div>
            </div>
          </div>
        </div>
      </section>

      {/* TOOLS SECTION */}
      <section id="tools" className="mx-auto max-w-7xl px-5 py-16">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-stone-900 sm:text-4xl">
            Choose Your Generator Tool
          </h2>
          <p className="mt-3 text-stone-600">
            Select a category below to start customizing your design instantly.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {tools.map((tool) => (
            <div
              key={tool.title}
              className="group relative flex flex-col justify-between rounded-3xl border border-stone-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-orange-300"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-4xl">{tool.icon}</span>
                  <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600 uppercase tracking-wide">
                    {tool.tag}
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-bold text-stone-900">
                  {tool.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {tool.description}
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href={tool.href}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-orange-600 py-3.5 text-sm font-bold text-white shadow hover:bg-orange-700 transition"
                >
                  Create Now →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="bg-orange-50/50 border-y border-orange-100 px-5 py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-extrabold text-stone-900 sm:text-4xl">
            How FreeBiodataMakers Works
          </h2>
          <p className="mt-3 text-stone-600">
            Create and download your professional cards in 3 simple steps.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-stone-200/80">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 font-bold text-white mx-auto">1</span>
              <h3 className="mt-4 font-bold text-lg text-stone-900">Enter Details</h3>
              <p className="mt-2 text-sm text-stone-600">Fill in your personal, family, or event information in our simple form fields.</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-stone-200/80">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 font-bold text-white mx-auto">2</span>
              <h3 className="mt-4 font-bold text-lg text-stone-900">Choose Design</h3>
              <p className="mt-2 text-sm text-stone-600">Instantly preview your card across royal, floral, traditional, and modern templates.</p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-stone-200/80">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 font-bold text-white mx-auto">3</span>
              <h3 className="mt-4 font-bold text-lg text-stone-900">Download HD</h3>
              <p className="mt-2 text-sm text-stone-600">Save your final creation as a high-definition PNG image or PDF document instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT BLOG ARTICLES (Internal Linking for SEO) */}
      <section className="mx-auto max-w-7xl px-5 py-16">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h2 className="text-2xl font-extrabold text-stone-900 sm:text-3xl">
              Marriage Biodata Guides & Tips
            </h2>
            <p className="mt-1 text-sm text-stone-600">
              Read expert advice on formats, templates, and cultural details.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-bold text-orange-600 hover:text-orange-700 hover:underline"
          >
            View All Articles →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {featuredBlogs.map((blog) => (
            <article
              key={blog.slug}
              className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div>
                <h3 className="text-lg font-bold text-stone-900">
                  <Link href={`/blog/${blog.slug}`} className="hover:text-orange-600">
                    {blog.title}
                  </Link>
                </h3>
                <p className="mt-3 text-sm text-stone-600 leading-relaxed">
                  {blog.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-stone-100">
                <Link
                  href={`/blog/${blog.slug}`}
                  className="text-xs font-bold uppercase tracking-wider text-orange-600 hover:underline"
                >
                  Read Article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="bg-white border-t border-orange-100 px-5 py-16 text-center">
        <h2 className="text-2xl font-extrabold text-stone-900">
          About FreeBiodataMakers
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-stone-600">
          Our mission is to make beautiful marriage biodata, wedding invitations, and celebration cards accessible to everyone through fast, privacy-focused, and free online tools.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#30251f] px-5 py-10 text-center text-white">
        <p className="text-lg font-bold">FreeBiodataMakers.com</p>
        <p className="mt-2 text-sm text-stone-300">
          Create Beautiful Cards. Make Every Moment Special.
        </p>
        <div className="mt-5 flex justify-center gap-6 text-xs text-stone-300">
          <Link href="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline">Terms & Conditions</Link>
          <Link href="/contact" className="hover:underline">Contact Us</Link>
          <Link href="/about" className="hover:underline">About Us</Link>
        </div>
                <p className="mt-6 text-xs text-stone-400">
                  © 2026 FreeBiodataMakers. All rights reserved.
                </p>
      </footer>
    </main>
  );
}