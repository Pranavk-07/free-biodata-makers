
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Marriage Biodata", href: "/biodata" },
  { name: "Wedding Invitation", href: "/wedding-invitation" },
  { name: "Birthday & Puja", href: "/birthday-cards" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-200 bg-white/95 shadow-sm backdrop-blur">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-rose-800 sm:text-2xl"
        >
          FreeBiodataMakers
          <span className="text-rose-500">.</span>
        </Link>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-stone-700 transition hover:text-rose-700"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
