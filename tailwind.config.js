/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      '2xl':  '1536px',
      'xl':  '1280px',
      'lg':  '1024px',
      'md':  '768px',
      'sm': '640px',
      'xs': {'max': '480px'},

    },
    extend: {
      colors: {
        "black": "#040711",
        "darkgray": "#4D5562",
        "lightgray": "#6C7280",
        "whitegray": "#CDD5E0",
        "border":"#394150",
        "white": "#F9FAFB",
        "blue": "#3662E3",
        "skyblue": "#7CA9F3",
        "input":"#212936cc",
        "output":"#121826cc",
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}

