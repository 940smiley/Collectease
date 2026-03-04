## 2025-05-14 - Route-based Code Splitting
**Learning:** Implementing route-based code splitting in this React application reduced the initial bundle size by ~20kB. This isolation ensures that heavy pages (like ImportExport which uses MUI icons and complex logic) don't delay the initial paint of the Dashboard.
**Action:** Always consider lazy loading for routes in MUI applications, as page-specific icon and component imports can quickly bloat the main bundle.
