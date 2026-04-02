/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-fixed-dim": "#87d0f2", "tertiary": "#5415be", "on-primary-fixed": "#001f2a",
        "on-error-container": "#93000a", "on-background": "#171c1e", "primary-fixed": "#bee9ff",
        "surface-container-high": "#e4e9eb", "secondary-fixed-dim": "#5dd8e2",
        "on-surface-variant": "#3f484d", "tertiary-fixed": "#e9ddff",
        "surface-container": "#eaeef1", "on-secondary-fixed-variant": "#004f54",
        "surface-variant": "#dfe3e5", "surface-container-low": "#f0f4f6",
        "surface-bright": "#f6fafc", "surface": "#f6fafc", "surface-dim": "#d6dbdd",
        "on-secondary-fixed": "#002022", "inverse-surface": "#2c3133",
        "tertiary-container": "#6d3ad6", "outline": "#70787e", "inverse-primary": "#87d0f2",
        "secondary-fixed": "#7df4ff", "surface-tint": "#016684",
        "surface-container-lowest": "#ffffff", "error-container": "#ffdad6",
        "on-tertiary-fixed-variant": "#5516be", "on-secondary-container": "#006e75",
        "on-tertiary-container": "#e0d1ff", "background": "#f6fafc",
        "on-tertiary-fixed": "#23005c", "inverse-on-surface": "#edf1f3",
        "primary": "#004d64", "on-error": "#ffffff", "on-primary-container": "#a2e1ff",
        "secondary-container": "#7af1fc", "primary-container": "#006684",
        "surface-container-highest": "#dfe3e5", "on-secondary": "#ffffff",
        "error": "#ba1a1a", "tertiary-fixed-dim": "#d0bcff",
        "on-primary-fixed-variant": "#004d64", "outline-variant": "#bfc8cd",
        "on-primary": "#ffffff", "on-surface": "#171c1e", "secondary": "#006970",
        "on-tertiary": "#ffffff"
      },
      fontFamily: { "headline": ["Manrope", "sans-serif"], "body": ["Inter", "sans-serif"], "label": ["Inter", "sans-serif"] },
      borderRadius: { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" },
    },
  },
  plugins: [
    require('@tailwindcss/container-queries')
  ],
}
