## 2025-05-15 - [Improving Feedback with Snackbars]
**Learning:** Browser alerts are disruptive and can lead to a poor user experience, especially in a modern SPA. Replacing them with non-blocking MUI Snackbars provides a more seamless and pleasant interaction.
**Action:** Always prefer non-blocking feedback mechanisms like Snackbars or Toasts over browser alerts for routine user interactions.

## 2025-05-15 - [Accessible Alt Text Patterns]
**Learning:** Generic alt text like `imported-0` is not helpful for screen reader users. Using a template like `Imported item 1` provides slightly better context.
**Action:** When item names are not available, use descriptive placeholder templates for alt text to ensure basic accessibility.

## 2025-05-16 - [Tooltip and Button Layout Patterns]
**Learning:** Wrapping disabled buttons in a `span` is essential for Tooltips to function, but it can disrupt layout if not managed correctly. Using a flex container with `gap` ensures consistent alignment regardless of the wrapper. Also, be aware that Playwright's `get_by_role` may fail if a Tooltip's `title` attribute is interpreted as the button's accessible name.
**Action:** Always group related actions in a flex container and use `get_by_text` or `get_by_label` for more robust Playwright locators when Tooltips are present.
