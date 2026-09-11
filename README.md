<div align="center">

# ✦ Abdellah El Kacem (Kacimo) — Portfolio

<p align="center">
  <strong>UI/UX Designer & Frontend Developer</strong>
</p>

<p align="center">
  Crafting intuitive digital experiences and high-performance web applications where functionality meets aesthetics.
</p>

[![Live Demo](https://img.shields.io/badge/Live%20Demo-kacimo.me-ffa958?style=for-the-badge&logo=googlechrome&logoColor=white)](https://www.kacimo.me)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-blue?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

[Explore Projects](#-featured-projects) • [Key Features](#-key-features) • [Tech Stack](#%EF%B8%8F-tech-stack) • [Getting Started](#-getting-started) • [Contact](#-connect-with-me)

</div>

<br />

## 📖 Overview

This repository hosts the source code for the personal portfolio of **Abdellah El Kacem** ([@Kacimo](https://www.kacimo.me)), a UI/UX Designer and Frontend Developer based in Morocco (1337 Coding School alumnus / student). 

The portfolio is built using **Next.js 16 (App Router)**, **React 19**, **TypeScript**, and **Tailwind CSS v4**. It features custom micro-interactions, smooth GSAP-driven scroll and magnetic effects, WebGL gradient wave simulations via OGL, custom typography, dynamic light/dark theming, and a full-stack contact flow with Nodemailer.

---

## ✨ Key Features

- **Fluid Animations & Micro-Interactions**:
  - WebGL-powered interactive wave canvas background using **OGL**.
  - Smooth reveal, split-text, and magnetic interactions powered by **GSAP** and **Motion**.
  - Decay cards, circular spinning labels, and spotlight hover interactions.
- **Adaptive Dark / Light Themes**:
  - Seamless theme toggling with zero flash on load (script-based local storage check + CSS variables).
  - Dynamic iconography and themed vector assets for each mode.
- **Interactive Project Showcase**:
  - Dynamic project catalogue with rich tags, tech stack badges, and year identifiers.
  - Interactive project detail modal featuring multi-image carousel, live preview links, and source code shortcuts.
- **Interactive Skills Section**:
  - Spotlight cards presenting core engineering and design tools (Figma, Photoshop, React, Next.js, TypeScript, Python, Docker, etc.).
- **Functional Contact Form**:
  - Interactive service selector and auto-resizing textarea.
  - Server-side email delivery powered by **Nodemailer** with environment-based SMTP config.
- **Optimized Performance & SEO**:
  - Local font optimization (`Work Sans`, `ANKISH`, `FTCrustAce`).
  - Next.js Metadata API with OpenGraph cards, Twitter cards, sitemap, and robots configuration.

---

## 🛠️ Tech Stack

### Frontend & Core
- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & CSS Modules / Custom Tokens
- **Icons:** [Lucide React](https://lucide.dev/) & [FontAwesome](https://fontawesome.com/)

### Animations & Graphics
- **GSAP (GreenSock):** Advanced timeline sequencing and magnetic cursor physics
- **Motion (Framer Motion):** Smooth component state transitions and entrance reveals
- **OGL:** Minimal WebGL library for GPU-accelerated wave shaders

### Backend & Tooling
- **Mailing:** [Nodemailer](https://nodemailer.com/) (SMTP server actions)
- **Linting & Code Quality:** ESLint 9
- **Deployment:** Vercel

---

## 📂 Project Structure

```bash
Portfolio_V-0.0.1/
├── app/
│   ├── _email/               # Nodemailer server action & mail handlers
│   ├── font/                 # Custom local typography (ANKISH, FTCrustAce)
│   ├── layout.tsx            # Root layout with fonts, metadata, and theme script
│   ├── page.tsx              # Main portfolio landing page
│   ├── project_list.ts       # Project showcase data and metadata
│   ├── skill_list.ts         # Technical skills data
│   └── globals.css           # Design tokens, color system, and Tailwind CSS imports
├── components/
│   ├── sections/             # Core page sections
│   │   ├── NavBar.tsx        # Top navigation bar
│   │   ├── HeroSection.tsx   # Hero showcase & headline
│   │   ├── AboutSection.tsx  # Bio, philosophy & decay card
│   │   ├── SkillsSection.tsx # Spotlight grid of technical skills
│   │   ├── ProjectsSection.tsx # Project cards grid
│   │   ├── ProjectModal.tsx  # Detailed modal dialog & carousel
│   │   ├── ContactSection.tsx# Contact form with email action
│   │   └── FooterSection.tsx # WebGL waves & footer links
│   └── ...                   # Reusable animation & UI primitives (Magnet, SplitText, etc.)
├── images/                   # Project mockups and assets
├── public/                   # Public SVGs, icons, and shapes
└── DEPLOYMENT.md             # Comprehensive hosting & SMTP setup guide
```

---

## 🚀 Featured Projects

| Project | Role / Tags | Description |
| :--- | :--- | :--- |
| **[Hypertube](https://github.com/Abdellah-ElKacem/The-Hypertube)** | UI/UX Design, Frontend, Streaming | Modern streaming platform with high-fidelity interface and optimized catalog navigation. |
| **[Portfolio v1](https://github.com/Abdellah-ElKacem/Portfolio_V-0.0.1)** | UI/UX, Full-Stack Frontend | Interactive, animation-driven developer showcase built with Next.js, Tailwind v4 & GSAP. |
| **[Aura Prestige Tech](https://auraprestigetech.com)** | Full-Stack, Next.js, Firebase | Clean corporate tech web solution with high performance and SEO focus. |
| **Domicilia & Admin Panel** | Product Design, UI/UX, Dashboard | Dual-sided mobile app concept & operational data-dense admin control panel for home services. |
| **[Ft_Transcendance](https://dribbble.com/shots/27720671-UX-UI-Design-of-Ping-Pong-Platform)** | Full-Stack, WebSockets, Docker | Real-time competitive online Pong gaming platform with user matchmaking and authentication. |
| **[MGH Univers](https://mgh-univers-website.vercel.app/)** | Web Design, Lead Generation | Conversion-focused landing page for a commercial printing press company. |
| **Virtus** | Platform UX/UI, Enterprise | Streamlined digital compliance system for managing ISO certification workflows. |

---

## 💻 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version `18.18+` or `20+` recommended)
- Package manager: `npm`, `pnpm`, `yarn`, or `bun`

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Abdellah-ElKacem/Portfolio_V-0.0.1.git
   cd Portfolio_V-0.0.1
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the project root:
   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000

   # SMTP Configuration (for contact form)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_SECURE=false
   ```
   > ℹ️ See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on generating Gmail App Passwords and configuring production hosting.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open the browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to view the portfolio.

---

## 📦 Scripts

- `npm run dev` — Launch the local development server with Turbopack / Next.js dev.
- `npm run build` — Create an optimized production bundle.
- `npm run start` — Run the production build locally.
- `npm run lint` — Run ESLint to check for code quality and errors.

---

## 🌐 Connect With Me

- **Website:** [kacimo.me](https://www.kacimo.me)
- **LinkedIn:** [Abdellah El Kacem](https://www.linkedin.com/in/abdellah-el-kacem/)
- **Dribbble:** [@Kaciimo](https://dribbble.com/Kaciimo)
- **X / Twitter:** [@kacem_abdellah](https://x.com/kacem_abdellah)
- **Instagram:** [@abdellah_elkacem](https://www.instagram.com/abdellah_elkacem/)
- **GitHub:** [@Abdellah-ElKacem](https://github.com/Abdellah-ElKacem)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

<div align="center">
  <sub>Designed & Developed with ❤️ by <a href="https://www.kacimo.me">Abdellah El Kacem (Kacimo)</a></sub>
</div>
