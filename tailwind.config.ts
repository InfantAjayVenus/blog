import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        red: "var(--red)",
        orange: "var(--orange)",
        yellow: "var(--yellow)",
        green: "var(--green)",
        teal: "var(--teal)",
        cyan: "var(--cyan)",
        "sky-blue": "var(--sky-blue)",
        blue: "var(--blue)",
        magenta: "var(--magenta)",
        white: "var(--white)",
        comment: "var(--comment)",
      },
    },
  },
  plugins: [],
} satisfies Config;
