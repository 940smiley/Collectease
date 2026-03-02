## 2026-03-02 - Route-based Code Splitting and Parallel File Reading
**Learning:** Implementing route-based code splitting using `React.lazy` and `Suspense` isolated page-specific code into separate chunks, reducing the main bundle size by ~20kB. Parallelizing `FileReader` operations with `Promise.all` avoids the overhead of sequential execution and manual state synchronization in loops.
**Action:** Always consider code splitting for multi-page applications and prefer `Promise.all` for bulk asynchronous I/O operations.
