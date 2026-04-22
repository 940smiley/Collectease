## 2025-05-15 - [Route-based Code Splitting Impact]
**Learning:** For an MUI-based React application, initial bundle sizes can grow rapidly. Implementing `React.lazy` and `Suspense` for all main routes reduced the initial JavaScript payload from 448.30 kB to 378.56 kB (a ~70 kB or 15.5% reduction), improving the Time to Interactive (TTI) for the initial page load.
**Action:** Always implement route-based code splitting for top-level page components to keep the entry bundle lean.

## 2025-05-15 - [Synchronous I/O in React Lifecycle]
**Learning:** Accessing `localStorage` directly in the component body or during state initialization without a lazy initializer causes synchronous I/O on every re-render.
**Action:** Use the `useState(() => getFromLocalStorage())` pattern to ensure expensive or synchronous initializations only run once per component mount.
