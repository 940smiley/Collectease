## 2025-05-14 - Route-based code splitting impact
**Learning:** Implementing route-based code splitting using `React.lazy` and `Suspense` in this repository reduced the initial JavaScript bundle size by ~19.5 kB (from 397.91 kB to 378.42 kB). This improves initial load performance by only loading the code required for the current route.
**Action:** Always consider route-based code splitting for applications with multiple distinct pages to optimize initial bundle size.
