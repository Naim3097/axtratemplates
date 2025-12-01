# AI Web Builder Prompt: Multi-Page Website Template
**Build ID:** 0b7a7cab
**Target Industry:** SaaS & Technology
**Design Style:** Elegant (Slate Blue)
**Scope:** Full Multi-Page Website (HTML/CSS/JS)

---

## 1. Role & Objective
You are a Senior Frontend Architect. Your goal is to build a **complete, multi-page website template**.
The output must be **fully responsive**, **accessible**, and **highly polished**.
You must provide the code for **ALL** required files.

## 2. Design Specifications (The "DNA")

### A. Color Palette (CSS Variables)
*Define these in `styles.css` :root*
- `--color-primary`: `#0F172A`
- `--color-secondary`: `#F1F5F9`
- `--color-accent`: `#64748B`
- `--color-bg`: `#FFFFFF`
- `--color-surface`: `#F8FAFC`

### B. Typography
- **Headings:** Amatic SC (700)
- **Body:** Josefin Sans (400)
*Import via Google Fonts in CSS.*

### C. Shape & Spacing
- **Border Radius:** `0px`
- **Button Style:** rectangle

## 3. Functional Patterns (Global)

### A. Navigation System (Header)
**Type:** `top-bar`
**Behavior:** `static`
**Layout:** `links-logo-links`
*Requirement:* Must include a fully functional **Mobile Hamburger Menu** (JS).

### B. Footer
**Layout:** `foot_simple`
*Requirement:* Include site map links, social icons, and copyright.

### C. Interactions (JS)
1. **int_filter_grid** (data-view): Filter grid items by category data attributes (Logic: filter-sort)
2. **int_modal_popup** (overlay): Content appears in centered modal on trigger (Logic: dialog-api)
3. **int_infinite_marquee** (animation): Continuous horizontal scrolling of logos/text (Logic: css-keyframes)


## 4. Required Files & Structure

You must generate the following files. Use comments to separate them if outputting in one block, or use separate blocks.

### A. Global Assets
1.  `styles.css`: Contains all variables, reset, typography, grid system, and component styles.
2.  `scripts.js`: Contains navigation logic, mobile menu toggle, and interaction scripts.

### B. HTML Pages
        1. `index.html` (Home): Hero, Features, Social Proof, CTA.
        2. `features.html` (Deep Dive): Detailed breakdown of capabilities, alternating layout.
        3. `pricing.html` (Pricing): 3-column pricing table with FAQ section.
        4. `contact.html` (Support): Contact form, Office Address, Map.


## 5. Content Guidelines (Per Page)

### `index.html` (Home)
-   **Hero:** Headline "Automate Your Workflow in Seconds", Subhead "Join 10,000+ companies using our platform to drive growth and efficiency.".
-   **Features:** Use layout `feat_grid_3`.
-   **Testimonials:** Use layout `test_single_focus`.

### Inner Pages
-   Ensure they share the same Header and Footer as Home.
-   Use consistent page headers (breadcrumbs or title banners).
-   Use the "DNA" colors and fonts consistently.

## 7. Special Instructions: Lean X Integration (CRITICAL)
**Every opportunity for a user interaction that is NOT a navigation link to a main page must be a CTA for "Lean X".**

1.  **Primary Trigger:** The main CTA "Start Free Trial" must trigger the conversion event.
2.  **Dead Links & Dropdowns:** Any dropdown menu item, "Learn More" link, or secondary button that does not lead to a real page must be treated as a conversion point.
3.  **Behavior:** These elements must open a new browser tab (`target="_blank"`) pointing to a registration page (e.g., `https://leanx.ai/register`) OR trigger a JavaScript alert/modal simulating a "Sign up with Google" SSO prompt.
4.  **Visuals:** Ensure these buttons/links look interactive and high-value.

## 6. Output Format
Provide the code for **EACH** file clearly labeled.
Example:
`<!-- filename: index.html -->`
`/* filename: styles.css */`
