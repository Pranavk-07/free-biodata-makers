
"use client";

import Link from "next/link";
import { useState } from "react";

type BlogPost = {
  title: string;
  description: string;
  category: string;
  slug: string;
  date: string;
  readTime: string;
  author: string;
};

const blogs: BlogPost[] = [
  {
    title: "How to Create Marriage Biodata Online for Free",
    description:
      "A complete step-by-step guide to creating a professional marriage biodata online. Learn which sections to include and how to make a great impression.",
    category: "Guides",
    slug: "create-marriage-biodata-online",
    date: "May 15, 2024",
    readTime: "5 min read",
    author: "Aditi Patil",
  },
  {
    title: "Marriage Biodata Format for Boys",
    description:
      "Explore professional layouts, career details, education and family background points for an attractive marriage biodata for boys.",
    category: "Biodata Formats",
    slug: "marriage-biodata-format-for-boys",
    date: "June 02, 2024",
    readTime: "4 min read",
    author: "Rohan Deshmukh",
  },
  {
    title: "Marriage Biodata Format for Girls",
    description:
      "Discover elegant biodata designs emphasizing education, interests, family details and professional presentation.",
    category: "Biodata Formats",
    slug: "marriage-biodata-format-for-girls",
    date: "June 08, 2024",
    readTime: "4 min read",
    author: "Neha Sharma",
  },
  {
    title: "Marathi Marriage Biodata Format",
    description:
      "Learn how to create a traditional Marathi marriage biodata with cultural details, family information and horoscope sections.",
    category: "Regional Formats",
    slug: "marathi-marriage-biodata-format",
    date: "June 12, 2024",
    readTime: "6 min read",
    author: "Vikas Joshi",
  },
];

const categories = [
  "All",
  "Guides",
  "Biodata Formats",
  "Regional Formats",
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs = blogs.filter(
    (blog) =>
      selectedCategory === "All" ||
      blog.category === selectedCategory
  );

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Free Biodata Makers Blog",
    description:
      "Marriage biodata formats, tips, examples and guides.",
    publisher: {
      "@type": "Organization",
      name: "Free Biodata Makers",
    },
    blogPost: blogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.description,
      datePublished: new Date(blog.date).toISOString(),
      author: {
        "@type": "Person",
        name: blog.author,
      },
      url: `https://www.freebiodatamakers.com/blog/${blog.slug}`,
    })),
  };

  return (
    <main className="min-h-screen bg-stone-50/50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaMarkup),
        }}
      />

      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-b from-orange-50 to-white px-6 py-16 text-center sm:py-24">
        <div className="mx-auto max-w-4xl">
          <p className="inline-block rounded-full bg-orange-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-700">
            Resource Center
          </p>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Marriage Biodata Tips & Guides
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
            Discover professionally researched biodata formats,
            cultural tips, design insights, and step-by-step
            guidelines to craft your perfect marriage profile.
          </p>

          <Link
            href="/biodata"
            className="mt-8 inline-block rounded-xl bg-orange-600 px-6 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-orange-700 hover:shadow-lg"
          >
            Start Biodata Maker
          </Link>
        </div>
      </header>

      {/* Blog Articles */}
      <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        {/* Category Filters */}
        <div className="mb-10 flex flex-wrap gap-2 border-b border-gray-200 pb-5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === cat
                  ? "bg-orange-600 text-white shadow"
                  : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Latest Articles ({filteredBlogs.length})
          </h2>
        </div>

        {/* Article Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.slug}
              className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <div className="flex items-center gap-3 text-xs font-semibold text-gray-500">
                  <span className="rounded bg-orange-50 px-2 py-1 font-bold uppercase tracking-wider text-orange-600">
                    {blog.category}
                  </span>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>

                <h3 className="mt-4 text-xl font-bold leading-tight text-gray-900">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="transition hover:text-orange-600"
                  >
                    {blog.title}
                  </Link>
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {blog.description}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="text-xs text-gray-500">
                  <p className="font-bold text-gray-800">
                    {blog.author}
                  </p>
                  <p className="mt-0.5">{blog.date}</p>
                </div>

                <Link
                  href={`/blog/${blog.slug}`}
                  className="text-xs font-bold uppercase tracking-wider text-orange-600 hover:text-orange-700 hover:underline"
                >
                  Read Article →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <p className="py-12 text-center text-gray-500">
            No articles found.
          </p>
        )}
      </section>
    </main>
  );
}
