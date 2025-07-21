# 🕌 Salaty - Islamic Prayer Companion

**Salaty** is a modern, responsive Islamic prayer companion application built with Next.js. The app helps Muslims stay connected with their daily prayers through accurate prayer time calculations, Qibla direction finding, digital Sibha (Tasbih), Qur'an reading, and live Makkah streaming.

## ✨ Features

### 🕐 Prayer Times
- Accurate prayer time calculations using the Aladhan API
- Automatic location detection via GPS
- Support for multiple calculation methods
- Times displayed in local timezone
- Next prayer countdown and notifications

### 🧭 Qibla Direction
- Precise Qibla direction finder using GPS coordinates
- Beautiful interactive compass design with cardinal directions
- Real-time direction calculation to Mecca
- Visual indicators and degree measurements

### 📿 Digital Sibha (Tasbih)
- Digital prayer bead counter for dhikr and remembrance
- Tap-to-increment functionality
- Reset counter option
- Common dhikr reminders (SubhanAllah, Alhamdulillah, Allahu Akbar)

### 📖 Qur'an Reading
- Integrated Qur'an reading interface
- Clean, accessible design for spiritual reading

### 📺 Live Makkah Stream
- Live streaming from the Holy Mosque in Makkah
- High-quality video integration
- Fallback error handling for stream availability

### 🌐 Multi-language Support
- Full Arabic and English language support
- RTL (Right-to-Left) layout for Arabic text
- Context-aware translations throughout the app

### 🎨 Modern UI/UX
- Responsive design that works on all devices
- Dark and light theme support
- Smooth animations and transitions using GSAP
- Glass-morphism design elements
- Mobile-first approach

## 🛠️ Technology Stack

- **Framework**: Next.js 15.4.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Animations**: GSAP
- **API**: Aladhan API for prayer times and Qibla
- **Video**: React YouTube for live streaming
- **Responsive**: React Responsive for device detection

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or later
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/prayer-times-next.git
cd prayer-times-next
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📱 Features Overview

### Prayer Times Calculation
The app uses the reliable Aladhan API to calculate accurate prayer times based on your geographical location. It supports various calculation methods and automatically adjusts for your local timezone.

### Qibla Direction Finder
Using GPS coordinates and the Aladhan API, the app determines the precise direction to the Kaaba in Mecca. The interactive compass provides a visual representation with cardinal directions and degree measurements.

### Digital Sibha Counter
A modern take on the traditional prayer beads, allowing users to perform dhikr (remembrance of Allah) with easy tap functionality and helpful reminders of common prayers.

### Multilingual Experience
Complete support for Arabic and English languages with proper RTL layout handling for Arabic text, ensuring an authentic experience for users regardless of their language preference.

## 🎯 Project Structure

```
prayer-times-next/
├── app/
│   ├── (root)/
│   │   ├── live/          # Makkah live streaming
│   │   ├── qibla/         # Qibla direction finder
│   │   ├── quran/         # Qur'an reading interface
│   │   └── sibha/         # Digital prayer beads
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/
│   ├── layout/            # Layout components
│   └── ui/                # Reusable UI components
├── constants/             # App constants and configuration
├── contexts/              # React contexts
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and translations
└── public/                # Static assets
```

## 🌟 API Integration

The app integrates with the following APIs:
- **Aladhan API**: For prayer times calculation and Qibla direction
- **Browser Geolocation API**: For automatic location detection
- **YouTube API**: For live Makkah streaming

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Aladhan API](https://aladhan.com/prayer-times-api) for providing accurate prayer times and Qibla direction
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Radix UI](https://www.radix-ui.com/) for accessible UI components

## 📞 Support

If you have any questions or need support, please open an issue on GitHub.

---

**May this application help in strengthening your connection with Allah and maintaining regular prayers. Barakallahu feek!** 🤲

*"And establish prayer. Indeed, prayer prohibits immorality and wrongdoing, and the remembrance of Allah is greater." - Quran 29:45*
