"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Is this Marriage Biodata Maker completely free?",
    a: "Yes, our marriage biodata maker is 100% free with no hidden charges, watermarks, or subscription fees. You can customize templates, enter your details, and download high-resolution PNG or PDF files instantly.",
  },
  {
    q: "Is my personal information and photo safe?",
    a: "Absolutely. All processing occurs locally within your web browser. Your personal details, contact information, and photographs are never uploaded, stored, or saved on any remote server.",
  },
  {
    q: "Can I create a biodata in Hindi or Marathi?",
    a: "Yes! Our tool fully supports English, Hindi (हिन्दी), and Marathi (मराठी). You can switch languages at any time, and field labels as well as localized typography will update automatically.",
  },
  {
    q: "What is the best paper size for printing my biodata?",
    a: "All our templates are engineered according to standard A4 dimensions (794px × 1123px at print DPI). You can print the generated PDF directly on standard A4 paper without layout distortion.",
  },
  {
    q: "What key details should I include in a marriage biodata?",
    a: "A complete marriage profile includes personal details (Height, DOB, Education, Occupation), family background (Father's & Mother's occupations, Sibling details), astrological details if applicable (Rashi, Nakshatra, Gotra), and contact information.",
  },
];

export default function SeoContentSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // JSON-LD Schemas for WebApplication and FAQPage
  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Free Marriage Biodata Maker",
        "url": "https://freebiodatamakers.com/biodata",
        "applicationCategory": "DesignApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a,
          },
        })),
      },
    ],
  };

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 text-stone-800 sm:px-6 sm:py-16">
      {/* Inject Structured Data Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      {/* Editorial Content Section */}
      <article className="space-y-8">
        <header className="border-b border-stone-200 pb-6 text-center sm:text-left">
          <h2 className="text-2xl font-extrabold text-stone-900 sm:text-3xl">
            Complete Guide to Creating an Impressive Marriage Biodata
          </h2>
          <p className="mt-2 text-stone-600">
            Learn how to format, organize, and present your personal and family background effectively.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-stone-900">
              Why a Well-Designed Marriage Biodata Matters
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              In Indian matchmaking, a marriage biodata is often the very first interaction between two families. A cleanly organized, tastefully formatted document creates an immediate impression of clarity, respect, and seriousness. It serves as a comprehensive snapshot of your life, education, career milestones, and family values.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-stone-900">
              Key Sections Every Biodata Should Contain
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-stone-600">
              <li><strong>Personal Details:</strong> Full Name, Date/Time/Place of Birth, Height, Complexion.</li>
              <li><strong>Education & Career:</strong> Degrees, Institutions, Current Employer, Designation, Annual Income.</li>
              <li><strong>Family Background:</strong> Father&apos;s and Mother&apos;s names and occupations, Sibling status.</li>
              <li><strong>Astrological Details:</strong> Rashi, Nakshatra, Gotra, Manglik Status.</li>
              <li><strong>Contact Information:</strong> Phone numbers, Residential address.</li>
            </ul>
          </div>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="rounded-2xl bg-orange-50/60 p-6 sm:p-8 border border-orange-100">
          <h3 className="text-xl font-bold text-orange-950">
            How to Use Our Free Online Biodata Builder
          </h3>
          <ol className="mt-4 grid gap-4 sm:grid-cols-3">
            <li className="rounded-xl bg-white p-4 shadow-sm border border-stone-200/80">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white">1</span>
              <h4 className="mt-2 font-bold text-stone-900 text-sm">Fill Details</h4>
              <p className="mt-1 text-xs text-stone-600">Enter your personal, educational, family, and contact information into the form fields.</p>
            </li>
            <li className="rounded-xl bg-white p-4 shadow-sm border border-stone-200/80">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white">2</span>
              <h4 className="mt-2 font-bold text-stone-900 text-sm">Choose Template</h4>
              <p className="mt-1 text-xs text-stone-600">Select from traditional marigold, royal gold, magenta, or modern minimal templates.</p>
            </li>
            <li className="rounded-xl bg-white p-4 shadow-sm border border-stone-200/80">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white">3</span>
              <h4 className="mt-2 font-bold text-stone-900 text-sm">Download PDF / PNG</h4>
              <p className="mt-1 text-xs text-stone-600">Preview your design in real time and download a high-definition PDF or image file.</p>
            </li>
          </ol>
        </div>
      </article>

      {/* Accordion FAQ Section */}
      <div className="mt-12 border-t border-stone-200 pt-10">
        <h2 className="text-2xl font-extrabold text-stone-900 text-center sm:text-3xl">
          Frequently Asked Questions (FAQ)
        </h2>
        <p className="mt-2 text-center text-sm text-stone-600">
          Got questions about generating your marriage profile? Here are quick answers.
        </p>

        <div className="mt-8 space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="flex w-full items-center justify-between p-4 text-left font-semibold text-stone-900 hover:bg-stone-50"
              >
                <span>{faq.q}</span>
                <span className="ml-2 text-stone-500 font-bold">
                  {openFaq === idx ? "−" : "+"}
                </span>
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-sm leading-relaxed text-stone-600 border-t border-stone-100 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}