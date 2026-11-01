"use client";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactNode,
} from "react";
import { toJpeg, toPng } from "html-to-image";
import jsPDF from "jspdf";

/* ------------------------------------------------------------------ */
/* Types and data                                                      */
/* ------------------------------------------------------------------ */

type Language = "en" | "hi" | "mr";

const FIELD_KEYS = [
  "name", "dob", "birthTime", "birthPlace", "height", "religion", "caste",
  "motherTongue", "rashi", "nakshatra", "gotra", "manglik", "complexion",
  "education", "occupation", "income",
  "fatherName", "fatherOccupation", "motherName", "motherOccupation", "siblings",
  "address", "phone", "about", "partner",
] as const;

type FieldKey = (typeof FIELD_KEYS)[number];
type Biodata = Record<FieldKey, string>;
type InfoRow = [string, string];

const emptyData = Object.fromEntries(FIELD_KEYS.map((k) => [k, ""])) as Biodata;

type TemplateMeta = { id: string; color: string; serif: boolean; bg?: string };

const templates: TemplateMeta[] = [
  { id: "classic", color: "#9f343e", serif: true },
  { id: "royal", color: "#a67c32", serif: true },
  { id: "modern", color: "#24476b", serif: false },
  { id: "floral", color: "#c45b83", serif: true },
  { id: "minimal", color: "#475569", serif: false },
  { id: "royalTraditional", color: "#d5ad69", serif: true },
  // Ornate themed templates are appended below from ORNATE_THEMES.
];

const en = {
  pageTitle: "Marriage Biodata Maker",
  subtitle: "Create your professional marriage biodata in minutes.",
  freeTool: "Free Online Tool",
  home: "← Back Home",
  language: "Language",
  formTitle: "Enter Your Details",
  formSubtitle: "Fill in your information. Your preview updates automatically.",
  choose: "Choose Your Template",
  selected: "Selected",
  photo: "Profile Photograph",
  upload: "Upload Photo",
  remove: "Remove",
  photoHint: "Stays on your device. Large photos are shrunk automatically.",
  personal: "Personal Details",
  educationCareer: "Education & Career",
  family: "Family Details",
  contact: "Contact Details",
  additional: "Additional Information",
  about: "About Yourself",
  partner: "Partner Expectations",
  preview: "Live Preview",
  live: "LIVE",
  downloadPNG: "Download PNG",
  downloadPDF: "Download PDF",
  preparing: "Preparing...",
  private: "Your biodata is generated in your browser and is never uploaded to our server.",
  saved: "Draft is saved on this device only.",
  clear: "Clear form",
  clearConfirm: "Clear all details and the photo?",
  sampleBanner: "Sample preview. Start typing to replace it.",
  fillFirst: "Please fill in your details before downloading.",
  overflow: "Your content is longer than one page. Shorten the long text or it will be cut off.",
  select: "Select",
  enter: "Enter",
  fullName: "Full Name",
  dob: "Date of Birth",
  birthTime: "Birth Time",
  birthPlace: "Birth Place",
  height: "Height",
  religion: "Religion",
  caste: "Caste / Community",
  motherTongue: "Mother Tongue",
  rashi: "Rashi",
  nakshatra: "Nakshatra",
  gotra: "Gotra",
  manglik: "Manglik Status",
  complexion: "Complexion",
  educationLabel: "Education",
  occupation: "Occupation",
  income: "Annual Income",
  father: "Father's Name",
  fatherOccupation: "Father's Occupation",
  mother: "Mother's Name",
  motherOccupation: "Mother's Occupation",
  siblings: "Brothers / Sisters",
  address: "Address",
  phone: "Mobile Number",
  religionOptions: ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Other"],
  manglikOptions: ["Yes", "No", "Partial (Anshik)", "Don't know"],
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
  aBeautifulJourney: "A Beautiful Journey Begins",
  blessing: "|| Shree Ganeshaya Namah ||",
  shubh: "Shubh Mangalam",
  invalidPhoto: "Please select an image file (JPG or PNG).",
  largePhoto: "Please select an image smaller than 10 MB.",
  photoError: "Could not read this photo. Try a JPG or PNG.",
  imageError: "Unable to generate PNG. Please try again.",
  pdfError: "Unable to generate PDF. Please try again.",
  templateNames: {
    classic: "Classic Traditional",
    royal: "Royal Gold",
    modern: "Modern Professional",
    floral: "Floral Elegant",
    minimal: "Minimal",
    royalTraditional: "Royal Traditional",
  },
};

type Translation = typeof en;

const hi: Translation = {
  pageTitle: "शादी का बायोडाटा मेकर",
  subtitle: "कुछ ही मिनटों में अपना सुंदर शादी का बायोडाटा बनाएं।",
  freeTool: "मुफ्त ऑनलाइन टूल",
  home: "← होम पर जाएं",
  language: "भाषा",
  formTitle: "अपनी जानकारी भरें",
  formSubtitle: "अपनी जानकारी भरें। आपका प्रीव्यू अपने आप अपडेट होगा।",
  choose: "अपना टेम्पलेट चुनें",
  selected: "चुना गया",
  photo: "प्रोफाइल फोटो",
  upload: "फोटो अपलोड करें",
  remove: "हटाएं",
  photoHint: "फोटो आपके डिवाइस पर ही रहती है। बड़ी फोटो अपने आप छोटी हो जाती है।",
  personal: "व्यक्तिगत जानकारी",
  educationCareer: "शिक्षा और करियर",
  family: "परिवार की जानकारी",
  contact: "संपर्क जानकारी",
  additional: "अतिरिक्त जानकारी",
  about: "अपने बारे में",
  partner: "जीवनसाथी से अपेक्षाएं",
  preview: "लाइव प्रीव्यू",
  live: "लाइव",
  downloadPNG: "PNG डाउनलोड करें",
  downloadPDF: "PDF डाउनलोड करें",
  preparing: "तैयार हो रहा है...",
  private: "आपका बायोडाटा आपके ब्राउज़र में बनता है। इसे हमारे सर्वर पर अपलोड नहीं किया जाता।",
  saved: "ड्राफ्ट केवल इसी डिवाइस पर सेव है।",
  clear: "फॉर्म साफ करें",
  clearConfirm: "सारी जानकारी और फोटो हटाएं?",
  sampleBanner: "यह नमूना प्रीव्यू है। टाइप करना शुरू करें।",
  fillFirst: "डाउनलोड से पहले कृपया अपनी जानकारी भरें।",
  overflow: "आपकी जानकारी एक पेज से ज़्यादा है। लंबा टेक्स्ट छोटा करें, वरना वह कट जाएगा।",
  select: "चुनें",
  enter: "दर्ज करें",
  fullName: "पूरा नाम",
  dob: "जन्म तिथि",
  birthTime: "जन्म का समय",
  birthPlace: "जन्म स्थान",
  height: "लंबाई",
  religion: "धर्म",
  caste: "जाति / समुदाय",
  motherTongue: "मातृभाषा",
  rashi: "राशि",
  nakshatra: "नक्षत्र",
  gotra: "गोत्र",
  manglik: "मांगलिक स्थिति",
  complexion: "रंग",
  educationLabel: "शिक्षा",
  occupation: "व्यवसाय",
  income: "वार्षिक आय",
  father: "पिता का नाम",
  fatherOccupation: "पिता का व्यवसाय",
  mother: "माता का नाम",
  motherOccupation: "माता का व्यवसाय",
  siblings: "भाई / बहन",
  address: "पता",
  phone: "मोबाइल नंबर",
  religionOptions: ["हिंदू", "मुस्लिम", "ईसाई", "सिख", "बौद्ध", "जैन", "अन्य"],
  manglikOptions: ["हाँ", "नहीं", "आंशिक", "पता नहीं"],
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
  aBeautifulJourney: "एक सुंदर सफर की शुरुआत",
  blessing: "॥ श्री गणेशाय नमः ॥",
  shubh: "शुभ मंगलम्",
  invalidPhoto: "कृपया इमेज फाइल (JPG या PNG) चुनें।",
  largePhoto: "कृपया 10 MB से छोटी फोटो चुनें।",
  photoError: "यह फोटो पढ़ी नहीं जा सकी। JPG या PNG आज़माएं।",
  imageError: "PNG बनाने में समस्या हुई। कृपया फिर प्रयास करें।",
  pdfError: "PDF बनाने में समस्या हुई। कृपया फिर प्रयास करें।",
  templateNames: {
    classic: "क्लासिक पारंपरिक",
    royal: "रॉयल गोल्ड",
    modern: "मॉडर्न प्रोफेशनल",
    floral: "फ्लोरल एलिगंट",
    minimal: "मिनिमल",
    royalTraditional: "रॉयल पारंपरिक",
  },
};

