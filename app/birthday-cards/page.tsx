"use client";
import BirthdaySeoContent from "@/app/components/BirthdaySeoContent";
import { useEffect, useRef, useState, useMemo } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

type Language = "en" | "hi" | "mr";
type EventType = "birthday" | "ganesh" | "puja";

type CategoryKey = "all" | "traditional" | "royal" | "floral" | "modern" | "party";

type CardData = {
  name: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  host: string;
  message: string;
};

type DesignConfig = {
  id: string;
  category: CategoryKey;
  name: { en: string; hi: string; mr: string };
  background: string;
  color: string;
  accent: string;
  border: string;
  borderStyle?: string;
  font: string;
  decoration: string;
  badgeBg: string;
};

// --- Translations ---
const translations = {
  en: {
    title: "Invitation & Greeting Card Studio",
    subtitle: "Design & download custom invitations for your celebrations.",
    backHome: "← Back to Home",
    language: "Language",
    event: "Select Event Type",
    birthday: "Birthday Party",
    ganesh: "Ganesh Chaturthi",
    puja: "Puja Ceremony",
    details: "Event Details",
    name: "Person Being Celebrated / Event Title",
    date: "Date",
    time: "Time",
    venue: "Venue Name",
    address: "Venue Address",
    host: "Hosted By / Family Name",
    message: "Invitation Message",
    designs: "Choose Template Design",
    searchPlaceholder: "Search templates...",
    categories: {
      all: "All Designs",
      traditional: "Festive & Traditional",
      royal: "Royal & Luxury",
      floral: "Floral & Soft",
      modern: "Modern & Minimal",
      party: "Party & Playful",
    },
    preview: "Live Card Preview",
    png: "Download PNG",
    pdf: "Download PDF",
    loading: "Generating Card...",
    birthdayTitle: "Birthday Celebration",
    ganeshTitle: "Ganpati Bappa Morya!",
    pujaTitle: "You Are Cordially Invited",
    birthdaySubtitle: "Join us to celebrate a very special day",
    ganeshSubtitle: "With devotion & joy, we invite you to our home",
    pujaSubtitle: "We seek your presence and blessings at our ceremony",
    nameLabel: "CELEBRATING",
    dateLabel: "DATE",
    timeLabel: "TIME",
    venueLabel: "VENUE",
    hostLabel: "WITH BEST COMPLIMENTS FROM",
    defaultMessage: "Your presence and warm blessings will make our celebration complete!",
  },
  hi: {
    title: "निमंत्रण कार्ड मेकर",
    subtitle: "अपने खास अवसरों के लिए सुंदर निमंत्रण कार्ड बनाएं।",
    backHome: "← मुख्य पृष्ठ",
    language: "भाषा",
    event: "कार्यक्रम चुनें",
    birthday: "जन्मदिन समारोह",
    ganesh: "गणेश चतुर्थी",
    puja: "पूजा समारोह",
    details: "कार्यक्रम की जानकारी",
    name: "नाम / कार्यक्रम का नाम",
    date: "तारीख",
    time: "समय",
    venue: "स्थान का नाम",
    address: "पूरा पता",
    host: "आयोजक / परिवार का नाम",
    message: "निमंत्रण संदेश",
    designs: "डिजाइन टेंप्लेट चुनें",
    searchPlaceholder: "टेंप्लेट खोजें...",
    categories: {
      all: "सभी डिजाइन",
      traditional: "पारंपरिक एवं उत्सव",
      royal: "शाही एवं लक्जरी",
      floral: "फूलों की सजावट",
      modern: "आधुनिक एवं सरल",
      party: "पार्टी एवं मस्ती",
    },
    preview: "कार्ड पूर्वावलोकन",
    png: "PNG डाउनलोड करें",
    pdf: "PDF डाउनलोड करें",
    loading: "तैयार हो रहा है...",
    birthdayTitle: "जन्मदिन समारोह",
    ganeshTitle: "गणपति बाप्पा मोरया!",
    pujaTitle: "सादर आमंत्रण",
    birthdaySubtitle: "इस खास दिन को हमारे साथ मनाएं",
    ganeshSubtitle: "भक्ति और आनंद के साथ आपका हार्दिक स्वागत है",
    pujaSubtitle: "हम आपको पूजा समारोह में आमंत्रित करते हैं",
    nameLabel: "शुभ अवसर",
    dateLabel: "तारीख",
    timeLabel: "समय",
    venueLabel: "स्थान",
    hostLabel: "सादर निवेदक",
    defaultMessage: "आपकी गरिमामयी उपस्थिति हमारे समारोह की शोभा बढ़ाएगी!",
  },
  mr: {
    title: "निमंत्रण पत्रिका निर्माता",
    subtitle: "तुमच्या खास प्रसंगांसाठी सुंदर निमंत्रण पत्रिका तयार करा.",
    backHome: "← मुख्य पान",
    language: "भाषा",
    event: "कार्यक्रम निवडा",
    birthday: "वाढदिवस समारंभ",
    ganesh: "गणेश चतुर्थी",
    puja: "पूजा समारंभ",
    details: "कार्यक्रमाची माहिती",
    name: "नाव / शुभ प्रसंग",
    date: "तारीख",
    time: "वेळ",
    venue: "कार्यस्थळ",
    address: "पूर्ण पत्ता",
    host: "आयोजक / कुटुंबाचे नाव",
    message: "निमंत्रण संदेश",
    designs: "डिझाइन निवडा",
    searchPlaceholder: "डिझाइन शोधा...",
    categories: {
      all: "सर्व डिझाईन्स",
      traditional: "पारंपरिक व उत्सव",
      royal: "शाही व लक्झरी",
      floral: "फुलांची सजावट",
      modern: "आधुनिक व सोपे",
      party: "पार्टी व आनंद",
    },
    preview: "पत्रिका पूर्वदृश्य",
    png: "PNG डाउनलोड करा",
    pdf: "PDF डाउनलोड करा",
    loading: "तयार होत आहे...",
    birthdayTitle: "वाढदिवस समारंभ",
    ganeshTitle: "गणपती बाप्पा मोरया!",
    pujaTitle: "सस्नेह निमंत्रण",
    birthdaySubtitle: "हा खास दिवस आमच्यासोबत आनंदात साजरा करा",
    ganeshSubtitle: "भक्ती आणि आनंदाने आपले सहर्ष स्वागत आहे",
    pujaSubtitle: "पूजा समारंभासाठी आपणास आग्रहाचे निमंत्रण",
    nameLabel: "शुभ प्रसंग",
    dateLabel: "तारीख",
    timeLabel: "वेळ",
    venueLabel: "स्थळ",
    hostLabel: "आपले स्नेही",
    defaultMessage: "आपली उपस्थिती आमचा आनंद द्विगुणित करेल!",
  },
};

