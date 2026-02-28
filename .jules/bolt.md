## 2025-05-15 - Route-based Code Splitting
**Learning:** Implementing route-based code splitting in a Vite/React application significantly reduces the initial bundle size (by ~20kB in this case) and isolates route-specific code into separate chunks, improving initial load time.
**Action:** Always consider `React.lazy` and `Suspense` for main page components in single-page applications to ensure users only download the code they need for the current view.

## 2025-05-15 - React 19 and Unused React Import
**Learning:** In React 19 with modern TypeScript configurations, importing `React` explicitly when it's not used as a value (e.g., for `React.lazy`) can trigger `TS6133` (unused variable) errors during build.
**Action:** Import only the specific hooks or components needed from 'react' (e.g., `import { lazy, Suspense } from 'react'`) and avoid `import React from 'react'` unless strictly necessary.
