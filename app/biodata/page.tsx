"use client";

import SeoContentSection from "@/app/components/SeoContentSection";
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
/* Types and Data                                                     */
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
  overflow: "Your content is longer than one page. Shorten text to fit.",
  select: "Select",
  enter: "Enter",
  fullName: "Full Name",
  dob: "Date of Birth",
  birthTime: "Time of Birth",
  birthPlace: "Place of Birth",
  height: "Height",
  religion: "Religion / Caste",
  caste: "Caste / Sub-Caste",
  motherTongue: "Mother Tongue",
  rashi: "Rashi",
  nakshatra: "Nakshatra",
  gotra: "Gotra",
  manglik: "Manglik",
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
  phone: "Contact No.",
  religionOptions: ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Other"],
  manglikOptions: ["No", "Yes", "Partial (Anshik)", "Don't know"],
  aboutHeading: "ABOUT ME",
  partnerHeading: "PARTNER EXPECTATIONS",
  personalHeading: "Personal Details",
  careerHeading: "Education & Career",
  familyHeading: "Family Details",
  contactHeading: "Contact Details",
  marriage: "BIO DATA",
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
  blessing: "|| Shree Ganeshaya Namaha ||",
  shubh: "Shubh Mangalam",
  invalidPhoto: "Please select an image file (JPG or PNG).",
  largePhoto: "Please select an image smaller than 10 MB.",
  photoError: "Could not read this photo. Try a JPG or PNG.",
  imageError: "Unable to generate PNG. Please try again.",
  pdfError: "Unable to generate PDF. Please try again.",
  templateNames: {
    classic: "Classic Traditional",
    royal: "Royal Gold",
    modern: "Modern Blue",
    floral: "Floral Pink",
    minimal: "Minimal Clean",
    royalTraditional: "Royal Crimson",
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
  overflow: "आपकी जानकारी एक पेज से ज़्यादा है। टेक्स्ट छोटा करें।",
  select: "चुनें",
  enter: "दर्ज करें",
  fullName: "पूरा नाम",
  dob: "जन्म तिथि",
  birthTime: "जन्म का समय",
  birthPlace: "जन्म स्थान",
  height: "लंबाई",
  religion: "धर्म / जाति",
  caste: "जाति / उप-जाति",
  motherTongue: "मातृभाषा",
  rashi: "राशि",
  nakshatra: "नक्षत्र",
  gotra: "गोत्र",
  manglik: "मांगलिक",
  complexion: "रंग",
  educationLabel: "शिक्षा",
  occupation: "व्यवसाय / नौकरी",
  income: "वार्षिक आय",
  father: "पिता का नाम",
  fatherOccupation: "पिता का व्यवसाय",
  mother: "माता का नाम",
  motherOccupation: "माता का व्यवसाय",
  siblings: "भाई / बहन",
  address: "पता",
  phone: "संपर्क नंबर",
  religionOptions: ["हिंदू", "मुस्लिम", "ईसाई", "सिख", "बौद्ध", "जैन", "अन्य"],
  manglikOptions: ["नहीं", "हाँ", "आंशिक", "पता नहीं"],
  aboutHeading: "मेरे बारे में",
  partnerHeading: "जीवनसाथी से अपेक्षाएं",
  personalHeading: "व्यक्तिगत विवरण",
  careerHeading: "शिक्षा और करियर",
  familyHeading: "पारिवारिक विवरण",
  contactHeading: "संपर्क विवरण",
  marriage: "बायोडाटा",
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
    modern: "मॉडर्न ब्लू",
    floral: "फ्लोरल पिंक",
    minimal: "मिनिमल",
    royalTraditional: "रॉयल रेड",
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
  private: "तुमचा बायोडाटा तुमच्या ब्राउझरमध्ये तयार होतो. तो सर्वरवर अपलोड होत नाही.",
  saved: "ड्राफ्ट फक्त याच डिव्हाइसवर सेव्ह आहे.",
  clear: "फॉर्म साफ करा",
  clearConfirm: "सर्व माहिती आणि फोटो काढून टाकायचा?",
  sampleBanner: "हा नमुना प्रीव्ह्यू आहे. टाइप करायला सुरुवात करा.",
  fillFirst: "डाउनलोड करण्यापूर्वी कृपया तुमची माहिती भरा.",
  overflow: "तुमची माहिती एका पानापेक्षा जास्त आहे. मजकूर कमी करा.",
  select: "निवडा",
  enter: "प्रविष्ट करा",
  fullName: "पूर्ण नाव",
  dob: "जन्मतारीख",
  birthTime: "जन्माची वेळ",
  birthPlace: "जन्मस्थान",
  height: "उंची",
  religion: "धर्म / जात",
  caste: "जात / पोटजात",
  motherTongue: "मातृभाषा",
  rashi: "रास",
  nakshatra: "नक्षत्र",
  gotra: "गोत्र",
  manglik: "मंगळ",
  complexion: "वर्ण",
  educationLabel: "शिक्षण",
  occupation: "व्यवसाय / नोकरी",
  income: "वार्षिक उत्पन्न",
  father: "वडिलांचे नाव",
  fatherOccupation: "वडिलांचा व्यवसाय",
  mother: "आईचे नाव",
  motherOccupation: "आईचा व्यवसाय",
  siblings: "भाऊ / बहिणी",
  address: "पत्ता",
  phone: "संपर्क क्रमांक",
  religionOptions: ["हिंदू", "मुस्लिम", "ख्रिश्चन", "शीख", "बौद्ध", "जैन", "इतर"],
  manglikOptions: ["नाही", "होय", "अंशतः", "माहीत नाही"],
  aboutHeading: "माझ्याबद्दल",
  partnerHeading: "जोडीदाराकडून अपेक्षा",
  personalHeading: "वैयक्तिक माहिती",
  careerHeading: "शिक्षण आणि करिअर",
  familyHeading: "कौटुंबिक माहिती",
  contactHeading: "संपर्क माहिती",
  marriage: "बायोडाटा",
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
    modern: "मॉडर्न ब्लू",
    floral: "फ्लोरल पिंक",
    minimal: "मिनिमल",
    royalTraditional: "रॉयल रेड",
  },
};

