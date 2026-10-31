import Link from "next/link";

export default function TermsPage() {
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
          Terms & Conditions
        </h1>

        <p className="mb-8 text-sm text-gray-500">
          Last updated: October 31, 2026
        </p>

        <div className="space-y-7 leading-7 text-gray-700">
          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              1. Acceptance of Terms
            </h2>
            <p>
              Welcome to Free Biodata Makers. By accessing or using this
              website, you agree to these Terms & Conditions. If you do not
              agree, please stop using the website.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              2. Our Services
            </h2>
            <p>
              Free Biodata Makers provides online tools to help users create
              marriage biodata, wedding invitations, birthday cards, and
              puja invitation cards. Features and templates may change as
              we improve the website.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              3. Acceptable Use
            </h2>
            <p>You agree to use this website responsibly. You must not:</p>
            <ul className="mt-2 list-disc space-y-2 pl-6">
              <li>Use the website for unlawful or fraudulent activities.</li>
              <li>Upload or use content that violates another person's rights.</li>
              <li>Attempt to disrupt, damage, or gain unauthorized access to the website.</li>
              <li>Misuse the website or interfere with its normal operation.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              4. User-Provided Content
            </h2>
            <p>
              You are responsible for the names, photographs, personal
              details, and other content you enter or upload. You should
              have the necessary permission to use any photographs or
              information belonging to another person.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              5. Downloads and Personal Use
            </h2>
            <p>
              You may download the biodata and invitation designs generated
              using our tools for lawful personal use. You are responsible
              for checking the accuracy of the details before printing,
              sharing, or distributing your downloaded files.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              6. Intellectual Property
            </h2>
            <p>
              The website's branding, original content, layout, and
              software are protected by applicable intellectual property
              laws. You may not copy, redistribute, or commercially exploit
              our website content or software without permission, except
              where permitted by law.
            </p>
            <p className="mt-2">
              Content you provide remains yours or belongs to its
              respective owner. These terms do not transfer ownership of
              your personal content to us.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              7. Availability of Services
            </h2>
            <p>
              We aim to keep the website available and working properly.
              However, we do not guarantee uninterrupted access, error-free
              operation, or permanent availability of every feature.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              8. Disclaimer
            </h2>
            <p>
              The website and its tools are provided on an "as available"
              basis. We make no guarantee that generated designs will meet
              every user's requirements. Please review your documents
              carefully before using them.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              9. Limitation of Liability
            </h2>
            <p>
              To the extent permitted by applicable law, Free Biodata
              Makers will not be responsible for indirect or incidental
              losses arising from the use of, or inability to use, the
              website. Nothing in these terms excludes liability that
              cannot legally be excluded.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              10. Third-Party Services and Links
            </h2>
            <p>
              The website may contain links to third-party websites or use
              third-party services. We do not control those services and
              are not responsible for their content, availability, or
              privacy practices.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              11. Changes to These Terms
            </h2>
            <p>
              We may update these Terms & Conditions as the website
              develops. Updated terms will be published on this page with
              a revised date. Continued use of the website after changes
              take effect means you accept the updated terms, where
              permitted by law.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              12. Contact Us
            </h2>
            <p>
              If you have questions about these Terms & Conditions, contact
              us at:
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