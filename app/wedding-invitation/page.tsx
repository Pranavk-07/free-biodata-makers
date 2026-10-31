
"use client";

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

type Language = "en" | "hi" | "mr";
type Template = "royal" | "modern" | "floral" | "classic";

type InvitationData = {
  bride: string;
  groom: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  family: string;
  message: string;
};

const translations = {
  en: {
    title: "Wedding Invitation Maker",
    subtitle: "Create a beautiful wedding invitation in minutes.",
    language: "Language",
    details: "Wedding Details",
    bride: "Bride's Name",
    groom: "Groom's Name",
    date: "Wedding Date",
    time: "Wedding Time",
    venue: "Venue Name",
    address: "Venue Address",
    family: "Invited By / Family Names",
    message: "Invitation Message",
    designs: "Choose Your Design",
    preview: "Live Preview",
    downloadPng: "Download PNG",
    downloadPdf: "Download PDF",
    invite: "Together with their families",
    request: "Request the pleasure of your company",
    marriage: "at the celebration of their wedding",
    blessings: "Your presence and blessings will make our day special.",
    dateLabel: "DATE",
    timeLabel: "TIME",
    venueLabel: "VENUE",
    hostLabel: "WITH BEST WISHES FROM",
    templates: {
      royal: "Traditional Royal",
      modern: "Modern Minimal",
      floral: "Floral Elegant",
      classic: "Classic Indian",
    },
    loading: "Preparing...",
  },
  hi: {
    title: "शादी निमंत्रण निर्माता",
    subtitle: "कुछ ही मिनटों में सुंदर शादी का निमंत्रण बनाएं।",
    language: "भाषा",
    details: "शादी का विवरण",
    bride: "दुल्हन का नाम",
    groom: "दूल्हे का नाम",
    date: "शादी की तारीख",
    time: "शादी का समय",
    venue: "कार्यक्रम स्थल",
    address: "कार्यक्रम का पता",
    family: "परिवार के नाम",
    message: "निमंत्रण संदेश",
    designs: "डिजाइन चुनें",
    preview: "लाइव प्रीव्यू",
    downloadPng: "PNG डाउनलोड करें",
    downloadPdf: "PDF डाउनलोड करें",
    invite: "अपने परिवारों के साथ",
    request: "आपको सादर आमंत्रित करते हैं",
    marriage: "उनके विवाह समारोह में",
    blessings: "आपकी उपस्थिति और आशीर्वाद हमारे दिन को खास बनाएंगे।",
    dateLabel: "तारीख",
    timeLabel: "समय",
    venueLabel: "स्थान",
    hostLabel: "सादर आमंत्रण",
    templates: {
      royal: "शाही पारंपरिक",
      modern: "आधुनिक",
      floral: "फूलों वाला",
      classic: "क्लासिक भारतीय",
    },
    loading: "तैयार हो रहा है...",
  },
  mr: {
    title: "लग्नपत्रिका निर्माता",
    subtitle: "काही मिनिटांत सुंदर लग्नपत्रिका तयार करा.",
    language: "भाषा",
    details: "लग्नाची माहिती",
    bride: "वधूचे नाव",
    groom: "वराचे नाव",
    date: "लग्नाची तारीख",
    time: "लग्नाची वेळ",
    venue: "कार्यस्थळाचे नाव",
    address: "कार्यस्थळाचा पत्ता",
    family: "कुटुंबातील नावे",
    message: "निमंत्रण संदेश",
    designs: "डिझाइन निवडा",
    preview: "लाइव्ह प्रीव्ह्यू",
    downloadPng: "PNG डाउनलोड करा",
    downloadPdf: "PDF डाउनलोड करा",
    invite: "आपल्या कुटुंबीयांसह",
    request: "आपणास सस्नेह आमंत्रित करीत आहोत",
    marriage: "त्यांच्या शुभविवाह सोहळ्यास",
    blessings: "आपली उपस्थिती आणि आशीर्वाद आमच्यासाठी अनमोल आहेत.",
    dateLabel: "तारीख",
    timeLabel: "वेळ",
    venueLabel: "स्थळ",
    hostLabel: "शुभेच्छुक",
    templates: {
      royal: "शाही पारंपरिक",
      modern: "आधुनिक",
      floral: "फुलांची सजावट",
      classic: "क्लासिक भारतीय",
    },
    loading: "तयार होत आहे...",
  },
};

const templateStyles = {
  royal: {
    background: "#651c2c",
    color: "#f9e4a8",
    accent: "#d8b45a",
    border: "#d8b45a",
    font: "Georgia, serif",
    heading: "Royal Celebration",
  },
  modern: {
    background: "#f7f3ec",
    color: "#23364b",
    accent: "#9b7852",
    border: "#c9bda9",
    font: "Arial, sans-serif",
    heading: "A Beautiful Beginning",
  },
  floral: {
    background: "#fff0f2",
    color: "#713d50",
    accent: "#bd7e91",
    border: "#dca7b5",
    font: "Georgia, serif",
    heading: "A Blooming Love Story",
  },
  classic: {
    background: "#fff5dc",
    color: "#773b18",
    accent: "#b66b25",
    border: "#c58a3e",
    font: "Georgia, serif",
    heading: "शुभ विवाह",
  },
};

