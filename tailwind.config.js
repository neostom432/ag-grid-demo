/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      colors: {
        teal: {
          600: "#12666C",
          500: "#0F8296",
          400: "#0AA2C0",
          300: "#84D0DF",
          200: "#A9DEE9",
          100: "#DAF1F6",
          50: "#EBF8FA",
        },
        neutral: {
          900: "#101840",
          800: "#474D66",
          700: "#696F8C",
          600: "#8F95B2",
          500: "#C1C4D6",
          400: "#D8DAE5",
          300: "#E6E8F0",
          200: "#EDEFF5",
          100: "#F4F6FA",
          75: "#F9FAFC",
          50: "#FAFBFF",
          0: "#FFFFFF",
        },
        blue: {
          600: "#1F3D99",
          500: "#2952CC",
          400: "#3366FF",
          300: "#9DB5FF",
          200: "#D6E0FF",
          100: "#EBF0FF",
          50: "#F3F6FF",
        },
        green: {
          600: "#317159",
          500: "#429777",
          400: "#52BD94",
          300: "#A3E6CD",
          200: "#DCF2EA",
          100: "#EEF8F4",
          50: "#F5FBF8",
        },
        yellow: {
          600: "#66460D",
          500: "#996A13",
          400: "#FFB020",
          300: "#FFD079",
          200: "#FFDFA6",
          100: "#FFEFD2",
          50: "#FFFAF1",
        },
        red: {
          600: "#7D2828",
          500: "#A73636",
          400: "#D14343",
          300: "#EE9191",
          200: "#F4B6B6",
          100: "#F9DADA",
          50: "#FDF4F4",
        },
        violet: {
          600: "#524988",
          500: "#6E62B6",
          400: "#897AE3",
          300: "#B8AFEE",
          200: "#D0CAF4",
          100: "#E7E4F9",
          50: "#F8F7FD",
        },

        pink: {
          600: "#8E3374",
          500: "#BE449B",
          400: "#ED55C2",
          300: "#F499DA",
          200: "#F8BBE7",
          100: "#FBDDF3",
          50: "#FEF5FB",
        },
        orange: {
          600: "#85462B",
          500: "#B25E3A",
          400: "#DE7548",
          300: "#EBAC91",
          200: "#F2C8B6",
          100: "#F8E3DA",
          50: "#FDF4F4",
        },
        border: "hsl(var(--border))",
        "scroll-thumb": "var(--scroll-thumb)",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        1: "0px 0px 1px 0px rgba(16, 24, 64, 0.30), 0px 5px 8px -4px rgba(67, 90, 111, 0.47)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