const mr: Translation = {
  pageTitle: "लग्न बायोडाटा मेकर",
  subtitle: "काही मिनिटांत तुमचा सुंदर लग्नाचा बायोडाटा तयार करा.",
  freeTool: "मोफत ऑनलाइन टूल",
  home: "← मुख्यपृष्ठावर जा",
  language: "भाषा",
  formTitle: "तुमची माहिती भरा",
  formSubtitle: "तुमची माहिती भरा. प्रीव्ह्यू आपोआप अपडेट होईल.",
  choose: "तुमचे टेम्पलेट निवडा",
  selected: "निवडले",
  photo: "प्रोफाइल फोटो",
  upload: "फोटो अपलोड करा",
  remove: "काढून टाका",
  photoHint: "फोटो तुमच्या डिव्हाइसवरच राहतो. मोठा फोटो आपोआप लहान होतो.",
  personal: "वैयक्तिक माहिती",
  educationCareer: "शिक्षण आणि करिअर",
  family: "कौटुंबिक माहिती",
  contact: "संपर्क माहिती",
  additional: "अतिरिक्त माहिती",
  about: "स्वतःबद्दल",
  partner: "जोडीदाराकडून अपेक्षा",
  preview: "थेट प्रीव्ह्यू",
  live: "लाइव्ह",
  downloadPNG: "PNG डाउनलोड करा",
  downloadPDF: "PDF डाउनलोड करा",
  preparing: "तयार होत आहे...",
  private: "तुमचा बायोडाटा तुमच्या ब्राउझरमध्ये तयार होतो. तो आमच्या सर्व्हरवर अपलोड होत नाही.",
  saved: "ड्राफ्ट फक्त याच डिव्हाइसवर सेव्ह आहे.",
  clear: "फॉर्म साफ करा",
  clearConfirm: "सर्व माहिती आणि फोटो काढून टाकायचा?",
  sampleBanner: "हा नमुना प्रीव्ह्यू आहे. टाइप करायला सुरुवात करा.",
  fillFirst: "डाउनलोड करण्यापूर्वी कृपया तुमची माहिती भरा.",
  overflow: "तुमची माहिती एका पानापेक्षा जास्त आहे. मोठा मजकूर कमी करा, नाहीतर तो कापला जाईल.",
  select: "निवडा",
  enter: "प्रविष्ट करा",
  fullName: "पूर्ण नाव",
  dob: "जन्मतारीख",
  birthTime: "जन्माची वेळ",
  birthPlace: "जन्मस्थान",
  height: "उंची",
  religion: "धर्म",
  caste: "जात / समाज",
  motherTongue: "मातृभाषा",
  rashi: "रास",
  nakshatra: "नक्षत्र",
  gotra: "गोत्र",
  manglik: "मंगळ स्थिती",
  complexion: "वर्ण",
  educationLabel: "शिक्षण",
  occupation: "व्यवसाय",
  income: "वार्षिक उत्पन्न",
  father: "वडिलांचे नाव",
  fatherOccupation: "वडिलांचा व्यवसाय",
  mother: "आईचे नाव",
  motherOccupation: "आईचा व्यवसाय",
  siblings: "भाऊ / बहिणी",
  address: "पत्ता",
  phone: "मोबाईल क्रमांक",
  religionOptions: ["हिंदू", "मुस्लिम", "ख्रिश्चन", "शीख", "बौद्ध", "जैन", "इतर"],
  manglikOptions: ["होय", "नाही", "अंशतः", "माहीत नाही"],
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
  aBeautifulJourney: "एका सुंदर प्रवासाची सुरुवात",
  blessing: "॥ श्री गणेशाय नमः ॥",
  shubh: "शुभ मंगलम्",
  invalidPhoto: "कृपया इमेज फाइल (JPG किंवा PNG) निवडा.",
  largePhoto: "कृपया 10 MB पेक्षा कमी आकाराचा फोटो निवडा.",
  photoError: "हा फोटो वाचता आला नाही. JPG किंवा PNG वापरून पहा.",
  imageError: "PNG तयार करता आले नाही. कृपया पुन्हा प्रयत्न करा.",
  pdfError: "PDF तयार करता आले नाही. कृपया पुन्हा प्रयत्न करा.",
  templateNames: {
    classic: "क्लासिक पारंपरिक",
    royal: "रॉयल गोल्ड",
    modern: "मॉडर्न प्रोफेशनल",
    floral: "फ्लोरल एलिगंट",
    minimal: "मिनिमल",
    royalTraditional: "रॉयल पारंपरिक",
  },
};

const translations: Record<Language, Translation> = { en, hi, mr };

const LANGUAGE_NAMES: Record<Language, string> = {
  en: "English",
  hi: "हिंदी",
  mr: "मराठी",
};

/** Which translation key holds the label for each field. */
const LABEL_KEY: Record<FieldKey, keyof Translation> = {
  name: "fullName", dob: "dob", birthTime: "birthTime", birthPlace: "birthPlace",
  height: "height", religion: "religion", caste: "caste", motherTongue: "motherTongue",
  rashi: "rashi", nakshatra: "nakshatra", gotra: "gotra", manglik: "manglik",
  complexion: "complexion", education: "educationLabel", occupation: "occupation",
  income: "income", fatherName: "father", fatherOccupation: "fatherOccupation",
  motherName: "mother", motherOccupation: "motherOccupation", siblings: "siblings",
  address: "address", phone: "phone", about: "about", partner: "partner",
};

/** Dropdown fields store the option index, so switching language keeps the choice. */
const SELECT_FIELDS: Partial<Record<FieldKey, "religionOptions" | "manglikOptions">> = {
  religion: "religionOptions",
  manglik: "manglikOptions",
};

const GROUPS: {
  id: "personal" | "career" | "family" | "contact";
  title: keyof Translation;
  heading: keyof Translation;
  fields: FieldKey[];
}[] = [
  {
    id: "personal", title: "personal", heading: "personalHeading",
    fields: ["name", "dob", "birthTime", "birthPlace", "height", "religion", "caste",
      "motherTongue", "rashi", "nakshatra", "gotra", "manglik", "complexion"],
  },
  { id: "career", title: "educationCareer", heading: "careerHeading",
    fields: ["education", "occupation", "income"] },
  { id: "family", title: "family", heading: "familyHeading",
    fields: ["fatherName", "fatherOccupation", "motherName", "motherOccupation", "siblings"] },
  { id: "contact", title: "contact", heading: "contactHeading", fields: ["address", "phone"] },
];