export default function WeddingInvitationPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [template, setTemplate] = useState<Template>("royal");
  const [loading, setLoading] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);

  const previewRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<InvitationData>({
    bride: "Priya",
    groom: "Rahul",
    date: "2027-02-14",
    time: "10:30 AM",
    venue: "The Grand Celebration Hall",
    address: "Karad, Maharashtra",
    family: "With love and blessings from our families",
    message: "We warmly invite you to join us and bless the newly married couple.",
  });

  const t = translations[language];
  const style = templateStyles[template];

  useEffect(() => {
    const container = previewContainerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      setPreviewScale(Math.min(1, entries[0].contentRect.width / 794));
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  function updateField(field: keyof InvitationData, value: string) {
    setData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function formatDate(value: string) {
    if (!value) return "Your Special Day";

    const date = new Date(`${value}T00:00:00`);

    return date.toLocaleDateString(
      language === "en" ? "en-IN" : language === "hi" ? "hi-IN" : "mr-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  }

  async function generateImage() {
    if (!previewRef.current) {
      throw new Error("Invitation preview is not available.");
    }

    await document.fonts.ready;

    return toPng(previewRef.current, {
      pixelRatio: 2,
      backgroundColor: style.background,
      width: 794,
      height: 1123,
      style: {
        transform: "none",
        transformOrigin: "top left",
        margin: "0",
      },
    });
  }

  async function downloadPNG() {
    try {
      setLoading(true);
      const image = await generateImage();

      const link = document.createElement("a");
      link.download = "wedding-invitation.png";
      link.href = image;
      link.click();
    } catch (error) {
      console.error(error);
      alert("Unable to download PNG. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function downloadPDF() {
    try {
      setLoading(true);
      const image = await generateImage();

      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(image, "PNG", 0, 0, 210, 297, undefined, "FAST");
      pdf.save("wedding-invitation.pdf");
    } catch (error) {
      console.error(error);
      alert("Unable to download PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const fields: {
    key: keyof InvitationData;
    label: string;
    type?: string;
    multiline?: boolean;
  }[] = [
    { key: "bride", label: t.bride },
    { key: "groom", label: t.groom },
    { key: "date", label: t.date, type: "date" },
    { key: "time", label: t.time },
    { key: "venue", label: t.venue },
    { key: "address", label: t.address },
    { key: "family", label: t.family },
    { key: "message", label: t.message, multiline: true },
  ];

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-8 text-stone-800">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-rose-900 sm:text-4xl">
            {t.title}
          </h1>
          <p className="mt-2 text-stone-600">{t.subtitle}</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form section */}
          <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-6">
              <label className="mb-2 block font-semibold">{t.language}</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full rounded-lg border border-stone-300 p-3 outline-none focus:border-rose-600"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="mr">मराठी</option>
              </select>
            </div>

            <h2 className="mb-5 text-xl font-bold">{t.details}</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <div
                  key={field.key}
                  className={field.multiline ? "sm:col-span-2" : ""}
                >
                  <label className="mb-1.5 block text-sm font-medium">
                    {field.label}
                  </label>

                  {field.multiline ? (
                    <textarea
                      value={data[field.key]}
                      onChange={(e) =>
                        updateField(field.key, e.target.value)
                      }
                      rows={3}
                      className="w-full rounded-lg border border-stone-300 p-3 outline-none focus:border-rose-600"
                    />
                  ) : (
                    <input
                      type={field.type || "text"}
                      value={data[field.key]}
                      onChange={(e) =>
                        updateField(field.key, e.target.value)
                      }
                      className="w-full rounded-lg border border-stone-300 p-3 outline-none focus:border-rose-600"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="mb-4 text-xl font-bold">{t.designs}</h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {(
                  ["royal", "modern", "floral", "classic"] as Template[]
                ).map((item) => (
                  <button
                    key={item}
                    onClick={() => setTemplate(item)}
                    className={`min-h-14 rounded-xl border-2 px-3 py-3 text-center text-sm font-semibold leading-tight transition ${
                      template === item
                        ? "border-rose-700 bg-rose-50 text-rose-900"
                        : "border-stone-200 hover:border-rose-300"
                    }`}
                  >
                    {t.templates[item]}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                onClick={downloadPNG}
                disabled={loading}
                className="rounded-xl bg-rose-800 px-5 py-3 font-semibold text-white hover:bg-rose-900 disabled:opacity-60"
              >
                {loading ? t.loading : t.downloadPng}
              </button>

              <button
                onClick={downloadPDF}
                disabled={loading}
                className="rounded-xl bg-stone-800 px-5 py-3 font-semibold text-white hover:bg-stone-900 disabled:opacity-60"
              >
                {loading ? t.loading : t.downloadPdf}
              </button>
            </div>
          </section>

          {/* Preview section */}
          <section>
            <h2 className="mb-4 text-xl font-bold">{t.preview}</h2>

            <div
              ref={previewContainerRef}
              className="w-full overflow-hidden rounded-xl bg-stone-200 p-2 sm:p-4"
            >
              <div
                className="mx-auto"
                style={{
                  width: 794 * previewScale,
                  height: 1123 * previewScale,
                }}
              >
                <div
                  ref={previewRef}
                  style={{
                    width: 794,
                    height: 1123,
                    transform: `scale(${previewScale})`,
                    transformOrigin: "top left",
                    background: style.background,
                    color: style.color,
                    fontFamily: style.font,
                    padding: "42px",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    className="flex h-full flex-col items-center justify-center text-center"
                    style={{
                      border: `5px double ${style.border}`,
                      outline: `1px solid ${style.accent}`,
                      outlineOffset: "-16px",
                      padding: "45px",
                    }}
                  >
                     
                     <div
  style={{
    color: style.accent,
    fontSize: "25px",
    letterSpacing: "5px",
    marginBottom: "45px",
    marginTop: "20px",
  }}
>
  ✦ ❀ ✦
</div>

<p
  style={{
    fontSize: "25px",
    letterSpacing: "2px",
    marginBottom: "24px",
    lineHeight: 1.5,
    padding: "0 10px",
  }}
>
  {style.heading}
</p>
                     
                     
                     
                     
                     
                     
                     
                     

                     
                     
                     
                     
                     
                     
                     
                     
                     

                    <p style={{ fontSize: "23px", marginBottom: "12px" }}>
                      {t.invite}
                    </p>

                    <p style={{ fontSize: "22px", marginBottom: "45px" }}>
                      {t.request}
                    </p>

                    <h2
                      style={{
                        fontSize: "55px",
                        fontWeight: "bold",
                        lineHeight: 1.2,
                        marginBottom: "12px",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {data.bride || "Bride"}
                    </h2>

                    <p
                      style={{
                        fontSize: "35px",
                        color: style.accent,
                        margin: "10px 0",
                      }}
                    >
                      &
                    </p>

                    <h2
                      style={{
                        fontSize: "55px",
                        fontWeight: "bold",
                        lineHeight: 1.2,
                        marginBottom: "35px",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {data.groom || "Groom"}
                    </h2>

                    <p style={{ fontSize: "23px", marginBottom: "40px" }}>
                      {t.marriage}
                    </p>

                    <div
                      style={{
                        width: "100%",
                        borderTop: `2px solid ${style.accent}`,
                        borderBottom: `2px solid ${style.accent}`,
                        padding: "25px 10px",
                        marginBottom: "35px",
                      }}
                    >
                      <p
                        style={{
                          color: style.accent,
                          fontSize: "18px",
                          letterSpacing: "3px",
                          marginBottom: "10px",
                        }}
                      >
                        {t.dateLabel}
                      </p>

                      <p style={{ fontSize: "27px", marginBottom: "25px" }}>
                        {formatDate(data.date)}
                      </p>

                      <p
                        style={{
                          color: style.accent,
                          fontSize: "18px",
                          letterSpacing: "3px",
                          marginBottom: "10px",
                        }}
                      >
                        {t.timeLabel}
                      </p>

                      <p style={{ fontSize: "25px", marginBottom: "25px" }}>
                        {data.time || "Time to be announced"}
                      </p>

                      <p
                        style={{
                          color: style.accent,
                          fontSize: "18px",
                          letterSpacing: "3px",
                          marginBottom: "10px",
                        }}
                      >
                        {t.venueLabel}
                      </p>

                      <p style={{ fontSize: "26px", fontWeight: "bold" }}>
                        {data.venue || "Wedding Venue"}
                      </p>

                      <p style={{ fontSize: "21px", marginTop: "8px" }}>
                        {data.address}
                      </p>
                    </div>

                    <p
                      style={{
                        fontSize: "21px",
                        lineHeight: 1.5,
                        maxWidth: "550px",
                        marginBottom: "25px",
                      }}
                    >
                      {data.message || t.blessings}
                    </p>

                    <p
                      style={{
                        color: style.accent,
                        fontSize: "17px",
                        letterSpacing: "2px",
                        marginBottom: "12px",
                      }}
                    >
                      {t.hostLabel}
                    </p>

                    <p
                      style={{
                        fontSize: "21px",
                        maxWidth: "550px",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {data.family}
                    </p>

                    <div
                      style={{
                        color: style.accent,
                        fontSize: "25px",
                        letterSpacing: "5px",
                        marginTop: "35px",
                      }}
                    >
                      ✦ ❀ ✦
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
