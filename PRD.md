# Claw Newsletter Website - Product Requirements Document

## Executive Summary

**Project:** Atoms Over Bits Newsletter Website Redesign  
**Current URL:** https://theloop705.github.io/claw-newsletter/  
**Platform:** GitHub Pages (Static HTML/CSS/JS)  
**Version:** 2.0  

The Claw Newsletter website is an investment research publication focused on "atoms over bits" — physical infrastructure businesses with software-like valuations. The current site is functional but minimal, with basic navigation, simple data visualization, and limited interactivity. This PRD outlines a comprehensive redesign to transform it into a professional, engaging, and feature-rich publication platform while maintaining GitHub Pages constraints.

### Current State Assessment

| Aspect | Current | Target |
|--------|---------|--------|
| Design | Basic dark theme | Polished, professional |
| Navigation | 3 static pages | Enhanced with search/filter |
| Content Display | Simple cards | Rich, interactive layouts |
| Data Visualization | Basic stats grid | Charts, trends, analytics |
| Mobile Experience | Responsive basics | Fully optimized |
| SEO | Minimal | Comprehensive |
| Accessibility | Untested | WCAG 2.1 AA compliant |

---

## User Personas

### Primary: The Professional Investor (Alex)
- **Role:** Portfolio manager, analyst, or sophisticated individual investor
- **Goals:** Quickly assess investment ideas, track themes, compare opportunities
- **Pain Points:** Information overload, difficulty tracking thesis evolution, no performance data
- **Tech Savvy:** High — uses multiple screens, expects fast interactions

### Secondary: The Curious Learner (Jordan)
- **Role:** Finance student, tech professional exploring investment themes
- **Goals:** Understand "atoms over bits" thesis, learn about semiconductor/energy infrastructure
- **Pain Points:** Complex terminology, no beginner-friendly explanations
- **Tech Savvy:** Medium — primarily mobile, skims content

### Tertiary: The Industry Practitioner (Morgan)
- **Role:** Works in semiconductor/energy/logistics industry
- **Goals:** Stay informed on competitive landscape, validate market perspectives
- **Pain Points:** Surface-level analysis, missing technical depth
- **Tech Savvy:** High — expects detailed data, downloadable resources

---

## User Stories

### Content Discovery
- **As a reader, I want to** browse issues by theme **so that** I can follow specific investment themes over time
- **As a reader, I want to** search across all issues by ticker, company name, or keyword **so that** I can find relevant research quickly
- **As a reader, I want to** filter companies by rating (Buy/Hold/Avoid) **so that** I can focus on actionable recommendations
- **As a reader, I want to** see related themes and companies **so that** I can discover connected investment opportunities

### Reading Experience
- **As a reader, I want to** view the full issue in a clean, readable format **so that** I can consume research without distractions
- **As a reader, I want to** expand/collapse company details **so that** I can scan quickly or dive deep as needed
- **As a reader, I want to** see price targets and position sizing guidance **so that** I can assess portfolio fit
- **As a reader, I want to** view key takeaways at a glance **so that** I can recall the main points after reading

### Tracking & Analytics
- **As a reader, I want to** see how recommendations have performed over time **so that** I can evaluate research quality
- **As a reader, I want to** track which themes are trending **so that** I can identify emerging opportunities
- **As a reader, I want to** view historical ratings for a company **so that** I can see thesis evolution

### Engagement
- **As a reader, I want to** share specific companies or themes **so that** I can discuss with colleagues
- **As a reader, I want to** subscribe to updates **so that** I know when new issues publish
- **As a reader, I want to** access the site on mobile **so that** I can read during commutes

---

## Feature Requirements

### P0 - Must Have (MVP)

