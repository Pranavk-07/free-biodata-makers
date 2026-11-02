"use client";
import WeddingSeoContent from "@/app/components/WeddingSeoContent";
import { useEffect, useRef, useState, useMemo } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

type Language = "en" | "hi" | "mr";
type CategoryKey = "all" | "royal" | "floral" | "modern" | "luxury" | "destinations";

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

type TemplateConfig = {
  id: string;
  category: CategoryKey;
  name: { en: string; hi: string; mr: string };
  background: string;
  color: string;
  accent: string;
  border: string;
  borderStyle?: string;
  font: string;
  heading: { en: string; hi: string; mr: string };
  decoration: string;
  badgeBg: string;
};

// --- Translations ---
const translations = {
  en: {
    title: "Wedding Invitation Studio",
    subtitle: "Craft and download personalized wedding invitations in minutes.",
    backHome: "← Back to Home",
    language: "Language",
    details: "Wedding Details",
    bride: "Bride's Name",
    groom: "Groom's Name",
    date: "Wedding Date",
    time: "Wedding Time",
    venue: "Venue Name",
    address: "Venue Address",
    family: "Invited By / Family Names",
    message: "Special Message",
    designs: "Choose Invitation Design",
    searchPlaceholder: "Search wedding designs...",
    categories: {
      all: "All Templates",
      royal: "Royal & Traditional",
      floral: "Floral & Pastel",
      modern: "Modern & Minimal",
      luxury: "Luxury & Glamour",
      destinations: "Festive & Destination",
    },
    preview: "Live Card Preview",
    downloadPng: "Download PNG",
    downloadPdf: "Download PDF",
    invite: "Together with their families",
    request: "Request the honor of your presence at the marriage of",
    and: "&",
    blessings: "Your presence and warm blessings will make our celebration special.",
    dateLabel: "DATE",
    timeLabel: "TIME",
    venueLabel: "VENUE",
    hostLabel: "WITH BEST COMPLIMENTS FROM",
    loading: "Generating Card...",
  },
  hi: {
    title: "शादी निमंत्रण कार्ड स्टूडियो",
    subtitle: "कुछ ही मिनटों में सुंदर और डिजिटल शादी की पत्रिका बनाएं।",
    backHome: "← मुख्य पृष्ठ",
    language: "भाषा",
    details: "विवाह का विवरण",
    bride: "दुल्हन का नाम",
    groom: "दूल्हे का नाम",
    date: "विवाह की तारीख",
    time: "शुभ मुहूर्त (समय)",
    venue: "कार्यक्रम स्थल",
    address: "स्थल का पता",
    family: "दर्शनाभिलाषी / परिवार",
    message: "विशेष निमंत्रण संदेश",
    designs: "डिजाइन टेंप्लेट चुनें",
    searchPlaceholder: "शादी की डिजाइन खोजें...",
    categories: {
      all: "सभी डिजाइन",
      royal: "शाही एवं पारंपरिक",
      floral: "फूलों की सजावट",
      modern: "आधुनिक एवं सरल",
      luxury: "लक्जरी एवं गोल्ड",
      destinations: "डेस्टिनेशन उत्सव",
    },
    preview: "पत्रिका पूर्वावलोकन",
    downloadPng: "PNG डाउनलोड करें",
    downloadPdf: "PDF डाउनलोड करें",
    invite: "निजी परिजनों की उपस्थिति में",
    request: "शुभ विवाह के पावन अवसर पर आपका हार्दिक स्वागत है",
    and: "संग",
    blessings: "आपकी गरिमामयी उपस्थिति एवं शुभ आशीर्वाद हमारे लिए अमूल्य है।",
    dateLabel: "तारीख",
    timeLabel: "समय",
    venueLabel: "स्थान",
    hostLabel: "सादर निवेदक",
    loading: "तैयार हो रहा है...",
  },
  mr: {
    title: "लग्नपत्रिका डिझाइन स्टुडिओ",
    subtitle: "काही मिनिटांत अत्यंत आकर्षक व देखणी डिजिटल लग्नपत्रिका तयार करा.",
    backHome: "← मुख्य पान",
    language: "भाषा",
    details: "लग्नाची माहिती",
    bride: "वधूचे नाव",
    groom: "वराचे नाव",
    date: "शुभविवाह तारीख",
    time: "शुभमुहूर्त (वेळ)",
    venue: "कार्यस्थळ",
    address: "पूर्ण पत्ता",
    family: "स्नेहांकित व निमंत्रक",
    message: "विशेष संदेश",
    designs: "डिझाइन निवडा",
    searchPlaceholder: "लग्नपत्रिका शोधा...",
    categories: {
      all: "सर्व डिझाईन्स",
      royal: "शाही व पारंपरिक",
      floral: "फुलांची सजावट",
      modern: "आधुनिक व सोपे",
      luxury: "लक्झरी व गोल्ड",
      destinations: "उत्सव व डेस्टिनेशन",
    },
    preview: "पत्रिका पूर्वदृश्य",
    downloadPng: "PNG डाउनलोड करा",
    downloadPdf: "PDF डाउनलोड करा",
    invite: "आपल्या कुटुंबीयांसह",
    request: "यांस शुभविवाह सोहळ्यास सस्नेह आमंत्रित करीत आहोत",
    and: "शुभविवाह",
    blessings: "आपली स्नेहमयी उपस्थिती व आशीर्वाद आमच्यासाठी मोलाचे आहेत.",
    dateLabel: "तारीख",
    timeLabel: "वेळ",
    venueLabel: "स्थळ",
    hostLabel: "शुभेच्छुक",
    loading: "तयार होत आहे...",
  },
};

