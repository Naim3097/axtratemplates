import json
import os
import random
import hashlib
from datetime import datetime

# Load Data
def load_json(filepath):
    with open(filepath, 'r') as f:
        return json.load(f)

try:
    structure_data = load_json('expanded_structure_proposal.json')
    industry_data = load_json('industry_content.json')
except FileNotFoundError:
    print("Error: JSON files not found. Please ensure they are in the parent directory.")
    exit()

# Output Directory
OUTPUT_DIR = "generated_prompts_v2"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def generate_dna(industry, style_ref):
    """
    Selects specific atomic components based on the industry and style reference.
    This creates the unique 'DNA' for one template.
    """
    
    # 1. Find the Style Rules
    rules = next((r for r in structure_data['generationRules'] if r['styleTarget'] == style_ref), None)
    if not rules:
        return None

    # 2. Pick Atoms based on Rules
    # Helper to filter by wildcard (e.g., "cp_minimal_*")
    def filter_atoms(atoms, allowed_patterns):
        valid = []
        for atom in atoms:
            for pattern in allowed_patterns:
                if pattern.endswith('*'):
                    if atom['id'].startswith(pattern[:-1]):
                        valid.append(atom)
                elif atom['id'] == pattern:
                    valid.append(atom)
        return valid

    # Colors
    valid_palettes = filter_atoms(structure_data['atomicStyles']['colorPalettes'], rules['allowedPalettes'])
    palette = random.choice(valid_palettes) if valid_palettes else structure_data['atomicStyles']['colorPalettes'][0]

    # Typography
    valid_typo = filter_atoms(structure_data['atomicStyles']['typographySystems'], rules['allowedTypography'])
    typography = random.choice(valid_typo) if valid_typo else structure_data['atomicStyles']['typographySystems'][0]

    # Shapes
    valid_shapes = filter_atoms(structure_data['atomicStyles']['shapeSystems'], rules['allowedShapes'])
    shape = random.choice(valid_shapes) if valid_shapes else structure_data['atomicStyles']['shapeSystems'][0]

    # Layouts (We need one for each section type)
    layouts = {}
    for section in ['hero', 'features', 'testimonials', 'cta', 'footer']:
        # Filter layouts by type
        type_layouts = [l for l in structure_data['layoutPatterns'] if l['type'] == section]
        
        # If rules specify allowed layouts, filter further (simplified for now)
        # In a full version, we'd match specific layout IDs from rules
        if type_layouts:
            layouts[section] = random.choice(type_layouts)

    # Functional Patterns (New)
    functional = {}
    if 'functionalPatterns' in structure_data:
        # Navigation
        nav_options = structure_data['functionalPatterns'].get('navigation', [])
        if nav_options:
            functional['navigation'] = random.choice(nav_options)
        
        # Interactions (Pick 2 random ones)
        int_options = structure_data['functionalPatterns'].get('interactions', [])
        if int_options:
            functional['interactions'] = random.sample(int_options, min(2, len(int_options)))

    return {
        "industry": industry,
        "style_ref": style_ref,
        "palette": palette,
        "typography": typography,
        "shape": shape,
        "layouts": layouts,
        "functional": functional
    }

