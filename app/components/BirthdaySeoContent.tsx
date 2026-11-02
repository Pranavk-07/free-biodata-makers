"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Are these birthday and festival cards free to create?",
    a: "Yes, all birthday party, Ganesh Chaturthi, and puja celebration cards are 100% free. You can customize templates and download high-resolution images instantly.",
  },
  {
    q: "What types of festival and greeting cards can I make?",
    a: "Currently, our studio supports Birthday Party invitations, Ganesh Chaturthi greetings, and Satyanarayan / Housewarming Puja ceremony invitation cards.",
  },
  {
    q: "Can I generate cards in Hindi and Marathi?",
    a: "Yes! Our greeting card maker fully supports English, Hindi (हिन्दी), and Marathi (मराठी) with culturally appropriate headings and blessings.",
  },
];

export default function BirthdaySeoContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const jsonLdData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "Free Birthday & Festival Card Maker",
        "url": "https://freebiodatamakers.com/birthday-cards",
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
            Create Custom Birthday & Festival Greeting Cards Online
          </h2>
          <p className="mt-2 text-stone-600">
            Design beautiful invitations for birthdays, Ganesh Chaturthi, and religious puja ceremonies in seconds.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-stone-900">
              Celebrate Special Occasions With Custom Invites
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              Whether you are inviting guests to a milestone birthday party, welcoming Ganpati Bappa home for Ganesh Chaturthi, or organizing a family Satyanarayan Puja, having a personalized digital card adds warmth and excitement to your celebration.
            </p>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-stone-900">
              Key Features of Our Greeting Card Studio
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-stone-600">
              <li><strong>Multi-Event Support:</strong> Birthday, Ganpati, and Puja templates.</li>
              <li><strong>Regional Languages:</strong> English, Hindi, and Marathi text.</li>
              <li><strong>HD Downloads:</strong> Export crisp PNGs or PDFs for WhatsApp & printing.</li>
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