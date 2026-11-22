# Minimalist Portfolio (Backend Developer · Data Engineer · BI Analyst)

A minimalist developer portfolio built with **React**, **TypeScript**, and **Vite**, inspired by the iconic design language of [Brittany Chiang](https://brittanychiang.com/).

Designed specifically for multidisciplinary engineers spanning **Backend Architecture**, **Data Engineering Pipelines**, and **Business Intelligence Analytics**.

---

## ✨ Features

- **Iconic Brittany Chiang Two-Column Split Layout**:
  - **Left Sticky Sidebar**: Large typography name, multi-disciplinary role title, concise bio tagline, animated line indicator navigation (Scrollspy active tracking), and direct social links (GitHub, LinkedIn, Email, Resume).
  - **Right Scrollable Stream**: Rich content sections for **About**, **Specializations & Core Stack**, **Experience**, and **Projects**.
- **Interactive Cursor Spotlight Glow**: Radial gradient spotlight following mouse position across the deep slate canvas (`#0f172a`).
- **Card Group Hover Effect**: Hovering any experience or project card elevates it with a luminous backdrop and border glow while gently dimming surrounding cards to direct focus.
- **Project Discipline Filter**: Filter projects interactively by discipline:
  - `All`
  - `Backend`
  - `Data Engineering`
  - `BI & Analytics`
- **Impact Metrics & Tech Badges**: Highlighting throughput, latency, reliability percentages, and modern stack pills (`Go`, `Kafka`, `Airflow`, `dbt`, `ClickHouse`, `PostgreSQL`, `Power BI`, `DAX`, `Docker`, `Kubernetes`).
- **Responsive Mobile Experience**: Stacks gracefully on smaller viewports with sticky blurred headers for each section.
- **Zero Heavy CSS Framework Bloat**: Pure, ultra-fast custom CSS with Google Fonts (`Inter` & `JetBrains Mono`).

---

## 🛠️ Project Structure

```text
d:/Project/Portofolio/
├── src/
│   ├── components/
│   │   ├── AboutSection.tsx       # Narrative bio & 3 specializations pillars
│   │   ├── ExperienceSection.tsx  # Work timeline, achievements, tech tags
│   │   ├── ProjectsSection.tsx    # Filterable project cards with metrics
│   │   ├── Sidebar.tsx            # Sticky header, navigation spy, socials
│   │   ├── Spotlight.tsx          # Dynamic cursor glow tracker
│   │   ├── Icons.tsx              # Clean, zero-dependency SVG icons
│   │   └── Footer.tsx             # Minimalist attribution & credits
│   ├── data/
│   │   └── portfolioData.ts       # ⚙️ SINGLE SOURCE OF TRUTH for all data
│   ├── App.tsx                    # Main layout & scrollspy coordinator
│   ├── index.css                  # Core design tokens, effects & typography
│   └── main.tsx                   # React root entry
├── index.html                     # SEO meta tags, Google Fonts
└── package.json                   # Dependencies & scripts
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized bundle will be generated in `dist/`.

---

## 📝 How to Customize

All content is centralized in a single configuration file:
👉 **[src/data/portfolioData.ts](file:///d:/Project/Portofolio/src/data/portfolioData.ts)**

- **Change Name & Bio**: Update `PERSONAL_INFO` (name, title, tagline, about paragraphs, social links).
- **Edit Experiences**: Update `EXPERIENCES` array (companies, roles, achievements, skills).
- **Add / Edit Projects**: Update `PROJECTS` array (titles, category: `'Backend'` | `'Data Engineering'` | `'BI & Analytics'`, descriptions, metrics, highlights, links).
- **Adjust Skill Pillars**: Update `SKILL_PILLARS` (specializations and technologies).
