import type { Config } from 'tailwindcss';

   const config: Config = {
     content: [
       './app/**/*.{js,ts,jsx,tsx}',
       './pages/**/*.{js,ts,jsx,tsx}',
       './components/**/*.{js,ts,jsx,tsx}',
     ],
     theme: {
       extend: {
         colors: {
           'dark-bg': '#111827', // gray-900
         },
       },
     },
     plugins: [],
   };

   export default config;