import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions for using Free Biodata Makers online invitation and biodata generator tools.",
};

export default function TermsPage() {
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
          Terms & Conditions
        </h1>
        <p className="mt-1 text-xs text-stone-500">Last updated: May 2024</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-stone-700">
          <section>
            <h2 className="text-base font-bold text-stone-900">1. Agreement to Terms</h2>
            <p className="mt-2">
              By accessing and using <strong>Free Biodata Makers</strong> (freebiodatamakers.com), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you should discontinue using our website and tools.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900">2. Free Personal Use</h2>
            <p className="mt-2">
              All tools, templates, and downloadable PNG/PDF files generated on freebiodatamakers.com are provided 100% free for personal, family, and non-commercial matchmaking or invitation purposes.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900">3. User Responsibility</h2>
            <p className="mt-2">
              Users are solely responsible for the accuracy and lawfulness of the text, personal details, and photographs they enter into the generator tools. Free Biodata Makers does not verify or monitor user-submitted content.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900">4. Disclaimer of Liability</h2>
            <p className="mt-2">
              The platform and all generated materials are provided on an &quot;as-is&quot; basis without warranties of any kind. Free Biodata Makers shall not be liable for any indirect or consequential damages arising from the use of our services.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}