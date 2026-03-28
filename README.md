# 🌐 Shivangi Singh Portfolio

A modern, responsive developer portfolio built using **Next.js, React, and TypeScript** to showcase projects, skills, certifications, and achievements in a clean, recruiter-friendly format.

---

## 🚀 Overview

This portfolio highlights:

* 👩‍💻 Professional summary and career journey
* 🛠️ Technical skills categorized by domain
* 📂 Project showcase with detailed views
* 📜 Certifications and extracurricular achievements
* 💡 Coding profiles and GitHub integration
* 📬 Contact section with social links and email
* 🎨 Smooth animations and responsive UI

---

## 🧰 Tech Stack

* **Framework:** Next.js 16 (App Router)
* **UI Library:** React 19
* **Styling:** Tailwind CSS 4
* **Language:** TypeScript
* **Animation:** Framer Motion
* **Icons:** Lucide React
* **Linting:** ESLint 9

---

## ✨ Key Features

* 📱 Mobile-first responsive design
* 🧭 Sticky navigation with smooth scrolling
* 🎬 Animated transitions and interactive UI
* 🌗 Light and dark mode support
* 🔍 SEO-friendly metadata & social preview
* 💼 Recruiter-focused layout and content

---

## 📌 Sections Included

* About
* Timeline
* Skills
* Projects
* Profiles
* GitHub
* Certifications
* Extracurricular
* Contact

---

## 📁 Folder Structure

```bash
portfolio/
│── public/
│   └── certificates/        # Certificate images & assets
│
│── src/
│   └── app/
│       ├── globals.css      # Global styles (Tailwind CSS)
│       ├── layout.tsx       # Root layout (shared UI)
│       └── page.tsx         # Main portfolio page
│
│── package.json             # Dependencies & scripts
│── tsconfig.json            # TypeScript configuration
│── tailwind.config.js       # Tailwind CSS configuration
│── next.config.js           # Next.js configuration
```

---

## 🧠 Structure Explanation

* **public/** → Stores static assets like images and certificates
* **src/app/** → Core application using Next.js App Router

  * `layout.tsx` → Global layout structure
  * `page.tsx` → Main UI of the portfolio
  * `globals.css` → Styling and Tailwind setup

---

## ⚙️ Getting Started

### 📋 Prerequisites

* Node.js 18.18+ (or latest LTS recommended)
* npm / yarn / pnpm / bun

---

### 📥 Installation

```bash
git clone https://github.com/ShivangiSingh13/portfolio.git
cd portfolio
npm install
```

---

### ▶️ Run Development Server

```bash
npm run dev
```

Open your browser:

```
http://localhost:3000
```

---

### 🏗️ Build for Production

```bash
npm run build
```

### 🚀 Start Production Server

```bash
npm run start
```

---

### 🧹 Lint

```bash
npm run lint
```

---

## 🔐 Environment Variables (Optional)

Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Used for SEO and social sharing previews.

---

## 🎨 Customization Guide

You can easily update:

* 🔗 Personal information & contact links
* 🧠 Skills and categories
* 📂 Projects and descriptions
* 🏆 Certifications & achievements
* 🕒 Timeline content

👉 All main changes are inside the **main page component**

---

## 🌍 Deployment

You can deploy this project on:

* Vercel (Recommended for Next.js)
* Netlify
* Any Node.js hosting platform

### 🚀 Deployment Steps

```bash
npm install
npm run build
npm start
```

## ⭐ Show Your Support

If you like this project, consider giving it a ⭐ on GitHub!