// --- 32 Wedding Template Configurations ---
const ALL_TEMPLATES: TemplateConfig[] = [
  // Royal & Traditional
  {
    id: "royal_maroon",
    category: "royal",
    name: { en: "Royal Crimson Gold", hi: "रॉयल मैरून गोल्ड", mr: "शाही मरून गोल्ड" },
    background: "#5B0E1E",
    color: "#FDE68A",
    accent: "#D97706",
    border: "#D97706",
    borderStyle: "double",
    font: "Georgia, serif",
    heading: { en: "Royal Wedding Celebration", hi: "शुभ विवाह", mr: "शुभविवाह सोहळा" },
    decoration: "🕉️ ✦ 🕉️",
    badgeBg: "linear-gradient(135deg, #5B0E1E, #78350F)",
  },
  {
    id: "royal_velvet_purple",
    category: "royal",
    name: { en: "Imperial Velvet", hi: "इंपीरियल पर्पल", mr: "शाही जांभळा मखमली" },
    background: "#3B1235",
    color: "#FDE68A",
    accent: "#E3BD69",
    border: "#E3BD69",
    borderStyle: "double",
    font: "Georgia, serif",
    heading: { en: "A Royal Alliance", hi: "शाही विवाह उत्सव", mr: "शाही विवाह सोहळा" },
    decoration: "👑 ✦ 👑",
    badgeBg: "linear-gradient(135deg, #3B1235, #581C87)",
  },
  {
    id: "classic_saffron",
    category: "royal",
    name: { en: "Saffron Tradition", hi: "केसरिया परंपरा", mr: "केसरीत परंपरा" },
    background: "#FFF7ED",
    color: "#7C2D12",
    accent: "#EA580C",
    border: "#C2410C",
    borderStyle: "double",
    font: "Georgia, serif",
    heading: { en: "Sacred Matrimony", hi: "मंगल विवाह निमंत्रण", mr: "सस्नेह निमंत्रण" },
    decoration: "🪔 ✨ 🪔",
    badgeBg: "linear-gradient(135deg, #FFEDD5, #FDBA74)",
  },
  {
    id: "banarasi_red",
    category: "royal",
    name: { en: "Banarasi Silk Red", hi: "बनारसी रेड", mr: "बनारसी सिल्क रेड" },
    background: "#7F1D1D",
    color: "#FEF08A",
    accent: "#EAB308",
    border: "#CA8A04",
    font: "Georgia, serif",
    heading: { en: "Wedding Ceremony", hi: "विवाह समारोह", mr: "शुभविवाह" },
    decoration: "🌺 ✦ 🌺",
    badgeBg: "linear-gradient(135deg, #7F1D1D, #B91C1C)",
  },
  {
    id: "peacock_splendor",
    category: "royal",
    name: { en: "Peacock Regal", hi: "मयूर रीगल", mr: "मयूर डिझाईन" },
    background: "#064E3B",
    color: "#ECFDF5",
    accent: "#F59E0B",
    border: "#10B981",
    font: "Georgia, serif",
    heading: { en: "Divine Wedding", hi: "पावन विवाह उत्सव", mr: "शुभ विवाह" },
    decoration: "🦚 ✦ 🦚",
    badgeBg: "linear-gradient(135deg, #064E3B, #047857)",
  },
  {
    id: "emerald_rajput",
    category: "royal",
    name: { en: "Rajput Emerald", hi: "राजपूत एमराल्ड", mr: "राजपूत एमराल्ड" },
    background: "#022C22",
    color: "#FDE68A",
    accent: "#EAB308",
    border: "#D97706",
    font: "Georgia, serif",
    heading: { en: "Royal Nuptials", hi: "राजसी विवाह", mr: "राजेशाही विवाह" },
    decoration: "⚜️ ✦ ⚜️",
    badgeBg: "linear-gradient(135deg, #022C22, #064E3B)",
  },
  {
    id: "jaipur_pink",
    category: "royal",
    name: { en: "Jaipur Palace Pink", hi: "जयपुर पैलेस पिंक", mr: "जयपूर पॅलेस" },
    background: "#FFF1F2",
    color: "#881337",
    accent: "#E11D48",
    border: "#BE123C",
    font: "Georgia, serif",
    heading: { en: "Palace Wedding", hi: "शाही निमंत्रण", mr: "शुभविवाह पत्रिका" },
    decoration: "🕌 ✦ 🕌",
    badgeBg: "linear-gradient(135deg, #FFE4E6, #FDA4AF)",
  },
  {
    id: "mandala_sacred",
    category: "royal",
    name: { en: "Sacred Mandala Gold", hi: "पवित्र मंडला", mr: "पवित्र मंडला" },
    background: "#FEF3C7",
    color: "#78350F",
    accent: "#D97706",
    border: "#B45309",
    borderStyle: "double",
    font: "Georgia, serif",
    heading: { en: "Sacred Union", hi: "पावन परिणय सूत्र", mr: "शुभविवाह सोहळा" },
    decoration: "☸️ ✦ ☸️",
    badgeBg: "linear-gradient(135deg, #FEF3C7, #FCD34D)",
  },

  // Floral & Pastel
  {
    id: "rose_blossom",
    category: "floral",
    name: { en: "Rose Garden Elegance", hi: "गुलाब की सजावट", mr: "गुलाबबाग" },
    background: "#FFF0F3",
    color: "#743B54",
    accent: "#C77B9C",
    border: "#DCA6BC",
    font: "Georgia, serif",
    heading: { en: "A Blooming Wedding", hi: "परिणय उत्सव", mr: "शुभविवाह" },
    decoration: "🌸 ❀ 🌸",
    badgeBg: "linear-gradient(135deg, #FFF0F3, #FCE7F3)",
  },
  {
    id: "lavender_romance",
    category: "floral",
    name: { en: "Lavender Romance", hi: "लैवेंडर रोमांस", mr: "लॅव्हेंडर रोमान्स" },
    background: "#F5F3FF",
    color: "#4C1D95",
    accent: "#8B5CF6",
    border: "#DDD6FE",
    font: "Georgia, serif",
    heading: { en: "Wedding Celebration", hi: "शुभ परिणय", mr: "विवाह सोहळा" },
    decoration: "🪻 ✦ 🪻",
    badgeBg: "linear-gradient(135deg, #F5F3FF, #EDE9FE)",
  },
  {
    id: "peach_chiffon",
    category: "floral",
    name: { en: "Peach Floral Chiffon", hi: "पीच फ्लोरल", mr: "पीच फुलांची सजावट" },
    background: "#FFF7ED",
    color: "#7C2D12",
    accent: "#F97316",
    border: "#FFEDD5",
    font: "Georgia, serif",
    heading: { en: "Together Forever", hi: "शुभ विवाह", mr: "सस्नेह निमंत्रण" },
    decoration: "🌺 ✿ 🌺",
    badgeBg: "linear-gradient(135deg, #FFF7ED, #FFEDD5)",
  },
  {
    id: "mint_botanical",
    category: "floral",
    name: { en: "Sage Eucalyptus", hi: "सेज ग्रीन फ्लोरल", mr: "सेज ग्रीन फ्लोरल" },
    background: "#F0FDF4",
    color: "#14532D",
    accent: "#22C55E",
    border: "#86EFAC",
    font: "Georgia, serif",
    heading: { en: "A Beautiful Union", hi: "पावन विवाह", mr: "शुभविवाह" },
    decoration: "🌿 ✦ 🌿",
    badgeBg: "linear-gradient(135deg, #F0FDF4, #DCFCE7)",
  },
  {
    id: "sakura_pink",
    category: "floral",
    name: { en: "Sakura Petals", hi: "साकुरा पेटल्स", mr: "साकुरा पेटल्स" },
    background: "#FDF2F8",
    color: "#831843",
    accent: "#EC4899",
    border: "#F472B6",
    font: "Georgia, serif",
    heading: { en: "Wedding Ceremony", hi: "विवाह समारोह", mr: "विवाह सोहळा" },
    decoration: "🌸 🌸 🌸",
    badgeBg: "linear-gradient(135deg, #FDF2F8, #FBCFE8)",
  },
  {
    id: "pastel_azure",
    category: "floral",
    name: { en: "Pastel Sky Azure", hi: "पेस्टेल स्काई", mr: "पेस्टेल स्काय" },
    background: "#F0F9FF",
    color: "#0C4A6E",
    accent: "#0284C7",
    border: "#BAE6FD",
    font: "Georgia, serif",
    heading: { en: "Joined In Love", hi: "शुभ विवाह", mr: "शुभविवाह" },
    decoration: "✨ ❀ ✨",
    badgeBg: "linear-gradient(135deg, #F0F9FF, #E0F2FE)",
  },

  // Modern & Minimal
  {
    id: "modern_ivory",
    category: "modern",
    name: { en: "Modern Ivory Luxe", hi: "मॉडर्न आइवरी", mr: "मॉडर्न आयव्हरी" },
    background: "#FAFAFA",
    color: "#18181B",
    accent: "#71717A",
    border: "#E4E4E7",
    font: "sans-serif",
    heading: { en: "The Wedding Of", hi: "विवाह समारोह", mr: "शुभविवाह" },
    decoration: "― ✦ ―",
    badgeBg: "linear-gradient(135deg, #FAFAFA, #F4F4F5)",
  },
  {
    id: "nordic_slate",
    category: "modern",
    name: { en: "Nordic Minimalist Slate", hi: "नॉर्डिक स्लेट", mr: "नॉर्डिक स्लेट" },
    background: "#334155",
    color: "#F8FAFC",
    accent: "#94A3B8",
    border: "#64748B",
    font: "sans-serif",
    heading: { en: "We Are Getting Married", hi: "शुभ विवाह निमंत्रण", mr: "शुभविवाह सोहळा" },
    decoration: "◇ ◈ ◇",
    badgeBg: "linear-gradient(135deg, #334155, #475569)",
  },
  {
    id: "terracotta_boho",
    category: "modern",
    name: { en: "Boho Terracotta", hi: "बोहो टेराकोटा", mr: "बोहो टेराकोटा" },
    background: "#FFF7ED",
    color: "#9A3412",
    accent: "#EA580C",
    border: "#FDBA74",
    font: "sans-serif",
    heading: { en: "A New Beginning", hi: "शुभ परिणय", mr: "शुभविवाह" },
    decoration: "❖ ❖ ❖",
    badgeBg: "linear-gradient(135deg, #FFEDD5, #FED7AA)",
  },
  {
    id: "sage_minimal",
    category: "modern",
    name: { en: "Sage Minimalist", hi: "सेज मिनिमल", mr: "सेज मिनिमल" },
    background: "#F4F7F4",
    color: "#2C3E2E",
    accent: "#5B7B61",
    border: "#C8D6C9",
    font: "sans-serif",
    heading: { en: "Wedding Celebration", hi: "विवाह समारोह", mr: "विवाह सोहळा" },
    decoration: "✧ ✦ ✧",
    badgeBg: "linear-gradient(135deg, #F4F7F4, #E2E8E2)",
  },
  {
    id: "monochrome_tuxedo",
    category: "modern",
    name: { en: "Midnight Tuxedo", hi: "मिडनाइट टक्सीडो", mr: "मिडनाइट टक्सिडो" },
    background: "#09090B",
    color: "#FAFAFA",
    accent: "#A1A1AA",
    border: "#27272A",
    font: "sans-serif",
    heading: { en: "Celebration Of Love", hi: "शुभ विवाह", mr: "शुभविवाह सोहळा" },
    decoration: "✦ ✨ ✦",
    badgeBg: "linear-gradient(135deg, #09090B, #18181B)",
  },
  {
    id: "sandstone_chic",
    category: "modern",
    name: { en: "Sandstone Beige", hi: "सैंडस्टोन बेज", mr: "सँडस्टोन बेज" },
    background: "#F5F5F4",
    color: "#292524",
    accent: "#78716C",
    border: "#D6D3D1",
    font: "sans-serif",
    heading: { en: "Together At Last", hi: "परिणय सूत्र", mr: "शुभविवाह" },
    decoration: "― ✧ ―",
    badgeBg: "linear-gradient(135deg, #F5F5F4, #E7E5E4)",
  },

  // Luxury & Glamour
  {
    id: "black_gold_luxe",
    category: "luxury",
    name: { en: "Midnight Black Gold", hi: "ब्लैक गोल्ड लक्जरी", mr: "ब्लॅक गोल्ड लक्झरी" },
    background: "#18181B",
    color: "#FEF08A",
    accent: "#EAB308",
    border: "#CA8A04",
    borderStyle: "double",
    font: "Georgia, serif",
    heading: { en: "The Grand Wedding", hi: "शाही विवाह समारोह", mr: "भव्य विवाह सोहळा" },
    decoration: "💎 ✦ 💎",
    badgeBg: "linear-gradient(135deg, #18181B, #27272A)",
  },
  {
    id: "champagne_glam",
    category: "luxury",
    name: { en: "Champagne Sparkle", hi: "शैंपेन स्पार्कल", mr: "शॅम्पेन स्पार्कल" },
    background: "#FEF9C3",
    color: "#713F12",
    accent: "#CA8A04",
    border: "#EAB308",
    borderStyle: "double",
    font: "Georgia, serif",
    heading: { en: "Golden Wedding Nuptials", hi: "शुभ विवाह", mr: "शुभविवाह सोहळा" },
    decoration: "🥂 ✦ 🥂",
    badgeBg: "linear-gradient(135deg, #FEF9C3, #FDE047)",
  },
  {
    id: "ruby_splendor",
    category: "luxury",
    name: { en: "Ruby Glamour", hi: "रूबी ग्लैमर्स", mr: "रुबी ग्लॅमर" },
    background: "#881337",
    color: "#FFE4E6",
    accent: "#FB7185",
    border: "#F43F5E",
    font: "Georgia, serif",
    heading: { en: "An Eternal Bond", hi: "मंगल परिणय", mr: "शुभविवाह" },
    decoration: "❖ ✧ ❖",
    badgeBg: "linear-gradient(135deg, #881337, #9F1239)",
  },
  {
    id: "sapphire_luxe",
    category: "luxury",
    name: { en: "Royal Sapphire Gold", hi: "रॉयल नीलम", mr: "रॉयल सफायर" },
    background: "#0F172A",
    color: "#FEF08A",
    accent: "#EAB308",
    border: "#38BDF8",
    font: "Georgia, serif",
    heading: { en: "A Regal Celebration", hi: "शाही विवाह", mr: "शाही विवाह सोहळा" },
    decoration: "🌌 ✦ 🌌",
    badgeBg: "linear-gradient(135deg, #0F172A, #1E293B)",
  },
  {
    id: "copper_metallic",
    category: "luxury",
    name: { en: "Gilded Copper", hi: "कॉपर मैटेलिक", mr: "कॉपर मँटॅलिक" },
    background: "#451A03",
    color: "#FFEDD5",
    accent: "#F97316",
    border: "#EA580C",
    font: "Georgia, serif",
    heading: { en: "Warm Elegance Wedding", hi: "शुभ परिणय", mr: "शुभविवाह सोहळा" },
    decoration: "✦ ✨ ✦",
    badgeBg: "linear-gradient(135deg, #451A03, #78350F)",
  },
  {
    id: "vintage_sepia",
    category: "luxury",
    name: { en: "Vintage Parchment", hi: "विंटेज पार्चमेंट", mr: "विंटेज पार्चमेंट" },
    background: "#F5E6D3",
    color: "#3B2314",
    accent: "#8C5A32",
    border: "#A67C52",
    font: "Georgia, serif",
    heading: { en: "Timeless Matrimony", hi: "शुभ विवाह निमंत्रण", mr: "लग्नपत्रिका" },
    decoration: "✦ 📜 ✦",
    badgeBg: "linear-gradient(135deg, #F5E6D3, #E6CCAB)",
  },

  // Festive & Destination
  {
    id: "beach_sunset",
    category: "destinations",
    name: { en: "Sunset Destination", hi: "सनसेट डेस्टिनेशन", mr: "सनसेट डेस्टिनेशन" },
    background: "#FFF7ED",
    color: "#7C2D12",
    accent: "#F97316",
    border: "#FB923C",
    font: "Georgia, serif",
    heading: { en: "Destination Wedding", hi: "डेस्टिनेशन विवाह", mr: "डेस्टिनेशन लग्न" },
    decoration: "🌅 ✦ 🌅",
    badgeBg: "linear-gradient(135deg, #FFEDD5, #FDBA74)",
  },
  {
    id: "palace_heritage",
    category: "destinations",
    name: { en: "Courtyard Heritage", hi: "हवेली हेरिटेज", mr: "हवेली हेरिटेज" },
    background: "#FEF9C3",
    color: "#713F12",
    accent: "#D97706",
    border: "#B45309",
    font: "Georgia, serif",
    heading: { en: "Heritage Nuptials", hi: "पावन विवाह उत्सव", mr: "शुभविवाह" },
    decoration: "🕌 ✨ 🕌",
    badgeBg: "linear-gradient(135deg, #FEF9C3, #FDE047)",
  },
  {
    id: "boho_golden_hour",
    category: "destinations",
    name: { en: "Golden Hour Boho", hi: "गोल्डन आवर", mr: "गोल्डन आवर" },
    background: "#FEF3C7",
    color: "#78350F",
    accent: "#EA580C",
    border: "#D97706",
    font: "sans-serif",
    heading: { en: "Under The Stars Wedding", hi: "शुभ विवाह", mr: "शुभविवाह सोहळा" },
    decoration: "✨ 🌾 ✨",
    badgeBg: "linear-gradient(135deg, #FEF3C7, #FCD34D)",
  },
  {
    id: "haldi_sunshine",
    category: "destinations",
    name: { en: "Haldi Sunshine Yellow", hi: "हल्दी उत्सव", mr: "हळदी उत्सव" },
    background: "#FEF08A",
    color: "#713F12",
    accent: "#CA8A04",
    border: "#A16207",
    font: "Georgia, serif",
    heading: { en: "Festive Nuptials", hi: "उत्सव विवाह", mr: "शुभविवाह" },
    decoration: "🌼 🪔 🌼",
    badgeBg: "linear-gradient(135deg, #FEF08A, #FACC15)",
  },
  {
    id: "marigold_garland",
    category: "destinations",
    name: { en: "Marigold Festivity", hi: "गेंदा गार्लैंड", mr: "झेंडूची सजावट" },
    background: "#FFF8E7",
    color: "#5C1D06",
    accent: "#D97706",
    border: "#B45309",
    borderStyle: "double",
    font: "Georgia, serif",
    heading: { en: "Wedding Ceremony", hi: "शुभ विवाह समारोह", mr: "शुभविवाह" },
    decoration: "🌼 ✦ 🌼",
    badgeBg: "linear-gradient(135deg, #FFF8E7, #FDE68A)",
  },
  {
    id: "goa_coastal",
    category: "destinations",
    name: { en: "Coastal Turquoise", hi: "कोस्टल टिरक्वॉइज़", mr: "कोस्टल ब्लू" },
    background: "#ECFEFF",
    color: "#164E63",
    accent: "#0891B2",
    border: "#A5F3FC",
    font: "sans-serif",
    heading: { en: "Beachside Nuptials", hi: "शुभ परिणय", mr: "शुभविवाह सोहळा" },
    decoration: "🌊 💍 🌊",
    badgeBg: "linear-gradient(135deg, #ECFEFF, #CFFAFE)",
  },
];

