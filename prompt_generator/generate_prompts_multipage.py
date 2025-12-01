import json
import os
import random
import hashlib
from datetime import datetime

# Load Data
def load_json(filename):
    filepath = os.path.join(os.path.dirname(__file__), filename)
    with open(filepath, 'r') as f:
        return json.load(f)

try:
    structure_data = load_json('expanded_structure_proposal.json')
    industry_data = load_json('industry_content.json')
except FileNotFoundError:
    print("Error: JSON files not found. Please ensure they are in the 'prompt_generator' directory.")
    exit()

# Output Directory
OUTPUT_DIR = "generated_prompts_multipage"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Track generated DNAs to ensure uniqueness
generated_hashes = set()

# Define Page Strategies (The "Flow" & "Structure")
PAGE_STRATEGIES = {
    "ind_saas_01": {
        "pages": [
            {"filename": "index.html", "type": "Home", "desc": "Hero, Features, Social Proof, CTA"},
            {"filename": "features.html", "type": "Deep Dive", "desc": "Detailed breakdown of capabilities, alternating layout"},
            {"filename": "pricing.html", "type": "Pricing", "desc": "3-column pricing table with FAQ section"},
            {"filename": "contact.html", "type": "Support", "desc": "Contact form, Office Address, Map"}
        ],
        "lean_x_trigger": "Start Free Trial"
    },
    "ind_portfolio_01": {
        "pages": [
            {"filename": "index.html", "type": "Home", "desc": "Hero, Selected Works (Grid), About Teaser"},
            {"filename": "work.html", "type": "Portfolio", "desc": "Full grid of projects with category filters"},
            {"filename": "project.html", "type": "Case Study", "desc": "Large hero image, text content, gallery, next project link"},
            {"filename": "about.html", "type": "Profile", "desc": "Bio, Skills, Experience, Contact form"}
        ],
        "lean_x_trigger": "Hire Me"
    },
    "ind_restaurant_01": {
        "pages": [
            {"filename": "index.html", "type": "Home", "desc": "Hero (Video/Image), Featured Dishes, Reviews"},
            {"filename": "menu.html", "type": "Menu", "desc": "Categorized list (Starters, Mains, Drinks) with prices"},
            {"filename": "reservations.html", "type": "Booking", "desc": "Reservation form, Opening Hours, Location"},
            {"filename": "about.html", "type": "Story", "desc": "Chef's bio, History, Gallery"}
        ],
        "lean_x_trigger": "Book a Table"
    },
    "ind_medical_01": {
        "pages": [
            {"filename": "index.html", "type": "Home", "desc": "Hero, Services Overview, Testimonials"},
            {"filename": "services.html", "type": "Offerings", "desc": "Detailed list of services with icons"},
            {"filename": "doctors.html", "type": "Team", "desc": "Grid of doctors with bios and specialties"},
            {"filename": "contact.html", "type": "Reach Us", "desc": "Appointment form, Map, Emergency Info"}
        ],
        "lean_x_trigger": "Patient Portal"
    },
    "ind_realestate_01": {
        "pages": [
            {"filename": "index.html", "type": "Home", "desc": "Hero (Search Bar), Featured Properties, Agents"},
            {"filename": "listings.html", "type": "Properties", "desc": "Grid of property cards with filters (Price, Location)"},
            {"filename": "property.html", "type": "Detail", "desc": "Large gallery, Property specs, Agent contact form"},
            {"filename": "contact.html", "type": "Contact", "desc": "General inquiry form, Office locations"}
        ],
        "lean_x_trigger": "Schedule Viewing"
    },
    "ind_fitness_01": {
        "pages": [
            {"filename": "index.html", "type": "Home", "desc": "Hero (Action Shot), Classes Overview, Trainers"},
            {"filename": "classes.html", "type": "Schedule", "desc": "Weekly timetable or list of class types"},
            {"filename": "membership.html", "type": "Pricing", "desc": "Membership tiers and benefits"},
            {"filename": "contact.html", "type": "Visit Us", "desc": "Location, Hours, Free Pass form"}
        ],
        "lean_x_trigger": "Join Now"
    },
    "ind_ecommerce_01": {
        "pages": [
            {"filename": "index.html", "type": "Home", "desc": "Hero, Featured Products, Categories, Newsletter"},
            {"filename": "shop.html", "type": "Catalog", "desc": "Grid of products with sidebar filter"},
            {"filename": "product.html", "type": "Detail", "desc": "Large image, price, add to cart, description"},
            {"filename": "cart.html", "type": "Cart", "desc": "Table of items, total, checkout button"}
        ],
        "lean_x_trigger": "Checkout"
    },
    "ind_legal_01": {
        "pages": [
            {"filename": "index.html", "type": "Home", "desc": "Hero, Practice Areas, Attorney Profiles"},
            {"filename": "practice-areas.html", "type": "Services", "desc": "List of legal services with descriptions"},
            {"filename": "attorneys.html", "type": "Team", "desc": "Professional bios of partners and associates"},
            {"filename": "contact.html", "type": "Consultation", "desc": "Case evaluation form, Office map"}
        ],
        "lean_x_trigger": "Free Consultation"
    }
}

