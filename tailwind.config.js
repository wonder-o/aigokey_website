/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#111b24',
        muted: '#5b6874',
        line: '#dce5ec',
        panel: '#ffffff',
        soft: '#f4f8fb',
        deep: '#132231',
        blue: {
          DEFAULT: '#2468f2',
          dark: '#184ab7',
        },
        green: {
          DEFAULT: '#44c928',
          dark: '#2c9d18',
        },
        cyan: '#e9f3ff',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"PingFang SC"',
          '"Microsoft YaHei"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
