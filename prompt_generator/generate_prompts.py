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
    structure_data = load_json('../expanded_structure_proposal.json')
    industry_data = load_json('../industry_content.json')
except FileNotFoundError:
    print("Error: JSON files not found. Please ensure they are in the parent directory.")
    exit()

# Output Directory
OUTPUT_DIR = "../generated_prompts"
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

    prompt = f"""# AI Web Builder Prompt
**Build ID:** {build_id}
**Target Industry:** {ind['name']}
**Design Style:** {dna['style_ref'].title()}

---

## 1. Role & Objective
You are an expert frontend developer specializing in semantic HTML5, modern CSS, and vanilla JavaScript. 
Your task is to build a **single-page landing page template** based on the strict specifications below.
The code must be clean, responsive, and structured for easy integration into a CMS.

## 2. Design Specifications (The "DNA")

### A. Color Palette (CSS Variables)
Implement these exactly as CSS variables in the `:root`.
- `--color-primary`: `{pal['colors']['primary']}`
- `--color-secondary`: `{pal['colors']['secondary']}`
- `--color-accent`: `{pal['colors']['accent']}`
- `--color-bg`: `{pal['colors']['background']}`
- `--color-surface`: `{pal['colors']['surface']}`

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
*Implementation Note: Ensure the navigation is responsive and follows this specific behavior.*

### B. Required Interactions (JavaScript)
Implement the following interactive behaviors using vanilla JavaScript (no jQuery):
{interactions_text}

## 4. Content & Structure

### Section 1: Hero Area
**Layout Pattern:** `{dna['layouts'].get('hero', {}).get('id', 'standard')}` ({dna['layouts'].get('hero', {}).get('structure', 'standard')})
- **Headline:** "{random.choice(ind['content']['hero']['headlines'])}"
- **Subheadline:** "{random.choice(ind['content']['hero']['subheadlines'])}"
- **CTA Button:** "{random.choice(ind['content']['hero']['ctas'])}"
- **Visual:** Use a placeholder image with style "{ind['assetPreferences']['imageStyle']}".

### Section 2: Features
**Layout Pattern:** `{dna['layouts'].get('features', {}).get('id', 'standard')}`
- **Feature 1:** **{ind['content']['features'][0]['title']}** - {ind['content']['features'][0]['description']}
- **Feature 2:** **{ind['content']['features'][1]['title']}** - {ind['content']['features'][1]['description']}
- **Feature 3:** **{ind['content']['features'][2]['title']}** - {ind['content']['features'][2]['description']}

### Section 3: Testimonials
**Layout Pattern:** `{dna['layouts'].get('testimonials', {}).get('id', 'standard')}`
- **Quote:** "{ind['content']['testimonials'][0]['quote']}"
- **Author:** {ind['content']['testimonials'][0]['author']}

## 5. Technical Requirements
1.  **HTML Structure:** Use semantic tags (`<header>`, `<main>`, `<section>`, `<footer>`).
2.  **CSS:** Use a `<style>` block in the head. Do not use external frameworks like Bootstrap. Write custom CSS using the variables defined above.
3.  **JavaScript:** Use a `<script>` block at the end of the body. Ensure code is error-free.
4.  **Responsiveness:** Ensure the layout stacks vertically on mobile devices (max-width: 768px).
5.  **Classes:** Use BEM naming convention (e.g., `.hero__title`, `.card--featured`).

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