def create_prompt_content(dna):
    """
    Compiles the DNA into a detailed Markdown prompt for an AI Builder.
    """
    ind = dna['industry']
    pal = dna['palette']
    typo = dna['typography']
    shp = dna['shape']
    func = dna.get('functional', {})
    
    # Generate a unique ID for this build
    unique_string = f"{ind['id']}-{pal['id']}-{typo['id']}-{random.randint(1000,9999)}"
    build_id = hashlib.md5(unique_string.encode()).hexdigest()[:8]

    # Format Interactions List
    interactions_text = ""
    if 'interactions' in func:
        for i, interaction in enumerate(func['interactions'], 1):
            interactions_text += f"{i}. **{interaction['id']}** ({interaction['type']}): {interaction['description']} (Logic: {interaction['logic']})\n"

    prompt = f"""# AI Web Builder Prompt: Full-Scale Responsive Template
**Build ID:** {build_id}
**Target Industry:** {ind['name']}
**Design Style:** {dna['style_ref'].title()}
**Output Quality:** Production-Ready / Envato Standard

---

## 1. Role & Objective
You are a Senior Frontend Architect. Your goal is to build a **complete, multi-section landing page template** that rivals premium themes found on marketplaces like Envato or ThemeForest.
The output must be **fully responsive**, **accessible**, and **highly polished**.

## 2. Design Specifications (The "DNA")

### A. Color Palette (CSS Variables)
Implement these exactly as CSS variables in the `:root`.
- `--color-primary`: `{pal['colors']['primary']}`
- `--color-secondary`: `{pal['colors']['secondary']}`
- `--color-accent`: `{pal['colors']['accent']}`
- `--color-bg`: `{pal['colors']['background']}`
- `--color-surface`: `{pal['colors']['surface']}`
- `--color-text-main`: `{pal['colors']['primary']}`
- `--color-text-muted`: `rgba(0,0,0,0.6)` (Adjust based on background)

### B. Typography
- **Headings Font:** {typo['headings']['family']} (Weight: {typo['headings']['weight']})
- **Body Font:** {typo['body']['family']} (Weight: {typo['body']['weight']})
- **Pairing Logic:** {typo['pairingType']}
*Import these from Google Fonts.*

### C. Shape & Spacing
- **Border Radius:** `{shp['borderRadius']['md']}` (Use for cards/buttons)
- **Button Style:** {shp['buttonStyle']}
- **Base Spacing Unit:** 8px (Use multiples of this for padding/margin)

## 3. Functional Patterns (UX & Behavior)

### A. Navigation System
**Type:** `{func.get('navigation', {}).get('type', 'standard')}`
**Behavior:** `{func.get('navigation', {}).get('behavior', 'static')}`
**Layout:** `{func.get('navigation', {}).get('layout', 'standard')}`
*Requirement:* Must include a fully functional **Mobile Hamburger Menu** that slides or fades in on screens < 768px.

### B. Required Interactions (JavaScript)
Implement the following interactive behaviors using vanilla JavaScript (no jQuery):
{interactions_text}

## 4. Content & Structure (Full Page)

The page must include ALL of the following sections in order:

1.  **Header/Navigation:** Responsive, sticky if requested.
2.  **Hero Section:**
    -   **Layout:** `{dna['layouts'].get('hero', {}).get('id', 'standard')}`
    -   **Headline:** "{random.choice(ind['content']['hero']['headlines'])}"
    -   **Subheadline:** "{random.choice(ind['content']['hero']['subheadlines'])}"
    -   **CTA:** "{random.choice(ind['content']['hero']['ctas'])}"
3.  **Social Proof / Logo Strip:** "Trusted by industry leaders" (Use placeholder logos).
4.  **Features Section:**
    -   **Layout:** `{dna['layouts'].get('features', {}).get('id', 'standard')}`
    -   **Content:** 3-4 key benefits with icons.
5.  **About / How it Works:** A split-screen section explaining the process.
6.  **Testimonials:**
    -   **Layout:** `{dna['layouts'].get('testimonials', {}).get('id', 'standard')}`
    -   **Content:** 2-3 reviews.
7.  **Pricing / Plans:** 3 cards (Basic, Pro, Enterprise).
8.  **FAQ Section:** Accordion style questions.
9.  **Footer:** Full site map, social links, copyright.

## 5. Technical Requirements (Strict)

1.  **Responsive Design (Mobile-First):**
    -   Base styles should be for mobile.
    -   Use `@media (min-width: 768px)` for tablet.
    -   Use `@media (min-width: 1024px)` for desktop.
    -   Ensure no horizontal scrolling on mobile.
2.  **CSS Architecture:**
    -   Include a modern CSS Reset (e.g., box-sizing: border-box).
    -   Use CSS Grid and Flexbox for all layouts.
    -   Use `rem` units for font sizes and spacing.
3.  **Accessibility (a11y):**
    -   Use semantic HTML5 tags (`<nav>`, `<main>`, `<article>`, `<aside>`).
    -   Ensure sufficient color contrast.
    -   Add `aria-label` to buttons and inputs.
4.  **Code Quality:**
    -   Add comments explaining complex sections.
    -   Keep CSS organized by section.

## 6. Output Format
Provide ONLY the full HTML code block containing the `<!DOCTYPE html>` structure.
"""
    return build_id, prompt

# Main Execution Loop
print("Generating prompts...")

# Example: Generate 5 prompts for each industry
for industry in industry_data['industries']:
    print(f"Processing {industry['name']}...")
    
    # Try to generate a few variations
    styles = ['minimal', 'bold', 'professional', 'creative', 'elegant']
    
    for _ in range(3): # Generate 3 variations per industry for this demo
        style = random.choice(styles)
        
        # Generate the DNA
        dna = generate_dna(industry, style)
        
        if dna:
            # Create the Prompt
            build_id, prompt_content = create_prompt_content(dna)
            
            # Save to File
            filename = f"{industry['id']}_{style}_{build_id}.md"
            filepath = os.path.join(OUTPUT_DIR, filename)
            
            with open(filepath, 'w') as f:
                f.write(prompt_content)
            
            print(f"  -> Created {filename}")

print(f"\nDone! Check the '{OUTPUT_DIR}' folder.")
