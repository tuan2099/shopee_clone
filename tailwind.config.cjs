/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d'
      },
      backgroundImage: {
        'pack-train': "url('https://cf.shopee.vn/file/sg-11134004-23010-qacwpnvb05lve3')"
      }
    }
  },
  plugins: []
}