/** Shown in the preview until the user types something. Never exported. */
const SAMPLE: Record<Language, Biodata> = {
  en: {
    ...emptyData,
    name: "Rohan Patil", dob: "1998-03-14", birthTime: "06:45", birthPlace: "Pune",
    height: "5 ft 9 in", religion: "0", caste: "Maratha", motherTongue: "Marathi",
    rashi: "Mesh", nakshatra: "Ashwini", gotra: "Kashyap", manglik: "1", complexion: "Fair",
    education: "B.E. Computer Engineering", occupation: "Software Engineer, Pune",
    income: "₹ 12 Lakh", fatherName: "Sanjay Patil", fatherOccupation: "Businessman",
    motherName: "Sunita Patil", motherOccupation: "Homemaker", siblings: "1 sister (married)",
    address: "Kothrud, Pune - 411038", phone: "+91 98XXXXXXXX",
    about: "I am a calm, family-oriented person who enjoys travelling, cricket and music.",
    partner: "Looking for an educated, caring and understanding life partner.",
  },
  hi: {
    ...emptyData,
    name: "रोहन पाटील", dob: "1998-03-14", birthTime: "06:45", birthPlace: "पुणे",
    height: "5 फुट 9 इंच", religion: "0", caste: "मराठा", motherTongue: "मराठी",
    rashi: "मेष", nakshatra: "अश्विनी", gotra: "कश्यप", manglik: "1", complexion: "गोरा",
    education: "बी.ई. कंप्यूटर इंजीनियरिंग", occupation: "सॉफ्टवेयर इंजीनियर, पुणे",
    income: "₹ 12 लाख", fatherName: "संजय पाटील", fatherOccupation: "व्यवसायी",
    motherName: "सुनीता पाटील", motherOccupation: "गृहिणी", siblings: "1 बहन (विवाहित)",
    address: "कोथरुड, पुणे - 411038", phone: "+91 98XXXXXXXX",
    about: "मैं शांत और परिवार से जुड़ा व्यक्ति हूँ। मुझे यात्रा, क्रिकेट और संगीत पसंद है।",
    partner: "पढ़ी-लिखी, समझदार और स्नेहशील जीवनसाथी की तलाश है।",
  },
  mr: {
    ...emptyData,
    name: "रोहन पाटील", dob: "1998-03-14", birthTime: "06:45", birthPlace: "पुणे",
    height: "५ फूट ९ इंच", religion: "0", caste: "मराठा", motherTongue: "मराठी",
    rashi: "मेष", nakshatra: "अश्विनी", gotra: "काश्यप", manglik: "1", complexion: "गोरा",
    education: "बी.ई. कॉम्प्युटर इंजिनिअरिंग", occupation: "सॉफ्टवेअर इंजिनिअर, पुणे",
    income: "₹ १२ लाख", fatherName: "संजय पाटील", fatherOccupation: "व्यावसायिक",
    motherName: "सुनीता पाटील", motherOccupation: "गृहिणी", siblings: "१ बहीण (विवाहित)",
    address: "कोथरूड, पुणे - ४११०३८", phone: "+९१ ९८XXXXXXXX",
    about: "मी शांत आणि कुटुंबप्रिय आहे. मला प्रवास, क्रिकेट आणि संगीताची आवड आहे.",
    partner: "सुशिक्षित, समजूतदार आणि प्रेमळ जोडीदाराच्या शोधात आहे.",
  },
};

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "fbm:draft:v2";
const PHOTO_KEY = "fbm:photo:v2";
const PAGE_W = 794;
const PAGE_H = 1123;
const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700" +
  "&family=Poppins:wght@400;500;600;700" +
  "&family=Noto+Serif+Devanagari:wght@400;600;700" +
  "&family=Noto+Sans+Devanagari:wght@400;500;600;700&display=swap";

const LOCALE: Record<Language, string> = { en: "en-IN", hi: "hi-IN", mr: "mr-IN" };

function formatDate(value: string, lang: Language) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return value;
  try {
    return new Date(+m[1], +m[2] - 1, +m[3]).toLocaleDateString(LOCALE[lang], {
      day: "numeric", month: "long", year: "numeric",
    });
  } catch {
    return value;
  }
}

function formatTime(value: string, lang: Language) {
  const m = /^(\d{2}):(\d{2})$/.exec(value);
  if (!m) return value;
  try {
    return new Date(2000, 0, 1, +m[1], +m[2]).toLocaleTimeString(LOCALE[lang], {
      hour: "numeric", minute: "2-digit", hour12: true,
    });
  } catch {
    return value;
  }
}

function pickOption(options: string[], value: string) {
  return /^\d+$/.test(value) ? options[Number(value)] ?? "" : value;
}

/** Shrinks big photos so the page stays fast and the draft fits in localStorage. */
async function compressImage(file: File, maxSide = 700): Promise<string> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No canvas context");
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.88);
}

function PersonIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Ornate themed templates (all artwork is drawn here in SVG)          */
/* ------------------------------------------------------------------ */

type OrnateTheme = {
  id: string;
  names: Record<Language, string>;
  bg: string;        // page background (CSS)
  frame: string;     // outer border colour
  frame2: string;    // inner lines and ornaments
  ink: string;       // body text
  label: string;     // field labels and section headings
  title: string;     // the person's name
  headInk: string;   // header text colour
  panel: string;     // translucent panel behind the details
  top: "scallop" | "garland" | "arch" | "bloom";
  headFill?: string; // fill of the band or arch
  bismillah?: boolean;
  corners: boolean;  // flourishes in the corners
};

const BISMILLAH: Record<Language, string> = {
  en: "Bismillah ir-Rahman ir-Rahim",
  hi: "बिस्मिल्लाह हिर्रहमानिर्रहीम",
  mr: "बिस्मिल्लाह हिर्रहमानिर्रहीम",
};

const GOLD = "#e5b94e";
const GOLD2 = "#f0cf7a";

const ORNATE_THEMES: OrnateTheme[] = [
  {
    id: "o-saffron",
    names: { en: "Saffron Glow", hi: "केसरिया ग्लो", mr: "केशरी झळाळी" },
    bg: "linear-gradient(160deg,#fff4e3,#ffd8a6)", frame: "#c2410c", frame2: "#e9a23b",
    ink: "#4a2511", label: "#9a3412", title: "#9a3412", headInk: "#fff7ed",
    panel: "rgba(255,255,255,.55)", top: "scallop", headFill: "#c2410c", corners: true,
  },
  {
    id: "o-marigold",
    names: { en: "Marigold Garland", hi: "गेंदा माला", mr: "झेंडूची माळ" },
    bg: "#fffaf0", frame: "#d97706", frame2: "#f59e0b",
    ink: "#44260a", label: "#b45309", title: "#b45309", headInk: "#b45309",
    panel: "rgba(255,244,222,.85)", top: "garland", corners: true,
  },
  {
    id: "o-rani",
    names: { en: "Rani Magenta", hi: "रानी मैजेंटा", mr: "राणी मजेंटा" },
    bg: "linear-gradient(170deg,#8a1560,#5e0c45)", frame: GOLD, frame2: GOLD2,
    ink: "#fdf2f8", label: GOLD2, title: GOLD2, headInk: GOLD2,
    panel: "rgba(0,0,0,.22)", top: "scallop", headFill: "#3f0730", corners: true,
  },
  {
    id: "o-arch",
    names: { en: "Gold Arch", hi: "गोल्ड आर्च", mr: "गोल्ड आर्च" },
    bg: "linear-gradient(180deg,#fde68a,#f9c74f)", frame: "#9b1c1c", frame2: "#b45309",
    ink: "#3b0d0d", label: "#9b1c1c", title: "#9b1c1c", headInk: "#fef3c7",
    panel: "rgba(255,255,255,.45)", top: "arch", headFill: "#9b1c1c", corners: true,
  },
  {
    id: "o-ruby",
    names: { en: "Ruby Red", hi: "रूबी रेड", mr: "रुबी रेड" },
    bg: "linear-gradient(160deg,#8f1d1d,#5a0f0f)", frame: GOLD, frame2: GOLD2,
    ink: "#fff1e0", label: GOLD2, title: GOLD2, headInk: GOLD2,
    panel: "rgba(0,0,0,.25)", top: "garland", corners: true,
  },
  {
    id: "o-sapphire",
    names: { en: "Sapphire Blue", hi: "नीलम ब्लू", mr: "नीलम निळा" },
    bg: "linear-gradient(160deg,#173b8f,#0d2563)", frame: GOLD, frame2: GOLD2,
    ink: "#eef3ff", label: GOLD2, title: GOLD2, headInk: GOLD2,
    panel: "rgba(0,0,0,.22)", top: "scallop", headFill: "#0a1b4a", corners: true,
  },
  {
    id: "o-emerald",
    names: { en: "Emerald Arch", hi: "पन्ना आर्च", mr: "पाचू आर्च" },
    bg: "linear-gradient(160deg,#14604a,#0b3d2e)", frame: GOLD, frame2: GOLD2,
    ink: "#ecfdf5", label: GOLD2, title: GOLD2, headInk: GOLD2,
    panel: "rgba(0,0,0,.2)", top: "arch", headFill: "#082b20", bismillah: true, corners: true,
  },
  {
    id: "o-blush",
    names: { en: "Blush Bloom", hi: "ब्लश ब्लूम", mr: "ब्लश ब्लूम" },
    bg: "linear-gradient(180deg,#fff7f9,#ffe4ec)", frame: "#d6798f", frame2: "#e9a6b8",
    ink: "#4a2233", label: "#b83265", title: "#b83265", headInk: "#b83265",
    panel: "rgba(255,255,255,.7)", top: "bloom", corners: false,
  },
];