// --- 32 Distinct Template Designs ---
const ALL_DESIGNS: DesignConfig[] = [
  // Traditional & Festive
  {
    id: "traditional_gold",
    category: "traditional",
    name: { en: "Marigold Classic", hi: "गेंदा क्लासिक", mr: "झेंडू क्लासिक" },
    background: "#FFF8E7",
    color: "#5C1D06",
    accent: "#D97706",
    border: "#B45309",
    borderStyle: "double",
    font: "Georgia, serif",
    decoration: "🪔 ✨ 🪔",
    badgeBg: "linear-gradient(135deg, #FFF8E7, #FDE68A)",
  },
  {
    id: "divine_maroon",
    category: "traditional",
    name: { en: "Divine Crimson", hi: "दिव्य मैरून", mr: "दिव्य मरून" },
    background: "#4A0E17",
    color: "#FDE68A",
    accent: "#F59E0B",
    border: "#F59E0B",
    borderStyle: "double",
    font: "Georgia, serif",
    decoration: "🕉️ ✦ 🕉️",
    badgeBg: "linear-gradient(135deg, #4A0E17, #78350F)",
  },
  {
    id: "ganesh_orange",
    category: "traditional",
    name: { en: "Saffron Utsav", hi: "केसरिया उत्सव", mr: "केसरीत उत्सव" },
    background: "#FFF7ED",
    color: "#7C2D12",
    accent: "#EA580C",
    border: "#C2410C",
    font: "Georgia, serif",
    decoration: "🪔 🌸 🪔",
    badgeBg: "linear-gradient(135deg, #FFEDD5, #FDBA74)",
  },
  {
    id: "mandala_amber",
    category: "traditional",
    name: { en: "Mandala Amber", hi: "मंडला एम्बर", mr: "मंडला अंबर" },
    background: "#FEF3C7",
    color: "#78350F",
    accent: "#D97706",
    border: "#B45309",
    font: "Georgia, serif",
    decoration: "☸️ ✧ ☸️",
    badgeBg: "linear-gradient(135deg, #FEF3C7, #FCD34D)",
  },
  {
    id: "south_silk",
    category: "traditional",
    name: { en: "Kanjeevaram Red", hi: "कांचीवरम रेड", mr: "कांजिवरम रेड" },
    background: "#6B0A1D",
    color: "#FEF08A",
    accent: "#EAB308",
    border: "#CA8A04",
    font: "Georgia, serif",
    decoration: "🪔 🌺 🪔",
    badgeBg: "linear-gradient(135deg, #6B0A1D, #991B1B)",
  },
  {
    id: "turmeric_yellow",
    category: "traditional",
    name: { en: "Haldi Festive", hi: "हल्दी उत्सव", mr: "हळदी उत्सव" },
    background: "#FEF08A",
    color: "#713F12",
    accent: "#CA8A04",
    border: "#A16207",
    font: "Georgia, serif",
    decoration: "✨ 🌼 ✨",
    badgeBg: "linear-gradient(135deg, #FEF08A, #FACC15)",
  },
  {
    id: "copper_tradition",
    category: "traditional",
    name: { en: "Copper Glow", hi: "कॉपर चमक", mr: "कॉपर ग्लो" },
    background: "#FFF1F2",
    color: "#881337",
    accent: "#E11D48",
    border: "#BE123C",
    font: "Georgia, serif",
    decoration: "🪔 ✧ 🪔",
    badgeBg: "linear-gradient(135deg, #FFE4E6, #FDA4AF)",
  },

  // Royal & Luxury
  {
    id: "royal_velvet",
    category: "royal",
    name: { en: "Royal Velvet", hi: "रॉयल वेलवेट", mr: "रॉयल मखमली" },
    background: "#31122B",
    color: "#FDE68A",
    accent: "#E3BD69",
    border: "#E3BD69",
    borderStyle: "double",
    font: "Georgia, serif",
    decoration: "✦ ❖ ✦",
    badgeBg: "linear-gradient(135deg, #31122B, #581C87)",
  },
  {
    id: "emerald_gold",
    category: "royal",
    name: { en: "Emerald Majesty", hi: "एमराल्ड रॉयल", mr: "एमराल्ड रॉयल" },
    background: "#064E3B",
    color: "#ECFDF5",
    accent: "#F59E0B",
    border: "#10B981",
    font: "Georgia, serif",
    decoration: "⚜️ ✦ ⚜️",
    badgeBg: "linear-gradient(135deg, #064E3B, #047857)",
  },
  {
    id: "midnight_sapphire",
    category: "royal",
    name: { en: "Midnight Sapphire", hi: "मिडनाइट नीलम", mr: "मिडनाइट सफायर" },
    background: "#0F172A",
    color: "#E2E8F0",
    accent: "#38BDF8",
    border: "#0284C7",
    font: "Georgia, serif",
    decoration: "🌌 ✦ 🌌",
    badgeBg: "linear-gradient(135deg, #0F172A, #1E293B)",
  },
  {
    id: "imperial_purple",
    category: "royal",
    name: { en: "Imperial Crown", hi: "इंपीरियल पर्पल", mr: "इम्पिरियल जांभळा" },
    background: "#4C1D95",
    color: "#F3E8FF",
    accent: "#C084FC",
    border: "#A855F7",
    font: "Georgia, serif",
    decoration: "👑 ✦ 👑",
    badgeBg: "linear-gradient(135deg, #4C1D95, #6B21A8)",
  },
  {
    id: "black_gold_vip",
    category: "royal",
    name: { en: "Black Gold Luxe", hi: "ब्लैक गोल्ड लक्जरी", mr: "ब्लॅक गोल्ड लक्झरी" },
    background: "#18181B",
    color: "#FEF08A",
    accent: "#EAB308",
    border: "#CA8A04",
    borderStyle: "double",
    font: "Georgia, serif",
    decoration: "✦ 💎 ✦",
    badgeBg: "linear-gradient(135deg, #18181B, #27272A)",
  },
  {
    id: "ruby_regal",
    category: "royal",
    name: { en: "Regal Ruby", hi: "रीगल रूबी", mr: "रीगल रुबी" },
    background: "#881337",
    color: "#FFE4E6",
    accent: "#FB7185",
    border: "#F43F5E",
    font: "Georgia, serif",
    decoration: "❖ ✧ ❖",
    badgeBg: "linear-gradient(135deg, #881337, #9F1239)",
  },
  {
    id: "gold_brocade",
    category: "royal",
    name: { en: "Golden Shimmer", hi: "गोल्डन शिमर", mr: "गोल्डन शिमर" },
    background: "#FEF9C3",
    color: "#713F12",
    accent: "#CA8A04",
    border: "#EAB308",
    borderStyle: "double",
    font: "Georgia, serif",
    decoration: "✦ ✨ ✦",
    badgeBg: "linear-gradient(135deg, #FEF9C3, #FDE047)",
  },

  // Floral & Soft
  {
    id: "floral_pink",
    category: "floral",
    name: { en: "Rose Garden", hi: "गुलाब का बगीचा", mr: "गुलाब बाग" },
    background: "#FFF0F3",
    color: "#743B54",
    accent: "#C77B9C",
    border: "#DCA6BC",
    font: "Georgia, serif",
    decoration: "❀ ✿ ❀",
    badgeBg: "linear-gradient(135deg, #FFF0F3, #FCE7F3)",
  },
  {
    id: "cherry_blossom",
    category: "floral",
    name: { en: "Sakura Blossom", hi: "चेरी ब्लॉसम", mr: "चेरी ब्लॉसम" },
    background: "#FDF2F8",
    color: "#831843",
    accent: "#EC4899",
    border: "#F472B6",
    font: "Georgia, serif",
    decoration: "🌸 🌸 🌸",
    badgeBg: "linear-gradient(135deg, #FDF2F8, #FBCFE8)",
  },
  {
    id: "lavender_mist",
    category: "floral",
    name: { en: "Lavender Mist", hi: "लैवेंडर मिस्ट", mr: "लॅव्हेंडर मिस्ट" },
    background: "#F5F3FF",
    color: "#4C1D95",
    accent: "#8B5CF6",
    border: "#DDD6FE",
    font: "Georgia, serif",
    decoration: "🪻 🪻 🪻",
    badgeBg: "linear-gradient(135deg, #F5F3FF, #EDE9FE)",
  },
  {
    id: "eucalyptus_mist",
    category: "floral",
    name: { en: "Eucalyptus Garden", hi: "यूकेलिप्टस ग्रीन", mr: "युकेलिप्टस ग्रीन" },
    background: "#F0FDF4",
    color: "#14532D",
    accent: "#22C55E",
    border: "#86EFAC",
    font: "Georgia, serif",
    decoration: "🌿 🌿 🌿",
    badgeBg: "linear-gradient(135deg, #F0FDF4, #DCFCE7)",
  },
  {
    id: "peachy_floral",
    category: "floral",
    name: { en: "Peach Blossom", hi: "पीच ब्लॉसम", mr: "पीच ब्लॉसम" },
    background: "#FFF7ED",
    color: "#7C2D12",
    accent: "#F97316",
    border: "#FFEDD5",
    font: "Georgia, serif",
    decoration: "🌺 🌺 🌺",
    badgeBg: "linear-gradient(135deg, #FFF7ED, #FFEDD5)",
  },
  {
    id: "sunflower_breeze",
    category: "floral",
    name: { en: "Sunflower Bloom", hi: "सनफ्लावर ब्लूम", mr: "सूरजमुखी" },
    background: "#FEFCE8",
    color: "#713F12",
    accent: "#EAB308",
    border: "#FEF08A",
    font: "Georgia, serif",
    decoration: "🌻 🌻 🌻",
    badgeBg: "linear-gradient(135deg, #FEFCE8, #FEF08A)",
  },

  // Modern & Minimal
  {
    id: "nordic_clean",
    category: "modern",
    name: { en: "Nordic Minimal", hi: "नॉर्डिक मिनिमल", mr: "नॉर्डिक मिनिमल" },
    background: "#FAFAFA",
    color: "#18181B",
    accent: "#71717A",
    border: "#E4E4E7",
    font: "sans-serif",
    decoration: "― ✦ ―",
    badgeBg: "linear-gradient(135deg, #FAFAFA, #F4F4F5)",
  },
  {
    id: "terracotta_warm",
    category: "modern",
    name: { en: "Modern Terracotta", hi: "टेराकोटा वार्म", mr: "टेराकोटा वॉर्म" },
    background: "#FFF7ED",
    color: "#9A3412",
    accent: "#EA580C",
    border: "#FDBA74",
    font: "sans-serif",
    decoration: "❖ ❖ ❖",
    badgeBg: "linear-gradient(135deg, #FFEDD5, #FED7AA)",
  },
  {
    id: "sage_minimal",
    category: "modern",
    name: { en: "Sage Green Elegance", hi: "सेज ग्रीन", mr: "सेज ग्रीन" },
    background: "#F4F7F4",
    color: "#2C3E2E",
    accent: "#5B7B61",
    border: "#C8D6C9",
    font: "sans-serif",
    decoration: "✧ ✦ ✧",
    badgeBg: "linear-gradient(135deg, #F4F7F4, #E2E8E2)",
  },
  {
    id: "slate_luxury",
    category: "modern",
    name: { en: "Slate Minimalist", hi: "स्लेट मिनिमल", mr: "स्लेट मिनिमल" },
    background: "#334155",
    color: "#F8FAFC",
    accent: "#94A3B8",
    border: "#64748B",
    font: "sans-serif",
    decoration: "◇ ◈ ◇",
    badgeBg: "linear-gradient(135deg, #334155, #475569)",
  },
  {
    id: "cream_gold_modern",
    category: "modern",
    name: { en: "Cream & Subtle Gold", hi: "क्रीम एंड गोल्ड", mr: "क्रीम व गोल्ड" },
    background: "#FAFDF6",
    color: "#333333",
    accent: "#D4AF37",
    border: "#E2D3A1",
    font: "Georgia, serif",
    decoration: "― ✧ ―",
    badgeBg: "linear-gradient(135deg, #FAFDF6, #F2E8CF)",
  },

  // Party & Playful
  {
    id: "colorful_party",
    category: "party",
    name: { en: "Confetti Celebration", hi: "रंगीन उत्सव", mr: "रंगीत उत्सव" },
    background: "#FFF0DC",
    color: "#713B21",
    accent: "#ED783B",
    border: "#ED783B",
    font: "sans-serif",
    decoration: "🎉 ✨ 🎈",
    badgeBg: "linear-gradient(135deg, #FFF0DC, #FFD8A8)",
  },
  {
    id: "neon_glow",
    category: "party",
    name: { en: "Neon Birthday Glow", hi: "नियोन बर्थडे ग्लो", mr: "नियॉन ग्लो" },
    background: "#09090B",
    color: "#38BDF8",
    accent: "#F43F5E",
    border: "#A855F7",
    font: "sans-serif",
    decoration: "⚡ 🎈 ⚡",
    badgeBg: "linear-gradient(135deg, #09090B, #18181B)",
  },
  {
    id: "pastel_balloon",
    category: "party",
    name: { en: "Pastel Balloons", hi: "पेस्टेल बैलून", mr: "पेस्टेल बलून" },
    background: "#EFF6FF",
    color: "#1E3A8A",
    accent: "#3B82F6",
    border: "#93C5FD",
    font: "sans-serif",
    decoration: "🎈 🎁 🎈",
    badgeBg: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
  },
  {
    id: "candy_pop",
    category: "party",
    name: { en: "Candy Pop", hi: "कैंडी पॉप", mr: "कँडी पॉप" },
    background: "#FDF2F8",
    color: "#9D174D",
    accent: "#F43F5E",
    border: "#FBCFE8",
    font: "sans-serif",
    decoration: "🍬 🎈 🍭",
    badgeBg: "linear-gradient(135deg, #FDF2F8, #FCE7F3)",
  },
  {
    id: "cosmic_party",
    category: "party",
    name: { en: "Cosmic Celebration", hi: "कॉस्मिक पार्टी", mr: "कॉस्मिक पार्टी" },
    background: "#1E1B4B",
    color: "#E0E7FF",
    accent: "#818CF8",
    border: "#6366F1",
    font: "sans-serif",
    decoration: "🚀 ✨ 🌟",
    badgeBg: "linear-gradient(135deg, #1E1B4B, #312E81)",
  },
  {
    id: "carnival_joy",
    category: "party",
    name: { en: "Carnival Fiesta", hi: "कार्निवल उत्सव", mr: "कार्निव्हल आनंद" },
    background: "#FEF2F2",
    color: "#991B1B",
    accent: "#EF4444",
    border: "#FCA5A5",
    font: "sans-serif",
    decoration: "🎪 🎈 🥳",
    badgeBg: "linear-gradient(135deg, #FEF2F2, #FEE2E2)",
  },
  {
    id: "golden_party",
    category: "party",
    name: { en: "Gilded Jubilee", hi: "गोल्डन जुबली", mr: "गोल्डन जुबली" },
    background: "#3F2E00",
    color: "#FEF08A",
    accent: "#EAB308",
    border: "#CA8A04",
    borderStyle: "double",
    font: "Georgia, serif",
    decoration: "🥂 🪩 🥂",
    badgeBg: "linear-gradient(135deg, #3F2E00, #713F12)",
  },
];

