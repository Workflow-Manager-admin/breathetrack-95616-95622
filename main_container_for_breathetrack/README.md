# BreatheTrack - BOLT Score Tracker

BreatheTrack is a mobile web application built with Astro that helps users measure and track their breathing efficiency using the Body Oxygen Level Test (BOLT) score.

## What is a BOLT Score?

The Body Oxygen Level Test (BOLT) score is a simple assessment that measures breathing efficiency and carbon dioxide tolerance. It's performed by timing how long you can comfortably hold your breath after a normal exhalation, stopping at the first signs of discomfort.

A higher BOLT score typically indicates better breathing patterns and more efficient oxygen delivery to tissues.

## Features

- BOLT test timer with clear instructions
- Score tracking and history visualization
- Personalized profile settings
- Dark mode support
- Mobile-optimized design
- Local storage for saving test history

## Project Structure

```
/
├── public/
│   ├── assets/
│   │   └── logo.svg
│   ├── scripts/
│   │   ├── boltTest.js
│   │   └── darkMode.js
│   └── styles/
│       └── global.css
├── src/
│   ├── components/
│   │   ├── BoltHistory.astro
│   │   ├── BoltInstructions.astro
│   │   ├── BoltTimer.astro
│   │   ├── Footer.astro
│   │   └── Header.astro
│   ├── layouts/
│   │   └── MainLayout.astro
│   └── pages/
│       ├── index.astro
│       ├── history.astro
│       └── profile.astro
└── package.json
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Technology Stack

- [Astro](https://astro.build/) - The web framework for content-focused websites
- Vanilla JavaScript for interactivity
- CSS for styling (no external UI libraries)
- Local Storage API for data persistence

## Future Enhancements

- Add data visualization charts for BOLT score trends
- Implement reminders and notifications
- Add breathing exercise guides
- Sync data across devices with user accounts

## License

This project is open source and available under the [MIT License](LICENSE).