ORNATE_THEMES.forEach((o) =>
  templates.push({ id: o.id, color: o.frame, serif: true, bg: o.bg }),
);

const ORNATE_NAMES: Record<string, Record<Language, string>> = Object.fromEntries(
  ORNATE_THEMES.map((o) => [o.id, o.names]),
);

function Flower({
  x, y, r, petal, center, n = 8,
}: { x: number; y: number; r: number; petal: string; center: string; n?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {Array.from({ length: n }, (_, i) => (
        <ellipse
          key={i} cx={0} cy={-r * 0.62} rx={r * 0.3} ry={r * 0.5} fill={petal}
          transform={`rotate(${(360 / n) * i})`}
        />
      ))}
      <circle r={r * 0.28} fill={center} />
    </g>
  );
}

function OrnateArt({ th }: { th: OrnateTheme }) {
  const W = PAGE_W;
  const H = PAGE_H;

  const flourish = (tx: number, ty: number, sx: number, sy: number) => (
    <g
      key={`${tx}-${ty}`}
      transform={`translate(${tx} ${ty}) scale(${sx} ${sy})`}
      fill="none" stroke={th.frame2} strokeWidth={2}
    >
      <path d="M0 78 C0 34 34 0 78 0" />
      <path d="M0 58 C0 26 26 0 58 0" />
      <circle cx={14} cy={14} r={5} fill={th.frame2} stroke="none" />
      <ellipse cx={92} cy={6} rx={16} ry={5} fill={th.frame2} stroke="none" transform="rotate(12 92 6)" />
      <ellipse cx={6} cy={92} rx={5} ry={16} fill={th.frame2} stroke="none" transform="rotate(-12 6 92)" />
    </g>
  );

  const cluster = (cx: number, cy: number, sx: number, sy: number) => (
    <g key={`${cx}-${cy}`} transform={`translate(${cx} ${cy}) scale(${sx} ${sy})`}>
      <Flower x={46} y={46} r={36} petal="#f3b3c4" center="#f0b44c" />
      <Flower x={100} y={26} r={20} petal="#e9a6b8" center="#f0b44c" n={6} />
      <Flower x={26} y={100} r={20} petal="#e9a6b8" center="#f0b44c" n={6} />
      <ellipse cx={74} cy={64} rx={16} ry={6} fill="#a7c4a0" transform="rotate(40 74 64)" />
    </g>
  );

  const garlandCount = 13;

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0" aria-hidden="true">
      {/* faint mandala watermark */}
      <g transform={`translate(${W / 2} 620) scale(1.5)`} fill="none" stroke={th.frame2} opacity={0.1} strokeWidth={1.5}>
        {Array.from({ length: 16 }, (_, i) => (
          <ellipse key={i} cx={0} cy={-90} rx={14} ry={70} transform={`rotate(${i * 22.5})`} />
        ))}
        <circle r={40} /><circle r={70} /><circle r={130} />
      </g>

      {/* double frame */}
      <rect x={16} y={16} width={W - 32} height={H - 32} rx={6} fill="none" stroke={th.frame} strokeWidth={5} />
      <rect x={28} y={28} width={W - 56} height={H - 56} rx={3} fill="none" stroke={th.frame2} strokeWidth={1.5} />

      {th.corners && (
        <>
          {flourish(30, H - 30, 1, -1)}
          {flourish(W - 30, H - 30, -1, -1)}
          {th.top === "arch" && (
            <>
              {flourish(30, 30, 1, 1)}
              {flourish(W - 30, 30, -1, 1)}
            </>
          )}
        </>
      )}

      {th.top === "scallop" && (
        <>
          {Array.from({ length: 19 }, (_, i) => (
            <circle key={i} cx={22 + 44 * i} cy={92} r={22} fill={th.headFill} stroke={th.frame2} strokeWidth={2} />
          ))}
          <rect x={0} y={0} width={W} height={92} fill={th.headFill} />
          <line x1={0} y1={6} x2={W} y2={6} stroke={th.frame2} strokeWidth={1.5} />
        </>
      )}

      {th.top === "arch" && (
        <>
          <path d="M44 216 L44 140 Q44 34 397 34 Q750 34 750 140 L750 216 Z" fill={th.headFill} stroke={th.frame2} strokeWidth={3} />
          <path d="M58 210 L58 142 Q58 48 397 48 Q736 48 736 142 L736 210" fill="none" stroke={th.frame2} strokeWidth={1} opacity={0.7} />
        </>
      )}

      {th.top === "garland" &&
        Array.from({ length: garlandCount }, (_, i) => {
          const x = 70 + (i * (W - 140)) / (garlandCount - 1);
          return (
            <g key={i}>
              {i < garlandCount - 1 && (
                <ellipse cx={x + (W - 140) / (garlandCount - 1) / 2} cy={50} rx={14} ry={5} fill="#4d7c3a" transform={`rotate(${i % 2 ? 20 : -20} ${x + 30} 50)`} />
              )}
              <Flower x={x} y={46 + (i % 2) * 10} r={24} petal={i % 2 ? "#ea580c" : "#f59e0b"} center="#7c2d12" />
            </g>
          );
        })}

      {th.top === "bloom" && (
        <>
          {cluster(28, 28, 1, 1)}
          {cluster(W - 28, 28, -1, 1)}
          {cluster(28, H - 28, 1, -1)}
          {cluster(W - 28, H - 28, -1, -1)}
        </>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function BiodataMaker() {
  const [data, setData] = useState<Biodata>(emptyData);
  const [photo, setPhoto] = useState("");
  const [template, setTemplate] = useState<string>("classic");
  const [language, setLanguage] = useState<Language>("en");
  const [downloading, setDownloading] = useState(false);
  const [previewScale, setPreviewScale] = useState(0.6);
  const [hydrated, setHydrated] = useState(false);
  const [notice, setNotice] = useState("");
  const [overflowing, setOverflowing] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const t = translations[language];
  const theme = templates.find((x) => x.id === template) ?? templates[0];
  const isDevanagari = language !== "en";

  const isEmpty = useMemo(() => FIELD_KEYS.every((k) => !data[k].trim()), [data]);
  const source = isEmpty ? SAMPLE[language] : data;

  /** Everything the preview and export show, already formatted for the language. */
  const view: Biodata = useMemo(
    () => ({
      ...source,
      dob: formatDate(source.dob, language),
      birthTime: formatTime(source.birthTime, language),
      religion: pickOption(t.religionOptions, source.religion),
      manglik: pickOption(t.manglikOptions, source.manglik),
    }),
    [source, language, t],
  );

  const fontFamily = isDevanagari
    ? theme.serif
      ? "'Noto Serif Devanagari', 'Lora', serif"
      : "'Noto Sans Devanagari', 'Poppins', sans-serif"
    : theme.serif
      ? "'Lora', Georgia, serif"
      : "'Poppins', system-ui, sans-serif";

  /* Load web fonts once. */
  useEffect(() => {
    if (document.getElementById("fbm-fonts")) return;
    const link = document.createElement("link");
    link.id = "fbm-fonts";
    link.rel = "stylesheet";
    link.href = FONT_URL;
    document.head.appendChild(link);
  }, []);

  /* Restore the saved draft. */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.data) setData({ ...emptyData, ...saved.data });
        if (templates.some((x) => x.id === saved.template)) setTemplate(saved.template);
        if (saved.language in translations) setLanguage(saved.language);
      }
      const savedPhoto = localStorage.getItem(PHOTO_KEY);
      if (savedPhoto) setPhoto(savedPhoto);
    } catch {
      /* storage blocked: the form still works, it just won't be saved */
    }
    setHydrated(true);
  }, []);

  /* Save the draft (debounced). */
  useEffect(() => {
    if (!hydrated) return;
    const id = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, template, language }));
        if (photo) localStorage.setItem(PHOTO_KEY, photo);
        else localStorage.removeItem(PHOTO_KEY);
      } catch {
        /* ignore quota or privacy-mode errors */
      }
    }, 400);
    return () => clearTimeout(id);
  }, [data, template, language, photo, hydrated]);

  /* Fit the on-screen preview to the column and, on desktop, to the window height. */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const maxH = window.innerWidth >= 1024 ? window.innerHeight - 190 : Infinity;
      setPreviewScale(
        Math.max(0.3, Math.min(1, (el.clientWidth - 24) / PAGE_W, maxH / PAGE_H)),
      );
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  /* Warn when content is taller than one A4 page. */
  useEffect(() => {
    const check = () => {
      const el = pageRef.current;
      if (el) setOverflowing(el.scrollHeight > el.clientHeight + 2);
    };
    check();
    document.fonts?.ready.then(check);
  }, [view, template, language, photo]);

  function updateField(field: FieldKey, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
    setNotice("");
  }

  async function uploadPhoto(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) return setNotice(t.invalidPhoto);
    if (file.size > 10 * 1024 * 1024) return setNotice(t.largePhoto);
    try {
      setPhoto(await compressImage(file));
      setNotice("");
    } catch {
      setNotice(t.photoError);
    }
  }

  function clearAll() {
    if (!window.confirm(t.clearConfirm)) return;
    setData(emptyData);
    setPhoto("");
    setNotice("");
  }

  async function capture(kind: "png" | "jpeg") {
    const node = previewRef.current;
    if (!node) throw new Error("Preview is not available");

    // Make sure every font used on the page has actually loaded before drawing.
    try {
      await Promise.all(
        ["Lora", "Poppins", "Noto Serif Devanagari", "Noto Sans Devanagari"].flatMap((f) => [
          document.fonts.load(`400 16px "${f}"`, "Ab अआ"),
          document.fonts.load(`700 16px "${f}"`, "Ab अआ"),
        ]),
      );
      await document.fonts.ready;
    } catch {
      /* continue with whatever is loaded */
    }

    const options = {
      pixelRatio: 2,
      backgroundColor: "#ffffff",
      width: PAGE_W,
      height: PAGE_H,
      cacheBust: true,
      style: { transform: "none", transformOrigin: "top left", margin: "0" },
    };
    // First pass warms up fonts and images (fixes blank text on Safari). Result is discarded.
    await toPng(node, { ...options, pixelRatio: 1 });
    return kind === "png"
      ? toPng(node, options)
      : toJpeg(node, { ...options, quality: 0.95 });
  }

  async function download(kind: "png" | "pdf") {
    if (isEmpty) return setNotice(t.fillFirst);
    const base =
      (data.name.trim().replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "") || "my") +
      "-marriage-biodata";
    try {
      setDownloading(true);
      setNotice("");
      if (kind === "png") {
        const link = document.createElement("a");
        link.download = `${base}.png`;
        link.href = await capture("png");
        link.click();
      } else {
        const image = await capture("jpeg");
        const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4", compress: true });
        pdf.addImage(image, "JPEG", 0, 0, 210, 297, undefined, "FAST");
        pdf.save(`${base}.pdf`);
      }
    } catch (error) {
      console.error(error);
      setNotice(kind === "png" ? t.imageError : t.pdfError);
    } finally {
      setDownloading(false);
    }
  }

  /* ---------------------------- preview pieces ---------------------------- */

  const label = (f: FieldKey) => t[LABEL_KEY[f]] as string;
  const heading = (g: (typeof GROUPS)[number]) => t[g.heading] as string;

  const rowsOf = (g: (typeof GROUPS)[number]): InfoRow[] =>
    g.fields
      .filter((f) => f !== "name")
      .map((f) => [label(f), view[f]] as InfoRow)
      .filter(([, v]) => v.trim() !== "");

  function renderSection(g: (typeof GROUPS)[number], box = "") {
    const rows = rowsOf(g);
    if (rows.length === 0) return null;
    const body = (
      <section className="mt-3 w-full min-w-0">
        <h3
          className="border-b pb-1 text-sm font-bold"
          style={{ borderColor: theme.color, color: theme.color }}
        >
          {heading(g)}
        </h3>
        <div className="mt-2 min-w-0 space-y-1">
          {rows.map(([l, v]) => (
            <div
              key={l}
              className="grid w-full min-w-0 grid-cols-[minmax(100px,155px)_minmax(0,1fr)] gap-2 text-xs"
            >
              <span className="min-w-0 break-words font-bold">{l}</span>
              <span className="min-w-0 whitespace-pre-wrap [overflow-wrap:anywhere]">{v}</span>
            </div>
          ))}
        </div>
      </section>
    );
    return box ? (
      <div key={g.id} className={box}>
        {body}
      </div>
    ) : (
      <div key={g.id}>{body}</div>
    );
  }

  const sections = (ids: string[], box = "") =>
    GROUPS.filter((g) => ids.includes(g.id)).map((g) => renderSection(g, box));

  function renderText(value: string, title: string, box = "") {
    if (!value.trim()) return null;
    const body = (
      <section className="mt-5 min-w-0">
        <h3
          className="border-b-2 pb-2 text-base font-bold"
          style={{ borderColor: theme.color, color: theme.color }}
        >
          {title}
        </h3>
        <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 [overflow-wrap:anywhere]">
          {value}
        </p>
      </section>
    );
    return box ? <div className={box}>{body}</div> : body;
  }

  const renderAbout = (box = "") => renderText(view.about, t.aboutHeading, box);
  const renderPartner = (box = "") => renderText(view.partner, t.partnerHeading, box);

  function renderPhoto(className: string) {
    return photo ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={photo} alt="" className={className} />
    ) : (
      <div className={`${className} flex items-center justify-center bg-stone-100 text-stone-400`}>
        <PersonIcon className="h-1/2 w-1/2" />
      </div>
    );
  }

  const name = view.name.trim() || t.yourName;

  function renderModernRows(rows: InfoRow[]) {
    return (
      <div className="mt-4 space-y-4 text-sm">
        {rows
          .filter(([, v]) => v.trim() !== "")
          .map(([l, v]) => (
            <div key={l} className="min-w-0">
              <p className="text-xs text-blue-200">{l}</p>
              <p className="mt-1 break-words font-semibold [overflow-wrap:anywhere]">{v}</p>
            </div>
          ))}
      </div>
    );
  }

  const personalGroup = GROUPS[0];
  const contactGroup = GROUPS[3];

  function renderOrnate(th: OrnateTheme): ReactNode {
    const pos = {
      scallop: { head: 14, body: 128 },
      garland: { head: 84, body: 196 },
      arch: { head: 74, body: 236 },
      bloom: { head: 62, body: 158 },
    }[th.top];
    const blessing = th.bismillah ? BISMILLAH[language] : t.blessing;
    const panelStyle = { background: th.panel, border: `1px solid ${th.frame2}` };

    const block = (g: (typeof GROUPS)[number]) => {
      const rows = rowsOf(g);
      if (rows.length === 0) return null;
      return (
        <div key={g.id} className="mb-3">
          <h3
            className="mb-1.5 border-b pb-0.5 text-[14px] font-bold"
            style={{ color: th.label, borderColor: th.frame2 }}
          >
            {heading(g)}
          </h3>
          {rows.map(([l, v]) => (
            <div key={l} className="grid grid-cols-[100px_minmax(0,1fr)] gap-2 py-[2px] text-[13px] leading-snug">
              <span className="font-semibold" style={{ color: th.label }}>{l}</span>
              <span className="whitespace-pre-wrap [overflow-wrap:anywhere]">{v}</span>
            </div>
          ))}
        </div>
      );
    };

    const text = (value: string, title: string) =>
      value.trim() ? (
        <div className="min-w-0 rounded-xl px-4 py-3" style={panelStyle}>
          <h3 className="mb-1 text-[14px] font-bold" style={{ color: th.label }}>{title}</h3>
          <p className="whitespace-pre-wrap text-[13px] leading-5 [overflow-wrap:anywhere]">{value}</p>
        </div>
      ) : null;

    return (
      <div className="relative h-full w-full" style={{ background: th.bg, color: th.ink }}>
        <OrnateArt th={th} />

        <div className="absolute inset-x-0 text-center" style={{ top: pos.head, color: th.headInk }}>
          <p className="text-[13px] font-semibold tracking-wide">{blessing}</p>
          <h2 className="mt-1 text-[28px] font-bold leading-tight">{t.marriage}</h2>
          <svg width="170" height="12" viewBox="0 0 170 12" className="mx-auto mt-1" aria-hidden="true">
            <line x1="0" y1="6" x2="72" y2="6" stroke="currentColor" strokeWidth="1" />
            <line x1="98" y1="6" x2="170" y2="6" stroke="currentColor" strokeWidth="1" />
            <path d="M85 0 L91 6 L85 12 L79 6 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="absolute flex flex-col" style={{ top: pos.body, left: 62, right: 62, bottom: 54 }}>
          <div className="flex items-center gap-5 rounded-xl p-4" style={panelStyle}>
            <div className="min-w-0 flex-1">
              <h1 className="break-words text-[32px] font-bold leading-tight" style={{ color: th.title }}>
                {name}
              </h1>
              <p className="mt-1 text-[14px] opacity-80">{t.profileLabel}</p>
            </div>
            <div className="shrink-0 rounded-md p-1" style={panelStyle}>
              {renderPhoto("h-[148px] w-[117px] object-cover")}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-x-6 rounded-xl p-4" style={panelStyle}>
            <div className="min-w-0">{block(GROUPS[0])}</div>
            <div className="min-w-0">
              {block(GROUPS[1])}
              {block(GROUPS[2])}
              {block(GROUPS[3])}
            </div>
          </div>

          {(view.about.trim() || view.partner.trim()) && (
            <div
              className={`mt-3 grid gap-3 ${
                view.about.trim() && view.partner.trim() ? "grid-cols-2" : "grid-cols-1"
              }`}
            >
              {text(view.about, t.aboutHeading)}
              {text(view.partner, t.partnerHeading)}
            </div>
          )}

          <p className="mt-auto pt-2 text-center text-[13px]" style={{ color: th.frame2 }}>
            ✦ {th.bismillah ? t.wishes : t.shubh} ✦
          </p>
        </div>
      </div>
    );
  }

  function renderTemplate(): ReactNode {
    const ornate = ORNATE_THEMES.find((o) => o.id === template);
    if (ornate) return renderOrnate(ornate);
    switch (template) {
      case "royal":
        return (
          <div className="h-full p-7" style={{ background: "#fbf4e5", border: "12px double #b38a43" }}>
            <div className="flex h-full flex-col border-2 p-7" style={{ borderColor: "#d2ad67" }}>
              <div className="bg-[#49301d] px-6 py-7 text-center text-white">
                <p className="text-xs tracking-widest text-amber-200">{t.presented}</p>
                <h2 className="mt-3 text-3xl font-bold text-amber-100">{t.marriage}</h2>
                <div className="mx-auto mt-4 h-1 w-24 bg-amber-300" />
                <p className="mt-3 text-xs text-amber-100">{t.profile}</p>
              </div>
              <div className="mt-7 flex items-center gap-6 border-b border-amber-300 pb-6">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-amber-800">{t.presented}</p>
                  <h1 className="mt-3 break-words text-3xl font-bold text-[#67451f]">{name}</h1>
                  <p className="mt-2 text-sm text-amber-800">{t.beginning}</p>
                </div>
                {renderPhoto("h-32 w-28 shrink-0 border-4 border-amber-200 object-cover")}
              </div>
              {renderAbout("mt-5 rounded-lg border border-amber-200 bg-white/60 px-4 py-1")}
              {sections(["personal", "career", "family", "contact"])}
              {renderPartner("mt-5 rounded-lg border border-amber-200 bg-white/60 px-4 py-1")}
              <div className="mt-auto pt-6 text-center text-sm font-bold text-amber-800">
                ✦ {t.wishes} ✦
              </div>
            </div>
          </div>
        );

      case "royalTraditional":
        return (
          <div
            className="h-full w-full p-8"
            style={{ background: "#29172f", color: "#f5e7c8", border: "8px solid #c6a15b" }}
          >
            <div className="flex h-full flex-col border border-[#c6a15b] px-7 py-6">
              <div className="border-b border-[#9d7b45] pb-4 text-center">
                <p className="text-2xl text-[#e5c27d]">ॐ</p>
                <p className="mt-1 text-sm font-semibold tracking-wider">{t.blessing}</p>
              </div>
              <div className="flex items-center gap-7 border-b border-[#9d7b45] py-6">
                <div className="min-w-0 flex-1">
                  <p className="text-xs tracking-[0.2em] text-[#d5b77f]">{t.profile}</p>
                  <h1 className="mt-3 break-words text-4xl font-bold text-[#f0d49b]">{name}</h1>
                  <p className="mt-2 text-sm text-[#d5b77f]">{t.marriage}</p>
                </div>
                {renderPhoto("h-40 w-32 shrink-0 border-2 border-[#d5ad69] object-cover")}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-x-8">
                <div className="min-w-0">{sections(["personal", "career"])}</div>
                <div className="min-w-0">{sections(["family", "contact"])}</div>
              </div>
              <div className="min-w-0 px-0">
                {renderAbout()}
                {renderPartner()}
              </div>
              <div className="mt-auto border-t border-[#9d7b45] pt-4 text-center">
                <p className="text-sm font-semibold tracking-widest text-[#e5c27d]">
                  ✦ {t.shubh} ✦
                </p>
              </div>
            </div>
          </div>
        );

      case "modern":
        return (
          <div className="flex h-full">
            <aside
              className="flex h-full w-[265px] shrink-0 flex-col px-6 py-10 text-white"
              style={{ background: "linear-gradient(180deg, #18344f, #24476b, #142b42)" }}
            >
              <div className="text-center">
                {renderPhoto("mx-auto h-36 w-32 border-4 border-white/70 object-cover")}
                <h1 className="mt-5 break-words text-2xl font-bold">{name}</h1>
                <p className="mt-2 text-xs text-blue-100">{t.profileLabel}</p>
              </div>
              <div className="mt-10">
                <h3 className="border-b border-white/40 pb-2 text-sm font-bold text-blue-100">
                  {t.personal}
                </h3>
                {renderModernRows(rowsOf(personalGroup))}
              </div>
              <div className="mt-8">
                <h3 className="border-b border-white/40 pb-2 text-sm font-bold text-blue-100">
                  {t.contact}
                </h3>
                {renderModernRows(rowsOf(contactGroup))}
              </div>
              <div className="mt-auto pt-8 text-center text-xs text-blue-200">{t.profile}</div>
            </aside>
            <div className="flex min-w-0 flex-1 flex-col px-8 py-10">
              <div className="border-b-4 border-[#24476b] pb-5">
                <p className="text-xs font-bold text-blue-800">{t.introduction}</p>
                <h2 className="mt-2 text-3xl font-bold text-[#24476b]">{t.marriage}</h2>
                <p className="mt-2 text-xs text-stone-500">{t.aboutFamily}</p>
              </div>
              {renderAbout()}
              {sections(["career", "family"])}
              {renderPartner()}
              <div className="mt-auto border-t border-stone-200 pt-4 text-center text-xs text-stone-400">
                {t.marriage}
              </div>
            </div>
          </div>
        );

      case "floral": {
        const card = "mt-5 rounded-2xl bg-white px-5 py-1 shadow-sm";
        return (
          <div className="h-full p-9" style={{ background: "#fff4f7", border: "12px double #d98ba8" }}>
            <div
              className="flex h-full flex-col rounded-[35px] border-2 border-dashed p-7"
              style={{ borderColor: "#d98ba8" }}
            >
              <div className="text-center">
                <p className="text-3xl text-pink-400">❀ ❀ ❀</p>
                <h2 className="mt-3 text-3xl font-bold text-[#b34c78]">{t.marriage}</h2>
                <p className="mt-2 text-sm text-pink-700">{t.newBeginning}</p>
              </div>
              <div className="mt-5 flex items-center gap-6 rounded-2xl bg-white p-5 shadow-sm">
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-pink-500">{t.introducing}</p>
                  <h1 className="mt-2 break-words text-3xl font-bold text-[#b34c78]">{name}</h1>
                  <p className="mt-2 text-sm text-stone-500">{t.profileLabel}</p>
                </div>
                {renderPhoto("h-32 w-28 shrink-0 rounded-2xl border-4 border-pink-100 object-cover")}
              </div>
              {renderAbout(card)}
              {sections(["personal", "career", "family", "contact"], card)}
              {renderPartner(card)}
              <div className="mt-auto pt-5 text-center text-2xl text-pink-400">❀ ✿ ❀</div>
            </div>
          </div>
        );
      }

      case "minimal":
        return (
          <div className="flex h-full flex-col bg-white px-12 py-12">
            <div className="flex items-center justify-between border-b-4 border-stone-800 pb-7">
              <div className="min-w-0 flex-1 pr-5">
                <p className="text-xs font-bold text-stone-500">{t.profile}</p>
                <h2 className="mt-3 text-3xl font-bold text-stone-900">{t.marriage}</h2>
                <div className="mt-4 h-1 w-16 bg-stone-800" />
              </div>
              {renderPhoto("h-32 w-28 shrink-0 border border-stone-300 object-cover")}
            </div>
            <div className="mt-8">
              <h1 className="break-words text-3xl font-bold text-stone-900">{name}</h1>
              <p className="mt-2 text-sm text-stone-500">{t.profileLabel}</p>
            </div>
            {renderAbout()}
            {sections(["personal", "career", "family", "contact"])}
            {renderPartner()}
            <div className="mt-auto border-t border-stone-300 pt-5 text-center text-xs text-stone-400">
              {t.marriage}
            </div>
          </div>
        );

      default: /* classic */
        return (
          <div className="h-full p-10" style={{ background: "#fffdf8", border: `12px double ${theme.color}` }}>
            <div className="flex h-full flex-col border p-8" style={{ borderColor: "#d5b46a" }}>
              <div className="text-center">
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: theme.color }}>
                  {t.aBeautifulJourney}
                </p>
                <h2 className="mt-3 text-3xl font-bold" style={{ color: theme.color }}>
                  {t.marriage}
                </h2>
                <div className="mx-auto mt-5 h-1 w-28 bg-amber-400" />
                <p className="mt-3 text-xs text-stone-500">{t.profile}</p>
              </div>
              <div className="mt-8 flex items-center gap-6">
                <div className="min-w-0 flex-1">
                  <h1 className="break-words text-3xl font-bold" style={{ color: theme.color }}>
                    {name}
                  </h1>
                  <p className="mt-2 text-sm text-stone-500">{t.profileLabel}</p>
                </div>
                {renderPhoto("h-32 w-28 shrink-0 border-4 border-white object-cover shadow-md")}
              </div>
              {renderAbout()}
              {sections(["personal", "career", "family", "contact"])}
              {renderPartner()}
              <div className="mt-auto pt-5 text-center text-xs text-stone-400">✦ {t.marriage} ✦</div>
            </div>
          </div>
        );
    }
  }

  /* ------------------------------- form ---------------------------------- */

  const placeholder = (f: FieldKey) =>
    language === "en" ? `${t.enter} ${label(f).toLowerCase()}` : `${label(f)} ${t.enter}`;

  const inputClass =
    "w-full rounded-lg border border-stone-300 bg-white px-3 py-3 text-base text-stone-900 " +
    "placeholder:text-stone-500 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100";

  function renderField(f: FieldKey) {
    const id = `f-${f}`;
    const selectKey = SELECT_FIELDS[f];
    const wide = f === "address";
    return (
      <div key={f} className={wide ? "sm:col-span-2" : ""}>
        <label htmlFor={id} className="mb-1 block text-sm font-medium">
          {label(f)}
        </label>
        {selectKey ? (
          <select
            id={id}
            value={data[f]}
            onChange={(e) => updateField(f, e.target.value)}
            className={inputClass}
          >
            <option value="">— {t.select} —</option>
            {(t[selectKey] as string[]).map((opt, i) => (
              <option key={i} value={String(i)}>
                {opt}
              </option>
            ))}
          </select>
        ) : wide ? (
          <textarea
            id={id}
            rows={2}
            maxLength={200}
            value={data[f]}
            onChange={(e) => updateField(f, e.target.value)}
            placeholder={placeholder(f)}
            className={inputClass}
          />
        ) : (
          <input
            id={id}
            type={f === "dob" ? "date" : f === "birthTime" ? "time" : f === "phone" ? "tel" : "text"}
            inputMode={f === "phone" ? "tel" : undefined}
            autoComplete="off"
            maxLength={120}
            value={data[f]}
            onChange={(e) => updateField(f, e.target.value)}
            placeholder={placeholder(f)}
            className={inputClass}
          />
        )}
      </div>
    );
  }

  const downloadButtons = (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={() => download("pdf")}
        disabled={downloading}
        className="rounded-xl bg-orange-600 px-3 py-3 text-sm font-bold text-white hover:bg-orange-700 disabled:opacity-50"
      >
        {downloading ? t.preparing : t.downloadPDF}
      </button>
      <button
        type="button"
        onClick={() => download("png")}
        disabled={downloading}
        className="rounded-xl bg-stone-800 px-3 py-3 text-sm font-bold text-white hover:bg-stone-900 disabled:opacity-50"
      >
        {downloading ? t.preparing : t.downloadPNG}
      </button>
    </div>
  );

  /* ------------------------------- page ---------------------------------- */

  return (
    <main
      className="min-h-screen bg-[#fffaf5] pb-28 text-stone-800 lg:pb-10"
      style={{
        fontFamily: isDevanagari
          ? "'Noto Sans Devanagari', system-ui, sans-serif"
          : undefined,
      }}
    >
      {/* Devanagari conjuncts break if letters are spaced apart, so switch spacing off. */}
      <style>{`.no-track, .no-track * { letter-spacing: normal !important; }`}</style>

      <header className="border-b bg-white px-5 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="text-xl font-extrabold">
            FreeBiodata<span className="text-orange-600">Makers</span>
          </a>
          <a href="/" className="text-sm font-semibold text-orange-700">
            {t.home}
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-5 sm:py-8">
        <div className="mb-6 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-700">{t.freeTool}</p>
          <h1 className="mt-2 text-2xl font-extrabold sm:text-4xl">{t.pageTitle}</h1>
          <p className="mt-2 text-stone-600">{t.subtitle}</p>

          <div
            role="group"
            aria-label={t.language}
            className="mx-auto mt-5 inline-flex rounded-full border border-orange-200 bg-white p-1"
          >
            {(Object.keys(LANGUAGE_NAMES) as Language[]).map((code) => (
              <button
                key={code}
                type="button"
                aria-pressed={language === code}
                onClick={() => setLanguage(code)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  language === code
                    ? "bg-orange-600 text-white"
                    : "text-stone-700 hover:bg-orange-50"
                }`}
              >
                {LANGUAGE_NAMES[code]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
          {/* FORM */}
          <section className="min-w-0 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold">{t.formTitle}</h2>
                <p className="mt-1 text-sm text-stone-600">{t.formSubtitle}</p>
              </div>
              <button
                type="button"
                onClick={clearAll}
                className="rounded-lg border border-stone-300 px-3 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-50"
              >
                {t.clear}
              </button>
            </div>

            {/* Templates first, so the user can pick a look straight away. */}
            <div className="mt-6">
              <h3 className="mb-3 text-base font-bold">{t.choose}</h3>
              <div className="-mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-2">
                {templates.map((item) => {
                  const active = template === item.id;
                  const nameLabel =
                    ORNATE_NAMES[item.id]?.[language] ??
                    (t.templateNames as Record<string, string>)[item.id];
                  return (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setTemplate(item.id)}
                      aria-pressed={active}
                      className={`relative w-28 shrink-0 snap-start rounded-xl border-2 p-2 text-left transition ${
                        active
                          ? "border-orange-500 bg-orange-50 shadow-md"
                          : "border-stone-200 bg-white hover:border-orange-300"
                      }`}
                    >
                      <div className="flex aspect-[3/4] items-center justify-center rounded-lg bg-stone-100 p-2">
                        <div
                          className="flex h-full w-full flex-col items-center border-4 bg-white p-1.5"
                          style={{ borderColor: item.color, background: item.bg ?? "#fff" }}
                        >
                          <div className="mb-2 h-1.5 w-3/4 rounded-full" style={{ backgroundColor: item.color }} />
                          <div className="mb-2 h-6 w-6 rounded-full border border-stone-200 bg-stone-100" />
                          <div className="w-full space-y-1.5">
                            <div className="h-1 w-full rounded bg-stone-200" />
                            <div className="h-1 w-4/5 rounded bg-stone-200" />
                            <div className="h-1 w-full rounded bg-stone-200" />
                          </div>
                        </div>
                      </div>
                      {active && (
                        <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                          ✓
                        </span>
                      )}
                      <p className="mt-2 text-xs font-bold leading-tight">{nameLabel}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Photo */}
            <div className="mt-6">
              <p className="mb-2 font-semibold">{t.photo}</p>
              <div className="flex flex-wrap items-center gap-4">
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo} alt="" className="h-20 w-16 rounded-xl object-cover" />
                ) : (
                  <div className="flex h-20 w-16 items-center justify-center rounded-xl bg-orange-50 text-orange-300">
                    <PersonIcon className="h-9 w-9" />
                  </div>
                )}
                <label className="cursor-pointer rounded-lg border border-orange-300 px-4 py-3 text-sm font-semibold text-orange-800 hover:bg-orange-50">
                  {t.upload}
                  <input type="file" accept="image/*" className="hidden" onChange={uploadPhoto} />
                </label>
                {photo && (
                  <button
                    type="button"
                    onClick={() => setPhoto("")}
                    className="text-sm font-semibold text-red-600"
                  >
                    {t.remove}
                  </button>
                )}
              </div>
              <p className="mt-2 text-xs text-stone-600">{t.photoHint}</p>
            </div>

            {GROUPS.map((g) => (
              <div key={g.id} className="mt-8">
                <h3 className="mb-4 border-b border-orange-200 pb-2 text-lg font-bold text-orange-800">
                  {t[g.title] as string}
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">{g.fields.map(renderField)}</div>
              </div>
            ))}

            <div className="mt-8">
              <h3 className="mb-4 border-b border-orange-200 pb-2 text-lg font-bold text-orange-800">
                {t.additional}
              </h3>
              {(["about", "partner"] as const).map((f, i) => (
                <div key={f} className={i ? "mt-5" : ""}>
                  <label htmlFor={`f-${f}`} className="mb-1 block text-sm font-medium">
                    {label(f)}
                  </label>
                  <textarea
                    id={`f-${f}`}
                    rows={4}
                    maxLength={400}
                    value={data[f]}
                    onChange={(e) => updateField(f, e.target.value)}
                    placeholder={placeholder(f)}
                    className={inputClass}
                  />
                  <p className="mt-1 text-right text-xs text-stone-500">{data[f].length}/400</p>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-stone-600">{t.saved}</p>
          </section>

          {/* PREVIEW */}
          <section id="preview" className="min-w-0 lg:sticky lg:top-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold">{t.preview}</h2>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800">
                  {t.live}
                </span>
              </div>
              <div className="hidden w-full max-w-xs lg:block">{downloadButtons}</div>
            </div>

            {isEmpty && (
              <p className="mb-3 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900">
                {t.sampleBanner}
              </p>
            )}
            {overflowing && (
              <p role="alert" className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
                {t.overflow}
              </p>
            )}
            {notice && (
              <p role="alert" className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">
                {notice}
              </p>
            )}

            <div ref={containerRef} className="w-full overflow-hidden rounded-xl bg-stone-200 p-3">
              <div
                className="mx-auto"
                style={{ width: PAGE_W * previewScale, height: PAGE_H * previewScale }}
              >
                <div
                  ref={previewRef}
                  className={`relative overflow-hidden bg-white ${isDevanagari ? "no-track" : ""}`}
                  style={{
                    width: PAGE_W,
                    height: PAGE_H,
                    transform: `scale(${previewScale})`,
                    transformOrigin: "top left",
                    color: "#292524",
                    fontFamily,
                    opacity: isEmpty ? 0.9 : 1,
                  }}
                >
                  {/* Fixed A4 page. Anything taller than this gets flagged above. */}
                  <div
                    ref={pageRef}
                    style={{ width: PAGE_W, height: PAGE_H, position: "relative", overflow: "hidden" }}
                  >
                    {renderTemplate()}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-xs text-stone-600">{t.private}</p>
          </section>
        </div>
      </div>

      {/* Mobile: keep Download within thumb reach. */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-stone-200 bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className="mx-auto max-w-md">
          {downloadButtons}
          <a
            href="#preview"
            className="mt-2 block text-center text-xs font-semibold text-orange-800 underline"
          >
            {t.preview}
          </a>
        </div>
      </div>
    </main>
  );
}
