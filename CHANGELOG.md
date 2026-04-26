# Changelog

## 2026-04-25

### Features

**Four viewing modes**

- Shadow Mode: sentence-by-sentence bilingual pairs
- Retell Mode: Chinese first, then English
- EN-only: English paragraph only
- ZH-only: Chinese paragraph only

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
