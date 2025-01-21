/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	},
  	colors: {
  		primary: '#3490dc',
  		secondary: '#ffed4a',
  		danger: '#e3342f',
  		accent: {
  			'100': '#e1ddfe',
  			'200': '#c3bbfd',
  			'300': '#a698fd',
  			'400': '#8876fc',
  			'500': '#6a54fb',
  			'600': '#5543c9',
  			'700': '#403297',
  			'800': '#2a2264',
  			'900': '#151132'
  		},
  		green: {
  			'100': '#d6f4de',
  			'200': '#aee9bd',
  			'300': '#85dd9b',
  			'400': '#5dd27a',
  			'500': '#34c759',
  			'600': '#2a9f47',
  			'700': '#1f7735',
  			'800': '#155024',
  			'900': '#0a2812'
  		},
  		yellow: {
  			'100': '#fff7cc',
  			'200': '#ffef99',
  			'300': '#ffe766',
  			'400': '#ffdf33',
  			'500': '#ffd700',
  			'600': '#ccac00',
  			'700': '#998100',
  			'800': '#665600',
  			'900': '#332b00'
  		},
  		red: {
  			'100': '#ffdad8',
  			'200': '#ffb5b0',
  			'300': '#ff8f89',
  			'400': '#ff6a61',
  			'500': '#ff453a',
  			'600': '#cc372e',
  			'700': '#992923',
  			'800': '#661c17',
  			'900': '#330e0c'
  		},
  		blue: {
  			'100': '#ebf8ff',
  			'200': '#bee3f8',
  			'300': '#90cdf4',
  			'400': '#63b3ed',
  			'500': '#4299e1',
  			'600': '#3182ce',
  			'700': '#2b6cb0',
  			'800': '#2c5282',
  			'900': '#2a4365'
  		},
  		gray: {
  			'100': '#f7fafc',
  			'200': '#edf2f7',
  			'300': '#e2e8f0',
  			'400': '#cbd5e0',
  			'500': '#a0aec0',
  			'600': '#718096',
  			'700': '#4a5568',
  			'800': '#2d3748',
  			'900': '#1a202c'
  		},
  		teal: {
  			'100': '#e6fffa',
  			'200': '#b2f5ea',
  			'300': '#81e6d9',
  			'400': '#4fd1c5',
  			'500': '#38b2ac',
  			'600': '#319795',
  			'700': '#2c7a7b',
  			'800': '#285e61',
  			'900': '#234e52'
  		},
  		slate: {
  			'100': '#f0f4f8',
  			'200': '#d9e2ec',
  			'300': '#bcccdc',
  			'400': '#95aac7',
  			'500': '#748fb0',
  			'600': '#5e7f9a',
  			'700': '#4f6d86',
  			'800': '#445a74',
  			'900': '#364152'
  		},
  		light: {
  			'100': '#f8f9fa',
  			'200': '#e9ecef',
  			'300': '#dee2e6',
  			'400': '#ced4da',
  			'500': '#adb5bd',
  			'600': '#868e96',
  			'700': '#495057',
  			'800': '#343a40',
  			'900': '#212529'
  		},
  		dark: {
  			'100': '#343a40',
  			'200': '#212529',
  			'300': '#121619',
  			'400': '#0d1117',
  			'500': '#0a0c10',
  			'600': '#090b0d',
  			'700': '#07090c',
  			'800': '#06080a',
  			'900': '#040506'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