export default function BirthdayCardsPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [event, setEvent] = useState<EventType>("birthday");
  const [designId, setDesignId] = useState<string>("traditional_gold");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);

  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<CardData>({
    name: "Aarav Sharma",
    date: "2027-01-15",
    time: "6:00 PM",
    venue: "The Celebration Grand Hall",
    address: "MG Road, Karad, Maharashtra",
    host: "With Love From Sharma Family",
    message: "",
  });

  const t = translations[language];

  // Find active design config safely
  const activeStyle = useMemo(() => {
    return ALL_DESIGNS.find((d) => d.id === designId) || ALL_DESIGNS[0];
  }, [designId]);

  // Filtered designs based on category & search query
  const filteredDesigns = useMemo(() => {
    return ALL_DESIGNS.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const itemName = item.name[language]?.toLowerCase() || "";
      const matchesSearch = itemName.includes(searchQuery.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, language]);

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

  // Responsive preview scaling
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateScale = () => {
      const containerWidth = container.clientWidth;
      const styles = window.getComputedStyle(container);

      const horizontalPadding =
        parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);

      const availableWidth = containerWidth - horizontalPadding;
      setPreviewScale(Math.min(1, Math.max(0.15, availableWidth / 794)));
    };

    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    updateScale();

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
    try {
      return new Date(`${value}T00:00:00`).toLocaleDateString(
        language === "en" ? "en-IN" : language === "hi" ? "hi-IN" : "mr-IN",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      );
    } catch {
      return value;
    }
  }

  async function generateImage() {
    if (!previewRef.current) {
      throw new Error("Preview dynamic DOM element is not ready.");
    }

    await document.fonts.ready;

    return toPng(previewRef.current, {
      pixelRatio: 2,
      backgroundColor: activeStyle.background,
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
      alert("Unable to generate PNG card. Please try again.");
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
      alert("Unable to generate PDF card. Please try again.");
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
    <main className="min-h-screen w-full bg-stone-100 px-3 py-6 text-stone-800 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        <div className="mb-6 flex items-center justify-between">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm transition hover:border-rose-500 hover:text-rose-700"
          >
            {t.backHome}
          </a>
        </div>

        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-rose-950 sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-2 text-base text-stone-600 sm:text-lg">
            {t.subtitle}
          </p>
        </header>

        <div className="grid min-w-0 grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Form & Controls Panel */}
          <section className="min-w-0 w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7 lg:col-span-6 xl:col-span-5">
            {/* Language & Event Selection */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-500">
                  {t.language}
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 p-3 text-sm font-medium transition focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200"
                >
                  <option value="en">English</option>
                  <option value="hi">हिन्दी</option>
                  <option value="mr">मराठी</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-stone-500">
                  {t.event}
                </label>
                <select
                  value={event}
                  onChange={(e) => setEvent(e.target.value as EventType)}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 p-3 text-sm font-medium transition focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200"
                >
                  <option value="birthday">{t.birthday}</option>
                  <option value="ganesh">{t.ganesh}</option>
                  <option value="puja">{t.puja}</option>
                </select>
              </div>
            </div>

            <hr className="my-6 border-stone-200" />

            {/* Input Details */}
            <h2 className="mb-4 text-lg font-bold text-stone-900">{t.details}</h2>

            <div className="grid min-w-0 gap-4 sm:grid-cols-2">
              {fields.map((field) => (
                <div
                  key={field.key}
                  className={`min-w-0 ${field.multiline ? "sm:col-span-2" : ""}`}
                >
                  <label className="mb-1 block text-xs font-semibold text-stone-600">
                    {field.label}
                  </label>

                  {field.multiline ? (
                    <textarea
                      rows={2}
                      value={data[field.key]}
                      onChange={(e) => updateField(field.key, e.target.value)}
                      placeholder={t.defaultMessage}
                      className="w-full min-w-0 rounded-xl border border-stone-300 p-3 text-sm transition focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200"
                    />
                  ) : (
                    <input
                      type={field.type || "text"}
                      value={data[field.key]}
                      onChange={(e) => updateField(field.key, e.target.value)}
                      className="w-full min-w-0 rounded-xl border border-stone-300 p-3 text-sm transition focus:border-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-200"
                    />
                  )}
                </div>
              ))}
            </div>

            <hr className="my-6 border-stone-200" />

            {/* Design Selector Header */}
            <div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
                <h2 className="text-lg font-bold text-stone-900">{t.designs}</h2>
                <span className="text-xs font-semibold text-stone-500">
                  {filteredDesigns.length} templates available
                </span>
              </div>

              {/* Search Box */}
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4 w-full rounded-xl border border-stone-300 p-2.5 text-xs transition focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-300"
              />

              {/* Category Filter Pills */}
              <div className="no-scrollbar mb-4 flex gap-1.5 overflow-x-auto pb-1">
                {(
                  [
                    "all",
                    "traditional",
                    "royal",
                    "floral",
                    "modern",
                    "party",
                  ] as CategoryKey[]
                ).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      activeCategory === cat
                        ? "bg-rose-900 text-white shadow-sm"
                        : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {t.categories[cat]}
                  </button>
                ))}
              </div>

              {/* Template Grid */}
              <div className="max-h-[340px] overflow-y-auto pr-1">
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2">
                  {filteredDesigns.map((item) => {
                    const isSelected = designId === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setDesignId(item.id)}
                        className={`group relative flex flex-col justify-between rounded-xl border-2 p-3 text-left transition ${
                          isSelected
                            ? "border-rose-700 bg-rose-50/50 shadow-sm ring-1 ring-rose-700"
                            : "border-stone-200 hover:border-rose-300 hover:bg-stone-50"
                        }`}
                      >
                        <div className="mb-2 flex items-center gap-2">
                          {/* Color Swatch Badge */}
                          <div
                            className="h-6 w-6 shrink-0 rounded-full border border-stone-300 shadow-inner"
                            style={{ background: item.badgeBg }}
                          />
                          <span className="truncate text-xs font-bold text-stone-800">
                            {item.name[language]}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-stone-500">
                          <span>{item.decoration}</span>
                          {isSelected && (
                            <span className="font-bold text-rose-700">✓</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
                {filteredDesigns.length === 0 && (
                  <p className="py-8 text-center text-xs text-stone-400">
                    No template found matching your query.
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={downloadPNG}
                disabled={loading}
                className="w-full rounded-xl bg-rose-800 py-3.5 text-sm font-bold text-white shadow hover:bg-rose-900 active:scale-[0.99] disabled:opacity-60 transition"
              >
                {loading ? t.loading : t.png}
              </button>

              <button
                type="button"
                onClick={downloadPDF}
                disabled={loading}
                className="w-full rounded-xl bg-stone-800 py-3.5 text-sm font-bold text-white shadow hover:bg-stone-900 active:scale-[0.99] disabled:opacity-60 transition"
              >
                {loading ? t.loading : t.pdf}
              </button>
            </div>
          </section>

          {/* Preview Canvas Section */}
          <section className="min-w-0 w-full lg:col-span-6 xl:col-span-7">
            <div className="sticky top-6">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-bold text-stone-900">{t.preview}</h2>
                <span className="rounded-md bg-stone-200 px-2 py-1 text-xs font-mono font-medium text-stone-600">
                  794px × 1123px (A4 HD)
                </span>
              </div>

              {/* Container for Canvas with Dynamic Scaling */}
              <div
                ref={containerRef}
                className="w-full min-w-0 overflow-hidden rounded-2xl border border-stone-300 bg-stone-200/80 p-3 shadow-inner sm:p-6"
              >
                <div
                  className="mx-auto shadow-2xl transition-all duration-300"
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
                      background: activeStyle.background,
                      color: activeStyle.color,
                      fontFamily: activeStyle.font,
                      padding: "42px",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      className="flex h-full flex-col items-center justify-between text-center"
                      style={{
                        border: `5px ${activeStyle.borderStyle || "solid"} ${
                          activeStyle.border
                        }`,
                        outline: `1px solid ${activeStyle.accent}`,
                        outlineOffset: "-16px",
                        padding: "45px 35px",
                      }}
                    >
                      {/* Top Decorative Symbol */}
                      <p
                        style={{
                          color: activeStyle.accent,
                          fontSize: "32px",
                          marginTop: "10px",
                        }}
                      >
                        {activeStyle.decoration}
                      </p>

                      {/* Header Titles */}
                      <div>
                        <p
                          style={{
                            fontSize: "42px",
                            fontWeight: "bold",
                            lineHeight: 1.25,
                            marginBottom: "12px",
                            overflowWrap: "anywhere",
                          }}
                        >
                          {eventTitle}
                        </p>

                        <p
                          style={{
                            fontSize: "22px",
                            opacity: 0.9,
                            fontWeight: "normal",
                          }}
                        >
                          {eventSubtitle}
                        </p>
                      </div>

                      {/* Celebrated Person Name */}
                      <div style={{ margin: "20px 0" }}>
                        <p
                          style={{
                            color: activeStyle.accent,
                            fontSize: "18px",
                            letterSpacing: "3px",
                            fontWeight: "bold",
                            marginBottom: "10px",
                          }}
                        >
                          {t.nameLabel}
                        </p>

                        <h2
                          style={{
                            fontSize: "56px",
                            fontWeight: "bold",
                            lineHeight: 1.15,
                            overflowWrap: "anywhere",
                          }}
                        >
                          {data.name || "Your Name Here"}
                        </h2>
                      </div>

                      {/* Event Details Card Box */}
                      <div
                        style={{
                          width: "100%",
                          borderTop: `2px solid ${activeStyle.accent}`,
                          borderBottom: `2px solid ${activeStyle.accent}`,
                          padding: "24px 10px",
                          margin: "15px 0",
                        }}
                      >
                        <p
                          style={{
                            color: activeStyle.accent,
                            fontSize: "16px",
                            letterSpacing: "3px",
                            fontWeight: "bold",
                            marginBottom: "6px",
                          }}
                        >
                          {t.dateLabel}
                        </p>

                        <p style={{ fontSize: "26px", marginBottom: "20px", fontWeight: "600" }}>
                          {formatDate(data.date)}
                        </p>

                        <p
                          style={{
                            color: activeStyle.accent,
                            fontSize: "16px",
                            letterSpacing: "3px",
                            fontWeight: "bold",
                            marginBottom: "6px",
                          }}
                        >
                          {t.timeLabel}
                        </p>

                        <p style={{ fontSize: "24px", marginBottom: "20px", fontWeight: "600" }}>
                          {data.time || "Time TBA"}
                        </p>

                        <p
                          style={{
                            color: activeStyle.accent,
                            fontSize: "16px",
                            letterSpacing: "3px",
                            fontWeight: "bold",
                            marginBottom: "6px",
                          }}
                        >
                          {t.venueLabel}
                        </p>

                        <p style={{ fontSize: "25px", fontWeight: "bold" }}>
                          {data.venue || "Venue Name"}
                        </p>

                        {data.address && (
                          <p style={{ fontSize: "20px", marginTop: "6px", opacity: 0.95 }}>
                            {data.address}
                          </p>
                        )}
                      </div>

                      {/* Personal Invitation Message */}
                      <p
                        style={{
                          fontSize: "21px",
                          lineHeight: 1.5,
                          maxWidth: "580px",
                          overflowWrap: "anywhere",
                          fontStyle: "italic",
                          margin: "10px 0",
                        }}
                      >
                        "{data.message || t.defaultMessage}"
                      </p>

                      {/* Host Section */}
                      <div>
                        <p
                          style={{
                            color: activeStyle.accent,
                            fontSize: "16px",
                            letterSpacing: "3px",
                            fontWeight: "bold",
                            marginBottom: "8px",
                          }}
                        >
                          {t.hostLabel}
                        </p>

                        <p
                          style={{
                            fontSize: "22px",
                            fontWeight: "600",
                            maxWidth: "550px",
                            overflowWrap: "anywhere",
                          }}
                        >
                          {data.host}
                        </p>
                      </div>

                      {/* Bottom Decorative Symbol */}
                      <p
                        style={{
                          color: activeStyle.accent,
                          fontSize: "32px",
                          marginBottom: "10px",
                        }}
                      >
                        {activeStyle.decoration}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <BirthdaySeoContent />
    </main>
  );
}