| ID | Feature | Description | Acceptance Criteria |
|----|---------|-------------|---------------------|
| P0-1 | Static Site Generation | All content pre-rendered as HTML | No server-side processing required |
| P0-2 | Issue Display | Full issue page with all themes and companies | Renders from JSON data, clean layout |
| P0-3 | Archive Navigation | List all issues chronologically | Click to view any past issue |
| P0-4 | Responsive Design | Mobile-first, works on all devices | Passes Chrome DevTools device tests |
| P0-5 | Company Cards | Consistent display of company data | Ticker, rating, metrics, bull/bear case |
| P0-6 | Theme Grouping | Companies organized by theme | Clear visual separation between themes |
| P0-7 | SEO Basics | Meta tags, semantic HTML, sitemap | Valid structured data, crawlable links |
| P0-8 | Fast Load Times | < 3s first contentful paint | Optimized images, minimal JS, cached assets |

### P1 - High Priority

| ID | Feature | Description | Acceptance Criteria |
|----|---------|-------------|---------------------|
| P1-1 | Client-Side Search | Search issues, companies, themes | Instant results, highlights matches |
| P1-2 | Theme Filtering | Filter archive by theme tags | URL params for shareable filtered views |
| P1-3 | Rating Filters | Filter by Buy/Hold/Avoid ratings | Visual toggle, instant update |
| P1-4 | Company Detail Modal | Expanded view without page nav | Charts, full metrics, related companies |
| P1-5 | Reading Progress | Visual indicator while scrolling | Progress bar or section highlighting |
| P1-6 | Print Stylesheet | Optimized for PDF printing | Clean layout, no navigation |
| P1-7 | Dark/Light Toggle | Theme preference | Persists in localStorage |
| P1-8 | Social Sharing | Open Graph tags, share buttons | Rich previews on Twitter/LinkedIn |

### P2 - Nice to Have

| ID | Feature | Description | Acceptance Criteria |
|----|---------|-------------|---------------------|
| P2-1 | Performance Charts | Historical price vs target | Static charts generated at build time |
| P2-2 | Theme Timeline | Visual timeline of theme coverage | Shows when themes first/last covered |
| P2-3 | Related Content | "You might also like" suggestions | Based on themes, ratings, companies |
| P2-4 | Reading Time Estimate | Display estimated read time | Calculated from word count |
| P2-5 | Keyboard Navigation | Arrow keys, shortcuts | Accessible without mouse |
| P2-6 | Offline Support | Service worker for caching | Works offline after first visit |
| P2-7 | Analytics Integration | Plausible or similar | Privacy-friendly, no cookies |
| P2-8 | RSS Feed | XML feed of new issues | Valid RSS 2.0 format |

---

## Page Specifications

### 1. Homepage (`index.html`)

**Purpose:** First impression, showcase latest content, guide to key actions

**Sections:**
1. **Hero** — Newsletter name, tagline, latest issue CTA
2. **Latest Issue Preview** — Title, date, 2-3 theme summaries, "Read Full Issue" button
3. **Quick Stats** — Total issues, themes covered, companies researched
4. **Recently Covered Themes** — Grid of theme tags with counts
5. **Featured Company** — One highlighted Buy-rated company from latest issue

**Layout:**
```
┌─────────────────────────────────────────┐
│  [Logo]  Atoms Over Bits    [Nav]       │
├─────────────────────────────────────────┤
│                                         │
│     HERO: Investment Research           │
│     Weekly analysis of atoms over bits  │
│     [Read Latest Issue]                 │
│                                         │
├─────────────────────────────────────────┤
│  LATEST ISSUE                           │
│  ┌─────────────────────────────────┐    │
│  │ Issue Title - Feb 18, 2026      │    │
│  │ • Theme 1 summary...            │    │
│  │ • Theme 2 summary...            │    │
│  │ [Read Full Issue →]             │    │
│  └─────────────────────────────────┘    │
├─────────────────────────────────────────┤
│  QUICK STATS          │  RECENT THEMES  │
│  ┌────┐ ┌────┐ ┌────┐ │  ┌──────────┐   │
│  │ 12 │ │ 8  │ │ 47 │ │  │ Theme A  │   │
│  │Iss │ │Thm │ │Co  │ │  │ Theme B  │   │
│  └────┘ └────┘ └────┘ │  │ Theme C  │   │
│                       │  └──────────┘   │
├─────────────────────────────────────────┤
│  [Footer]                               │
└─────────────────────────────────────────┘
```

