## 2025-05-15 - [LocalStorage and Lazy Initialization]
**Learning:** Reading from LocalStorage is a synchronous I/O operation. Calling it directly in `useState` initial value (e.g., `useState(readFromStorage())`) causes the operation to run on every re-render, even though the result is only used once.
**Action:** Always use lazy initialization for state that depends on LocalStorage or other expensive operations: `useState(() => readFromStorage())`.

## 2025-05-15 - [Route-based Code Splitting]
**Learning:** In a SPA with multiple pages, the initial bundle size grows linearly with the number of pages. Many pages may never be visited by the user in a single session.
**Action:** Implement route-based code splitting using `React.lazy` and `Suspense` to reduce initial load time and isolate page-specific code into separate chunks.
