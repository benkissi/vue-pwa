/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        jetBlue: '#0085BA',
        jetGreen: '#28C76F',
        jetOrange: '#FF9F43',
        jetRed: '#EA5455',
        jetBlack: '#05102C',
        jetText: '#052543',
        jetGray: '#6E6B7B',
        jetSecondary: '#646F8C',
        jetNeutral: '#CED8E6',
        jetGrayLight: '#F3F2F7',
        jetDarkBg: '	#1e1e1e',
        jetDarkText: '#eee',
        jetDarkSec: ' #ababab',
        jetDarkBorder: '#3e3e42',
        jetDarkInputBorder: '#64748b'
      },
      fontSize: {
        10: [
          '10px',
          {
            lineHeight: 'normal'
          }
        ],
        12: [
          '12px',
          {
            lineHeight: 'normal'
          }
        ],
        14: [
          '14px',
          {
            lineHeight: 'normal'
          }
        ],
        16: [
          '16px',
          {
            lineHeight: 'normal'
          }
        ],
        20: [
          '20px',
          {
            lineHeight: 'normal'
          }
        ]
      },
      spacing: {
        20: '20px',
        16: '16px'
      }
    }
  },
  plugins: []
}
