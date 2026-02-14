## 2025-05-15 - Route Lazy Loading & Lazy State Initialization
**Learning:** Route-based code splitting significantly reduces the initial bundle size (from ~400KB to ~378KB for the main chunk in this small app, with separate page chunks). Additionally, using functional lazy initialization for 'useState' avoids expensive synchronous 'localStorage.getItem' and 'JSON.parse' calls on every component re-render.
**Action:** Implement 'React.lazy' for all top-level routes and ensure 'useState' with expensive I/O uses the initializer function pattern.
