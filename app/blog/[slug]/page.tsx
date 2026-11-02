
import Link from "next/link";
import { notFound } from "next/navigation";

type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

type Article = {
  title: string;
  description: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  blocks: ContentBlock[];
};

const articles: Record<string, Article> = {
  "create-marriage-biodata-online": {
    title: "How to Create Marriage Biodata Online for Free",
    description:
      "Learn how to create a professional marriage biodata online with personal details, family information and an attractive design.",
    category: "Guides",
    author: "Aditi Patil",
    publishDate: "May 15, 2024",
    readTime: "5 min read",
    blocks: [
      {
        type: "paragraph",
        text: "A marriage biodata is an important document that introduces you and your family to potential life partners. It contains personal information, educational qualifications, professional details and family background.",
      },
      {
        type: "heading",
        text: "1. Organize Your Personal Details",
      },
      {
        type: "paragraph",
        text: "Before creating your biodata, collect all your important information. This makes the process easier and helps you avoid missing important details.",
      },
      {
        type: "list",
        items: [
          "Full name and date of birth.",
          "Height and mother tongue.",
          "Education and professional qualifications.",
          "Occupation and annual income, if you wish to include them.",
          "Hobbies and personal interests.",
        ],
      },
      {
        type: "heading",
        text: "2. Add Your Family Information",
      },
      {
        type: "paragraph",
        text: "Family background is an important section of many Indian marriage biodata formats. Include information about your parents, siblings, family occupation and hometown.",
      },
      {
        type: "heading",
        text: "3. Choose a Professional Biodata Template",
      },
      {
        type: "paragraph",
        text: "Choose a clean and readable design. Traditional floral, elegant gold and modern minimal templates are popular choices. Make sure the information is properly aligned.",
      },
      {
        type: "heading",
        text: "4. Add Your Photograph",
      },
      {
        type: "paragraph",
        text: "A clear and recent photograph can make your biodata more personal. Choose a good-quality image with appropriate lighting.",
      },
      {
        type: "heading",
        text: "5. Download Your Biodata",
      },
      {
        type: "paragraph",
        text: "Review all the information carefully before downloading. Check spelling, contact details and formatting. Save your final biodata as a PDF for easy sharing.",
      },
    ],
  },

  "marriage-biodata-format-for-boys": {
    title: "Marriage Biodata Format for Boys",
    description:
      "Explore the essential information and professional layouts for creating a marriage biodata for boys.",
    category: "Biodata Formats",
    author: "Rohan Deshmukh",
    publishDate: "June 02, 2024",
    readTime: "4 min read",
    blocks: [
      {
        type: "paragraph",
        text: "A marriage biodata for boys should provide a clear introduction to personal information, education, career and family background. A well-organized format makes it easier for families to understand the profile.",
      },
      {
        type: "heading",
        text: "1. Personal Information",
      },
      {
        type: "list",
        items: [
          "Full name.",
          "Date of birth and age.",
          "Height and mother tongue.",
          "Religion and community, if relevant.",
          "Hobbies and interests.",
        ],
      },
      {
        type: "heading",
        text: "2. Educational Qualifications",
      },
      {
        type: "paragraph",
        text: "Mention your highest qualification, college or university and other relevant academic achievements.",
      },
      {
        type: "heading",
        text: "3. Professional Details",
      },
      {
        type: "list",
        items: [
          "Current occupation.",
          "Company or business name.",
          "Job location.",
          "Annual income, if comfortable sharing.",
        ],
      },
      {
        type: "heading",
        text: "4. Family Background",
      },
      {
        type: "paragraph",
        text: "Include your parents' names and occupations, siblings' details and family location. Keep the information accurate and concise.",
      },
      {
        type: "heading",
        text: "5. Partner Expectations",
      },
      {
        type: "paragraph",
        text: "Describe your expectations respectfully. Focus on compatibility, shared values, education or other qualities that matter to you.",
      },
    ],
  },

  "marriage-biodata-format-for-girls": {
    title: "Marriage Biodata Format for Girls",
    description:
      "Learn how to prepare an elegant and professional marriage biodata for girls with the right details.",
    category: "Biodata Formats",
    author: "Neha Sharma",
    publishDate: "June 08, 2024",
    readTime: "4 min read",
    blocks: [
      {
        type: "paragraph",
        text: "A marriage biodata for girls introduces personal details, educational achievements, career information and family background. The design should be attractive, simple and easy to read.",
      },
      {
        type: "heading",
        text: "1. Personal Details",
      },
      {
        type: "list",
        items: [
          "Full name and date of birth.",
          "Height and mother tongue.",
          "Religion and community, if relevant.",
          "Hobbies and interests.",
        ],
      },
      {
        type: "heading",
        text: "2. Education and Career",
      },
      {
        type: "paragraph",
        text: "Mention your educational qualifications, college or university, current profession and career achievements.",
      },
      {
        type: "heading",
        text: "3. Family Background",
      },
      {
        type: "paragraph",
        text: "Include information about your parents, siblings, family occupation and hometown. Keep the information clear and organized.",
      },
      {
        type: "heading",
        text: "4. About Me",
      },
      {
        type: "paragraph",
        text: "Write a short introduction about your personality, hobbies, interests and values. Keep it genuine and positive.",
      },
      {
        type: "heading",
        text: "5. Partner Expectations",
      },
      {
        type: "paragraph",
        text: "Mention the qualities you value in a potential partner, such as mutual respect, understanding, compatibility and shared goals.",
      },
    ],
  },

  "marathi-marriage-biodata-format": {
    title: "Marathi Marriage Biodata Format",
    description:
      "Learn how to create a traditional Marathi marriage biodata with personal details, family information and cultural elements.",
    category: "Regional Formats",
    author: "Vikas Joshi",
    publishDate: "June 12, 2024",
    readTime: "6 min read",
    blocks: [
      {
        type: "paragraph",
        text: "A Marathi marriage biodata, commonly called लग्नाचा बायोडाटा, introduces a person's personal details, family background and educational qualifications. It may also include traditional information used by families.",
      },
      {
        type: "heading",
        text: "1. वैयक्तिक माहिती (Personal Information)",
      },
      {
        type: "list",
        items: [
          "पूर्ण नाव (Full Name).",
          "जन्म तारीख आणि जन्म वेळ (Date and Time of Birth).",
          "उंची (Height).",
          "मातृभाषा (Mother Tongue).",
          "शिक्षण (Education).",
          "व्यवसाय (Occupation).",
        ],
      },
      {
        type: "heading",
        text: "2. कौटुंबिक माहिती (Family Details)",
      },
      {
        type: "paragraph",
        text: "Include your father's and mother's names, their occupations, siblings' information and family location.",
      },
      {
        type: "heading",
        text: "3. पारंपरिक माहिती (Traditional Details)",
      },
      {
        type: "list",
        items: [
          "गोत्र (Gotra), if applicable.",
          "रास (Rashi).",
          "नक्षत्र (Nakshatra).",
          "देवक (Devak), if applicable.",
          "मूळ गाव (Native Place).",
        ],
      },
      {
        type: "heading",
        text: "4. शिक्षण आणि व्यवसाय",
      },
      {
        type: "paragraph",
        text: "Mention your educational qualifications, current occupation, employer or business details and professional achievements.",
      },
      {
        type: "heading",
        text: "5. अपेक्षा (Partner Expectations)",
      },
      {
        type: "paragraph",
        text: "Describe your expectations in a respectful manner. Focus on compatibility, values, understanding and shared goals.",
      },
    ],
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    return {
      title: "Article Not Found | Free Biodata Makers",
    };
  }

  return {
    title: `${article.title} | Free Biodata Makers`,
    description: article.description,
    alternates: {
      canonical: `https://www.freebiodatamakers.com/blog/${slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: `https://www.freebiodatamakers.com/blog/${slug}`,
    },
  };
}