**Data Dependencies:**
- `issues/index.json` — Latest issue metadata
- `issues/stats.json` — Aggregated statistics
- `issues/themes.json` — Theme list with counts

---

### 2. Issue Page (`issues/[YYYY-MM-DD].html`)

**Purpose:** Full content display for a single newsletter issue

**Sections:**
1. **Issue Header** — Title, subtitle, date, reading time
2. **Key Takeaways** — Bullet list of main conclusions
3. **Executive Summary** — 2-3 paragraph overview
4. **Theme Sections** (repeatable):
   - Theme title + thesis statement
   - Company cards grid (2-3 columns)
5. **Related Issues** — Links to previous issues with overlapping themes

**Company Card Component:**
```
┌────────────────────────────────────┐
│ [TICKER]              [RATING]     │
│ Company Name                       │
├────────────────────────────────────┤
│ P/E: 32.4  │ Margin: 51% │ $320B  │
├────────────────────────────────────┤
│ 🐂 Bull Case                       │
│ Brief bullish thesis statement...  │
│                                    │
│ 🐻 Bear Case                       │
│ Brief bearish thesis statement...  │
├────────────────────────────────────┤
│ Target: $1,150 │ Size: 5-7%        │
└────────────────────────────────────┘
```

**Layout:**
- Single column for text, max-width 720px
- Company cards in responsive grid
- Sticky table of contents (desktop only)

**Data Schema:** See "Data Schema" section below

---

### 3. Archive Page (`archive.html`)

**Purpose:** Browse all historical issues

**Sections:**
1. **Page Header** — Title, issue count
2. **Filter Bar** — Search input, theme dropdown, rating toggle
3. **Issue List** — Chronological cards with:
   - Date, title, theme count, company count
   - Theme tags
   - Preview of first 2 companies
4. **Pagination** — Load more or infinite scroll
5. **Empty State** — When filters return no results

**Issue List Item:**
```
┌────────────────────────────────────────────┐
│ February 18, 2026                          │
│ Semiconductor Infrastructure Deep Dive     │
│ 3 themes • 5 companies • 12 min read       │
│ [EUV Monopolies] [Process Control] [...]   │
│                                            │
│ ASML, TSMC, KLAC, INTC, AMD                │
│                                    [→]     │
└────────────────────────────────────────────┘
```

**Interactions:**
- Search filters in real-time (client-side)
- URL updates with filter params for sharing
- Clear filters button appears when active

---

### 4. About Page (`about.html`)

**Purpose:** Explain the newsletter's thesis, methodology, and team

**Sections:**
1. **Mission Statement** — The "atoms over bits" thesis explained
2. **Coverage Areas** — Visual grid of sectors:
   - Semiconductor Infrastructure
   - Energy & Power
   - Robotics & Automation
   - Advanced Materials
   - Logistics & Industrial
3. **Methodology** — How research is conducted (OpenClaw/AI agents)
4. **Disclaimer** — Investment risk disclosure
5. **Contact/Subscribe** — Email signup or contact info

**Enhancements from Current:**
- Add visual icons for each coverage area
- Include sample research workflow diagram
- Add publication schedule (weekly, daily, etc.)

---

### 5. Theme Detail Page (`themes/[theme-slug].html`) — P1

**Purpose:** Deep dive into a specific investment theme

**Sections:**
1. **Theme Header** — Name, description, coverage count
2. **Thesis Evolution** — How the thesis has developed over time
3. **Related Companies** — All companies covered under this theme
4. **Historical Issues** — All issues featuring this theme
5. **Related Themes** — Connected themes to explore

---

### 6. Company Detail Page (`companies/[ticker].html`) — P1