const translations: Record<Language, Translation> = { en, hi, mr };

const LANGUAGE_NAMES: Record<Language, string> = {
  en: "English",
  hi: "हिंदी",
  mr: "मराठी",
};

const LABEL_KEY: Record<FieldKey, keyof Translation> = {
  name: "fullName", dob: "dob", birthTime: "birthTime", birthPlace: "birthPlace",
  height: "height", religion: "religion", caste: "caste", motherTongue: "motherTongue",
  rashi: "rashi", nakshatra: "nakshatra", gotra: "gotra", manglik: "manglik",
  complexion: "complexion", education: "educationLabel", occupation: "occupation",
  income: "income", fatherName: "father", fatherOccupation: "fatherOccupation",
  motherName: "mother", motherOccupation: "motherOccupation", siblings: "siblings",
  address: "address", phone: "phone", about: "about", partner: "partner",
};

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
    fields: ["name", "dob", "birthTime", "height", "birthPlace", "religion", "caste",
      "rashi", "nakshatra", "gotra", "manglik", "complexion", "education", "occupation"],
  },
  { id: "family", title: "family", heading: "familyHeading",
    fields: ["fatherName", "fatherOccupation", "motherName", "motherOccupation", "siblings"] },
  { id: "contact", title: "contact", heading: "contactHeading", fields: ["phone", "address"] },
];

