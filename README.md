# Collectease

**Collectease** is a professional collectibles management application designed to help enthusiasts organize, value, and share their collections with ease. Built with a modern tech stack, it provides powerful tools for automated valuation and marketplace integration.

## Key Features

- **Hierarchical Categorization:** Deep category and subcategory support inspired by major auction platforms like eBay and Colnect.
- **Automated Valuation:** Real-time pricing data retrieval from eBay sold listings to calculate accurate market values.
- **Social Sharing:** Granular sharing controls for individual items or entire collection sections.
- **Data Mobility:** Robust import/export tools supporting PriceCharting and other common formats.
- **Marketplace Sync:** One-click listing preparation for eBay and Facebook Marketplace.

## Tech Stack

- **Frontend:** React 19, TypeScript 5.9
- **Build Tool:** Vite 7
- **UI Framework:** Material-UI (MUI)
- **State Management:** Zustand (Collection Store)

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

## TODO List

- [ ] **Security Hardening:** Resolve high-severity vulnerabilities identified in the automated audit (CVE-2026-27606).
- [ ] **API Optimization:** Refine the eBay pricing scraper to handle rate limiting more gracefully.
- [ ] **UI Polish:** Implement a more cohesive design system using MUI's theming capabilities.
- [ ] **Mobile Optimization:** Ensure the dashboard is fully responsive for mobile collectors.
- [ ] **Testing:** Add unit tests for the `collectionStore` to prevent state regression.

## License

MIT License
