# NARAKA AIR SERVICES LTD - Mobile Travel App

A professional, modern mobile-first travel application built for NARAKA AIR SERVICES LTD. The app focuses on flight booking, Umrah packages, visa assistance, and general travel services for customers in Nigeria and internationally.

## Features

- **Home Screen**: Company branding with hero carousel, featured deals, popular destinations, and testimonials
- **Flight Booking**: Search, compare, and book flights with payment simulation
- **Umrah Packages**: Browse packages with details, pricing, and booking options
- **Visa Services**: Application info, requirements, and inquiry forms
- **Hotel Booking**: Hotel recommendations and booking functionality
- **Live Chat**: In-app chat support + WhatsApp integration
- **Contact Form**: Email inquiry submission with office locations
- **User Account**: Sign up, login, and booking history
- **Notifications**: Deals, confirmations, and updates
- **Admin Panel**: Dashboard to manage bookings and packages (admin access: login with email containing "admin")
- **Multi-language**: English and Hausa support
- **Secure Payment**: Payment gateway placeholder with card form

## Design

- **Color Theme**: Navy Blue (#1A237E), Red (#D32F2F), White
- **Typography**: Inter (Google Fonts)
- **Navigation**: Bottom tab bar (Home, Bookings, Services, Profile, Support)
- **Animations**: Framer Motion for smooth page transitions and interactions

## Tech Stack

- React 18 + Vite
- React Router DOM (SPA navigation)
- Tailwind CSS (utility-first styling)
- Framer Motion (animations)
- Lucide React (icons)
- date-fns (date formatting)

## Project Structure

```
narakatravel-app/
├── src/
│   ├── components/    # Reusable UI components
│   ├── context/       # React Context (Auth, Language)
│   ├── data/          # Mock data (flights, packages, hotels, etc.)
│   ├── pages/         # Screen components
│   ├── utils/         # Helper functions
│   ├── App.jsx        # Main router
│   └── main.jsx       # Entry point
├── public/            # Static assets
├── dist/              # Production build
└── index.html         # HTML template
```

## Getting Started

```bash
cd narakatravel-app
npm install
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview production build
```

## Demo Credentials

- **Admin Access**: Use an email containing "admin" (e.g., `admin@narakaairservice.com`) with any password
- **Regular User**: Any other email will create a standard user account

## Language Support

Toggle between English and Hausa using the globe icon in the header. Language preference is persisted in localStorage.

## Notes

- This is a demo application with mock data and simulated payment flows.
- In a production environment, the app would connect to a backend API for real booking, payment processing, and authentication.
- The app is designed mobile-first (max-width: 430px) but works responsively on all screen sizes.
- For native iOS/Android deployment, this React web app can be wrapped with Capacitor or Cordova.

## Company Details

- **Company**: NARAKA AIR SERVICES LTD
- **Website**: [www.narakaairservice.com](http://www.narakaairservice.com)
- **Email**: info@narakaairservice.com
- **Phone**: +234 803 353 4218
- **Address**: No.3 Zoo Road, Kano Nigeria

## License

Proprietary - NARAKA AIR SERVICES LTD