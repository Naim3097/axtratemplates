# AI Web Builder Prompt: Multi-Page Website Template
**Build ID:** 2ac64ee1
**Target Industry:** E-commerce & Fashion
**Design Style:** Elegant (Architectural)
**Scope:** Full Multi-Page Website (HTML/CSS/JS)

---

## 1. Role & Objective
You are a Senior Frontend Architect. Your goal is to build a **complete, multi-page website template**.
The output must be **fully responsive**, **accessible**, and **highly polished**.
You must provide the code for **ALL** required files.

## 2. Design Specifications (The "DNA")

### A. Color Palette (CSS Variables)
*Define these in `styles.css` :root*
- `--color-primary`: `#2C3E50`
- `--color-secondary`: `#ECF0F1`
- `--color-accent`: `#BDC3C7`
- `--color-bg`: `#FFFFFF`
- `--color-surface`: `#F9F9F9`

### B. Typography
- **Headings:** Abril Fatface (400)
- **Body:** Poppins (300)
*Import via Google Fonts in CSS.*

### C. Shape & Spacing
- **Border Radius:** `0px`
- **Button Style:** rectangle

## 3. Functional Patterns (Global)

### A. Navigation System (Header)
**Type:** `top-bar`
**Behavior:** `sticky`
**Layout:** `glassmorphism-centered`
*Requirement:* Must include a fully functional **Mobile Hamburger Menu** (JS).

### B. Footer
**Layout:** `foot_multi_col`
*Requirement:* Include site map links, social icons, and copyright.

### C. Interactions (JS)
1. **int_tabs_content** (ui-component): Switch content visibility based on active tab (Logic: vanilla-js-tabs)
2. **int_hover_card_lift** (micro-interaction): Cards lift and shadow deepens on hover (Logic: css-transform)
3. **int_infinite_marquee** (animation): Continuous horizontal scrolling of logos/text (Logic: css-keyframes)


## 4. Required Files & Structure

You must generate the following files. Use comments to separate them if outputting in one block, or use separate blocks.

### A. Global Assets
1.  `styles.css`: Contains all variables, reset, typography, grid system, and component styles.
2.  `scripts.js`: Contains navigation logic, mobile menu toggle, and interaction scripts.

### B. HTML Pages
        1. `index.html` (Home): Hero, Featured Products, Categories, Newsletter.
        2. `shop.html` (Catalog): Grid of products with sidebar filter.
        3. `product.html` (Detail): Large image, price, add to cart, description.
        4. `cart.html` (Cart): Table of items, total, checkout button.


## 5. Content Guidelines (Per Page)

### `index.html` (Home)
-   **Hero:** Headline "Shop the Look", Subhead "Discover the latest trends in streetwear and luxury.".
-   **Features:** Use layout `feat_grid_3`.
-   **Testimonials:** Use layout `test_slider`.

### Inner Pages
-   Ensure they share the same Header and Footer as Home.
-   Use consistent page headers (breadcrumbs or title banners).
-   Use the "DNA" colors and fonts consistently.

## 7. Special Instructions: Lean X Integration (CRITICAL)
**Every opportunity for a user interaction that is NOT a navigation link to a main page must be a CTA for "Lean X".**

1.  **Primary Trigger:** The main CTA "Checkout" must trigger the conversion event.
2.  **Dead Links & Dropdowns:** Any dropdown menu item, "Learn More" link, or secondary button that does not lead to a real page must be treated as a conversion point.
3.  **Behavior:** These elements must open a new browser tab (`target="_blank"`) pointing to a registration page (e.g., `https://leanx.ai/register`) OR trigger a JavaScript alert/modal simulating a "Sign up with Google" SSO prompt.
4.  **Visuals:** Ensure these buttons/links look interactive and high-value.

## 6. Output Format
Provide the code for **EACH** file clearly labeled.
Example:
`<!-- filename: index.html -->`
`/* filename: styles.css */`
