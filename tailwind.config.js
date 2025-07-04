/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/features/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            animation: {
                'overlayShow': 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
                'contentShow': 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
            },
            keyframes: {
                overlayShow: {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
                contentShow: {
                    from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
                    to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
                },
            },
        },
    },
    plugins: [],
} 