**Purpose:** Comprehensive view of a single company across all coverage

**Sections:**
1. **Company Header** — Ticker, name, current rating
2. **Rating History** — Timeline of rating changes
3. **All Mentions** — Every issue where company appeared
4. **Latest Analysis** — Most recent bull/bear case
5. **Metrics History** — How metrics have changed (if tracked)

---

## Data Schema

### File Structure
```
issues/
├── index.json              # Master index of all issues
├── stats.json              # Aggregated statistics
├── themes.json             # Theme registry
├── search-index.json       # Flattened search data
├── feed.xml                # RSS feed (P2)
└── 2026-02-18.html         # Individual issue pages
└── 2026-02-18.json         # Issue data (optional, for JS loading)
```

### Schema: `index.json`
```json
{
  "issues": [
    {
      "id": "2026-02-18",
      "slug": "semiconductor-infrastructure-deep-dive",
      "title": "Semiconductor Infrastructure Deep Dive",
      "subtitle": "EUV monopolies, process control leaders, and turnaround opportunities",
      "date": "2026-02-18",
      "publishedAt": "2026-02-18T09:00:00Z",
      "url": "issues/2026-02-18.html",
      "readingTime": 12,
      "wordCount": 2400,
      "themeCount": 3,
      "companyCount": 5,
      "themes": [
        {
          "name": "EUV Monopolies",
          "slug": "euv-monopolies",
          "thesis": "...",
          "companies": [...]
        }
      ],
      "summary": "...",
      "keyTakeaways": ["...", "..."],
      "tags": ["semiconductors", "infrastructure", "AI"]
    }
  ],
  "meta": {
    "version": "2.0",
    "lastUpdated": "2026-02-18T09:00:00Z",
    "totalIssues": 1,
    "totalThemes": 3,
    "totalCompanies": 5
  }
}
```

### Schema: `stats.json`
```json
{
  "totalIssues": 1,
  "totalThemes": 3,
  "totalCompanies": 5,
  "totalTickers": 5,
  "lastUpdated": "2026-02-18",
  "byRating": {
    "Buy": 3,
    "Hold": 1,
    "Avoid": 0,
    "Speculative": 1
  },
  "byTheme": {
    "Semiconductor Equipment": 1,
    "Foundries": 1,
    "Process Control": 1
  },
  "performance": {
    "avgReturnSinceInception": null,
    "benchmarkReturn": null,
    "winRate": null
  },
  "timeline": [
    {"date": "2026-02-18", "issues": 1, "themes": 3}
  ]
}
```

### Schema: `themes.json`
```json
[
  {
    "name": "Semiconductor Equipment",
    "slug": "semiconductor-equipment",
    "description": "Companies manufacturing equipment for semiconductor fabrication",
    "count": 1,
    "firstCovered": "2026-02-18",
    "lastCovered": "2026-02-18",
    "related": ["Process Control", "Foundries"],
    "icon": "cpu"
  }
]
```

### Schema: `search-index.json`
```json
{
  "companies": [
    {
      "ticker": "ASML",
      "name": "ASML Holding N.V.",
      "rating": "Buy",
      "themes": ["EUV Monopolies"],
      "issues": ["2026-02-18"],
      "excerpt": "Monopolistic position in EUV lithography..."
    }
  ],
  "themes": [...],
  "issues": [...]
}
```

### Schema: Company Object (within issue)
```json
{
  "ticker": "ASML",
  "name": "ASML Holding N.V.",
  "rating": "Buy",
  "marketCap": "$320B",
  "pe": "32.4",
  "revenueGrowth": "+18%",
  "grossMargin": "51%",
  "operatingMargin": "28%",
  "bull": "Monopolistic position in EUV lithography...",
  "bear": "China export restrictions could impact 15-20%...",
  "priceTarget": "$1,150",
  "positionSize": "5-7%",
  "positionRationale": "Core holding in semiconductor infrastructure",
  "sector": "Semiconductor Equipment",
  "country": "Netherlands",
  "exchange": "NASDAQ"
}
```

