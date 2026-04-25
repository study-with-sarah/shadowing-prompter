# Changelog

## 2026-04-25

### ✨ Features Added

**Three Viewing Modes**

- Line by Line: sentence-by-sentence bilingual pairs
- Full Paragraph: complete English + Chinese blocks
- Chinese Only: Chinese only (for reproduction practice)

Why? Users need different modes for different learning stages—shadowing, comprehension, and forced reproduction from memory.

---

### 🎨 UI/UX Improvements

**Responsive & Compact**

- Mode toggle: optimized for small screens (prevents line wrapping)
- Vertical spacing: reduced margins between sections
- Font size: English reduced to 18px for better viewport fit
- Always-visible highlights: keywords display without click interaction

Why? Better screen space usage + focus. In shadowing/reproduction, every click is a distraction. Unified highlight behavior across all modes.

---

### 🔧 Technical Changes

- CSS: added `.para-block` styles, always-visible highlight rules
- JS: extracted `renderContent()` function, removed click listeners from line containers
- Adjusted body padding and spacing calculations
