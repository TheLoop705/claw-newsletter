# Deep Dive Reports

## Overview

Deep dive reports are comprehensive, multi-agent research analyses of investment themes. These are the flagship publications of the Atoms Over Bits newsletter.

## Purpose

- Provide institutional-grade investment research on structural themes
- Cover entire value chains (e.g., semiconductors → data centers → power → cooling)
- Identify specific investment opportunities with price targets and position sizing
- Assess competitive dynamics, risks, and catalysts

## Research Methodology

### Multi-Agent Parallel Analysis

Deep dives utilize parallel agent research to cover all dimensions of a theme:

1. **Hardware & Semiconductors** — GPUs, custom silicon, memory, networking chips
2. **Data Center Real Estate** — REITs, operators, hyperscaler buildouts
3. **Power & Energy** — Nuclear SMRs, utilities, fuel cells, renewables
4. **Cooling & Thermal** — Liquid cooling, rack density trends
5. **Networking & Connectivity** — Ethernet, optical interconnects
6. **Server & Storage** — OEMs, ODMs, AI-optimized infrastructure
7. **Edge AI** — Distributed inference, CDN evolution
8. **Software & Orchestration** — Kubernetes, MLOps, observability
9. **Supply Chain** — Manufacturing, advanced packaging, bottlenecks
10. **Geographic Analysis** — Regional buildouts, regulations, incentives
11. **Competitive Dynamics** — Moat analysis, market structure, M&A
12. **Risk Analysis** — Demand, supply, regulatory, valuation risks
13. **Portfolio Construction** — Allocation frameworks, model portfolios
14. **ETFs & Vehicles** — Investment vehicles for theme exposure
15. **ESG & Sustainability** — Carbon footprint, water usage, compliance
16. **Emerging Tech** — Photonic computing, quantum, neuromorphic
17. **Customer Analysis** — Hyperscaler buying patterns, enterprise adoption
18. **Financial Analysis** — Company models, valuation, price targets
19. **Market Sizing** — TAM, growth rates, component breakdowns
20. **Investment Recommendations** — Ranked picks, risk assessments

### Output Format

Each agent produces a structured report with:
- Executive summary (3-5 bullets)
- Detailed analysis
- Key companies with financial metrics
- Risk factors
- Investment thesis & catalysts

## Report Structure

```
issues/YYYY-MM-DD-slug.html
```

### Standard Sections

1. **Executive Summary** — Key findings, market size, growth rates
2. **The Full Stack** — All 20 research dimensions summarized
3. **Investment Recommendations** — Tier 1 (core), Tier 2 (satellite), Tier 3 (speculative)
4. **Risk Summary** — Probability/impact matrix with mitigations
5. **Conclusion** — Investment case pillars, positioning guidance

### Metadata

Reports include structured metadata in `issues/index.json`:
- `id`, `slug`, `title`, `subtitle`
- `date`, `publishedAt`, `url`
- `readingTime`, `themeCount`, `companyCount`
- `themes[]` — with thesis and company details
- `keyTakeaways[]`

## Creating a New Deep Dive

### 1. Define the Theme

Identify a structural investment opportunity with:
- Multi-year growth runway
- Multiple entry points across the value chain
- Sufficient complexity to warrant 20-agent analysis

### 2. Spawn Research Agents

Use `sessions_spawn` to launch 20 parallel agents, each assigned one dimension:

```
Agent 1: Hardware & Semiconductors
Agent 2: Data Center Real Estate
...
Agent 20: Investment Recommendations
```

### 3. Compile Findings

- Read all agent reports
- Synthesize into coherent narrative
- Resolve contradictions, weight conflicting views
- Identify highest-conviction opportunities

### 4. Write Report

Create HTML file in `issues/YYYY-MM-DD-slug.html`:
- Follow existing template structure
- Include company cards with metrics, bull/bear cases, price targets
- Add risk tables, key stats, visual hierarchy

### 5. Update Metadata

Add to `issues/index.json`:
- Full issue metadata
- Theme and company details
- Key takeaways

Update `issues/stats.json`:
- Increment counts
- Update ratings distribution

### 6. Update Homepage

Modify `index.html`:
- Update hero section with new issue
- Update featured issue card
- Adjust reading time, date, key takeaways

### 7. Publish

```bash
git add -A
git commit -m "Add [Theme] Deep Dive report"
git push origin main
```

## Quality Standards

### Data Requirements

- Specific financial metrics (revenue, margins, multiples)
- Market size with sources and CAGR
- Price targets with rationale
- Position sizing guidance

### Analysis Depth

- Primary research via web search, filings, industry reports
- Bull/bear cases for every recommendation
- Risk probability assessments
- Catalyst timelines

### Writing Style

- Lead with conclusions
- Data-dense but readable
- Visual hierarchy (cards, tables, stats)
- Professional but accessible tone

## Example Reports

- **Semiconductor Infrastructure** (2026-02-18) — EUV monopolies, process control, turnarounds
- **AI Infrastructure** (2026-02-22) — $3T buildout, full stack analysis

## Maintenance

- Update price targets quarterly
- Monitor catalysts, flag when triggered
- Revisit risk assessments as conditions change
- Archive outdated theses

## Contact

For questions about deep dive methodology: [Open an issue](https://github.com/TheLoop705/claw-newsletter/issues)
