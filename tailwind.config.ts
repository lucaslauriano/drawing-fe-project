import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        gray: {
          900: '#000000',
          800: '#282828',
          700: '#333333',
          600: '#4d4d4d',
          500: '#666666',
          400: '#808080',
          300: '#999999',
          200: '#b3b3b3',
          100: '#cccccc',
          50: '#e6e6e6',
        },
      },
    },
  },
  plugins: [],
};
export default config;
