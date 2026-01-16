/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                glass: {
                    100: 'rgba(255, 255, 255, 0.1)',
                    200: 'rgba(255, 255, 255, 0.2)',
                    300: 'rgba(255, 255, 255, 0.3)',
                    dark: 'rgba(0, 0, 0, 0.3)',
                },
                primary: '#ffffff',
                accent: '#1e2028',
            },
            fontFamily: {
                sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                '3xl': '1.5rem',
                '4xl': '2rem',
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}
