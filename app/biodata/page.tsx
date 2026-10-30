
"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

type Biodata = {
  name: string;
  dob: string;
  height: string;
  religion: string;
  caste: string;
  motherTongue: string;
  education: string;
  occupation: string;
  income: string;
  fatherName: string;
  motherName: string;
  siblings: string;
  address: string;
  phone: string;
  about: string;
  partner: string;
};

const initialData: Biodata = {
  name: "Your Name",
  dob: "",
  height: "",
  religion: "",
  caste: "",
  motherTongue: "",
  education: "",
  occupation: "",
  income: "",
  fatherName: "",
  motherName: "",
  siblings: "",
  address: "",
  phone: "",
  about: "",
  partner: "",
};

const templates = [
  { id: "classic", name: "Classic", color: "#9a6b2f" },
  { id: "modern", name: "Modern", color: "#24476b" },
  { id: "traditional", name: "Traditional", color: "#9f343e" },
];

export default function BiodataMaker() {
  const [data, setData] = useState<Biodata>(initialData);
  const [photo, setPhoto] = useState("");
  const [template, setTemplate] = useState("classic");
  const [downloading, setDownloading] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);

  const theme = templates.find((t) => t.id === template)!;

  function updateField(field: keyof Biodata, value: string) {
    setData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function uploadPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Please select an image smaller than 5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(reader.result as string);
    };

    reader.readAsDataURL(file);
  }

  async function downloadImage() {
    if (!previewRef.current) return;

    try {
      setDownloading(true);

      const image = await toPng(previewRef.current, {
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const link = document.createElement("a");
      link.download = "my-marriage-biodata.png";
      link.href = image;
      link.click();
    } catch (error) {
      console.error(error);
      alert("Unable to generate image. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  async function downloadPDF() {
    if (!previewRef.current) return;

    try {
      setDownloading(true);

      const image = await toPng(previewRef.current, {
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });

      const pdf = new jsPDF("p", "mm", "a4");

      pdf.addImage(image, "PNG", 0, 0, 210, 297);
      pdf.save("my-marriage-biodata.pdf");
    } catch (error) {
      console.error(error);
      alert("Unable to generate PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  const sections = [
    {
      title: "Personal Details",
      fields: [
        ["name", "Full Name"],
        ["dob", "Date of Birth"],
        ["height", "Height"],
        ["religion", "Religion"],
        ["caste", "Caste / Community"],
        ["motherTongue", "Mother Tongue"],
      ],
    },
    {
      title: "Education & Career",
      fields: [
        ["education", "Education"],
        ["occupation", "Occupation"],
        ["income", "Annual Income"],
      ],
    },
    {
      title: "Family Details",
      fields: [
        ["fatherName", "Father's Name"],
        ["motherName", "Mother's Name"],
        ["siblings", "Brothers / Sisters"],
      ],
    },
    {
      title: "Contact Details",
      fields: [
        ["address", "Address"],
        ["phone", "Mobile Number"],
      ],
    },
  ] as const;

  return (
    <main className="min-h-screen bg-[#fffaf5] text-stone-800">
      <header className="border-b bg-white px-5 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="text-xl font-extrabold">
            FreeBiodata<span className="text-orange-600">Makers</span>
          </a>

          <a href="/" className="text-sm font-semibold text-orange-600">
            ← Back Home
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-10 text-center">
          <p className="font-bold uppercase tracking-widest text-orange-600">
            Free Online Tool
          </p>

          <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">
            Marriage Biodata Maker
          </h1>

          <p className="mt-3 text-stone-500">
            Create your professional marriage biodata in minutes.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-2">

          {/* LEFT: FORM */}

          <section className="rounded-2xl border border-orange-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold">Enter Your Details</h2>

            <p className="mt-1 text-sm text-stone-500">
              Fill in your information. Your preview updates automatically.
            </p>

            {/* Photo Upload */}

            <div className="mt-7">
              <label className="mb-2 block font-semibold">
                Profile Photograph
              </label>

              <div className="flex items-center gap-4">
                {photo ? (
                  <img
                    src={photo}
                    alt="Profile preview"
                    className="h-20 w-20 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-orange-50 text-3xl">
                    📷
                  </div>
                )}

                <label className="cursor-pointer rounded-lg border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-50">
                  Upload Photo
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={uploadPhoto}
                  />
                </label>

                {photo && (
                  <button
                    onClick={() => setPhoto("")}
                    className="text-sm text-red-500"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>

            {/* Input Fields */}

            {sections.map((section) => (
              <div key={section.title} className="mt-8">
                <h3 className="mb-4 border-b pb-2 text-lg font-bold text-orange-700">
                  {section.title}
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  {section.fields.map(([field, label]) => (
                    <div key={field}>
                      <label className="mb-1 block text-sm font-medium">
                        {label}
                      </label>

                      <input
                        type={field === "dob" ? "date" : "text"}
                        value={data[field]}
                        onChange={(e) =>
                          updateField(field, e.target.value)
                        }
                        placeholder={`Enter ${label.toLowerCase()}`}
                        className="w-full rounded-lg border border-stone-200 px-3 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Additional Information */}

            <div className="mt-8">
              <h3 className="mb-4 border-b pb-2 text-lg font-bold text-orange-700">
                Additional Information
              </h3>

              <label className="mb-2 block text-sm font-medium">
                About Yourself
              </label>

              <textarea
                value={data.about}
                onChange={(e) => updateField("about", e.target.value)}
                rows={3}
                placeholder="Write a few lines about yourself..."
                className="w-full rounded-lg border border-stone-200 p-3 text-sm outline-none focus:border-orange-500"
              />

              <label className="mb-2 mt-5 block text-sm font-medium">
                Partner Expectations
              </label>

              <textarea
                value={data.partner}
                onChange={(e) => updateField("partner", e.target.value)}
                rows={3}
                placeholder="Describe your partner preferences..."
                className="w-full rounded-lg border border-stone-200 p-3 text-sm outline-none focus:border-orange-500"
              />
            </div>

            {/* Template Selection */}

            <div className="mt-8">
              <h3 className="mb-4 text-lg font-bold">
                Choose Your Template
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {templates.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setTemplate(item.id)}
                    className={`rounded-xl border-2 p-3 text-sm font-bold transition ${
                      template === item.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-stone-200 hover:border-orange-300"
                    }`}
                  >
                    <span
                      className="mx-auto mb-2 block h-8 w-8 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

          </section>

          {/* RIGHT: LIVE PREVIEW */}

          <section className="min-w-0">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Live Preview</h2>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                LIVE
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl bg-stone-200 p-3 sm:p-5">
              <div
                ref={previewRef}
                className="mx-auto min-h-[1123px] w-[794px] bg-white p-12"
                style={{
                  fontFamily: "Georgia, serif",
                  borderTop: `12px solid ${theme.color}`,
                  color: "#292524",
                }}
              >
                <div
                  className="min-h-[1020px] border-2 p-8"
                  style={{ borderColor: theme.color }}
                >
                  <div className="text-center">
                    <h2
                      className="text-3xl font-bold uppercase tracking-widest"
                      style={{ color: theme.color }}
                    >
                      Marriage Biodata
                    </h2>

                    <p className="mt-3 text-sm text-stone-500">
                      Personal & Family Profile
                    </p>

                    <div
                      className="mx-auto mt-5 h-1 w-24"
                      style={{ backgroundColor: theme.color }}
                    />
                  </div>

                  <div className="mt-10 flex items-start gap-6">
                    <div className="flex-1">
                      <h1
                        className="break-words text-3xl font-bold"
                        style={{ color: theme.color }}
                      >
                        {data.name || "Your Name"}
                      </h1>

                      <p className="mt-3 text-sm text-stone-500">
                        Marriage Profile
                      </p>
                    </div>

                    {photo && (
                      <img
                        src={photo}
                        alt="Profile"
                        className="h-36 w-28 object-cover"
                      />
                    )}
                  </div>

                  {[
                    {
                      title: "PERSONAL INFORMATION",
                      rows: [
                        ["Date of Birth", data.dob],
                        ["Height", data.height],
                        ["Religion", data.religion],
                        ["Caste / Community", data.caste],
                        ["Mother Tongue", data.motherTongue],
                      ],
                    },
                    {
                      title: "EDUCATION & CAREER",
                      rows: [
                        ["Education", data.education],
                        ["Occupation", data.occupation],
                        ["Annual Income", data.income],
                      ],
                    },
                    {
                      title: "FAMILY INFORMATION",
                      rows: [
                        ["Father's Name", data.fatherName],
                        ["Mother's Name", data.motherName],
                        ["Siblings", data.siblings],
                      ],
                    },
                    {
                      title: "CONTACT INFORMATION",
                      rows: [
                        ["Address", data.address],
                        ["Mobile Number", data.phone],
                      ],
                    },
                  ].map((section) => (
                    <div key={section.title} className="mt-9">
                      <h3
                        className="border-b-2 pb-2 text-lg font-bold"
                        style={{ borderColor: theme.color, color: theme.color }}
                      >
                        {section.title}
                      </h3>

                      <div className="mt-4 space-y-3">
                        {section.rows.map(([label, value]) => (
                          <div
                            key={label}
                            className="grid grid-cols-[180px_1fr] gap-3 text-sm"
                          >
                            <span className="font-bold">{label}</span>
                            <span className="break-words">
                              {value || "—"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                  {[
                    ["ABOUT ME", data.about],
                    ["PARTNER EXPECTATIONS", data.partner],
                  ].map(([title, value]) => (
                    <div key={title} className="mt-8">
                      <h3
                        className="border-b-2 pb-2 text-lg font-bold"
                        style={{ borderColor: theme.color, color: theme.color }}
                      >
                        {title}
                      </h3>

                      <p className="mt-3 whitespace-pre-wrap text-sm leading-7">
                        {value || "—"}
                      </p>
                    </div>
                  ))}

                  <div className="mt-12 text-center">
                    <div
                      className="mx-auto h-1 w-24"
                      style={{ backgroundColor: theme.color }}
                    />
                    <p className="mt-4 text-xs text-stone-400">
                      Marriage Biodata
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Buttons */}

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                onClick={downloadImage}
                disabled={downloading}
                className="rounded-xl bg-orange-600 px-4 py-4 font-bold text-white hover:bg-orange-700 disabled:opacity-50"
              >
                Download PNG
              </button>

              <button
                onClick={downloadPDF}
                disabled={downloading}
                className="rounded-xl bg-stone-800 px-4 py-4 font-bold text-white hover:bg-stone-900 disabled:opacity-50"
              >
                Download PDF
              </button>
            </div>

            {downloading && (
              <p className="mt-3 text-center text-sm text-orange-600">
                Preparing your biodata...
              </p>
            )}

            <p className="mt-4 text-center text-xs text-stone-500">
              Your biodata is generated in your browser.
              It is not uploaded to our server.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
