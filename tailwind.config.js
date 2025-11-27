/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        koz: {
          primary: "#8b5cf6",
          secondary: "#6366f1",
          dark: "#1a1a2e",
          darker: "#0f0f1e",
          light: "#e5e7eb",
          muted: "#9ca3af",
          accent: {
            green: "#10b981",
            orange: "#f59e0b",
            red: "#ef4444",
            cyan: "#22d3ee",
          },
        },
      },
    },
  },
  plugins: [],
}