export default function WeddingInvitationPage() {
  const [language, setLanguage] = useState<Language>("en");
  const [templateId, setTemplateId] = useState<string>("royal_maroon");
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);

  const previewRef = useRef<HTMLDivElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<InvitationData>({
    bride: "Priya",
    groom: "Rahul",
    date: "2027-02-14",
    time: "10:30 AM",
    venue: "The Grand Celebration Palace",
    address: "MG Road, Karad, Maharashtra",
    family: "With love and blessings from Sharma & Patil Families",
    message: "",
  });

  const t = translations[language];

  // Active Template Finder
  const activeStyle = useMemo(() => {
    return ALL_TEMPLATES.find((item) => item.id === templateId) || ALL_TEMPLATES[0];
  }, [templateId]);

  // Filtered Templates Search & Category Logic
  const filteredTemplates = useMemo(() => {
    return ALL_TEMPLATES.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const itemName = item.name[language]?.toLowerCase() || "";
      const matchesSearch = itemName.includes(searchQuery.toLowerCase().trim());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, language]);

  // Responsive Preview Scale Engine
  useEffect(() => {
    const container = previewContainerRef.current;
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

  function updateField(field: keyof InvitationData, value: string) {
    setData((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function formatDate(value: string) {
    if (!value) return "Your Special Day";
    try {
      const date = new Date(`${value}T00:00:00`);
      return date.toLocaleDateString(
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
      throw new Error("Invitation preview is not available.");
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
          {/* Form & Design Controls Panel */}
          <section className="min-w-0 w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7 lg:col-span-6 xl:col-span-5">
            {/* Language Selector */}
            <div className="mb-6">
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
                      placeholder={t.blessings}
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

            {/* Template Selector Section */}
            <div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
                <h2 className="text-lg font-bold text-stone-900">{t.designs}</h2>
                <span className="text-xs font-semibold text-stone-500">
                  {filteredTemplates.length} templates available
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
                    "royal",
                    "floral",
                    "modern",
                    "luxury",
                    "destinations",
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

              {/* Template Swatch Grid */}
              <div className="max-h-[340px] overflow-y-auto pr-1">
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-2">
                  {filteredTemplates.map((item) => {
                    const isSelected = templateId === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setTemplateId(item.id)}
                        className={`group relative flex flex-col justify-between rounded-xl border-2 p-3 text-left transition ${
                          isSelected
                            ? "border-rose-700 bg-rose-50/50 shadow-sm ring-1 ring-rose-700"
                            : "border-stone-200 hover:border-rose-300 hover:bg-stone-50"
                        }`}
                      >
                        <div className="mb-2 flex items-center gap-2">
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
                {filteredTemplates.length === 0 && (
                  <p className="py-8 text-center text-xs text-stone-400">
                    No wedding design found matching your search.
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
                {loading ? t.loading : t.downloadPng}
              </button>

              <button
                type="button"
                onClick={downloadPDF}
                disabled={loading}
                className="w-full rounded-xl bg-stone-800 py-3.5 text-sm font-bold text-white shadow hover:bg-stone-900 active:scale-[0.99] disabled:opacity-60 transition"
              >
                {loading ? t.loading : t.downloadPdf}
              </button>
            </div>
          </section>

          {/* Preview Canvas Section */}
          <section className="min-w-0 w-full lg:col-span-6 xl:col-span-7">
            <div className="sticky top-6">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-bold text-stone-900">{t.preview}</h2>
                <span className="rounded-md bg-stone-200 px-2 py-1 text-xs font-mono font-medium text-stone-600">
                  794px × 1123px (A4 Print HD)
                </span>
              </div>

              {/* Responsive Container */}
              <div
                ref={previewContainerRef}
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
                        border: `5px ${
                          activeStyle.borderStyle || "solid"
                        } ${activeStyle.border}`,
                        outline: `1px solid ${activeStyle.accent}`,
                        outlineOffset: "-16px",
                        padding: "40px 30px",
                      }}
                    >
                      {/* Top Symbol Decoration */}
                      <p
                        style={{
                          color: activeStyle.accent,
                          fontSize: "28px",
                          marginTop: "8px",
                        }}
                      >
                        {activeStyle.decoration}
                      </p>

                      {/* Header Title */}
                      <p
                        style={{
                          fontSize: "26px",
                          letterSpacing: "2px",
                          fontWeight: "normal",
                          lineHeight: 1.3,
                        }}
                      >
                        {activeStyle.heading[language]}
                      </p>

                      <p
                        style={{
                          fontSize: "20px",
                          opacity: 0.9,
                          marginTop: "-10px",
                        }}
                      >
                        {t.invite}
                      </p>

                      <p
                        style={{
                          fontSize: "19px",
                          opacity: 0.95,
                          maxWidth: "580px",
                        }}
                      >
                        {t.request}
                      </p>

                      {/* Bride & Groom Couple Names */}
                      <div style={{ margin: "10px 0" }}>
                        <h2
                          style={{
                            fontSize: "52px",
                            fontWeight: "bold",
                            lineHeight: 1.15,
                            overflowWrap: "anywhere",
                          }}
                        >
                          {data.bride || "Bride"}
                        </h2>

                        <p
                          style={{
                            fontSize: "32px",
                            color: activeStyle.accent,
                            margin: "4px 0",
                            fontWeight: "bold",
                          }}
                        >
                          {t.and}
                        </p>

                        <h2
                          style={{
                            fontSize: "52px",
                            fontWeight: "bold",
                            lineHeight: 1.15,
                            overflowWrap: "anywhere",
                          }}
                        >
                          {data.groom || "Groom"}
                        </h2>
                      </div>

                      {/* Details Box */}
                      <div
                        style={{
                          width: "100%",
                          borderTop: `2px solid ${activeStyle.accent}`,
                          borderBottom: `2px solid ${activeStyle.accent}`,
                          padding: "20px 10px",
                          margin: "10px 0",
                        }}
                      >
                        <p
                          style={{
                            color: activeStyle.accent,
                            fontSize: "15px",
                            letterSpacing: "3px",
                            fontWeight: "bold",
                            marginBottom: "4px",
                          }}
                        >
                          {t.dateLabel}
                        </p>

                        <p
                          style={{
                            fontSize: "25px",
                            marginBottom: "16px",
                            fontWeight: "600",
                          }}
                        >
                          {formatDate(data.date)}
                        </p>

                        <p
                          style={{
                            color: activeStyle.accent,
                            fontSize: "15px",
                            letterSpacing: "3px",
                            fontWeight: "bold",
                            marginBottom: "4px",
                          }}
                        >
                          {t.timeLabel}
                        </p>

                        <p
                          style={{
                            fontSize: "23px",
                            marginBottom: "16px",
                            fontWeight: "600",
                          }}
                        >
                          {data.time || "Time to be announced"}
                        </p>

                        <p
                          style={{
                            color: activeStyle.accent,
                            fontSize: "15px",
                            letterSpacing: "3px",
                            fontWeight: "bold",
                            marginBottom: "4px",
                          }}
                        >
                          {t.venueLabel}
                        </p>

                        <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                          {data.venue || "Wedding Venue"}
                        </p>

                        {data.address && (
                          <p style={{ fontSize: "19px", marginTop: "4px", opacity: 0.9 }}>
                            {data.address}
                          </p>
                        )}
                      </div>

                      {/* Personal Blessings / Message */}
                      <p
                        style={{
                          fontSize: "19px",
                          lineHeight: 1.45,
                          maxWidth: "580px",
                          fontStyle: "italic",
                          overflowWrap: "anywhere",
                        }}
                      >
                        "{data.message || t.blessings}"
                      </p>

                      {/* Family / Host Names */}
                      <div>
                        <p
                          style={{
                            color: activeStyle.accent,
                            fontSize: "15px",
                            letterSpacing: "2px",
                            fontWeight: "bold",
                            marginBottom: "6px",
                          }}
                        >
                          {t.hostLabel}
                        </p>

                        <p
                          style={{
                            fontSize: "20px",
                            fontWeight: "600",
                            maxWidth: "550px",
                            overflowWrap: "anywhere",
                          }}
                        >
                          {data.family}
                        </p>
                      </div>

                      {/* Bottom Symbol Decoration */}
                      <p
                        style={{
                          color: activeStyle.accent,
                          fontSize: "28px",
                          marginBottom: "8px",
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
      <WeddingSeoContent />
    </main>
  );
}