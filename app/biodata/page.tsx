 
"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

type Language = "en" | "hi" | "mr";

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

type InfoRow = [string, string];

const initialData: Biodata = {
  name: "", dob: "", height: "", religion: "", caste: "",
  motherTongue: "", education: "", occupation: "", income: "",
  fatherName: "", motherName: "", siblings: "", address: "",
  phone: "", about: "", partner: "",
};

const templates = [
  { id: "classic", name: "Classic Traditional", color: "#9f343e" },
  { id: "royal", name: "Royal Gold", color: "#a67c32" },
  { id: "modern", name: "Modern Professional", color: "#24476b" },
  { id: "floral", name: "Floral Elegant", color: "#c45b83" },
  { id: "minimal", name: "Minimal", color: "#475569" },
];

const translations = {
  en: {
    pageTitle: "Marriage Biodata Maker",
    subtitle: "Create your professional marriage biodata in minutes.",
    formTitle: "Enter Your Details",
    formSubtitle: "Fill in your information. Your preview updates automatically.",
    photo: "Profile Photograph",
    upload: "Upload Photo",
    remove: "Remove",
    personal: "Personal Details",
    educationCareer: "Education & Career",
    family: "Family Details",
    contact: "Contact Details",
    additional: "Additional Information",
    about: "About Yourself",
    partner: "Partner Expectations",
    choose: "Choose Your Template",
    preview: "Live Preview",
    downloadPNG: "Download PNG",
    downloadPDF: "Download PDF",
    preparing: "Preparing your biodata...",
    private: "Your biodata is generated in your browser. It is not uploaded to our server.",
    fullName: "Full Name",
    dob: "Date of Birth",
    height: "Height",
    religion: "Religion",
    caste: "Caste / Community",
    motherTongue: "Mother Tongue",
    educationLabel: "Education",
    occupation: "Occupation",
    income: "Annual Income",
    father: "Father's Name",
    mother: "Mother's Name",
    siblings: "Brothers / Sisters",
    address: "Address",
    phone: "Mobile Number",
    aboutHeading: "ABOUT ME",
    partnerHeading: "PARTNER EXPECTATIONS",
    personalHeading: "PERSONAL INFORMATION",
    careerHeading: "EDUCATION & CAREER",
    familyHeading: "FAMILY INFORMATION",
    contactHeading: "CONTACT INFORMATION",
    marriage: "Marriage Biodata",
    profile: "Personal & Family Profile",
    yourName: "Your Name",
    profileLabel: "Marriage Profile",
    presented: "Presented Profile",
    beginning: "A New Chapter of Life",
    introduction: "Personal Introduction",
    aboutFamily: "A brief introduction about me and my family",
    introducing: "Introducing",
    newBeginning: "A New Beginning, A Beautiful Journey",
    wishes: "WITH BEST WISHES",
    enter: "Enter",
    empty: "—",
    invalidPhoto: "Please select an image file.",
    largePhoto: "Please select an image smaller than 5 MB.",
    imageError: "Unable to generate PNG. Please try again.",
    pdfError: "Unable to generate PDF. Please try again.",
    home: "← Back Home",
    freeTool: "Free Online Tool",
    aBeautifulJourney: "A Beautiful Journey Begins",
  },
  hi: {
    pageTitle: "शादी का बायोडाटा मेकर",
    subtitle: "कुछ ही मिनटों में अपना सुंदर शादी का बायोडाटा बनाएं।",
    formTitle: "अपनी जानकारी भरें",
    formSubtitle: "अपनी जानकारी भरें। आपका प्रीव्यू अपने आप अपडेट होगा।",
    photo: "प्रोफाइल फोटो",
    upload: "फोटो अपलोड करें",
    remove: "हटाएं",
    personal: "व्यक्तिगत जानकारी",
    educationCareer: "शिक्षा और करियर",
    family: "परिवार की जानकारी",
    contact: "संपर्क जानकारी",
    additional: "अतिरिक्त जानकारी",
    about: "अपने बारे में",
    partner: "जीवनसाथी से अपेक्षाएं",
    choose: "अपना टेम्पलेट चुनें",
    preview: "लाइव प्रीव्यू",
    downloadPNG: "PNG डाउनलोड करें",
    downloadPDF: "PDF डाउनलोड करें",
    preparing: "आपका बायोडाटा तैयार हो रहा है...",
    private: "आपका बायोडाटा आपके ब्राउज़र में बनाया जाता है। इसे हमारे सर्वर पर अपलोड नहीं किया जाता।",
    fullName: "पूरा नाम",
    dob: "जन्म तिथि",
    height: "लंबाई",
    religion: "धर्म",
    caste: "जाति / समुदाय",
    motherTongue: "मातृभाषा",
    educationLabel: "शिक्षा",
    occupation: "व्यवसाय",
    income: "वार्षिक आय",
    father: "पिता का नाम",
    mother: "माता का नाम",
    siblings: "भाई / बहन",
    address: "पता",
    phone: "मोबाइल नंबर",
    aboutHeading: "मेरे बारे में",
    partnerHeading: "जीवनसाथी से अपेक्षाएं",
    personalHeading: "व्यक्तिगत जानकारी",
    careerHeading: "शिक्षा और करियर",
    familyHeading: "परिवार की जानकारी",
    contactHeading: "संपर्क जानकारी",
    marriage: "शादी का बायोडाटा",
    profile: "व्यक्तिगत और पारिवारिक परिचय",
    yourName: "आपका नाम",
    profileLabel: "विवाह परिचय",
    presented: "व्यक्तिगत परिचय",
    beginning: "जीवन का एक नया अध्याय",
    introduction: "मेरा परिचय",
    aboutFamily: "मेरे और मेरे परिवार का संक्षिप्त परिचय",
    introducing: "परिचय",
    newBeginning: "एक नई शुरुआत, एक सुंदर सफर",
    wishes: "शुभकामनाओं सहित",
    enter: "दर्ज करें",
    empty: "—",
    invalidPhoto: "कृपया एक इमेज फाइल चुनें।",
    largePhoto: "कृपया 5 MB से छोटी फोटो चुनें।",
    imageError: "PNG बनाने में समस्या हुई। कृपया फिर प्रयास करें।",
    pdfError: "PDF बनाने में समस्या हुई। कृपया फिर प्रयास करें।",
    home: "← होम पर जाएं",
    freeTool: "मुफ्त ऑनलाइन टूल",
    aBeautifulJourney: "एक सुंदर सफर की शुरुआत",
  },
  mr: {
    pageTitle: "लग्न बायोडाटा मेकर",
    subtitle: "काही मिनिटांत तुमचा सुंदर लग्नाचा बायोडाटा तयार करा.",
    formTitle: "तुमची माहिती भरा",
    formSubtitle: "तुमची माहिती भरा. प्रीव्ह्यू आपोआप अपडेट होईल.",
    photo: "प्रोफाइल फोटो",
    upload: "फोटो अपलोड करा",
    remove: "काढून टाका",
    personal: "वैयक्तिक माहिती",
    educationCareer: "शिक्षण आणि करिअर",
    family: "कौटुंबिक माहिती",
    contact: "संपर्क माहिती",
    additional: "अतिरिक्त माहिती",
    about: "स्वतःबद्दल",
    partner: "जोडीदाराकडून अपेक्षा",
    choose: "तुमचे टेम्पलेट निवडा",
    preview: "थेट प्रीव्ह्यू",
    downloadPNG: "PNG डाउनलोड करा",
    downloadPDF: "PDF डाउनलोड करा",
    preparing: "तुमचा बायोडाटा तयार होत आहे...",
    private: "तुमचा बायोडाटा तुमच्या ब्राउझरमध्ये तयार होतो. तो आमच्या सर्व्हरवर अपलोड होत नाही.",
    fullName: "पूर्ण नाव",
    dob: "जन्मतारीख",
    height: "उंची",
    religion: "धर्म",
    caste: "जात / समाज",
    motherTongue: "मातृभाषा",
    educationLabel: "शिक्षण",
    occupation: "व्यवसाय",
    income: "वार्षिक उत्पन्न",
    father: "वडिलांचे नाव",
    mother: "आईचे नाव",
    siblings: "भाऊ / बहिणी",
    address: "पत्ता",
    phone: "मोबाईल क्रमांक",
    aboutHeading: "माझ्याबद्दल",
    partnerHeading: "जोडीदाराकडून अपेक्षा",
    personalHeading: "वैयक्तिक माहिती",
    careerHeading: "शिक्षण आणि करिअर",
    familyHeading: "कौटुंबिक माहिती",
    contactHeading: "संपर्क माहिती",
    marriage: "लग्नाचा बायोडाटा",
    profile: "वैयक्तिक आणि कौटुंबिक परिचय",
    yourName: "तुमचे नाव",
    profileLabel: "विवाह परिचय",
    presented: "वैयक्तिक परिचय",
    beginning: "आयुष्याचा एक नवा अध्याय",
    introduction: "माझा परिचय",
    aboutFamily: "माझा आणि माझ्या कुटुंबाचा थोडक्यात परिचय",
    introducing: "परिचय",
    newBeginning: "एक नवी सुरुवात, एक सुंदर प्रवास",
    wishes: "शुभेच्छांसह",
    enter: "प्रविष्ट करा",
    empty: "—",
    invalidPhoto: "कृपया इमेज फाइल निवडा.",
    largePhoto: "कृपया 5 MB पेक्षा कमी आकाराचा फोटो निवडा.",
    imageError: "PNG तयार करता आले नाही. कृपया पुन्हा प्रयत्न करा.",
    pdfError: "PDF तयार करता आले नाही. कृपया पुन्हा प्रयत्न करा.",
    home: "← मुख्यपृष्ठावर जा",
    freeTool: "मोफत ऑनलाइन टूल",
    aBeautifulJourney: "एका सुंदर प्रवासाची सुरुवात",
  },
};

