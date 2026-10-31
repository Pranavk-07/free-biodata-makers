
const tools = [
  {
    icon: "💍",
    title: "Marriage Biodata Maker",
    description:
      "Create beautiful marriage biodata with personal, education and family details.",
    tag: "Popular",
    href: "/biodata",
  },
  {
    icon: "💒",
    title: "Wedding Invitation Maker",
    description:
      "Design beautiful wedding invitations with your names, date and venue.",
    tag: "Wedding",
    href: "/wedding-invitation",
  },
  {
    icon: "🎂",
    title: "Birthday & Puja Cards",
    description:
      "Create birthday, Ganesh puja and other special occasion invitations.",
    tag: "Celebrations",
    href: "#",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffaf5] text-[#30251f]">

      {/* NAVIGATION */}
      <header className="border-b border-orange-100 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">

          <a href="/" className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 text-xl font-bold text-white">
              F
            </span>

            <span className="text-lg font-extrabold tracking-tight">
              FreeBiodata<span className="text-orange-600">Makers</span>
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#tools" className="hover:text-orange-600">
              Our Tools
            </a>

            <a href="#how-it-works" className="hover:text-orange-600">
              How It Works
            </a>

            <a href="#about" className="hover:text-orange-600">
              About Us
            </a>
          </div>

          <a
            href="#tools"
            className="rounded-full bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-700"
          >
            Get Started
          </a>

        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2 md:py-28">

        <div>

          <span className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
            ✨ Free Online Design Tools
          </span>

          <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
            Create Beautiful

            <span className="block text-orange-600">
              Cards & Biodata
            </span>

            <span className="block">
              For Every Occasion.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-stone-600">
            Create your marriage biodata, wedding invitations and
            celebration cards easily. Customize your design and
            download it for free.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <a
              href="#tools"
              className="rounded-full bg-orange-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-orange-200 hover:bg-orange-700"
            >
              Create Your Design →
            </a>

            <a
              href="#how-it-works"
              className="rounded-full border border-orange-200 bg-white px-7 py-3.5 font-semibold hover:bg-orange-50"
            >
              How It Works
            </a>

          </div>

          <div className="mt-8 flex flex-wrap gap-5 text-sm text-stone-600">
            <span>✓ Free to create</span>
            <span>✓ Easy to use</span>
            <span>✓ PDF & Image download</span>
          </div>

        </div>

        {/* INVITATION PREVIEW */}
        <div className="relative rounded-3xl bg-orange-100 p-6 md:p-10">

          <div className="rounded-2xl bg-white p-5 shadow-xl">

            <div className="rounded-xl border-2 border-orange-200 p-6 text-center">

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
                Wedding Invitation
              </p>

              <div className="my-5 text-5xl">
                💐
              </div>

              <h2 className="text-3xl font-serif font-bold text-orange-800">
                Aarav & Priya
              </h2>

              <p className="mt-4 text-sm text-stone-600">
                Together with their families
              </p>

              <p className="mt-3 font-semibold text-stone-700">
                Request the pleasure of your company
              </p>

              <div className="my-5 border-t border-orange-200" />

              <p className="font-bold text-orange-700">
                15 December 2026
              </p>

              <p className="mt-2 text-sm text-stone-500">
                Wedding Celebration
              </p>

            </div>
          </div>

          <div className="absolute -bottom-5 -left-3 rounded-xl bg-white p-4 shadow-lg">
            <span className="text-2xl">📄</span>
            <p className="mt-1 text-xs font-bold">Biodata PDF</p>
          </div>

        </div>

      </section>

      {/* TOOLS SECTION */}
      <section id="tools" className="bg-white px-5 py-20">

        <div className="mx-auto max-w-7xl">

          <div className="text-center">

            <p className="font-bold uppercase tracking-widest text-orange-600">
              Our Free Tools
            </p>

            <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
              What Would You Like To Create?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-stone-500">
              Choose a tool, customize your design and download
              your creation.
            </p>

          </div>

          {/* IMPORTANT: tool is defined inside map */}
          <div className="mt-12 grid gap-7 md:grid-cols-3">

            {tools.map((tool) => (

              <article
                key={tool.title}
                className="rounded-2xl border border-orange-100 bg-[#fffaf5] p-7 transition hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex items-center justify-between">

                  <span className="text-5xl">
                    {tool.icon}
                  </span>

                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
                    {tool.tag}
                  </span>

                </div>

                <h3 className="mt-6 text-xl font-bold">
                  {tool.title}
                </h3>

                <p className="mt-3 min-h-16 leading-7 text-stone-600">
                  {tool.description}
                </p>

                <a
                  href={tool.href}
                  className="mt-6 inline-block font-bold text-orange-600 hover:text-orange-800"
                >
                  Explore Tool →
                </a>

              </article>

            ))}

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="px-5 py-20"
      >

        <div className="mx-auto max-w-6xl text-center">

          <p className="font-bold uppercase tracking-widest text-orange-600">
            Simple Process
          </p>

          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
            Create Your Design In 3 Steps
          </h2>

          <div className="mt-12 grid gap-10 md:grid-cols-3">

            {[
              {
                number: "01",
                title: "Choose a Template",
                description: "Select your favorite design from our templates.",
              },
              {
                number: "02",
                title: "Add Your Details",
                description: "Enter your information and customize your design.",
              },
              {
                number: "03",
                title: "Download & Share",
                description: "Download your PDF or image and share it.",
              },
            ].map((step) => (

              <div key={step.number}>

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-600 text-xl font-extrabold text-white">
                  {step.number}
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-3 leading-7 text-stone-600">
                  {step.description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* LANGUAGE SECTION */}
      <section className="bg-orange-100 px-5 py-12 text-center">

        <h2 className="text-2xl font-bold">
          Create in Your Own Language
        </h2>

        <p className="mt-3 text-stone-600">
          English · हिंदी · मराठी
        </p>

        <p className="mt-2 text-sm text-stone-500">
          More Indian languages coming soon.
        </p>

      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="px-5 py-16 text-center"
      >

        <h2 className="text-2xl font-bold">
          About FreeBiodataMakers
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-stone-600">
          Our mission is to make beautiful marriage biodata,
          wedding invitations and celebration cards accessible
          to everyone through simple and free online tools.
        </p>

      </section>

      {/* FOOTER */}
      <footer className="bg-[#30251f] px-5 py-8 text-center text-white">

        <p className="text-lg font-bold">
          FreeBiodataMakers.com
        </p>

        <p className="mt-2 text-sm text-stone-300">
          Create Beautiful Cards. Make Every Moment Special.
        </p>

        <p className="mt-5 text-xs text-stone-400">
          © 2026 FreeBiodataMakers. All rights reserved.
        </p>

      </footer>

    </main>
  );
}
