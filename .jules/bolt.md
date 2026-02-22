## 2025-05-15 - Optimizing LocalStorage and Parallel File Processing
**Learning:** Sequential asynchronous operations (like file reads in a loop) and synchronous I/O (like LocalStorage reads in render) are major bottlenecks in browser-based apps. Parallelizing with Promise.all and using lazy initialization for useState can significantly improve responsiveness.
**Action:** Always check for redundant I/O in render paths and favor Promise.all for batch file operations.
