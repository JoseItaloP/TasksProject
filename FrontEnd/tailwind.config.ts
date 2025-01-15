import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Poppins': ['Poppins', 'serif'],
        'Lexend': ['Lexend', 'serif']
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        cold:{
          100: '#EAF2F6',
          200: '#C1D7E3',
          300: '#98BCD1',
          400: '#83AEC7',
          500: '#6FA1BE',
          600: '#4B85A6',
          700: '#38647D',
          800: '#2F5369',
          900: '#264354',
          950: '#1D3340'
        },
        hot:{
          100: '#FFF6F0',
          200: '#FFE4D2',
          300: '#FFD2B5',
          400: '#FEC097',
          500: '#FEAE79',
          600: '#FE9D5C',
          700: '#FE8B3E',
          800: '#FE7F2D',
          900: '#FE6804'
        },
        baixa: "#22c55e",
        media: '#fde047',
        alta: '#ef4444',
        atuando: '#fde047',
        completa: '#22c55e',
        abandonada: '#171717'
      },
    },
  },
  plugins: [],
} satisfies Config;
