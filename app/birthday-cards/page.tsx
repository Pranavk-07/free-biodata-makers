
"use client";

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

type Language = "en" | "hi" | "mr";
type EventType = "birthday" | "ganesh" | "puja";
type Design = "colorful" | "royal" | "floral" | "traditional";

type CardData = {
  name: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  host: string;
  message: string;
};

const translations = {
  en: {
    title: "Birthday & Puja Card Maker",
    subtitle: "Create beautiful invitations for your special celebrations.",
    language: "Language",
    event: "Select Event",
    birthday: "Birthday Party",
    ganesh: "Ganesh Chaturthi",
    puja: "Puja Ceremony",
    details: "Event Details",
    name: "Name / Person Being Celebrated",
    date: "Date",
    time: "Time",
    venue: "Venue Name",
    address: "Venue Address",
    host: "Hosted By / Family Name",
    message: "Invitation Message",
    designs: "Choose Your Design",
    preview: "Live Preview",
    png: "Download PNG",
    pdf: "Download PDF",
    loading: "Preparing...",
    birthdayTitle: "Birthday Celebration",
    ganeshTitle: "Ganpati Bappa Morya!",
    pujaTitle: "You Are Invited",
    birthdaySubtitle: "Join us to celebrate a special day",
    ganeshSubtitle: "With devotion and joy, we invite you",
    pujaSubtitle: "We cordially invite you to our ceremony",
    nameLabel: "CELEBRATING",
    dateLabel: "DATE",
    timeLabel: "TIME",
    venueLabel: "VENUE",
    hostLabel: "WITH LOVE FROM",
    defaultMessage: "Your presence will make our celebration even more special!",
    templates: {
      colorful: "Colorful Celebration",
      royal: "Royal Elegance",
      floral: "Floral Beauty",
      traditional: "Traditional Indian",
    },
  },
  hi: {
    title: "जन्मदिन और पूजा कार्ड निर्माता",
    subtitle: "अपने खास अवसरों के लिए सुंदर निमंत्रण बनाएं।",
    language: "भाषा",
    event: "कार्यक्रम चुनें",
    birthday: "जन्मदिन समारोह",
    ganesh: "गणेश चतुर्थी",
    puja: "पूजा समारोह",
    details: "कार्यक्रम की जानकारी",
    name: "नाम",
    date: "तारीख",
    time: "समय",
    venue: "कार्यक्रम स्थल",
    address: "पूरा पता",
    host: "आयोजक / परिवार का नाम",
    message: "निमंत्रण संदेश",
    designs: "डिजाइन चुनें",
    preview: "लाइव प्रीव्यू",
    png: "PNG डाउनलोड करें",
    pdf: "PDF डाउनलोड करें",
    loading: "तैयार हो रहा है...",
    birthdayTitle: "जन्मदिन समारोह",
    ganeshTitle: "गणपति बाप्पा मोरया!",
    pujaTitle: "सादर आमंत्रण",
    birthdaySubtitle: "इस खास दिन को हमारे साथ मनाएं",
    ganeshSubtitle: "भक्ति और आनंद के साथ आपका स्वागत है",
    pujaSubtitle: "हम आपको पूजा समारोह में आमंत्रित करते हैं",
    nameLabel: "शुभ अवसर",
    dateLabel: "तारीख",
    timeLabel: "समय",
    venueLabel: "स्थान",
    hostLabel: "सादर",
    defaultMessage: "आपकी उपस्थिति हमारे समारोह को और भी खास बनाएगी!",
    templates: {
      colorful: "रंगीन उत्सव",
      royal: "शाही अंदाज",
      floral: "फूलों की सुंदरता",
      traditional: "पारंपरिक भारतीय",
    },
  },
  mr: {
    title: "वाढदिवस आणि पूजा पत्रिका निर्माता",
    subtitle: "तुमच्या खास प्रसंगांसाठी सुंदर निमंत्रण तयार करा.",
    language: "भाषा",
    event: "कार्यक्रम निवडा",
    birthday: "वाढदिवस समारंभ",
    ganesh: "गणेश चतुर्थी",
    puja: "पूजा समारंभ",
    details: "कार्यक्रमाची माहिती",
    name: "नाव",
    date: "तारीख",
    time: "वेळ",
    venue: "कार्यस्थळ",
    address: "पूर्ण पत्ता",
    host: "आयोजक / कुटुंबाचे नाव",
    message: "निमंत्रण संदेश",
    designs: "डिझाइन निवडा",
    preview: "लाइव्ह प्रीव्ह्यू",
    png: "PNG डाउनलोड करा",
    pdf: "PDF डाउनलोड करा",
    loading: "तयार होत आहे...",
    birthdayTitle: "वाढदिवस समारंभ",
    ganeshTitle: "गणपती बाप्पा मोरया!",
    pujaTitle: "सस्नेह निमंत्रण",
    birthdaySubtitle: "हा खास दिवस आमच्यासोबत साजरा करा",
    ganeshSubtitle: "भक्ती आणि आनंदाने आपले स्वागत आहे",
    pujaSubtitle: "पूजा समारंभासाठी आपणास आमंत्रित करीत आहोत",
    nameLabel: "शुभ प्रसंग",
    dateLabel: "तारीख",
    timeLabel: "वेळ",
    venueLabel: "स्थळ",
    hostLabel: "शुभेच्छुक",
    defaultMessage: "आपली उपस्थिती आमचा आनंद द्विगुणित करेल!",
    templates: {
      colorful: "रंगीत उत्सव",
      royal: "शाही थाट",
      floral: "फुलांची सजावट",
      traditional: "पारंपरिक भारतीय",
    },
  },
};

