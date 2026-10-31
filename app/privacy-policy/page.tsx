import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <Link
          href="/"
          className="mb-8 inline-block text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="mb-3 text-3xl font-bold text-gray-900 sm:text-4xl">
          Privacy Policy
        </h1>

        <p className="mb-8 text-sm text-gray-500">
          Last updated: October 31, 2026
        </p>

        <div className="space-y-7 leading-7 text-gray-700">
          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              1. Introduction
            </h2>
            <p>
              Welcome to Free Biodata Makers. We respect your privacy and
              are committed to explaining how information may be handled
              when you visit and use our website.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              2. Information You Provide
            </h2>
            <p>
              Our tools allow you to enter information such as names, dates,
              addresses, family details, and photographs to create biodata
              and invitation cards.
            </p>
            <p className="mt-2">
              Do not enter sensitive personal information unless it is
              necessary for the document you want to create. Review the
              information you include before downloading or sharing your
              creation.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              3. How Our Tools Handle Your Information
            </h2>
            <p>
              Information entered into our tools may be processed by your
              browser to display previews and generate downloads. The way
              information is handled depends on the features and services
              used on the website. Please avoid assuming that information
              is stored only on your device unless the relevant feature
              confirms this.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              4. Cookies and Advertising
            </h2>
            <p>
              Our website may use cookies and similar technologies for
              functionality, analytics, and advertising.
            </p>
            <p className="mt-2">
              If Google AdSense or other advertising services are enabled,
              third-party providers may use cookies or similar technologies
              to serve and measure advertisements based on visits to this
              website or other websites, subject to their policies and
              applicable settings.
            </p>
            <p className="mt-2">
              Visitors can manage available cookie and advertising
              preferences through their browser and the relevant service
              settings.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              5. Third-Party Services
            </h2>
            <p>
              We may use third-party services such as hosting providers,
              analytics tools, and advertising platforms. These services
              may process information according to their own privacy
              policies.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              6. Data Security
            </h2>
            <p>
              We take reasonable steps to protect our website and the
              information handled through it. However, no website or
              electronic transmission can be guaranteed to be completely
              secure.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              7. Children's Privacy
            </h2>
            <p>
              Our website is not specifically directed at children under
              13. We do not knowingly collect personal information from
              children under 13.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              8. Your Privacy Choices
            </h2>
            <p>
              You can choose what information to enter into our tools.
              You may also contact us with questions or requests concerning
              information associated with your use of the website.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              9. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy as our website and services
              change. Any updates will be published on this page with a
              revised date.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              10. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy, contact us
              at:
            </p>
            <a
              href="mailto:freebiodatamakers@gmail.com"
              className="font-medium text-blue-600 hover:underline"
            >
              freebiodatamakers@gmail.com
            </a>
          </section>
        </div>
      </div>
    </main>
  );
}