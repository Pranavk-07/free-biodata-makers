// app/components/biodataTemplates.ts

export interface BiodataTemplate {
  id: string;
  name: string;
  category: 'royal' | 'floral' | 'modern' | 'traditional';
  bg: string;
  border: string;
  font: string;
  accent: string;
  headingColor: string;
}

export const BIODATA_TEMPLATES: BiodataTemplate[] = [
  // --- ROYAL CATEGORY (1-10) ---
  { id: "royal-gold", name: "Royal Gold", category: "royal", bg: "#fdfbf7", border: "#c5a059", font: "serif", accent: "#c5a059", headingColor: "#8b6e3c" },
  { id: "royal-maroon", name: "Royal Maroon", category: "royal", bg: "#fff5f5", border: "#881337", font: "serif", accent: "#881337", headingColor: "#9f1239" },
  { id: "royal-velvet", name: "Royal Velvet", category: "royal", bg: "#faf5ff", border: "#6b21a8", font: "serif", accent: "#6b21a8", headingColor: "#581c87" },
  { id: "royal-emerald", name: "Royal Emerald", category: "royal", bg: "#f0fdf4", border: "#065f46", font: "serif", accent: "#065f46", headingColor: "#047857" },
  { id: "royal-sapphire", name: "Royal Sapphire", category: "royal", bg: "#eff6ff", border: "#1e40af", font: "serif", accent: "#1e40af", headingColor: "#1d4ed8" },
  { id: "royal-ruby", name: "Royal Ruby", category: "royal", bg: "#fff1f2", border: "#9f1239", font: "serif", accent: "#9f1239", headingColor: "#be123c" },
  { id: "royal-amber", name: "Royal Amber", category: "royal", bg: "#fffbeb", border: "#b45309", font: "serif", accent: "#b45309", headingColor: "#d97706" },
  { id: "royal-copper", name: "Royal Copper", category: "royal", bg: "#fff7ed", border: "#9a3412", font: "serif", accent: "#9a3412", headingColor: "#c2410c" },
  { id: "royal-plum", name: "Royal Plum", category: "royal", bg: "#fdf4ff", border: "#701a75", font: "serif", accent: "#701a75", headingColor: "#86198f" },
  { id: "royal-bronze", name: "Royal Bronze", category: "royal", bg: "#fefae0", border: "#bc6c25", font: "serif", accent: "#bc6c25", headingColor: "#dda15e" },

  // --- FLORAL CATEGORY (11-20) ---
  { id: "floral-pink", name: "Floral Pink", category: "floral", bg: "#fff5f7", border: "#d98ba8", font: "serif", accent: "#d98ba8", headingColor: "#b34c78" },
  { id: "floral-mint", name: "Floral Mint", category: "floral", bg: "#f0fdf4", border: "#22c55e", font: "sans-serif", accent: "#22c55e", headingColor: "#15803d" },
  { id: "floral-peach", name: "Floral Peach", category: "floral", bg: "#fff7ed", border: "#fb923c", font: "serif", accent: "#fb923c", headingColor: "#c2410c" },
  { id: "floral-lavender", name: "Floral Lavender", category: "floral", bg: "#faf5ff", border: "#c084fc", font: "serif", accent: "#c084fc", headingColor: "#9333ea" },
  { id: "floral-rose", name: "Floral Rose", category: "floral", bg: "#fff1f2", border: "#fb7185", font: "serif", accent: "#fb7185", headingColor: "#e11d48" },
  { id: "floral-blush", name: "Floral Blush", category: "floral", bg: "#fff1f4", border: "#f43f5e", font: "serif", accent: "#f43f5e", headingColor: "#be123c" },
  { id: "floral-lilac", name: "Floral Lilac", category: "floral", bg: "#f5f3ff", border: "#a78bfa", font: "serif", accent: "#a78bfa", headingColor: "#7c3aed" },
  { id: "floral-sunflower", name: "Floral Sunflower", category: "floral", bg: "#fefce8", border: "#facc15", font: "serif", accent: "#facc15", headingColor: "#ca8a04" },
  { id: "floral-orchid", name: "Floral Orchid", category: "floral", bg: "#fdf4ff", border: "#e879f9", font: "serif", accent: "#e879f9", headingColor: "#c026d3" },
  { id: "floral-ivory", name: "Floral Ivory", category: "floral", bg: "#fafaf9", border: "#d6d3d1", font: "serif", accent: "#d6d3d1", headingColor: "#78716c" },

  // --- MODERN CATEGORY (21-30) ---
  { id: "modern-blue", name: "Modern Blue", category: "modern", bg: "#f0f9ff", border: "#0369a1", font: "sans-serif", accent: "#0369a1", headingColor: "#0c4a6e" },
  { id: "modern-slate", name: "Modern Slate", category: "modern", bg: "#f8fafc", border: "#475569", font: "sans-serif", accent: "#475569", headingColor: "#1e293b" },
  { id: "modern-teal", name: "Modern Teal", category: "modern", bg: "#f0fdfa", border: "#0d9488", font: "sans-serif", accent: "#0d9488", headingColor: "#115e59" },
  { id: "modern-indigo", name: "Modern Indigo", category: "modern", bg: "#eef2ff", border: "#4f46e5", font: "sans-serif", accent: "#4f46e5", headingColor: "#3730a3" },
  { id: "modern-cyan", name: "Modern Cyan", category: "modern", bg: "#ecfeff", border: "#0891b2", font: "sans-serif", accent: "#0891b2", headingColor: "#164e63" },
  { id: "modern-zinc", name: "Modern Zinc", category: "modern", bg: "#fafafa", border: "#71717a", font: "sans-serif", accent: "#71717a", headingColor: "#27272a" },
  { id: "modern-neutral", name: "Modern Neutral", category: "modern", bg: "#f5f5f4", border: "#78716c", font: "sans-serif", accent: "#78716c", headingColor: "#292524" },
  { id: "modern-sky", name: "Modern Sky", category: "modern", bg: "#f0f9ff", border: "#38bdf8", font: "sans-serif", accent: "#38bdf8", headingColor: "#0284c7" },
  { id: "modern-violet", name: "Modern Violet", category: "modern", bg: "#f5f3ff", border: "#8b5cf6", font: "sans-serif", accent: "#8b5cf6", headingColor: "#6d28d9" },
  { id: "modern-charcoal", name: "Modern Charcoal", category: "modern", bg: "#18181b", border: "#f43f5e", font: "sans-serif", accent: "#f43f5e", headingColor: "#fafafa" },

  // --- TRADITIONAL CATEGORY (31-40) ---
  { id: "trad-saffron", name: "Traditional Saffron", category: "traditional", bg: "#fff7ed", border: "#c2410c", font: "serif", accent: "#c2410c", headingColor: "#9a3412" },
  { id: "trad-marigold", name: "Traditional Marigold", category: "traditional", bg: "#fefce8", border: "#ca8a04", font: "serif", accent: "#ca8a04", headingColor: "#a16207" },
  { id: "trad-crimson", name: "Traditional Crimson", category: "traditional", bg: "#fff1f2", border: "#e11d48", font: "serif", accent: "#e11d48", headingColor: "#9f1239" },
  { id: "trad-turmeric", name: "Traditional Haldi", category: "traditional", bg: "#fef9c3", border: "#eab308", font: "serif", accent: "#eab308", headingColor: "#713f12" },
  { id: "trad-sandalwood", name: "Traditional Sandalwood", category: "traditional", bg: "#fdf8ed", border: "#b45309", font: "serif", accent: "#b45309", headingColor: "#78350f" },
  { id: "trad-mehendi", name: "Traditional Mehendi", category: "traditional", bg: "#f0fdf4", border: "#15803d", font: "serif", accent: "#15803d", headingColor: "#14532d" },
  { id: "trad-peacock", name: "Traditional Peacock", category: "traditional", bg: "#ecfdf5", border: "#047857", font: "serif", accent: "#047857", headingColor: "#064e3b" },
  { id: "trad-vermilion", name: "Traditional Sindoor", category: "traditional", bg: "#fff1f2", border: "#be123c", font: "serif", accent: "#be123c", headingColor: "#881337" },
  { id: "trad-festive", name: "Traditional Festive", category: "traditional", bg: "#fffbeb", border: "#d97706", font: "serif", accent: "#d97706", headingColor: "#b45309" },
  { id: "trad-ethnic", name: "Traditional Ethnic", category: "traditional", bg: "#fff7ed", border: "#ea580c", font: "serif", accent: "#ea580c", headingColor: "#c2410c" },
  
   
]; 

  