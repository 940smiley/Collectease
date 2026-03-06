## 2025-05-15 - [LocalStorage Persistence Anti-pattern]
**Learning:** The original `ImportExport` implementation had an O(n²) duplication bug where the entire session `images` state was re-persisted to LocalStorage on every upload, causing exponential growth of the database if `searchable` was checked.
**Action:** When persisting incremental updates, only save the DELTA (new items) and handle merging within the persistence layer or use functional state updates to ensure consistency without redundancy.
