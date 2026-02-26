# Bolt's Performance Journal

## 2025-05-15 - Route-based code splitting
**Learning:** Implementing route-based code splitting using `React.lazy` and `Suspense` reduced the initial JavaScript bundle size by ~20kB (~5%) in this React 19 / Vite / MUI 7 application, even with relatively small page components.
**Action:** Always prioritize route-based code splitting as an early optimization to maintain a lean main bundle as the application grows.