def get_valid_atoms(atoms, pattern):
    """
    Filters atoms based on a pattern (e.g., 'cp_min_*' or 'cp_bold_01').
    Handles the mismatch between 'cp_minimal_*' in rules and 'cp_min_*' in IDs.
    """
    valid = []
    
    # Normalize pattern for easier matching
    # e.g. "cp_minimal_*" -> "cp_min"
    search_term = pattern.replace("*", "").replace("minimal", "min").replace("professional", "prof").replace("creative", "creat").replace("elegant", "eleg").replace("technical", "tech")
    
    for atom in atoms:
        if atom['id'].startswith(search_term):
            valid.append(atom)
            
    return valid

def generate_dna(industry, style_ref):
    """
    Selects specific atomic components based on the industry and style reference.
    Prioritizes industry-specific layout preferences where possible.
    """
    
    # 1. Find the Style Rules
    # Map generic styles to specific rule targets if needed
    target_style = style_ref
    if style_ref not in [r['styleTarget'] for r in structure_data['generationRules']]:
        # Fallback mapping
        if style_ref == "elegant": target_style = "minimal" # Fallback
        
    rules = next((r for r in structure_data['generationRules'] if r['styleTarget'] == target_style), None)
    
    # If no specific rule found, use a random one or default
    if not rules:
        rules = structure_data['generationRules'][0]

    # 2. Pick Atoms based on Rules
    
    # Colors
    allowed_palettes = rules.get('allowedPalettes', ['cp_*'])
    valid_palettes = []
    for p in allowed_palettes:
        valid_palettes.extend(get_valid_atoms(structure_data['atomicStyles']['colorPalettes'], p))
    
    # Fallback if filtering failed
    if not valid_palettes:
        valid_palettes = structure_data['atomicStyles']['colorPalettes']
        
    palette = random.choice(valid_palettes)

    # Typography
    allowed_typo = rules.get('allowedTypography', ['ts_*'])
    valid_typo = []
    for t in allowed_typo:
        valid_typo.extend(get_valid_atoms(structure_data['atomicStyles']['typographySystems'], t))
    
    if not valid_typo:
        valid_typo = structure_data['atomicStyles']['typographySystems']
        
    typography = random.choice(valid_typo)

    # Shapes
    allowed_shapes = rules.get('allowedShapes', ['shape_*'])
    valid_shapes = []
    for s in allowed_shapes:
        valid_shapes.extend(get_valid_atoms(structure_data['atomicStyles']['shapeSystems'], s))
        
    if not valid_shapes:
        valid_shapes = structure_data['atomicStyles']['shapeSystems']
        
    shape = random.choice(valid_shapes)

    # Layouts (Smart Selection)
    layouts = {}
    
    # Get constraints and preferences
    allowed_layout_ids = rules.get('allowedLayouts', []) # From Style Rules
    preferred_layout_ids = industry.get('preferredLayouts', []) # From Industry Data
    
    for section in ['hero', 'features', 'testimonials', 'cta', 'footer']:
        # 1. Get all layouts for this section type
        all_section_layouts = [l for l in structure_data['layoutPatterns'] if l['type'] == section]
        
        # 2. Filter by Style Rules (if any rules exist)
        # Note: allowedLayouts in rules might be specific IDs or patterns. 
        # For simplicity, we'll assume they are IDs or we match loosely.
        # If allowed_layout_ids is empty/undefined, allow all.
        
        style_filtered = []
        if allowed_layout_ids:
            # Check if any allowed ID matches the layout ID
            # (Simple exact match for now, or check if allowed list has wildcards?)
            # The JSON has "hero_split_left", etc.
            for l in all_section_layouts:
                if l['id'] in allowed_layout_ids or any(allowed in l['id'] for allowed in allowed_layout_ids):
                    style_filtered.append(l)
        else:
            style_filtered = all_section_layouts
            
        # If style filtering eliminated everything (shouldn't happen if rules are good), revert
        if not style_filtered:
            style_filtered = all_section_layouts

        # 3. Prioritize Industry Preferences
        # Find layouts in the style_filtered list that are ALSO in preferred_layout_ids
        preferred_and_allowed = [l for l in style_filtered if l['id'] in preferred_layout_ids]
        
        # Selection Logic:
        # 70% chance to pick a Preferred layout (if available)
        # 30% chance to pick any Allowed layout (for variety)
        
        if preferred_and_allowed and random.random() < 0.7:
            layouts[section] = random.choice(preferred_and_allowed)
        else:
            layouts[section] = random.choice(style_filtered)

    # Functional Patterns
    functional = {}
    if 'functionalPatterns' in structure_data:
        # Navigation
        nav_options = structure_data['functionalPatterns'].get('navigation', [])
        if nav_options:
            functional['navigation'] = random.choice(nav_options)
        
        # Interactions (Pick 2-3 random ones)
        int_options = structure_data['functionalPatterns'].get('interactions', [])
        if int_options:
            functional['interactions'] = random.sample(int_options, min(3, len(int_options)))

    return {
        "industry": industry,
        "style_ref": style_ref,
        "palette": palette,
        "typography": typography,
        "shape": shape,
        "layouts": layouts,
        "functional": functional
    }