const designs = {
  colorful: {
    background: "#fff0dc",
    color: "#713b21",
    accent: "#ed783b",
    border: "#ed783b",
    font: "Georgia, serif",
    decoration: "🎉 ✨ 🎈",
  },
  royal: {
    background: "#54213b",
    color: "#f9e5ad",
    accent: "#e3bd69",
    border: "#e3bd69",
    font: "Georgia, serif",
    decoration: "✦ ❖ ✦",
  },
  floral: {
    background: "#fff0f3",
    color: "#743b54",
    accent: "#c77b9c",
    border: "#dca6bc",
    font: "Georgia, serif",
    decoration: "❀ ✿ ❀",
  },
  traditional: {
    background: "#fff3d6",
    color: "#743b17",
    accent: "#b86a20",
    border: "#c58a3e",
    font: "Georgia, serif",
    decoration: "🪔 ✧ 🪔",
  },
};

export default function BirthdayCardsPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [event, setEvent] = useState<EventType>("birthday");
  const [design, setDesign] = useState<Design>("colorful");
  const [loading, setLoading] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);

  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<CardData>({
    name: "Aarav",
    date: "2027-01-15",
    time: "6:00 PM",
    venue: "The Celebration Hall",
    address: "Karad, Maharashtra",
    host: "With love from our family",
    message: "",
  });

  const t = translations[language];
  const style = designs[design];

  const eventTitle = {
    birthday: t.birthdayTitle,
    ganesh: t.ganeshTitle,
    puja: t.pujaTitle,
  }[event];

  const eventSubtitle = {
    birthday: t.birthdaySubtitle,
    ganesh: t.ganeshSubtitle,
    puja: t.pujaSubtitle,
  }[event];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      setPreviewScale(Math.min(1, entries[0].contentRect.width / 794));
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  function updateField(field: keyof CardData, value: string) {
    setData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function formatDate(value: string) {
    if (!value) return "Your Special Day";

    return new Date(`${value}T00:00:00`).toLocaleDateString(
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
      throw new Error("Preview is not available.");
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

      link.download = `${event}-invitation.png`;
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
      pdf.save(`${event}-invitation.pdf`);
    } catch (error) {
      console.error(error);
      alert("Unable to download PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const fields: {
    key: keyof CardData;
    label: string;
    type?: string;
    multiline?: boolean;
  }[] = [
    { key: "name", label: t.name },
    { key: "date", label: t.date, type: "date" },
    { key: "time", label: t.time },
    { key: "venue", label: t.venue },
    { key: "address", label: t.address },
    { key: "host", label: t.host },
    { key: "message", label: t.message, multiline: true },
  ];

  return (
        <main className="min-h-screen bg-stone-50 px-4 py-8 text-stone-800">
  <div className="mx-auto max-w-7xl">

    <div className="mb-6">
      <a
        href="/"
        className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-rose-500 hover:text-rose-700"
      >
        ← Back to Home
      </a>
    </div>
    
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-rose-900 sm:text-4xl">
            {t.title}
          </h1>
          <p className="mt-2 text-stone-600">{t.subtitle}</p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
            <div className="mb-5">
              <label className="mb-2 block font-semibold">{t.language}</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full rounded-lg border border-stone-300 p-3"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="mr">मराठी</option>
              </select>
            </div>

            <div className="mb-6">
              <label className="mb-2 block font-semibold">{t.event}</label>
              <select
                value={event}
                onChange={(e) => setEvent(e.target.value as EventType)}
                className="w-full rounded-lg border border-stone-300 p-3"
              >
                <option value="birthday">{t.birthday}</option>
                <option value="ganesh">{t.ganesh}</option>
                <option value="puja">{t.puja}</option>
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
                      rows={3}
                      value={data[field.key]}
                      onChange={(e) =>
                        updateField(field.key, e.target.value)
                      }
                      placeholder={t.defaultMessage}
                      className="w-full rounded-lg border border-stone-300 p-3"
                    />
                  ) : (
                    <input
                      type={field.type || "text"}
                      value={data[field.key]}
                      onChange={(e) =>
                        updateField(field.key, e.target.value)
                      }
                      className="w-full rounded-lg border border-stone-300 p-3"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h2 className="mb-4 text-xl font-bold">{t.designs}</h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {(
                  ["colorful", "royal", "floral", "traditional"] as Design[]
                ).map((item) => (
                  <button
                    key={item}
                    onClick={() => setDesign(item)}
                    className={`min-h-14 rounded-xl border-2 px-3 py-3 text-center text-sm font-semibold leading-tight ${
                      design === item
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
                {loading ? t.loading : t.png}
              </button>

              <button
                onClick={downloadPDF}
                disabled={loading}
                className="rounded-xl bg-stone-800 px-5 py-3 font-semibold text-white hover:bg-stone-900 disabled:opacity-60"
              >
                {loading ? t.loading : t.pdf}
              </button>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold">{t.preview}</h2>

            <div
              ref={containerRef}
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
                    <p
                      style={{
                        color: style.accent,
                        fontSize: "32px",
                        marginBottom: "35px",
                        marginTop: "20px",
                      }}
                    >
                      {style.decoration}
                    </p>

                    <p
                      style={{
                        fontSize: "43px",
                        fontWeight: "bold",
                        lineHeight: 1.3,
                        marginBottom: "25px",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {eventTitle}
                    </p>

                    <p style={{ fontSize: "23px", marginBottom: "45px" }}>
                      {eventSubtitle}
                    </p>

                    <p
                      style={{
                        color: style.accent,
                        fontSize: "19px",
                        letterSpacing: "3px",
                        marginBottom: "15px",
                      }}
                    >
                      {t.nameLabel}
                    </p>

                    <h2
                      style={{
                        fontSize: "58px",
                        fontWeight: "bold",
                        lineHeight: 1.2,
                        marginBottom: "45px",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {data.name || "Your Name"}
                    </h2>

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
                        {data.venue || "Event Venue"}
                      </p>

                      <p style={{ fontSize: "21px", marginTop: "8px" }}>
                        {data.address}
                      </p>
                    </div>

                    <p
                      style={{
                        fontSize: "22px",
                        lineHeight: 1.5,
                        maxWidth: "550px",
                        marginBottom: "30px",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {data.message || t.defaultMessage}
                    </p>

                    <p
                      style={{
                        color: style.accent,
                        fontSize: "18px",
                        letterSpacing: "3px",
                        marginBottom: "12px",
                      }}
                    >
                      {t.hostLabel}
                    </p>

                    <p
                      style={{
                        fontSize: "22px",
                        maxWidth: "550px",
                        overflowWrap: "anywhere",
                      }}
                    >
                      {data.host}
                    </p>

                    <p
                      style={{
                        color: style.accent,
                        fontSize: "32px",
                        marginTop: "35px",
                      }}
                    >
                      {style.decoration}
                    </p>
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