export default function BiodataMaker() {
  const [data, setData] = useState<Biodata>(initialData);
  const [photo, setPhoto] = useState("");
  const [template, setTemplate] = useState("classic");
  const [language, setLanguage] = useState<Language>("en");
  const [downloading, setDownloading] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);
  const [contentScale, setContentScale] = useState(1);

  const previewRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const t = translations[language];
  const theme = templates.find((item) => item.id === template) ?? templates[0];

  const fontFamily =
    language === "en"
      ? "Georgia, serif"
      : "'Noto Sans Devanagari', 'Mangal', sans-serif";

  // Scale the preview to fit the available screen width.
  useEffect(() => {
    const container = previewContainerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      setPreviewScale(Math.min(1, entries[0].contentRect.width / 794));
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Automatically fit the biodata content inside the A4 page.
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    let frame = 0;

    const updateScale = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const contentHeight = content.scrollHeight;
        const nextScale =
          contentHeight > 1123 ? 1123 / contentHeight : 1;

        setContentScale((previous) =>
          Math.abs(previous - nextScale) > 0.001 ? nextScale : previous
        );
      });
    };

    const observer = new ResizeObserver(updateScale);
    observer.observe(content);

    updateScale();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [data, photo, template, language]);

  function updateField(field: keyof Biodata, value: string) {
    setData((previous) => ({ ...previous, [field]: value }));
  }

  function uploadPhoto(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert(t.invalidPhoto);
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert(t.largePhoto);
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  async function generateImage() {
    if (!previewRef.current) {
      throw new Error("Preview is not available");
    }

    await document.fonts.ready;

    return toPng(previewRef.current, {
      pixelRatio: 2,
      backgroundColor: "#ffffff",
      width: 794,
      height: 1123,
      style: {
        transform: "none",
        transformOrigin: "top left",
        margin: "0",
      },
    });
  }

  async function downloadImage() {
    try {
      setDownloading(true);
      const image = await generateImage();
      const link = document.createElement("a");
      link.download = "my-marriage-biodata.png";
      link.href = image;
      link.click();
    } catch (error) {
      console.error(error);
      alert(t.imageError);
    } finally {
      setDownloading(false);
    }
  }

  async function downloadPDF() {
    try {
      setDownloading(true);
      const image = await generateImage();
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(image, "PNG", 0, 0, 210, 297, undefined, "FAST");
      pdf.save("my-marriage-biodata.pdf");
    } catch (error) {
      console.error(error);
      alert(t.pdfError);
    } finally {
      setDownloading(false);
    }
  }

  const sections = [
    {
      title: t.personal,
      fields: [
        ["name", t.fullName],
        ["dob", t.dob],
        ["height", t.height],
        ["religion", t.religion],
        ["caste", t.caste],
        ["motherTongue", t.motherTongue],
      ],
    },
    {
      title: t.educationCareer,
      fields: [
        ["education", t.educationLabel],
        ["occupation", t.occupation],
        ["income", t.income],
      ],
    },
    {
      title: t.family,
      fields: [
        ["fatherName", t.father],
        ["motherName", t.mother],
        ["siblings", t.siblings],
      ],
    },
    {
      title: t.contact,
      fields: [
        ["address", t.address],
        ["phone", t.phone],
      ],
    },
  ] as const;

  const previewSections: { title: string; rows: InfoRow[] }[] = [
    {
      title: t.personalHeading,
      rows: [
        [t.dob, data.dob],
        [t.height, data.height],
        [t.religion, data.religion],
        [t.caste, data.caste],
        [t.motherTongue, data.motherTongue],
      ],
    },
    {
      title: t.careerHeading,
      rows: [
        [t.educationLabel, data.education],
        [t.occupation, data.occupation],
        [t.income, data.income],
      ],
    },
    {
      title: t.familyHeading,
      rows: [
        [t.father, data.fatherName],
        [t.mother, data.motherName],
        [t.siblings, data.siblings],
      ],
    },
    {
      title: t.contactHeading,
      rows: [
        [t.address, data.address],
        [t.phone, data.phone],
      ],
    },
  ];

  function renderSection(section: { title: string; rows: InfoRow[] }) {
    return (
      <section key={section.title} className="mt-7 min-w-0 w-full">
        <h3
          className="border-b-2 pb-2 text-base font-bold"
          style={{ borderColor: theme.color, color: theme.color }}
        >
          {section.title}
        </h3>

        <div className="mt-3 min-w-0 space-y-3">
          {section.rows.map(([label, value]) => (
            <div
              key={label}
              className={`grid min-w-0 w-full gap-2 text-sm ${
                template === "modern"
                  ? "grid-cols-[minmax(90px,125px)_minmax(0,1fr)]"
                  : "grid-cols-[minmax(110px,165px)_minmax(0,1fr)]"
              }`}
            >
              <span className="min-w-0 break-words font-bold">{label}</span>
              <span className="min-w-0 max-w-full whitespace-pre-wrap [overflow-wrap:anywhere]">
                {value || t.empty}
              </span>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function renderAbout() {
    return (
      <section className="mt-7 min-w-0">
        <h3
          className="border-b-2 pb-2 text-base font-bold"
          style={{ borderColor: theme.color, color: theme.color }}
        >
          {t.aboutHeading}
        </h3>
        <p className="mt-3 break-words whitespace-pre-wrap text-sm leading-7 [overflow-wrap:anywhere]">
          {data.about || t.empty}
        </p>
      </section>
    );
  }

  function renderPartner() {
    return (
      <section className="mt-7 min-w-0">
        <h3
          className="border-b-2 pb-2 text-base font-bold"
          style={{ borderColor: theme.color, color: theme.color }}
        >
          {t.partnerHeading}
        </h3>
        <p className="mt-3 break-words whitespace-pre-wrap text-sm leading-7 [overflow-wrap:anywhere]">
          {data.partner || t.empty}
        </p>
      </section>
    );
  }

  function renderPhoto(className: string) {
    return photo ? (
      <img src={photo} alt="Profile" className={className} />
    ) : (
      <div className={`${className} flex items-center justify-center bg-stone-100 text-4xl`}>
        👤
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fffaf5] text-stone-800">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&display=swap"
      />

      <header className="border-b bg-white px-5 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="text-xl font-extrabold">
            FreeBiodata<span className="text-orange-600">Makers</span>
          </a>
          <a href="/" className="text-sm font-semibold text-orange-600">
            {t.home}
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-10 text-center">
          <p className="font-bold uppercase tracking-widest text-orange-600">
            {t.freeTool}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">
            {t.pageTitle}
          </h1>
          <p className="mt-3 text-stone-500">{t.subtitle}</p>

          <div className="mx-auto mt-6 max-w-xs text-left">
            <label className="mb-2 block text-sm font-semibold">
              Select Language / भाषा निवडा
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="w-full rounded-lg border border-orange-200 bg-white px-4 py-3 font-semibold outline-none focus:border-orange-500"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="mr">मराठी</option>
            </select>
          </div>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-2">
          {/* FORM */}
          <section className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-xl font-bold">{t.formTitle}</h2>
            <p className="mt-1 text-sm text-stone-500">{t.formSubtitle}</p>

            <div className="mt-7">
              <label className="mb-2 block font-semibold">{t.photo}</label>
              <div className="flex flex-wrap items-center gap-4">
                {photo ? (
                  <img src={photo} alt="Profile preview" className="h-20 w-20 rounded-xl object-cover" />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-orange-50 text-3xl">📷</div>
                )}

                <label className="cursor-pointer rounded-lg border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-50">
                  {t.upload}
                  <input type="file" accept="image/*" className="hidden" onChange={uploadPhoto} />
                </label>

                {photo && (
                  <button type="button" onClick={() => setPhoto("")} className="text-sm text-red-500">
                    {t.remove}
                  </button>
                )}
              </div>
            </div>

            {sections.map((section) => (
              <div key={section.title} className="mt-8">
                <h3 className="mb-4 border-b border-orange-200 pb-2 text-lg font-bold text-orange-700">
                  {section.title}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {section.fields.map(([field, label]) => (
                    <div key={field}>
                      <label className="mb-1 block text-sm font-medium">{label}</label>
                      <input
                        type={field === "dob" ? "date" : "text"}
                        value={data[field]}
                        onChange={(e) => updateField(field, e.target.value)}
                        placeholder={`${t.enter} ${label.toLowerCase()}`}
                        className="w-full rounded-lg border border-stone-200 px-3 py-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-8">
              <h3 className="mb-4 border-b border-orange-200 pb-2 text-lg font-bold text-orange-700">
                {t.additional}
              </h3>

              <label className="mb-2 block text-sm font-medium">{t.about}</label>
              <textarea
                value={data.about}
                onChange={(e) => updateField("about", e.target.value)}
                rows={4}
                placeholder={t.about}
                className="w-full rounded-lg border border-stone-200 p-3 text-sm outline-none focus:border-orange-500"
              />

              <label className="mb-2 mt-5 block text-sm font-medium">{t.partner}</label>
              <textarea
                value={data.partner}
                onChange={(e) => updateField("partner", e.target.value)}
                rows={4}
                placeholder={t.partner}
                className="w-full rounded-lg border border-stone-200 p-3 text-sm outline-none focus:border-orange-500"
              />
            </div>

            <div className="mt-8">
              <h3 className="mb-4 text-lg font-bold">{t.choose}</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {templates.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setTemplate(item.id)}
                    className={`rounded-xl border-2 p-3 text-sm font-bold transition ${
                      template === item.id
                        ? "border-orange-500 bg-orange-50"
                        : "border-stone-200 hover:border-orange-300"
                    }`}
                  >
                    <span className="mx-auto mb-2 block h-8 w-8 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* LIVE PREVIEW */}
          <section className="min-w-0">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">{t.preview}</h2>
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">LIVE</span>
            </div>

            <div ref={previewContainerRef} className="w-full overflow-hidden rounded-xl bg-stone-200 p-3 sm:p-5">
              <div
                className="mx-auto"
                style={{
                  width: 794 * previewScale,
                  height: 1123 * previewScale,
                }}
              >
                <div
                  ref={previewRef}
                  className="relative overflow-hidden bg-white"
                  style={{
                    width: 794,
                    height: 1123,
                    transform: `scale(${previewScale})`,
                    transformOrigin: "top left",
                    color: "#292524",
                    fontFamily,
                  }}
                >
                  {/* This wrapper automatically scales all five templates. */}
                  <div
                    ref={contentRef}
                    style={{
                      width: 794,
                      transform: `scale(${contentScale})`,
                      transformOrigin: "top left",
                    }}
                  >
                    {/* CLASSIC */}
                    {template === "classic" && (
                      <div className="h-full p-10" style={{ background: "#fffdf8", border: `12px double ${theme.color}` }}>
                        <div className="h-full border p-8" style={{ borderColor: "#d5b46a" }}>
                          <div className="text-center">
                            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.color }}>{t.aBeautifulJourney}</p>
                            <h2 className="mt-3 text-3xl font-bold" style={{ color: theme.color }}>{t.marriage}</h2>
                            <div className="mx-auto mt-5 h-1 w-28 bg-amber-400" />
                            <p className="mt-3 text-xs text-stone-500">{t.profile}</p>
                          </div>
                          <div className="mt-8 flex items-center gap-6">
                            <div className="min-w-0 flex-1">
                              <h1 className="break-words text-3xl font-bold" style={{ color: theme.color }}>{data.name || t.yourName}</h1>
                              <p className="mt-2 text-sm text-stone-500">{t.profileLabel}</p>
                            </div>
                            {renderPhoto("h-32 w-28 shrink-0 border-4 border-white object-cover shadow-md")}
                          </div>
                          {renderAbout()}
                          {previewSections.map(renderSection)}
                          {renderPartner()}
                          <div className="mt-8 text-center text-xs text-stone-400">✦ {t.marriage} ✦</div>
                        </div>
                      </div>
                    )}

                    {/* ROYAL */}
                    {template === "royal" && (
                      <div className="h-full p-7" style={{ background: "#fbf4e5", border: "12px double #b38a43" }}>
                        <div className="h-full border-2 p-7" style={{ borderColor: "#d2ad67" }}>
                          <div className="bg-[#49301d] px-6 py-7 text-center text-white">
                            <p className="text-xs tracking-widest text-amber-200">{t.presented}</p>
                            <h2 className="mt-3 text-3xl font-bold text-amber-100">{t.marriage}</h2>
                            <div className="mx-auto mt-4 h-1 w-24 bg-amber-300" />
                            <p className="mt-3 text-xs text-amber-100">{t.profile}</p>
                          </div>
                          <div className="mt-7 flex items-center gap-6 border-b border-amber-300 pb-6">
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-amber-800">{t.presented}</p>
                              <h1 className="mt-3 break-words text-3xl font-bold text-[#67451f]">{data.name || t.yourName}</h1>
                              <p className="mt-2 text-sm text-amber-800">{t.beginning}</p>
                            </div>
                            {renderPhoto("h-32 w-28 shrink-0 border-4 border-amber-200 object-cover")}
                          </div>
                          <div className="mt-5 rounded-lg border border-amber-200 bg-white/60 px-4 py-1">{renderAbout()}</div>
                          {previewSections.map(renderSection)}
                          <div className="mt-5 rounded-lg border border-amber-200 bg-white/60 px-4 py-1">{renderPartner()}</div>
                          <div className="mt-7 text-center text-sm font-bold text-amber-800">✦ {t.wishes} ✦</div>
                        </div>
                      </div>
                    )}

                    {/* MODERN */}
                    {template === "modern" && (
                      <div className="flex h-full">
                        <aside className="flex h-full w-[265px] shrink-0 flex-col px-6 py-10 text-white" style={{ background: "linear-gradient(180deg, #18344f, #24476b, #142b42)" }}>
                          <div className="text-center">
                            {renderPhoto("mx-auto h-36 w-32 border-4 border-white/70 object-cover")}
                            <h1 className="mt-5 break-words text-2xl font-bold">{data.name || t.yourName}</h1>
                            <p className="mt-2 text-xs text-blue-100">{t.profileLabel}</p>
                          </div>
                          <div className="mt-10">
                            <h3 className="border-b border-white/40 pb-2 text-sm font-bold text-blue-100">{t.personal}</h3>
                            <div className="mt-4 space-y-4 text-sm">
                              {[
                                [t.dob, data.dob], [t.height, data.height],
                                [t.religion, data.religion], [t.caste, data.caste],
                                [t.motherTongue, data.motherTongue],
                              ].map(([label, value]) => (
                                <div key={label} className="min-w-0">
                                  <p className="text-xs text-blue-200">{label}</p>
                                  <p className="mt-1 break-words font-semibold [overflow-wrap:anywhere]">{value || t.empty}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-10">
                            <h3 className="border-b border-white/40 pb-2 text-sm font-bold text-blue-100">{t.contact}</h3>
                            <div className="mt-4 min-w-0 space-y-4 text-sm">
                              <div className="min-w-0">
                                <p className="text-xs text-blue-200">{t.phone}</p>
                                <p className="mt-1 whitespace-pre-wrap [overflow-wrap:anywhere]">{data.phone || t.empty}</p>
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs text-blue-200">{t.address}</p>
                                <p className="mt-1 whitespace-pre-wrap [overflow-wrap:anywhere]">{data.address || t.empty}</p>
                              </div>
                            </div>
                          </div>
                          <div className="mt-auto pt-8 text-center text-xs text-blue-200">{t.profile}</div>
                        </aside>
                        <div className="min-w-0 flex-1 px-8 py-10">
                          <div className="border-b-4 border-[#24476b] pb-5">
                            <p className="text-xs font-bold text-blue-800">{t.introduction}</p>
                            <h2 className="mt-2 text-3xl font-bold text-[#24476b]">{t.marriage}</h2>
                            <p className="mt-2 text-xs text-stone-500">{t.aboutFamily}</p>
                          </div>
                          {renderAbout()}
                          {renderSection({
                            title: t.careerHeading,
                            rows: [[t.educationLabel, data.education], [t.occupation, data.occupation], [t.income, data.income]],
                          })}
                          {renderSection({
                            title: t.familyHeading,
                            rows: [[t.father, data.fatherName], [t.mother, data.motherName], [t.siblings, data.siblings]],
                          })}
                          {renderPartner()}
                          <div className="mt-8 border-t border-stone-200 pt-4 text-center text-xs text-stone-400">{t.marriage}</div>
                        </div>
                      </div>
                    )}

                    {/* FLORAL */}
                    {template === "floral" && (
                      <div className="h-full p-9" style={{ background: "#fff4f7", border: "12px double #d98ba8" }}>
                        <div className="h-full rounded-[35px] border-2 border-dashed p-7" style={{ borderColor: "#d98ba8" }}>
                          <div className="text-center">
                            <p className="text-3xl text-pink-400">❀ ❀ ❀</p>
                            <h2 className="mt-3 text-3xl font-bold text-[#b34c78]">{t.marriage}</h2>
                            <p className="mt-2 text-sm text-pink-700">{t.newBeginning}</p>
                            <p className="mt-3 text-3xl text-pink-400">❀</p>
                          </div>
                          <div className="mt-5 flex items-center gap-6 rounded-2xl bg-white p-5 shadow-sm">
                            <div className="min-w-0 flex-1">
                              <p className="text-xs font-bold text-pink-500">{t.introducing}</p>
                              <h1 className="mt-2 break-words text-3xl font-bold text-[#b34c78]">{data.name || t.yourName}</h1>
                              <p className="mt-2 text-sm text-stone-500">{t.profileLabel}</p>
                            </div>
                            {renderPhoto("h-32 w-28 shrink-0 rounded-2xl border-4 border-pink-100 object-cover")}
                          </div>
                          <div className="mt-5 rounded-2xl bg-white px-5 py-1 shadow-sm">{renderAbout()}</div>
                          {previewSections.map((section) => (
                            <div key={section.title} className="mt-5 rounded-2xl bg-white px-5 py-1 shadow-sm">
                              {renderSection(section)}
                            </div>
                          ))}
                          <div className="mt-5 rounded-2xl bg-white px-5 py-1 shadow-sm">{renderPartner()}</div>
                          <div className="mt-7 text-center text-2xl text-pink-400">❀ ✿ ❀</div>
                        </div>
                      </div>
                    )}

                    {/* MINIMAL */}
                    {template === "minimal" && (
                      <div className="h-full bg-white px-12 py-12">
                        <div className="flex items-center justify-between border-b-4 border-stone-800 pb-7">
                          <div className="min-w-0 flex-1 pr-5">
                            <p className="text-xs font-bold text-stone-500">{t.profile}</p>
                            <h2 className="mt-3 text-3xl font-bold text-stone-900">{t.marriage}</h2>
                            <div className="mt-4 h-1 w-16 bg-stone-800" />
                          </div>
                          {renderPhoto("h-32 w-28 shrink-0 border border-stone-300 object-cover")}
                        </div>
                        <div className="mt-8">
                          <h1 className="break-words text-3xl font-bold text-stone-900">{data.name || t.yourName}</h1>
                          <p className="mt-2 text-sm text-stone-500">{t.profileLabel}</p>
                        </div>
                        {renderAbout()}
                        {previewSections.map(renderSection)}
                        {renderPartner()}
                        <div className="mt-10 border-t border-stone-300 pt-5 text-center text-xs text-stone-400">{t.marriage}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={downloadImage}
                disabled={downloading}
                className="rounded-xl bg-orange-600 px-3 py-4 font-bold text-white hover:bg-orange-700 disabled:opacity-50"
              >
                {downloading ? t.preparing : t.downloadPNG}
              </button>
              <button
                type="button"
                onClick={downloadPDF}
                disabled={downloading}
                className="rounded-xl bg-stone-800 px-3 py-4 font-bold text-white hover:bg-stone-900 disabled:opacity-50"
              >
                {downloading ? t.preparing : t.downloadPDF}
              </button>
            </div>

            {downloading && <p className="mt-3 text-center text-sm text-orange-600">{t.preparing}</p>}
            <p className="mt-4 text-center text-xs text-stone-500">{t.private}</p>
          </section>
        </div>
      </div>
    </main>
  );
}
