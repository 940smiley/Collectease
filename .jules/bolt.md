## 2025-05-14 - Route-based Code Splitting and LocalStorage Optimization
**Learning:** In React applications with multiple distinct pages, even if small, route-based code splitting with `React.lazy` and `Suspense` is a high-impact optimization for initial bundle size. Additionally, when dealing with persistent state like `localStorage`, using lazy state initialization `useState(() => ...)` prevents redundant and expensive I/O operations on every re-render.
**Action:** Always check for opportunities to lazy-load routes and initialize state with expensive lookups lazily.
