# Database Strategy for High-Volume Template Generation

## 1. Core Philosophy: Store the Recipe, Not the Cake
Storing 1 million HTML files is inefficient and hard to maintain. Instead, we store the **Configuration Object** (The DNA).
- **Storage Size:** Tiny (JSON text).
- **Flexibility:** If you update the "Button Component" code, all 1 million templates update instantly because they just reference the component.

## 2. The Data Structure (Relational Schema)

We need a database (SQLite for dev, PostgreSQL for prod) with the following tables:

### Table A: `Atomic_Definitions` (The Ingredients)
*Stores the raw data from our JSON files, versioned.*
- `id` (PK): e.g., "cp_bold_01"
- `type`: "palette", "typography", "layout", "shape"
- `data`: JSON blob (The actual hex codes, font names, etc.)
- `version`: 1.0

### Table B: `Assets` (The Media)
*A library of curated placeholder images/icons tagged by industry.*
- `id` (PK)
- `industry_tag`: "medical", "saas"
- `type`: "hero_image", "icon", "avatar"
- `url`: Path to file

### Table C: `Templates` (The Generated Products)
*This is the massive table containing the millions of records.*
- `id` (PK): UUID
- `dna_hash` (Unique Index): A hash of the config to prevent duplicates.
- `industry_id`: FK to Industry
- `palette_id`: FK to Atomic_Definitions
- `typography_id`: FK to Atomic_Definitions
- `layout_structure`: JSON (The map of which layout goes where)
- `quality_score`: 0-100 (Calculated by rules)
- `status`: "Draft", "Published", "Archived"

## 3. Robustness Mechanisms

### A. The "Linter" (Quality Control)
Before saving a template to the database, it must pass a logic check:
1.  **Contrast Check:** Does the `palette.primary` color have enough contrast against `palette.background`?
2.  **Vibe Check:** Does a "Playful" font pairing clash with a "Corporate" industry? (Enforced via the `generationRules` in your JSON).

### B. The "DNA Hash" (Uniqueness)
To ensure we don't generate the same template twice:
1.  Create a string: `industry + palette_id + font_id + layout_hero_id + layout_feat_id`
2.  Hash it (SHA-256).
3.  Check DB. If hash exists, skip.

### C. Smart Tagging (Taxonomy)
Because we generated it, we auto-tag it. We don't need AI to "see" the template.
- **Query:** "Show me all *Dark Mode* templates for *Dentists* with *Serif Fonts*."
- **SQL:** `SELECT * FROM Templates WHERE palette_mood='Dark' AND industry='Dental' AND font_type='Serif'`

## 4. The Generation Pipeline

1.  **The Generator Script:**
    - Loops through Industries.
    - Loops through allowed Styles.
    - Randomly selects Layouts based on rules.
    - Validates the combination.
    - Generates the `dna_hash`.
    - Inserts into `Templates` table.

2.  **The Renderer (Frontend):**
    - User clicks "Preview" on Template #5092.
    - System fetches the JSON config for #5092.
    - React/Vue engine hydrates the components on the fly.

## 5. Next Steps
1.  **Setup SQLite DB:** Create the actual database file.
2.  **Ingest Data:** Write a script to load your JSON files into the `Atomic_Definitions` table.
3.  **Build the Generator:** Write the Python script to start churning out unique combinations.