def create_multipage_prompt(dna):
    """
    Compiles the DNA into a detailed Markdown prompt.
    """
    ind = dna['industry']
    pal = dna['palette']
    typo = dna['typography']
    shp = dna['shape']
    func = dna.get('functional', {})
    
    # Generate a unique ID
    unique_string = f"{ind['id']}-{pal['id']}-{typo['id']}-{shp['id']}-{random.randint(10000,99999)}"
    build_id = hashlib.md5(unique_string.encode()).hexdigest()[:8]
    
    # Check for uniqueness
    if build_id in generated_hashes:
        return None, None # Skip duplicate
    generated_hashes.add(build_id)

    # Get Page Strategy
    strategy = PAGE_STRATEGIES.get(ind['id'], PAGE_STRATEGIES['ind_saas_01']) # Default to SaaS if missing
    
    # Format Pages List
    pages_text = ""
    for i, page in enumerate(strategy['pages'], 1):
        pages_text += f"        {i}. `{page['filename']}` ({page['type']}): {page['desc']}.\n"

    # Format Interactions
    interactions_text = ""
    if 'interactions' in func:
        for i, interaction in enumerate(func['interactions'], 1):
            interactions_text += f"{i}. **{interaction['id']}** ({interaction['type']}): {interaction['description']} (Logic: {interaction['logic']})\n"

    prompt = f"""# AI Web Builder Prompt: Multi-Page Website Template
**Build ID:** {build_id}
**Target Industry:** {ind['name']}
**Design Style:** {dna['style_ref'].title()} ({pal['mood']})
**Scope:** Full Multi-Page Website (HTML/CSS/JS)

---

## 1. Role & Objective
You are a Senior Frontend Architect. Your goal is to build a **complete, multi-page website template**.
The output must be **fully responsive**, **accessible**, and **highly polished**.
You must provide the code for **ALL** required files.

## 2. Design Specifications (The "DNA")

### A. Color Palette (CSS Variables)
*Define these in `styles.css` :root*
- `--color-primary`: `{pal['colors']['primary']}`
- `--color-secondary`: `{pal['colors']['secondary']}`
- `--color-accent`: `{pal['colors']['accent']}`
- `--color-bg`: `{pal['colors']['background']}`
- `--color-surface`: `{pal['colors']['surface']}`

### B. Typography
- **Headings:** {typo['headings']['family']} ({typo['headings']['weight']})
- **Body:** {typo['body']['family']} ({typo['body']['weight']})
*Import via Google Fonts in CSS.*

### C. Shape & Spacing
- **Border Radius:** `{shp['borderRadius']['md']}`
- **Button Style:** {shp['buttonStyle']}

## 3. Functional Patterns (Global)

### A. Navigation System (Header)
**Type:** `{func.get('navigation', {}).get('type', 'standard')}`
**Behavior:** `{func.get('navigation', {}).get('behavior', 'static')}`
**Layout:** `{func.get('navigation', {}).get('layout', 'standard')}`
*Requirement:* Must include a fully functional **Mobile Hamburger Menu** (JS).

### B. Footer
**Layout:** `{dna['layouts'].get('footer', {}).get('id', 'standard')}`
*Requirement:* Include site map links, social icons, and copyright.

### C. Interactions (JS)
{interactions_text}

## 4. Required Files & Structure

You must generate the following files. Use comments to separate them if outputting in one block, or use separate blocks.

### A. Global Assets
1.  `styles.css`: Contains all variables, reset, typography, grid system, and component styles.
2.  `scripts.js`: Contains navigation logic, mobile menu toggle, and interaction scripts.

### B. HTML Pages
{pages_text}

## 5. Content Guidelines (Per Page)

### `index.html` (Home)
-   **Hero:** Headline "{random.choice(ind['content']['hero']['headlines'])}", Subhead "{random.choice(ind['content']['hero']['subheadlines'])}".
-   **Features:** Use layout `{dna['layouts'].get('features', {}).get('id', 'standard')}`.
-   **Testimonials:** Use layout `{dna['layouts'].get('testimonials', {}).get('id', 'standard')}`.

### Inner Pages
-   Ensure they share the same Header and Footer as Home.
-   Use consistent page headers (breadcrumbs or title banners).
-   Use the "DNA" colors and fonts consistently.

## 7. Special Instructions: Lean X Integration (CRITICAL)
**Every opportunity for a user interaction that is NOT a navigation link to a main page must be a CTA for "Lean X".**

1.  **Primary Trigger:** The main CTA "{strategy['lean_x_trigger']}" must trigger the conversion event.
2.  **Dead Links & Dropdowns:** Any dropdown menu item, "Learn More" link, or secondary button that does not lead to a real page must be treated as a conversion point.
3.  **Behavior:** These elements must open a new browser tab (`target="_blank"`) pointing to a registration page (e.g., `https://leanx.ai/register`) OR trigger a JavaScript alert/modal simulating a "Sign up with Google" SSO prompt.
4.  **Visuals:** Ensure these buttons/links look interactive and high-value.

## 6. Output Format
Provide the code for **EACH** file clearly labeled.
Example:
`<!-- filename: index.html -->`
`/* filename: styles.css */`
"""
    return build_id, prompt

# Main Execution Loop
print("Generating high-volume multi-page prompts...")

# Target: 50 templates per industry = 400 total
TARGET_PER_INDUSTRY = 50

for industry in industry_data['industries']:
    print(f"Processing {industry['name']}...")
    count = 0
    attempts = 0
    
    # Styles to rotate through
    styles = ['minimal', 'bold', 'professional', 'creative', 'elegant']
    
    while count < TARGET_PER_INDUSTRY and attempts < 200:
        attempts += 1
        style = random.choice(styles)
        
        # Generate the DNA
        dna = generate_dna(industry, style)
        
        if dna:
            # Create the Prompt
            build_id, prompt_content = create_multipage_prompt(dna)
            
            if build_id: # If not duplicate
                # Save to File
                filename = f"{industry['id']}_{style}_{build_id}_multipage.md"
                filepath = os.path.join(OUTPUT_DIR, filename)
                
                with open(filepath, 'w') as f:
                    f.write(prompt_content)
                
                count += 1
                if count % 10 == 0:
                    print(f"  -> Generated {count}/{TARGET_PER_INDUSTRY}...")

print(f"\nDone! Check the '{OUTPUT_DIR}' folder.")
