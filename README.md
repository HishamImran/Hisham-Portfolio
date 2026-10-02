# Zayan Ahmed — Personal Portfolio Website

An award-quality personal portfolio website designed for a Computer Science student at the **Institute of Space Technology (IST), Islamabad, Pakistan**. Built around the **"GRAVITY WELL"** design concept, featuring a custom 3D WebGL background animation system, interactive particle vector flow fields, gravitational lensing cursor distortion, scroll-driven orbital rings, and dynamic skill-to-project highlighting.

---

## 🚀 Tech Stack

- **Framework:** Vite + React 18 + TypeScript
- **Styling:** Tailwind CSS + Custom CSS Glassmorphic Design Tokens
- **Animations:** Framer Motion + Lenis (Smooth Scroll)
- **3D Graphics & Shaders:** Three.js + `@react-three/fiber` + `@react-three/drei`
- **Icons:** Lucide React (SVG only, no emojis)
- **Physics Mini-Game:** Canvas API Gravitational Slingshot & Orbit Simulator

---

## 🎨 Design Concept: "GRAVITY WELL"

- **Color Palette (Dark Mode):** Deep Space Ink (`#05060A`), Ice Cyan (`#00F0FF`), Electric Lime (`#00FF99`), Solar Amber (`#FFB800`).
- **Color Palette (Light Mode):** Clean Slate (`#F4F7FA`), Deep Cyan (`#0088CC`), Emerald (`#00A86B`), Amber (`#D97706`).
- **Typography:** *Space Grotesk* for display headings, *Inter* for body text, *JetBrains Mono* for technical telemetry labels.
- **Custom Cursor:** Precision core dot with spring-animated trailing ring, magnetic snapping to interactive targets, click distortion ripples, and automatic touch device detection.

---

## 📦 Project Structure & Content Editing

All personal data, projects, stats, timeline, and skills are centralized in a single file for quick customization:

```bash
c:/Users/hp/OneDrive/Desktop/portfolio/
├── public/
│   ├── images/
│   │   └── profile.jpg       # Profile picture (Hexagon frame in Hero)
│   └── resume.pdf            # Downloadable PDF Resume
├── src/
│   ├── data/
│   │   └── content.ts        # EDIT ALL PERSONAL DATA, PROJECTS & SKILLS HERE
│   ├── context/
│   │   └── ThemeContext.tsx  # Light / Dark mode theme persistence
│   ├── components/
│   │   ├── Preloader.tsx     # Telemetry initialization loader
│   │   ├── CustomCursor.tsx  # Magnetic gravity cursor & ripples
│   │   ├── BackgroundCanvas.tsx # WebGL particle flow field & orbital rings
│   │   ├── Hero.tsx          # Kinetic typography & profile photo frame
│   │   ├── About.tsx         # Bio & real animated stat counters
│   │   ├── SelectedWork.tsx  # 3D Tilt case study cards & spotlight hover
│   │   ├── ProjectModal.tsx  # Detailed Case Study Breakdown (Problem -> Approach -> Result)
│   │   ├── Timeline.tsx      # Trajectory timeline for IST, research & hackathons
│   │   ├── SkillsConstellation.tsx # Grouped tag clusters & project hover highlights
│   │   ├── BeyondCode.tsx    # Interactive Orbit Physics Simulator mini-game
│   │   ├── Contact.tsx       # Validated form with success state & social links
│   │   └── Footer.tsx        # System status indicator & back-to-top button
│   ├── index.css             # Glassmorphism, hairline borders, film grain & reduced motion
│   └── main.tsx
```

---

## 🔧 Setup & Installation

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Local Development Server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

3. **Build Production Bundle:**
   ```bash
   npm run build
   ```

---

## 📸 Customizing Photo & Resume

- **Replace Photo:** Place your photo at `/public/images/profile.jpg`. The website automatically formats it with an orbital frame and soft parallax hover.
- **Replace Resume:** Place your PDF resume at `/public/resume.pdf`.

---

## 🌐 Deploying to Vercel

1. Push your repository to **GitHub**.
2. Go to [Vercel](https://vercel.com) and click **Add New Project**.
3. Select your GitHub repository.
4. Framework Preset: **Vite**.
5. Click **Deploy**.

---

## ⚡ Accessibility & Performance

- Fully semantic HTML structure (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`).
- Target 90+ Lighthouse score with WebGL `dpr` capped at 1.5.
- `prefers-reduced-motion` support with a calm static fallback.
- Keyboard navigation (Tab focus rings, Escape key closes modal).