---

## Technical Constraints

### GitHub Pages Limitations

| Constraint | Impact | Mitigation |
|------------|--------|------------|
| Static files only | No server-side rendering | Pre-generate all HTML at build time |
| No databases | No dynamic content storage | JSON files as data layer |
| 1GB repo limit | Large assets problematic | Optimize images, use external CDN if needed |
| 100GB bandwidth/month | High traffic could hit limit | Enable caching, use Cloudflare |
| No server-side search | Can't use Elasticsearch | Client-side search with Fuse.js or similar |
| Jekyll by default | May conflict with custom build | Use `.nojekyll` file |
| 10 min build timeout | Large sites may fail | Optimize build process |

### Required Files for GitHub Pages
```
/.nojekyll          # Disable Jekyll processing
/CNAME              # Custom domain (optional)
/404.html           # Custom error page
/sitemap.xml        # SEO sitemap
/robots.txt         # Crawler instructions
```

### Performance Budget
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.5s
- **Total Page Weight:** < 500KB (excluding images)
- **JavaScript:** < 100KB gzipped
- **CSS:** < 50KB gzipped

### Browser Support
- Chrome/Edge: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Mobile Safari: iOS 14+
- Chrome Android: Last 2 versions

---

## Success Criteria

### Quantitative Metrics

| Metric | Current | Target (3 months) |
|--------|---------|-------------------|
| Page load time | ~2s | < 1.5s |
| Mobile Lighthouse score | Unknown | > 90 |
| SEO Lighthouse score | Unknown | > 95 |
| Accessibility score | Unknown | > 95 |
| Time on page | Unknown | > 3 min |
| Bounce rate | Unknown | < 40% |

### Qualitative Criteria
- [ ] Professional appearance comparable to Substack/paid newsletters
- [ ] Intuitive navigation — new visitor can find any issue in < 3 clicks
- [ ] Search returns relevant results in < 100ms
- [ ] Mobile experience feels native, not "shrunk desktop"
- [ ] Print/PDF output is clean and shareable

### Feature Completion
- [ ] P0: All must-have features implemented
- [ ] P1: At least 6 of 8 high-priority features
- [ ] P2: At least 2 of 8 nice-to-have features

---

## Implementation Tasks for Developer Agent

### Phase 1: Foundation (P0)
1. **Setup & Tooling**
   - [ ] Create build script for static generation (Node.js/Python)
   - [ ] Setup CSS framework (Tailwind or custom)
   - [ ] Configure GitHub Actions for deployment
   - [ ] Add `.nojekyll`, `CNAME`, `robots.txt`

2. **Core Pages**
   - [ ] Redesign `index.html` with new layout
   - [ ] Create issue template and generate `issues/2026-02-18.html`
   - [ ] Redesign `archive.html` with filtering UI
   - [ ] Enhance `about.html` with visuals

3. **Styling & Components**
   - [ ] Implement design system (colors, typography, spacing)
   - [ ] Build reusable components (cards, buttons, navigation)
   - [ ] Create responsive layouts for all breakpoints
   - [ ] Add print stylesheet

4. **JavaScript Core**
   - [ ] Data loading from JSON files
   - [ ] Mobile navigation toggle
   - [ ] Loading states and error handling

### Phase 2: Enhancement (P1)
5. **Search & Filter**
   - [ ] Implement client-side search (Fuse.js)
   - [ ] Add theme filtering to archive
   - [ ] Add rating filtering
   - [ ] URL param synchronization

6. **Interactivity**
   - [ ] Company detail modal/lightbox
   - [ ] Reading progress indicator
   - [ ] Dark/light theme toggle
   - [ ] Keyboard navigation

7. **SEO & Performance**
   - [ ] Generate sitemap.xml
   - [ ] Add structured data (JSON-LD)
   - [ ] Optimize images (WebP, lazy loading)
   - [ ] Add Open Graph meta tags

