# AI Web Builder Prompt: Multi-Page Website Template
**Build ID:** c7c6d8a0
**Target Industry:** Legal & Corporate
**Design Style:** Professional (Legal Firm)
**Scope:** Full Multi-Page Website (HTML/CSS/JS)

---

## 1. Role & Objective
You are a Senior Frontend Architect. Your goal is to build a **complete, multi-page website template**.
The output must be **fully responsive**, **accessible**, and **highly polished**.
You must provide the code for **ALL** required files.

## 2. Design Specifications (The "DNA")

### A. Color Palette (CSS Variables)
*Define these in `styles.css` :root*
- `--color-primary`: `#111827`
- `--color-secondary`: `#F9FAFB`
- `--color-accent`: `#2563EB`
- `--color-bg`: `#FFFFFF`
- `--color-surface`: `#F3F4F6`

### B. Typography
- **Headings:** Pacifico (400)
- **Body:** Quicksand (500)
*Import via Google Fonts in CSS.*

### C. Shape & Spacing
- **Border Radius:** `0px`
- **Button Style:** rectangle

## 3. Functional Patterns (Global)

### A. Navigation System (Header)
**Type:** `sidebar`
**Behavior:** `fixed`
**Layout:** `vertical-icons-text`
*Requirement:* Must include a fully functional **Mobile Hamburger Menu** (JS).

### B. Footer
**Layout:** `foot_multi_col`
*Requirement:* Include site map links, social icons, and copyright.

### C. Interactions (JS)
1. **int_hover_card_lift** (micro-interaction): Cards lift and shadow deepens on hover (Logic: css-transform)
2. **int_filter_grid** (data-view): Filter grid items by category data attributes (Logic: filter-sort)
3. **int_tabs_content** (ui-component): Switch content visibility based on active tab (Logic: vanilla-js-tabs)


## 4. Required Files & Structure

You must generate the following files. Use comments to separate them if outputting in one block, or use separate blocks.

### A. Global Assets
1.  `styles.css`: Contains all variables, reset, typography, grid system, and component styles.
2.  `scripts.js`: Contains navigation logic, mobile menu toggle, and interaction scripts.

### B. HTML Pages
        1. `index.html` (Home): Hero, Practice Areas, Attorney Profiles.
        2. `practice-areas.html` (Services): List of legal services with descriptions.
        3. `attorneys.html` (Team): Professional bios of partners and associates.
        4. `contact.html` (Consultation): Case evaluation form, Office map.


## 5. Content Guidelines (Per Page)

### `index.html` (Home)
-   **Hero:** Headline "Expert Legal Counsel", Subhead "Trusted by Fortune 500 companies.".
-   **Features:** Use layout `feat_list_alt`.
-   **Testimonials:** Use layout `test_grid_masonry`.

### Inner Pages
-   Ensure they share the same Header and Footer as Home.
-   Use consistent page headers (breadcrumbs or title banners).
-   Use the "DNA" colors and fonts consistently.

## 7. Special Instructions: Lean X Integration (CRITICAL)
**Every opportunity for a user interaction that is NOT a navigation link to a main page must be a CTA for "Lean X".**

1.  **Primary Trigger:** The main CTA "Free Consultation" must trigger the conversion event.
2.  **Dead Links & Dropdowns:** Any dropdown menu item, "Learn More" link, or secondary button that does not lead to a real page must be treated as a conversion point.
3.  **Behavior:** These elements must open a new browser tab (`target="_blank"`) pointing to a registration page (e.g., `https://leanx.ai/register`) OR trigger a JavaScript alert/modal simulating a "Sign up with Google" SSO prompt.
4.  **Visuals:** Ensure these buttons/links look interactive and high-value.

## 6. Output Format
Provide the code for **EACH** file clearly labeled.
Example:
`<!-- filename: index.html -->`
`/* filename: styles.css */`
