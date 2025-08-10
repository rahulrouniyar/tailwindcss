/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}" 
  ],
  safelist:[
	'bg-green-300',
	'bg-green-500',
	'bg-red-300',
	'bg-brand-500',
	"text-grey-100",
	"text-brand-700",
	"text-brand-600",
  ],
  theme: {
  	extend: {
  		colors: {
			green : {
				'300': '#6ED7D2',
			},
			red: {
				'300': '#E16464',
			},
  			brand: {
  				'100': '#EBF3FE',
  				'200': '#C4DAFC',
  				'300': '#A7C7FB',
  				'400': '#76A8F9',
  				'500': '#5995F7',
  				'600': '#3B82F6',
  				'700': '#0B64F4',
  				'800': '#0950C3',
  				'900': '#063684'
  			},
  			grey: {
  				'100': '#F5F5FA',
  				'200': '#F0F0F5',
  				'300': '#E6EBEB',
  				'400': '#DCE1E6',
  				'500': '#CDD2D7',
  				'600': '#AAB4B9',
  				'700': '#828C96',
  				'800': '#465055',
  				'900': '#32373C'
  			},
  			accent: {
  				green: {
  					'100': '#E6FFFA',
  					'200': '#A5BEBB',
  					'300': '#6ED7D2',
  					'400': '#3CAAA0',
  					'500': '#289187',
  					'600': '#19645A',
  					'700': '#0F4141'
  				},
  				yellow: {
  					'100': '#FFFFF0',
  					'200': '#FAF0D7',
  					'300': '#F9E19B',
  					'400': '#F0C864',
  					'500': '#C8A53C',
  					'600': '#8C691E',
  					'700': '#5A460F'
  				},
  				red: {
  					'100': '#FFF5F5',
  					'200': '#F5AAAA',
  					'300': '#E16464',
  					'400': '#DC2D2D',
  					'500': '#B41E1E',
  					'600': '#871919',
  					'700': '#5F1414'
  				},
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