### Phase 3: Polish (P2)
8. **Advanced Features**
   - [ ] Static chart generation (price targets vs time)
   - [ ] Theme timeline visualization
   - [ ] RSS feed generation
   - [ ] Service worker for offline support

9. **Analytics & Monitoring**
   - [ ] Add privacy-friendly analytics
   - [ ] Performance monitoring
   - [ ] Error tracking

### Phase 4: Content Expansion
10. **New Page Types**
    - [ ] Theme detail pages
    - [ ] Company detail pages
    - [ ] 404 error page

---

## Design Guidelines

### Color Palette (Current - Keep or Refine)
```css
--bg-primary: #0a0a0a;       /* Deep black background */
--bg-secondary: #141414;     /* Card backgrounds */
--bg-tertiary: #1a1a1a;      /* Elevated elements */
--text-primary: #e6e6e6;     /* Primary text */
--text-secondary: #a0a0a0;   /* Secondary text */
--text-muted: #666;          /* Muted/hint text */
--accent: #00d4aa;           /* Primary accent (teal) */
--accent-dim: #00a884;       /* Dimmed accent */
--border: #2a2a2a;           /* Borders/dividers */
--danger: #ff4444;           /* Avoid ratings */
--warning: #ffaa00;          /* Hold ratings */
--success: #00d4aa;          /* Buy ratings */
```

### Typography
- **Headings:** Inter or system sans-serif, weight 600-700
- **Body:** System sans-serif stack, weight 400
- **Code/Numbers:** JetBrains Mono or system monospace
- **Scale:** Major third (1.25) ratio
  - H1: 2.986rem
  - H2: 2.488rem
  - H3: 2.074rem
  - H4: 1.728rem
  - Body: 1rem (16px)
  - Small: 0.833rem

### Spacing Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

### Component Patterns
- **Cards:** 12px border-radius, 1px border, subtle shadow on hover
- **Buttons:** 8px border-radius, accent background, white text
- **Inputs:** 8px border-radius, 1px border, focus ring
- **Tags:** Pill shape, small text, muted background

---

## Appendix

### A. Current Site Assets
- **HTML:** index.html, archive.html, about.html
- **CSS:** css/style.css (single file, ~400 lines)
- **JS:** js/main.js, js/archive.js
- **Data:** issues/index.json, issues/stats.json, issues/themes.json

### B. Dependencies to Consider
- **Search:** Fuse.js (lightweight fuzzy search)
- **Charts:** Chart.js or static SVG generation
- **Icons:** Lucide or Heroicons (SVG)
- **Build:** Node.js with fs-extra, markdown-it (if needed)

### C. File Naming Conventions
- Issues: `issues/YYYY-MM-DD.html` and `issues/YYYY-MM-DD.json`
- Themes: `themes/[kebab-case-slug].html`
- Companies: `companies/[TICKER].html`
- Assets: `assets/images/`, `assets/fonts/`

### D. SEO Checklist
- [ ] Unique `<title>` for every page
- [ ] Meta description on all pages
- [ ] Canonical URLs
- [ ] Open Graph tags (title, description, image)
- [ ] Twitter Card tags
- [ ] Structured data (Article, Organization)
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Alt text on all images
- [ ] Semantic HTML (header, main, article, nav)

### E. Accessibility Checklist
- [ ] WCAG 2.1 AA color contrast
- [ ] Keyboard navigable
- [ ] Focus indicators visible
- [ ] ARIA labels where needed
- [ ] Skip to content link
- [ ] Alt text for images
- [ ] Form labels associated
- [ ] No autoplay media
- [ ] Reduced motion support

---

## Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-02-18 | PM Agent | Initial PRD creation |

---

**Next Steps:**
1. Review PRD with stakeholders
2. Prioritize P1 features based on resources
3. Create design mockups for key pages
4. Begin Phase 1 implementation
