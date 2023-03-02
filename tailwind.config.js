/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        screens: {
            'sm': "360px",
            'md': "768px",
            'lg': "1084px",
            'xl': "1366px",
            '2xl': "1512px",
            '3xl': "1920px",
        },

        fontFamily: {
            comfortaa: ['Comfortaa', 'cursive'],
            serif: ["Merriweather", "serif"],
        },
        extend: {
            rotate: {
                '270': '270deg',
            },
            spacing: {
                128: "32rem",
                144: "36rem",
            },
            borderRadius: {
                "4xl": "2rem",
            },
            colors: {
                'nice': 'rgb(97, 218, 251)',
                'good-color': 'rgb(97, 218, 251)',
                'good-bg-color': '#282c34',
                'blue_color': "#1fb6ff",
                'pink_color': "#ff49db",
                'orange_color': "#ff7849",
                'green_color': "#13ce66",
                'grayDark_color': "#273444",
                'gray_color': "#8492a6",
                'grayLight_color': "#d3dce6",
                'square1':'rgb(226, 106, 107)',
                'square2':'rgb(239, 155, 86)',
                'square3':'rgb(239, 211, 89)',
                'square4':'rgb(146, 218, 71)',
            },
        },
    },
    plugins: [],
}
