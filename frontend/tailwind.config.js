/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zips: {
          green: {
            50: '#F0F7F4',
            100: '#E1EFE9',
            200: '#C3DFD3',
            300: '#9AC8B6',
            400: '#6AA893',
            500: '#428872',
            600: '#2A6B57',
            700: '#1B5443',
            800: '#134235',
            900: '#0D3329',
            950: '#061D17',
          },
          gold: {
            50: '#FDFBF5',
            100: '#FAF4E3',
            200: '#F3E5BF',
            300: '#EBD195',
            400: '#DFB863',
            500: '#C59B27',
            600: '#A9801A',
            700: '#856114',
            800: '#694B14',
            900: '#533B13',
            950: '#302007',
          },
          charcoal: {
            50: '#F7F8F7',
            100: '#EEEFEF',
            200: '#D9DCDA',
            300: '#B9BEBC',
            400: '#929995',
            500: '#717874',
            600: '#585E5B',
            700: '#474B49',
            800: '#3A3D3C',
            900: '#1E2120',
            950: '#121413',
          },
          cream: '#FDFCF7',
          sand: '#F7F4EB',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        serif: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(13, 51, 41, 0.06)',
        'premium': '0 10px 30px -4px rgba(13, 51, 41, 0.1), 0 4px 12px -2px rgba(13, 51, 41, 0.05)',
        'gold-glow': '0 0 25px rgba(197, 155, 39, 0.25)',
      }
    },
  },
  plugins: [],
}
