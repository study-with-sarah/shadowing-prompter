# Changelog

## 2026-04-25

### Features

**Two viewing modes**

- Line by Line: sentence-by-sentence bilingual pairs
- Full Paragraph: Chinese first, then English

Why? Support both shadowing and retelling in a simpler flow.

---

### UI/UX

**Cleaner reading experience**

- Mode toggle: optimized for small screens (prevents line wrapping)
- Spacing and font sizes reduced for better viewport fit
- Keyword highlights always visible

Why? Use screen space better and reduce interaction friction.

---

### Technical

- CSS: added `.para-block` styles, always-visible highlight rules
- JS: extracted `renderContent()` and simplified mode switching
