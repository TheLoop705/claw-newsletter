# Daily Digest

## Overview

Daily digests are curated summaries of essential news across technology, markets, and macro themes. Published daily at 6 AM UTC.

## Purpose

- Surface signal from noise in high-volume news environments
- Track developments across 8+ categories in single scan
- Identify emerging trends before they become consensus
- Provide context for deep dive themes

## Coverage Areas

### Standard Categories

1. **AI & Machine Learning** — Model releases, infrastructure deals, regulatory moves
2. **Semiconductors** — Earnings, supply chain, export controls, M&A
3. **Markets & Investing** — Macro data, Fed policy, sector rotations
4. **M&A & Corporate** — Deals, IPOs, strategic shifts
5. **Energy & Infrastructure** — Power markets, renewables, nuclear
6. **Startups & Venture** — Funding rounds, valuations, pivots
7. **Policy & Regulation** — Antitrust, export controls, AI safety
8. **Science & Research** — Breakthroughs, publications, lab news

### Extended Coverage (As Needed)

- **Cybersecurity** — Breaches, zero-days, policy
- **Crypto** — Regulatory, institutional adoption, technical
- **Geopolitics** — Trade, sanctions, regional conflicts
- **Autos & Mobility** — EVs, autonomous, battery tech

## Format

### File Naming

```
daily-digest-YYYY-MM-DD.md
```

### Structure

```markdown
# Daily Digest — [Date]

**Compiled from [N] sources**

## Category Name

### Story Headline
**Source:** Publication Name  
**URL:** https://...  
**Summary:** 2-3 sentence summary of key development  
**Impact:** Why this matters for investors

[Repeat for top 3-5 stories per category]
```

### Length

- 8-12 categories
- 3-5 stories per category
- 150-250 words per story
- Total: 3,000-5,000 words

## Production Workflow

### 1. Search (Automated)

Query 20+ sources across categories:
- Tech: TechCrunch, The Information, Ars Technica
- Business: WSJ, FT, Bloomberg, CNBC
- AI: AI News, Import AI, The Batch
- Science: Nature, Science, arXiv summaries

### 2. Filtering Criteria

Include stories that are:
- **New** — Breaking in last 24 hours
- **Relevant** — Connects to investment themes
- **Actionable** — Implies position adjustments or monitoring
- **Underreported** — Not yet consensus

Exclude:
- Rumors without sourcing
- Earnings recaps (unless exceptional)
- Political news without market impact

### 3. Summarization

For each selected story:
- Extract key facts (who, what, when, why)
- Identify market impact
- Link to existing themes/positions
- Flag for deep dive follow-up if warranted

### 4. Publishing

Save to:
```
newsletter-site/daily-digest-YYYY-MM-DD.md
```

No HTML conversion needed — digests remain Markdown for:
- Faster production
- Easier parsing
- Lower maintenance

### 5. Homepage Integration

Daily digest card on `index.html` auto-loads:
- Most recent digest (yesterday or today)
- Category tags
- Top 3 story previews
- Source count

## Quality Standards

### Sourcing

- Primary sources preferred (filings, press releases)
- Tier-1 publications for news
- Specialist outlets for technical depth
- Cross-check breaking stories

### Neutrality

- Present bull and bear interpretations where relevant
- Distinguish fact from analysis
- Flag speculation
- Avoid hype language

### Timeliness

- Publish by 6 AM UTC daily
- Update if major story breaks post-publication
- Archive outdated digests (no deletion)

## Automation

### Current State

Daily digests are produced via scheduled agent runs:
- Cron triggers at 5 AM UTC
- Agent searches, filters, summarizes
- Markdown file generated
- Git commit and push

### Future Enhancements

- RSS feed for digest updates
- Email subscription
- Category-specific sub-feeds
- Searchable archive

## Archive

All digests preserved in repo root:
```
daily-digest-2026-02-18.md
daily-digest-2026-02-19.md
daily-digest-2026-02-20.md
...
```

No expiration — historical digests valuable for:
- Timeline reconstruction
- Theme evolution tracking
- Prediction accuracy assessment

## Comparison to Deep Dives

| Aspect | Daily Digest | Deep Dive |
|--------|--------------|-----------|
| **Frequency** | Daily | Monthly |
| **Length** | 3,000-5,000 words | 15,000-25,000 words |
| **Scope** | Breadth (all themes) | Depth (one theme) |
| **Format** | Markdown | HTML |
| **Agents** | 1 | 20 |
| **Purpose** | News tracking | Investment decisions |

## Creating a Daily Digest (Manual)

If automation fails:

1. **Search** — Query key sources for last 24 hours
2. **Filter** — Select 25-40 high-signal stories
3. **Summarize** — Write 2-3 sentence summaries
4. **Categorize** — Group into 8-12 categories
5. **Format** — Use standard template
6. **Save** — `daily-digest-YYYY-MM-DD.md`
7. **Commit** — Push to repo

## Contact

For digest corrections or suggestions: [Open an issue](https://github.com/TheLoop705/claw-newsletter/issues)
