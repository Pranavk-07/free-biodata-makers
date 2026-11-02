"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Are these wedding invitation templates completely free to download?",
    a: "Yes! All our traditional, royal, floral, and modern wedding invitation templates are 100% free to customize and download in high-definition PNG or PDF format with zero watermarks.",
  },
  {
    q: "Can I share the generated wedding invitation on WhatsApp?",
    a: "Yes. Once you click 'Download PNG', the high-resolution image is saved directly to your device or phone. You can easily share it via WhatsApp, Facebook, email, or print it physically.",
  },
  {
    q: "Does the wedding invitation maker support Hindi and Marathi?",
    a: "Yes, our tool fully supports English, Hindi (हिन्दी), and Marathi (मराठी) to help you create invitations in your preferred language and regional format.",
  },
  {
    q: "What dimensions are used for the wedding invitation cards?",
    a: "Our cards are engineered in standard A4 print dimensions (794px × 1123px), ensuring crisp text and imagery whether viewed on a mobile screen or printed on premium wedding stationery.",
  },
];

export default function WeddingSeoContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Free Wedding Invitation Maker",
        "url": "https://freebiodatamakers.com/wedding-invitation",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <article className="space-y-8">
        <header className="border-b border-stone-200 pb-6 text-center sm:text-left">
          <h2 className="text-2xl font-extrabold text-stone-900 sm:text-3xl">
            Create Stunning Digital Wedding Invitations Online
          </h2>
          <p className="mt-2 text-stone-600">
            Design elegant wedding cards, sangeet invites, and reception announcements in minutes.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-stone-900">
              Why Choose Digital Wedding Invitations?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Digital wedding invitations have become the preferred choice for modern couples. They are eco-friendly, cost-effective, and instantly shareable with family and friends across the globe via WhatsApp or social media. At the same time, our high-resolution PNG and PDF exports look equally stunning when printed.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-stone-900">
              Tips for Drafting Your Wedding Invite
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-stone-600">
              <li><strong>Couple Names:</strong> Keep the bride and groom names prominent.</li>
              <li><strong>Clear Timing:</strong> Specify the exact date, Muhurat, or ceremony time.</li>
              <li><strong>Venue Details:</strong> Provide the hall name and complete address.</li>
              <li><strong>Family Hosting:</strong> Add welcoming family names at the bottom.</li>
            </ul>
          </div>
        </div>
      </article>

      <div className="mt-12 border-t border-stone-200 pt-10">
        <h2 className="text-2xl font-extrabold text-stone-900 text-center sm:text-3xl">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden">
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="flex w-full items-center justify-between p-4 text-left font-semibold text-stone-900 hover:bg-stone-50"
              >
                <span>{faq.q}</span>
                <span className="ml-2 text-stone-500 font-bold">{openFaq === idx ? "−" : "+"}</span>
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