export default async function BlogArticle({ params }: Props) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    notFound();
  }

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: new Date(article.publishDate).toISOString(),
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Free Biodata Makers",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.freebiodatamakers.com/blog/${slug}`,
    },
  };

  return (
    <main className="min-h-screen bg-stone-50/30 px-6 py-12 text-stone-800 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaMarkup),
        }}
      />

      <article className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 hover:underline"
        >
          ← Back to Blog
        </Link>

        <div className="mt-6">
          <span className="rounded bg-orange-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-600">
            {article.category}
          </span>
        </div>

        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-gray-950 sm:text-4xl">
          {article.title}
        </h1>

        <p className="mt-4 text-base leading-relaxed text-gray-600">
          {article.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-gray-100 py-3 text-xs text-gray-500">
          <div>
            By{" "}
            <span className="font-bold text-gray-800">
              {article.author}
            </span>
          </div>

          <div className="flex gap-3">
            <span>{article.publishDate}</span>
            <span>•</span>
            <span>{article.readTime}</span>
          </div>
        </div>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-gray-700 sm:text-lg sm:leading-loose">
          {article.blocks.map((block, index) => {
            if (block.type === "paragraph") {
              return <p key={index}>{block.text}</p>;
            }

            if (block.type === "heading") {
              return (
                <h2
                  key={index}
                  className="mt-8 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl"
                >
                  {block.text}
                </h2>
              );
            }

            if (block.type === "list") {
              return (
                <ul
                  key={index}
                  className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-600 sm:text-base"
                >
                  {block.items.map((item, itemIndex) => (
                    <li key={itemIndex}>{item}</li>
                  ))}
                </ul>
              );
            }

            return null;
          })}
        </div>

        {/* Create Biodata CTA */}
        <div className="mt-12 rounded-2xl border border-orange-200/60 bg-gradient-to-br from-orange-50 to-orange-100/50 p-6 text-center sm:p-10">
          <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
            Create Your Professional Biodata
          </h2>

          <p className="mt-3 text-sm text-gray-600 sm:text-base">
            Create a beautiful marriage biodata in minutes
            and download it easily.
          </p>

          <Link
            href="/biodata"
            className="mt-6 inline-block rounded-xl bg-orange-600 px-8 py-3.5 text-sm font-bold text-white shadow transition hover:bg-orange-700"
          >
            Create Biodata For Free
          </Link>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-6">
          <Link
            href="/blog"
            className="font-semibold text-orange-600 hover:underline"
          >
            ← Explore More Articles
          </Link>
        </div>
      </article>
    </main>
  );
}