const SAMPLE: Record<Language, Biodata> = {
  en: {
    ...emptyData,
    name: "Rohan D. Deshmukh", dob: "25 March 1997", birthTime: "04:20 PM", birthPlace: "Nagpur, Maharashtra",
    height: "5' 9\" (175 cm)", religion: "Hindu - Deshastha Brahmin", caste: "Brahmin", motherTongue: "Marathi",
    rashi: "Mesh", nakshatra: "Ashwini", gotra: "Kashyap", manglik: "0", complexion: "Fair",
    education: "B.Tech (IIT Nagpur), M.S. (TU Munich)", occupation: "Senior Cloud Architect at Amazon Web Services",
    income: "₹ 28 Lakh PA", fatherName: "Dr. Narendra G. Deshmukh (Professor)",
    fatherOccupation: "HOD Mechanical Dept.", motherName: "Dr. Anjali N. Deshmukh",
    motherOccupation: "Chief Medical Officer", siblings: "1 Younger Brother (Pursuing M.S.)",
    address: "B-304, Green Meadows, Ramdaspeth, Nagpur - 440010", phone: "+91 98230 XXXXX / +91 97664 XXXXX",
    about: "I am a balanced and family-oriented person who values culture and modern career growth.",
    partner: "Looking for an educated, understanding partner with traditional family values.",
  },
  hi: {
    ...emptyData,
    name: "रोहन डी. देशमुख", dob: "25 मार्च 1997", birthTime: "04:20 PM", birthPlace: "नागपुर, महाराष्ट्र",
    height: "5 फुट 9 इंच", religion: "हिंदू - देशस्थ ब्राह्मण", caste: "ब्राह्मण", motherTongue: "मराठी",
    rashi: "मेष", nakshatra: "अश्विनी", gotra: "कश्यप", manglik: "0", complexion: "गोरा",
    education: "बी.टेक (आईआईटी), एम.एस. (जर्मनी)", occupation: "सीनियर क्लाउड आर्किटेक्ट, एडब्ल्यूएस",
    income: "₹ 28 लाख वार्षिक", fatherName: "डॉ. नरेंद्र जी. देशमुख", fatherOccupation: "प्रोफेसर एवं विभागाध्यक्ष",
    motherName: "डॉ. अंजलि एन. देशमुख", motherOccupation: "मुख्य चिकित्सा अधिकारी", siblings: "1 छोटा भाई (एम.एस. छात्र)",
    address: "रामदासपेठ, नागपुर - 440010", phone: "+91 98230 XXXXX",
    about: "मैं शांत और परिवार से जुड़ा व्यक्ति हूँ।", partner: "पढ़ी-लिखी और समझदार जीवनसाथी की तलाश है।",
  },
  mr: {
    ...emptyData,
    name: "रोहन डी. देशमुख", dob: "२५ मार्च १९९७", birthTime: "०४:२० PM", birthPlace: "नागपूर, महाराष्ट्र",
    height: "५ फूट ९ इंच", religion: "हिंदू - देशस्थ ब्राह्मण", caste: "ब्राह्मण", motherTongue: "मराठी",
    rashi: "मेष", nakshatra: "अश्विनी", gotra: "काश्यप", manglik: "0", complexion: "गोरा",
    education: "बी.टेक (आयआयटी), एम.एस. (जर्मनी)", occupation: "सिनिअर क्लाउड आर्किटेक्ट, एडब्ल्यूएस",
    income: "₹ २८ लाख वार्षिक", fatherName: "डॉ. नरेंद्र जी. देशमुख", fatherOccupation: "प्राध्यापक व विभागप्रमुख",
    motherName: "डॉ. अंजली एन. देशमुख", motherOccupation: "मुख्य वैद्यकीय अधिकारी", siblings: "१ लहान भाऊ (एम.एस. शिक्षण)",
    address: "रामदासपेठ, नागपूर - ४४००१०", phone: "+९१ ९८२३० XXXXX",
    about: "मी शांत आणि कुटुंबप्रिय आहे.", partner: "सुशिक्षित आणि समजूतदार जोडीदाराच्या शोधात आहे.",
  },
};

/* ------------------------------------------------------------------ */
/* Helpers & Vector Icons                                             */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "fbm:draft:v3";
const PHOTO_KEY = "fbm:photo:v3";
const PAGE_W = 794;
const PAGE_H = 1123;
const FONT_URL =
  "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400" +
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

