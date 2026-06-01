# TeachTeam Neo-Brutalist Design System

This document serves as the absolute source of truth for the **TeachTeam** visual identity and UI architecture. Any new pages, components, or features added to the application **MUST** strictly adhere to these guidelines to maintain the cohesive "Neo-Brutalist" aesthetic.

---

## 🎨 1. Core Color Palette

Avoid generic or muted colors. Our palette relies on high contrast and vibrant primary hues against stark blacks and whites.

*   **Primary Green**: `#21C57D` (Used for primary CTAs, success states, and bold accents)
*   **Primary Yellow**: `#FFD147` (Used for secondary buttons, highlighted sections, and "Most Popular" tags)
*   **Danger/Error**: `#FF4747` (Used for destructive actions or error states)
*   **Pitch Black**: `#0C0A09` or `#000000` (Used for typography, borders, and hard shadows)
*   **Off-White Background**: `#F8F9FA` (Main body background to reduce pure-white eye strain)
*   **Pure White**: `#FFFFFF` (Used for card backgrounds to pop against the off-white body)

---

## ✍️ 2. Typography

We use **DM Sans** exclusively across the entire site for both headings and body text. 

*   **Font Family**: `font-dm` (DM Sans)
*   **Headings**: Must be obnoxiously bold (`font-black` or `font-extrabold`). Use tight line heights (`leading-none` or `leading-tight`) and tight letter spacing (`tracking-tight`).
*   **Body Text**: Use medium or bold weights (`font-medium`, `font-bold`) instead of thin or regular weights. Text should feel heavy and deliberate.
*   **Labels/Tags**: Often uppercase (`uppercase`), widely tracked (`tracking-wider`), and small (`text-[12px]` to `text-[14px]`).

---

## 🏗️ 3. The Neo-Brutalist Signature (Borders & Shadows)

The cornerstone of this design is the hard, unblurred drop shadow paired with thick borders. **Do not use soft, blurred CSS box-shadows anywhere.**

### Standard Component Anatomy (Cards, Buttons, Modals)
1.  **Borders**: Solid black. Ranging from `border-[1.5px]` (buttons/small cards) to `border-[3px]` (massive cards/modals).
2.  **Hard Shadows**: Solid black shadows with ZERO blur. 
    *   *Small elements*: `shadow-[3px_4px_0px_rgba(0,0,0,1)]`
    *   *Medium cards*: `shadow-[6px_6px_0px_rgba(0,0,0,1)]`
    *   *Massive elements (Modals)*: `shadow-[12px_12px_0px_rgba(0,0,0,1)]`
3.  **Border Radius**: Elements should either be completely pill-shaped (`rounded-full`), sharp (`rounded-none`), or nicely rounded (`rounded-xl`). Avoid subtle `rounded-sm`.

---

## 🖱️ 4. Interactions & Micro-Animations

Interactive elements (buttons, clickable cards) must feel physical and snappy. 

### Hover & Active States
*   **Hover**: The element should physically pop "up and out" toward the user.
    *   Add `-translate-y-1` and `-translate-x-1`.
    *   Increase the shadow offset (e.g., from `4px` to `6px`).
*   **Active (Click)**: The element should physically press "down" into the page.
    *   Revert to `translate-y-0` and `translate-x-0`.
    *   Remove the shadow entirely (`active:shadow-none`).

---

## 🌪️ 5. Motion & Framer Motion

We use `framer-motion` for all scroll-based reveal animations. Animations should feel fast, bouncy, and aggressive, not slow and floating.

*   **Physics**: Rely on spring physics with high stiffness and low damping (e.g., `type: "spring", stiffness: 400, damping: 25`).
*   **Standard Variants** (Found in `src/utils/animations.ts`):
    *   `brutalistPop`: Elements quickly scale up from `0.8` to `1` with a slight rotation bounce.
    *   `brutalistSpinIn`: Decorative shapes spin and fade into existence.
    *   `brutalistSlideLeft` / `brutalistSlideRight`: Large blocks violently slide in from the edges on scroll.

---

## 📐 6. Layouts & Decorators

Neo-brutalism embraces controlled chaos. 

*   **Tilted Elements**: Feel free to randomly tilt cards or labels by a few degrees (`rotate-1`, `-rotate-2`, `rotate-3`) to break the grid.
*   **Backgrounds**: Use repeating patterns like polka dots (`bg-polka-dots`) or grid lines (`bg-grid-pattern`) to add texture to blank sections.
*   **Floating Geometric Shapes**: Sections should be decorated with massive, absolute-positioned SVG shapes (stars, zig-zags, abstract blobs, warning tapes). These shapes must also have thick borders and hard drop shadows.

---

## 🚨 7. Example Component: The Brutalist Button

If you need to build a new button from scratch without the `<Button />` component, it must look exactly like this:

```tsx
<button className="
  bg-[#21C57D] text-black font-bold px-8 py-3 rounded-full 
  border-[1.5px] border-black 
  shadow-[3px_4px_0px_0px_rgba(0,0,0,1)] 
  hover:translate-y-[1px] hover:shadow-[2px_3px_0px_0px_rgba(0,0,0,1)] 
  active:translate-y-[3px] active:shadow-none 
  transition-all
">
  Click Me
</button>
```
