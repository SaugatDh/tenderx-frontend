import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // ── Public + auth "document ink" blue system (TenderX design v2 §5, §70).
        //    Scoped to the marketing site and auth pages; the authenticated app
        //    keeps the evergreen `brand`/`ink`/`stamp` ramps below.
        blue: {
          50: "#eef5ff", // blue-pale — secondary section bg
          100: "#dcebff", // blue-soft — chips, selected states
          200: "#c3dbfd",
          300: "#93bbfa",
          400: "#3b82f6", // blue-bright — motion paths, highlights
          500: "#155eef", // primary
          600: "#0b4fd8", // primary hover
          700: "#1a45a6",
          800: "#102a56", // primary deep / navy — dark chapters, footer, auth panel
          900: "#0c2047",
          950: "#081530",
        },
        // Cool neutral ramp for public + auth text, borders, surfaces (§5.1).
        slate: {
          50: "#f7faff", // page background
          100: "#eef3fa",
          200: "#dde5f0", // border
          300: "#c5d1e1", // border-strong
          400: "#98a6bd",
          500: "#667085", // muted
          600: "#4a5568",
          700: "#344054", // ink-soft
          800: "#1d2a44",
          900: "#101828", // ink
          950: "#0a1020",
        },
        canvas: "#f7faff", // public page background (§5.1)
        // Evergreen brand ramp (authenticated app)
        brand: {
          50: "#e7f1ee",
          100: "#cfe3dd",
          200: "#a7ccc2",
          300: "#74ae9f",
          400: "#3d8c7a",
          500: "#176b5b", // primary
          600: "#0e594c", // primary hover
          700: "#0e4f43", // primary deep
          800: "#0b3a31",
          900: "#082822",
        },
        // Warm charcoal / ink ramp
        ink: {
          50: "#f7f6f1", // paper
          100: "#f1f3f0", // surface muted
          200: "#dde4df", // border
          300: "#bcc9c2", // border strong
          400: "#98a49e",
          500: "#66736d", // muted
          600: "#4e5a54",
          700: "#34413c", // ink soft
          800: "#1e2b26",
          900: "#13201c", // ink
          950: "#0b1310",
        },
        // Terracotta stamp accent
        stamp: {
          50: "#f4e2d8",
          100: "#e8c8b6",
          200: "#dba288",
          300: "#cf7a58",
          400: "#c26239",
          500: "#b84a24", // accent
          600: "#993b1b",
          700: "#7a2f15",
        },
        paper: "#f7f6f1",
        surface: "#ffffff",
        success: "#2f7648",
        warning: "#a96a19",
        danger: "#b63d3d",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        devanagari: ["var(--font-devanagari)", "Noto Sans Devanagari", "sans-serif"],
      },
      fontSize: {
        eyebrow: ["12px", { lineHeight: "1.2", fontWeight: "700", letterSpacing: "0.14em" }],
        label: ["13px", { lineHeight: "1.3", fontWeight: "650" }],
        small: ["14px", { lineHeight: "1.5", fontWeight: "500" }],
        body: ["16px", { lineHeight: "1.65", fontWeight: "450" }],
        lead: ["20px", { lineHeight: "1.55", fontWeight: "450" }],
        h4: ["20px", { lineHeight: "1.3", fontWeight: "650" }],
        h3: ["28px", { lineHeight: "1.18", fontWeight: "650" }],
        h2: ["44px", { lineHeight: "1.08", fontWeight: "700" }],
        h1: ["56px", { lineHeight: "1.02", fontWeight: "700" }],
        hero: ["72px", { lineHeight: "0.98", fontWeight: "700" }],
      },
      borderRadius: {
        xs: "6px",
        sm: "10px",
        md: "14px",
        lg: "20px",
        xl: "28px",
        input: "12px",
        button: "11px",
        pill: "999px",
      },
      boxShadow: {
        sm: "0 1px 2px rgba(19,32,28,.04), 0 4px 12px rgba(19,32,28,.05)",
        md: "0 12px 32px rgba(19,32,28,.08)",
        // Public/auth (blue) elevation + focus (§8, §55)
        "card-blue": "0 1px 2px rgba(16,42,86,.03), 0 6px 16px rgba(16,42,86,.05)",
        "md-blue": "0 16px 40px rgba(16,42,86,.08)",
        preview: "0 28px 70px rgba(16,42,86,.10)",
        hero: "0 30px 80px rgba(21,94,239,.14)",
        focus: "0 0 0 3px rgba(21,94,239,.16)",
      },
      maxWidth: {
        container: "1240px",
        narrow: "760px",
      },
      transitionDuration: {
        140: "140ms",
        180: "180ms",
        200: "200ms",
        220: "220ms",
      },
      keyframes: {
        rise: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-slide": {
          from: { opacity: "0", transform: "translateX(8px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        driftA: {
          "0%,100%": { transform: "translate3d(0,0,0) rotate(-2deg)" },
          "50%": { transform: "translate3d(0,-8px,0) rotate(1.5deg)" },
        },
        driftB: {
          "0%,100%": { transform: "translate3d(0,0,0) rotate(2.2deg)" },
          "50%": { transform: "translate3d(0,7px,0) rotate(-1deg)" },
        },
        driftC: {
          "0%,100%": { transform: "translate3d(0,0,0) rotate(-1.2deg)" },
          "50%": { transform: "translate3d(0,-6px,0) rotate(2.4deg)" },
        },
        "paper-in": {
          "0%,8%": { opacity: "0", transform: "translate3d(0,26px,0) rotate(-3deg) scale(.96)" },
          "20%,88%": { opacity: "1", transform: "translate3d(0,0,0) rotate(-1deg) scale(1)" },
          "100%": { opacity: "0", transform: "translate3d(0,-14px,0) rotate(0deg) scale(.99)" },
        },
        "check-pop": {
          "0%,18%": { opacity: "0", transform: "scale(.7)" },
          "28%,86%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(1)" },
        },
        "row-flash": {
          "0%,20%": { backgroundColor: "rgba(23,107,91,.10)" },
          "40%,100%": { backgroundColor: "rgba(23,107,91,0)" },
        },
        "stamp-press": {
          "0%,44%": { opacity: "0.35", transform: "scale(.94) rotate(-6deg)" },
          "58%,88%": { opacity: "1", transform: "scale(1) rotate(-3deg)" },
          "100%": { opacity: "0.35", transform: "scale(.94) rotate(-6deg)" },
        },
        "soft-pulse": {
          "0%,100%": { opacity: "0.55" },
          "50%": { opacity: "1" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        rise: "rise 450ms cubic-bezier(.22,1,.36,1) both",
        "fade-slide": "fade-slide 200ms cubic-bezier(.22,1,.36,1) both",
        driftA: "driftA 9s ease-in-out infinite",
        driftB: "driftB 8s ease-in-out infinite",
        driftC: "driftC 10s ease-in-out infinite",
        "paper-in": "paper-in 9s ease-in-out infinite",
        "check-pop": "check-pop 9s ease-in-out infinite",
        "row-flash": "row-flash 9s ease-in-out infinite",
        "stamp-press": "stamp-press 9s ease-in-out infinite",
        "soft-pulse": "soft-pulse 2.4s ease-in-out infinite",
        "spin-slow": "spinSlow 900ms linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
