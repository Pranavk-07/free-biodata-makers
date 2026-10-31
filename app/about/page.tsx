import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        <Link
          href="/"
          className="mb-8 inline-block text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Home
        </Link>

        <h1 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl">
          About Free Biodata Makers
        </h1>

        <section className="space-y-5 text-gray-700 leading-7">
          <p>
            Welcome to Free Biodata Makers, a simple online platform designed
            to help people create beautiful and professional biodata and
            invitation cards with ease.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            What We Offer
          </h2>

          <p>
            Our goal is to make designing personal documents and invitation
            cards simple and accessible. You can use our tools to create:
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>Marriage biodata with professional templates.</li>
            <li>Wedding invitation cards.</li>
            <li>Birthday invitation cards.</li>
            <li>Traditional puja and celebration cards.</li>
          </ul>

          <h2 className="text-xl font-semibold text-gray-900">
            Our Mission
          </h2>

          <p>
            We aim to provide easy-to-use, accessible, and free online tools
            that help people create attractive designs without requiring
            graphic design skills or complicated software.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            Easy to Use
          </h2>

          <p>
            Our tools are designed with simple forms and live previews so
            users can enter their details, choose a design, and download their
            creations.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            Our Commitment
          </h2>

          <p>
            We continuously work to improve the website, add useful features,
            and provide a smooth experience across mobile phones, tablets,
            and desktop devices.
          </p>

          <h2 className="text-xl font-semibold text-gray-900">
            Contact Us
          </h2>

          <p>
            Have a question, suggestion, or feedback? We would be happy to
            hear from you. Visit our{" "}
            <Link
              href="/contact"
              className="font-medium text-blue-600 hover:underline"
            >
              Contact Us
            </Link>{" "}
            page.
          </p>
        </section>
      </div>
    </main>
  );
}