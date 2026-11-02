import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Free Biodata Makers. We provide free, privacy-focused online tools to create marriage biodata, wedding invitations, and festival cards in English, Hindi, and Marathi.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-stone-50 px-4 py-12 sm:px-6 lg:px-8 text-stone-800">
      <div className="mx-auto max-w-4xl rounded-2xl border border-stone-200 bg-white p-6 sm:p-10 shadow-sm">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="mt-6 text-3xl font-extrabold text-stone-900 sm:text-4xl">
          About Free Biodata Makers
        </h1>

        <p className="mt-2 text-sm font-semibold uppercase tracking-wider text-orange-600">
          Empowering Indian Families With Free, High-Quality Digital Stationery
        </p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-stone-700 sm:text-base">
          <p>
            Welcome to <strong>Free Biodata Makers</strong> (freebiodatamakers.com). Our mission is simple: to make the process of creating professional Indian marriage biodata, wedding invitations, birthday cards, and festival greeting cards simple, beautiful, and completely free for everyone.
          </p>

          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <div className="rounded-xl border border-stone-200 bg-orange-50/50 p-5">
              <h2 className="text-lg font-bold text-stone-900"> Our Mission</h2>
              <p className="mt-2 text-sm text-stone-600">
                Matchmaking and family celebrations should start with dignity and elegance. We provide high-definition, cultural templates in English, Hindi, and Marathi without requiring registration, subscriptions, or watermarks.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-orange-50/50 p-5">
              <h2 className="text-lg font-bold text-stone-900"> Privacy First</h2>
              <p className="mt-2 text-sm text-stone-600">
                We believe your personal family information belongs strictly to you. All our tools operate locally inside your browser—your photographs and biodata entries are never saved, stored, or uploaded to any server.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-stone-900 pt-4">What We Offer</h2>
          <ul className="list-disc space-y-2 pl-5 text-stone-600">
            <li><strong>Marriage Biodata Builder:</strong> Tailored templates featuring Ganesha motifs, detailed horoscope fields, and family background blocks.</li>
            <li><strong>Wedding Invitations:</strong> Elegant traditional and modern wedding cards shareable via WhatsApp or ready for printing.</li>
            <li><strong>Festival & Birthday Cards:</strong> Custom greeting cards for Birthdays, Ganesh Chaturthi, and Puja ceremonies.</li>
            <li><strong>Multilingual Support:</strong> Seamless switching between English, Hindi (हिन्दी), and Marathi (मराठी).</li>
          </ul>
        </div>
      </div>
    </main>
  );
}