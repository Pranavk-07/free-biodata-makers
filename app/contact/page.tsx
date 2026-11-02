import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Free Biodata Makers. Learn how we protect your personal information and photo privacy.",
};

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>
        <p className="mt-1 text-xs text-stone-500">Last updated: May 2024</p>

        <div className="mt-8 space-y-6 text-sm leading-relaxed text-stone-700">
          <section className="rounded-xl bg-orange-50/70 p-5 border border-orange-100">
            <h2 className="text-base font-bold text-orange-950">1. Client-Side Data Protection (Zero Server Uploads)</h2>
            <p className="mt-2 text-orange-900">
              Your privacy is our highest priority. All information entered into our tools (including personal names, dates of birth, contact phone numbers, family details, and uploaded photographs) is processed <strong>entirely inside your web browser</strong>. We do not store, record, transmit, or upload any of your personal details or images to external databases or remote servers.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900">2. Local Storage Usage</h2>
            <p className="mt-2">
              Our tools use your browser&apos;s local storage mechanism (`localStorage`) purely for draft auto-saving functionality. This allows you to resume editing your biodata if you accidentally refresh the page. This data remains on your device only and can be cleared anytime by clicking the &quot;Clear Form&quot; button.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900">3. Log Files & Cookies</h2>
            <p className="mt-2">
              freebiodatamakers.com follows standard procedures using log files. These files log visitors when they visit websites. Third-party services (such as Google AdSense and analytics) may use cookies, JavaScript, or Web Beacons to measure advertising effectiveness and personalize ad content.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900">4. Third-Party Advertising (Google AdSense)</h2>
            <p className="mt-2">
              Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to freebiodatamakers.com and other sites on the internet. Visitors may decline the use of DART cookies by visiting Google&apos;s Ad and Content Network Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-stone-900">5. Contact Information</h2>
            <p className="mt-2">
              If you have any questions or concerns regarding this Privacy Policy, please email us at <strong>support@freebiodatamakers.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}