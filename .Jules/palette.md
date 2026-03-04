## 2025-05-14 - MUI Tooltip on Disabled Buttons
**Learning:** MUI Tooltips do not trigger on disabled elements because they don't emit pointer events.
**Action:** Wrap disabled buttons in a `<span>` or `<div>` to ensure the Tooltip still functions and provides necessary context to the user.

## 2025-05-14 - Type-Only Imports with verbatimModuleSyntax
**Learning:** When `verbatimModuleSyntax` is enabled in `tsconfig`, types must be imported using the `type` keyword.
**Action:** Use `import { type AlertColor } from '@mui/material'` instead of a standard import to prevent build errors.