function GaneshaIcon({ className = "h-12 w-12", color = "#9a3412" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill={color} aria-hidden="true">
      <path d="M50 5 C35 5 25 15 25 30 C25 40 30 48 38 52 C32 58 28 66 28 76 C28 84 34 90 42 90 C48 90 50 84 50 78 C50 84 52 90 58 90 C66 90 72 84 72 76 C72 66 68 58 62 52 C70 48 75 40 75 30 C75 15 65 5 50 5 Z M50 16 C58 16 63 21 63 28 C63 35 58 40 50 40 C42 40 37 35 37 28 C37 21 42 16 50 16 Z M50 48 C42 48 36 41 36 33 C36 25 42 19 50 19 C58 19 64 25 64 33 C64 41 58 48 50 48 Z" />
      <circle cx="50" cy="12" r="3" />
      <path d="M30 35 C20 35 15 45 22 55" stroke={color} strokeWidth="3" fill="none" />
      <path d="M70 35 C80 35 85 45 78 55" stroke={color} strokeWidth="3" fill="none" />
    </svg>
  );
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
/* Ornate Themed Templates                                            */
/* ------------------------------------------------------------------ */

type OrnateTheme = {
  id: string;
  names: Record<Language, string>;
  bg: string;
  frame: string;
  frame2: string;
  ink: string;
  label: string;
  title: string;
  headInk: string;
  panel: string;
  top: "amber" | "marigold" | "magenta" | "arch" | "crimson" | "sapphire" | "emerald" | "blush";
  headFill?: string;
  bismillah?: boolean;
};

const BISMILLAH: Record<Language, string> = {
  en: "Bismillah-ir-Rahman-ir-Rahim",
  hi: "बिस्मिल्लाह हिर्रहमानिर्रहीम",
  mr: "बिस्मिल्लाह हिर्रहमानिर्रहीम",
};

const GOLD = "#d4af37";
const GOLD2 = "#f3e5ab";

const ORNATE_THEMES: OrnateTheme[] = [
  {
    id: "o-amber",
    names: { en: "Amber Classic", hi: "एम्बर क्लासिक", mr: "अंबर क्लासिक" },
    bg: "#fffcf7", frame: "#9a3412", frame2: "#d97706",
    ink: "#3b1a0e", label: "#9a3412", title: "#7c2d12", headInk: "#7c2d12",
    panel: "rgba(255, 253, 248, 0.95)", top: "amber",
  },
  {
    id: "o-marigold",
    names: { en: "Marigold Garland", hi: "गेंदा गार्लैंड", mr: "झेंडू माळ" },
    bg: "#fffdf0", frame: "#b45309", frame2: "#f59e0b",
    ink: "#3a2008", label: "#b45309", title: "#92400e", headInk: "#78350F",
    panel: "rgba(255, 254, 245, 0.95)", top: "marigold",
  },
  {
    id: "o-magenta",
    names: { en: "Magenta Royal", hi: "मैजेंटा रॉयल", mr: "मजेंटा रॉयल" },
    bg: "#fff8fa", frame: "#831843", frame2: GOLD,
    ink: "#4a042e", label: "#831843", title: "#831843", headInk: GOLD2,
    panel: "#ffffff", top: "magenta", headFill: "#701a45",
  },
  {
    id: "o-arch",
    names: { en: "Royal Red Arch", hi: "रॉयल रेड आर्च", mr: "रॉयल रेड आर्च" },
    bg: "#fffbfb", frame: "#991b1b", frame2: GOLD,
    ink: "#450a0a", label: "#991b1b", title: "#7f1d1d", headInk: GOLD2,
    panel: "#ffffff", top: "arch", headFill: "#881337",
  },
  {
    id: "o-crimson",
    names: { en: "Crimson Gold Filigree", hi: "क्रिमसन गोल्ड", mr: "क्रिमसन गोल्ड" },
    bg: "#5c0612", frame: GOLD, frame2: GOLD2,
    ink: "#fff5f5", label: GOLD2, title: GOLD2, headInk: GOLD2,
    panel: "rgba(0,0,0,0.35)", top: "crimson",
  },
  {
    id: "o-sapphire",
    names: { en: "Sapphire Royal Blue", hi: "रॉयल ब्लू", mr: "रॉयल निळा" },
    bg: "#f8fafc", frame: "#1e3a8a", frame2: GOLD,
    ink: "#0f172a", label: "#1e3a8a", title: "#1e3a8a", headInk: "#1e3a8a",
    panel: "#ffffff", top: "sapphire",
  },
  {
    id: "o-emerald",
    names: { en: "Emerald Vine", hi: "एमराल्ड वाइन", mr: "एमराल्ड वाइन" },
    bg: "#f0fdf4", frame: "#14532d", frame2: GOLD,
    ink: "#052e16", label: "#14532d", title: "#14532d", headInk: GOLD2,
    panel: "rgba(255,255,255,0.92)", top: "emerald", headFill: "#14532d", bismillah: true,
  },
  {
    id: "o-blush",
    names: { en: "Blush Rose Floral", hi: "ब्लश रोज फ्लोरल", mr: "ब्लश रोझ फ्लोरल" },
    bg: "#fff5f7", frame: "#be185d", frame2: "#f472b6",
    ink: "#4c0519", label: "#be185d", title: "#9d174d", headInk: "#be185d",
    panel: "#ffffff", top: "blush",
  },
];

const templates: TemplateMeta[] = [
  { id: "classic", color: "#9f343e", serif: true },
  { id: "royal", color: "#a67c32", serif: true },
  { id: "modern", color: "#24476b", serif: false },
  { id: "floral", color: "#c45b83", serif: true },
  { id: "minimal", color: "#475569", serif: false },
  { id: "royalTraditional", color: "#d5ad69", serif: true },
];

ORNATE_THEMES.forEach((o) =>
  templates.push({ id: o.id, color: o.frame, serif: true, bg: o.bg }),
);

const ORNATE_NAMES: Record<string, Record<Language, string>> = Object.fromEntries(
  ORNATE_THEMES.map((o) => [o.id, o.names]),
);

function FlowerPattern({ x, y, size = 20, fill = "#f59e0b" }: { x: number; y: number; size?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={size * 0.3} fill={fill} />
      {Array.from({ length: 6 }).map((_, i) => (
        <circle
          key={i}
          cx={Math.cos((i * Math.PI) / 3) * size * 0.6}
          cy={Math.sin((i * Math.PI) / 3) * size * 0.6}
          r={size * 0.25}
          fill={fill}
          opacity={0.8}
        />
      ))}
    </g>
  );
}

function OrnateArt({ th }: { th: OrnateTheme }) {
  const W = PAGE_W;
  const H = PAGE_H;

  const flourishCorner = (tx: number, ty: number, sx: number, sy: number) => (
    <g key={`${tx}-${ty}`} transform={`translate(${tx} ${ty}) scale(${sx} ${sy})`} fill="none" stroke={th.frame2} strokeWidth={2}>
      <path d="M0 60 C0 25 25 0 60 0" />
      <path d="M0 45 C0 18 18 0 45 0" />
      <circle cx="10" cy="10" r="4" fill={th.frame2} />
      <path d="M 65 0 C 65 15 15 65 0 65" strokeWidth="1" strokeDasharray="3 3" />
    </g>
  );

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0" aria-hidden="true">
      {/* Background Watermark Mandala */}
      <g transform={`translate(${W / 2} 620)`} fill="none" stroke={th.frame2} opacity={0.07} strokeWidth={1.5}>
        {Array.from({ length: 12 }).map((_, i) => (
          <ellipse key={i} cx={0} cy={-100} rx={18} ry={80} transform={`rotate(${i * 30})`} />
        ))}
        <circle r={50} />
        <circle r={90} />
        <circle r={140} />
      </g>

      {/* Main Double Frame */}
      <rect x={18} y={18} width={W - 36} height={H - 36} rx={8} fill="none" stroke={th.frame} strokeWidth={4} />
      <rect x={28} y={28} width={W - 56} height={H - 56} rx={4} fill="none" stroke={th.frame2} strokeWidth={1.5} />

      {/* Corners */}
      {flourishCorner(32, 32, 1, 1)}
      {flourishCorner(W - 32, 32, -1, 1)}
      {flourishCorner(32, H - 32, 1, -1)}
      {flourishCorner(W - 32, H - 32, -1, -1)}

      {/* Top Header Variations */}
      {th.top === "marigold" && (
        <g>
          {Array.from({ length: 15 }).map((_, i) => (
            <FlowerPattern key={i} x={50 + i * 48} y={42} size={18} fill={i % 2 === 0 ? "#ea580c" : "#f59e0b"} />
          ))}
          <path d="M 35 48 Q 400 70 760 48" fill="none" stroke="#65a30d" strokeWidth="3" />
        </g>
      )}

      {th.top === "magenta" && (
        <g>
          <path d="M 28 28 L 766 28 L 766 110 Q 397 150 28 110 Z" fill={th.headFill || th.frame} />
          <path d="M 28 110 Q 397 150 766 110" fill="none" stroke={GOLD} strokeWidth="2" />
        </g>
      )}

      {th.top === "arch" && (
        <g>
          <path d="M 40 130 L 40 100 Q 397 20 754 100 L 754 130 Z" fill={th.headFill || th.frame} />
          <path d="M 48 125 L 48 102 Q 397 28 746 102 L 746 125" fill="none" stroke={GOLD} strokeWidth="1.5" />
        </g>
      )}

      {th.top === "emerald" && (
        <g>
          <path d="M 28 28 L 766 28 L 766 115 Q 397 155 28 115 Z" fill={th.headFill || th.frame} />
        </g>
      )}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function BiodataMaker() {
  const [data, setData] = useState<Biodata>(emptyData);
  const [photo, setPhoto] = useState("");
  const [template, setTemplate] = useState<string>("o-amber");
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

  useEffect(() => {
    if (document.getElementById("fbm-fonts")) return;
    const link = document.createElement("link");
    link.id = "fbm-fonts";
    link.rel = "stylesheet";
    link.href = FONT_URL;
    document.head.appendChild(link);
  }, []);

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
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const id = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, template, language }));
        if (photo) localStorage.setItem(PHOTO_KEY, photo);
        else localStorage.removeItem(PHOTO_KEY);
      } catch {}
    }, 400);
    return () => clearTimeout(id);
  }, [data, template, language, photo, hydrated]);

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

    try {
      await Promise.all(
        ["Lora", "Poppins", "Noto Serif Devanagari", "Noto Sans Devanagari"].flatMap((f) => [
          document.fonts.load(`400 16px "${f}"`, "Ab अआ"),
          document.fonts.load(`700 16px "${f}"`, "Ab अआ"),
        ]),
      );
      await document.fonts.ready;
    } catch {}

    const options = {
      pixelRatio: 2,
      backgroundColor: "#ffffff",
      width: PAGE_W,
      height: PAGE_H,
      cacheBust: true,
      style: { transform: "none", transformOrigin: "top left", margin: "0" },
    };
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

  /* ---------------------------- Render Pieces ---------------------------- */

  const label = (f: FieldKey) => t[LABEL_KEY[f]] as string;
  const heading = (g: (typeof GROUPS)[number]) => t[g.heading] as string;

  const rowsOf = (g: (typeof GROUPS)[number]): InfoRow[] =>
    g.fields
      .map((f) => [label(f), view[f]] as InfoRow)
      .filter(([, v]) => v.trim() !== "");

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

  /* Ornate Traditional Layout Renderer (Matching Screenshot Designs) */
  function renderOrnate(th: OrnateTheme): ReactNode {
    const blessing = th.bismillah ? BISMILLAH[language] : t.blessing;

    const renderKeyValueList = (fieldsList: InfoRow[], labelColor: string) => (
      <div className="space-y-1.5">
        {fieldsList.map(([l, v]) => (
          <div key={l} className="grid grid-cols-[135px_12px_1fr] items-baseline text-[13.5px] leading-snug">
            <span className="font-semibold tracking-wide" style={{ color: labelColor }}>{l}</span>
            <span className="text-center font-bold" style={{ color: labelColor }}>:</span>
            <span className="whitespace-pre-wrap font-medium [overflow-wrap:anywhere]">{v}</span>
          </div>
        ))}
      </div>
    );

    const personalRows = rowsOf(GROUPS[0]);
    const familyRows = rowsOf(GROUPS[1]);
    const contactRows = rowsOf(GROUPS[2]);

    return (
      <div className="relative h-full w-full p-11" style={{ background: th.bg, color: th.ink }}>
        <OrnateArt th={th} />

        {/* Top Header Blessing & Title */}
        <div className="relative z-10 text-center pt-2 pb-3">
          {!th.bismillah && (
            <div className="flex justify-center mb-1">
              <GaneshaIcon className="h-10 w-10" color={th.top === "magenta" || th.top === "arch" || th.top === "emerald" || th.top === "crimson" ? GOLD2 : th.label} />
            </div>
          )}
          <p className="text-[13px] font-bold tracking-wider" style={{ color: th.headInk }}>
            {blessing}
          </p>
          <h1 className="mt-1 text-[26px] font-black tracking-widest uppercase" style={{ color: th.headInk }}>
            {t.marriage}
          </h1>
          <div className="mx-auto mt-1 h-[2px] w-32" style={{ background: th.frame2 }} />
        </div>

        {/* Content Body */}
        <div className="relative z-10 mt-3 space-y-5 px-4">
          
          {/* Section 1: Personal Details (Left) + Photo (Right) */}
          <div className="relative">
            <h2 className="mb-2.5 border-b pb-1 text-[15px] font-bold uppercase tracking-wider" style={{ color: th.label, borderColor: th.frame2 }}>
              {heading(GROUPS[0])}
            </h2>

            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                {renderKeyValueList(personalRows, th.label)}
              </div>

              {/* Photo Display Card */}
              <div className="shrink-0 pl-2">
                <div className="p-1.5 rounded-lg border shadow-md" style={{ background: th.panel, borderColor: th.frame2 }}>
                  {renderPhoto("h-[160px] w-[130px] rounded object-cover")}
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Family Details */}
          {familyRows.length > 0 && (
            <div>
              <h2 className="mb-2.5 border-b pb-1 text-[15px] font-bold uppercase tracking-wider" style={{ color: th.label, borderColor: th.frame2 }}>
                {heading(GROUPS[1])}
              </h2>
              {renderKeyValueList(familyRows, th.label)}
            </div>
          )}

          {/* Section 3: Contact Details */}
          {contactRows.length > 0 && (
            <div>
              <h2 className="mb-2.5 border-b pb-1 text-[15px] font-bold uppercase tracking-wider" style={{ color: th.label, borderColor: th.frame2 }}>
                {heading(GROUPS[2])}
              </h2>
              {renderKeyValueList(contactRows, t.contactHeading ? th.label : th.label)}
            </div>
          )}

          {/* Extra Blocks: About & Partner */}
          {view.about.trim() && (
            <div>
              <h2 className="mb-1.5 border-b pb-1 text-[15px] font-bold uppercase tracking-wider" style={{ color: th.label, borderColor: th.frame2 }}>
                {t.aboutHeading}
              </h2>
              <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{view.about}</p>
            </div>
          )}

          {view.partner.trim() && (
            <div>
              <h2 className="mb-1.5 border-b pb-1 text-[15px] font-bold uppercase tracking-wider" style={{ color: th.label, borderColor: th.frame2 }}>
                {t.partnerHeading}
              </h2>
              <p className="text-[13px] leading-relaxed whitespace-pre-wrap">{view.partner}</p>
            </div>
          )}
        </div>

        {/* Bottom Footer Greeting */}
        <div className="absolute inset-x-0 bottom-8 text-center">
          <p className="text-[13px] font-bold tracking-widest" style={{ color: th.frame2 }}>
            ✦ {th.bismillah ? t.wishes : t.shubh} ✦
          </p>
        </div>
      </div>
    );
  }

  function renderTemplate(): ReactNode {
    const ornate = ORNATE_THEMES.find((o) => o.id === template);
    if (ornate) return renderOrnate(ornate);

    // Fallback standard layouts
    return renderOrnate(ORNATE_THEMES[0]);
  }

  /* ------------------------------- Form Inputs ---------------------------------- */

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
            type={f === "dob" ? "text" : f === "birthTime" ? "text" : f === "phone" ? "tel" : "text"}
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

  /* ------------------------------- Main Page ---------------------------------- */

  return (
    <main
      className="min-h-screen bg-[#fffaf5] pb-28 text-stone-800 lg:pb-10"
      style={{
        fontFamily: isDevanagari
          ? "'Noto Sans Devanagari', system-ui, sans-serif"
          : undefined,
      }}
    >
      <style>{`.no-track, .no-track * { letter-spacing: normal !important; }`}</style>

      <header className="border-b bg-white px-5 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="text-xl font-extrabold">
            MarriageBiodata<span className="text-orange-600">Studio</span>
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

            {/* Template Selector Grid */}
            <div className="mt-6">
              <h3 className="mb-3 text-base font-bold">{t.choose}</h3>
              <div className="-mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-2">
                {templates.map((item) => {
                  const active = template === item.id;
                  const nameLabel =
                    ORNATE_NAMES[item.id]?.[language] ??
                    (t.templateNames as Record<string, string>)[item.id] ??
                    item.id;
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

            {/* Photo Upload */}
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

            {/* Input Sections */}
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
                    rows={3}
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
                    opacity: isEmpty ? 0.95 : 1,
                  }}
                >
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

      {/* Mobile Sticky Bar */}
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

      {/* Added SEO Content & FAQ Schema Section */}
      <SeoContentSection />

    </main>
  );
}