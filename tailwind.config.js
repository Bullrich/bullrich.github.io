/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,njk,md,js}"],
    theme: {
        extend: {
            colors: {
                "brand-blue": "var(--color-brand-blue)",
                "brand-orange": "var(--color-brand-orange)",
            },
            fontFamily: {
                sans: "var(--font-sans)",
            },
            animation: {
                "fade-in-right": "fadeInRight 1s ease-out forwards",
                "fade-in-up": "fadeInUp 1s ease-out forwards",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                float: "float 3s ease-in-out infinite",
                wiggle: "wiggle 1s ease-in-out infinite",
                "width-fill": "widthFill 1s ease-out forwards",
            },
            keyframes: {
                widthFill: {
                    "0%": { width: "0%" },
                    "100%": { width: "100%" },
                },
                fadeInRight: {
                    "0%": { opacity: "0", transform: "translateX(-20px)" },
                    "100%": { opacity: "1", transform: "translateX(0)" },
                },
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                wiggle: {
                    "0%, 100%": { transform: "rotate(-3deg)" },
                    "50%": { transform: "rotate(3deg)" },
                },
            },
            borderRadius: {
                blob: "60% 40% 30% 70% / 60% 30% 70% 40%",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
