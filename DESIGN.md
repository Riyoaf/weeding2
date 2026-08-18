---
name: Ethereal Union
colors:
  surface: '#fbf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#454843'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#757873'
  outline-variant: '#c5c7c1'
  surface-tint: '#5e5f5c'
  primary: '#5e5f5c'
  on-primary: '#ffffff'
  primary-container: '#fcfbf7'
  on-primary-container: '#737471'
  inverse-primary: '#c7c7c3'
  secondary: '#4e635a'
  on-secondary: '#ffffff'
  secondary-container: '#cee5da'
  on-secondary-container: '#52675e'
  tertiary: '#7b5455'
  on-tertiary: '#ffffff'
  tertiary-container: '#fffaf9'
  on-tertiary-container: '#926969'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e3e2df'
  primary-fixed-dim: '#c7c7c3'
  on-primary-fixed: '#1b1c1a'
  on-primary-fixed-variant: '#464744'
  secondary-fixed: '#d1e8dd'
  secondary-fixed-dim: '#b5ccc1'
  on-secondary-fixed: '#0b1f18'
  on-secondary-fixed-variant: '#374b43'
  tertiary-fixed: '#ffdad9'
  tertiary-fixed-dim: '#ecbbba'
  on-tertiary-fixed: '#2f1314'
  on-tertiary-fixed-variant: '#603d3e'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.15em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  section-gap-desktop: 120px
  section-gap-mobile: 64px
  container-padding: 24px
  gutter: 16px
---

## Brand & Style
The design system is centered on high-end editorial elegance, blending timeless romance with modern minimalism. It targets a sophisticated audience seeking a digital invitation experience that feels as tactile and premium as heavy-stock paper. 

The aesthetic is characterized by expansive whitespace, delicate line art, and a "quiet luxury" atmosphere. It avoids clutter in favor of balanced compositions and intentional asymmetry. The UI should evoke a sense of calm, celebration, and exclusivity, moving away from typical "tech" patterns toward a lifestyle-editorial format.

## Colors
The palette is grounded in a warm, organic base of Ivory (#FCFBF7) and Soft Beige (#F5F0E1) to mimic high-quality stationery. Charcoal (#333333) provides sharp, legible contrast for long-form text without the harshness of pure black. 

Sage Green and Dusty Rose serve as soft, botanical-inspired accents for secondary actions, dividers, and decorative elements. Soft Gold (#D4AF37) is reserved for high-impact moments, such as "Accept Invitation" buttons, active states, or delicate borders, adding a shimmer of luxury.

## Typography
The typographic hierarchy relies on the high contrast between the expressive, high-contrast Serif (Playfair Display) and the functional, neutral Sans-Serif (Inter). 

Headlines should be treated as design elements; use `display-lg` for names and primary titles. `label-caps` is specifically designed for sub-headers (e.g., "THE VENUE") to provide a structural, modern anchor to the fluid serif styles. Maintain generous line height for body text to ensure a relaxed, premium reading pace.

## Layout & Spacing
This design system uses a fluid grid with a heavy emphasis on vertical rhythm. Given the mobile-first priority, content should be centered or use a "staggered" layout where images and text overlap slightly to create depth.

Margins are wider than standard web applications (24px on mobile) to frame the content like a physical card. Use large section gaps (64px+) to prevent the interface from feeling crowded. On desktop, content should be constrained to a maximum width of 1100px to maintain the intimacy of the invitation format.

## Elevation & Depth
Depth is communicated through **Tonal Layers** and **Subtle Shadows** rather than heavy skeuomorphism. 

1. **Base:** Ivory (#FCFBF7).
2. **Cards/Containers:** Soft Beige (#F5F0E1) with no border or a very thin 0.5px Gold border.
3. **Shadows:** Use "Ambient Glow" shadows—highly diffused (20px-40px blur), low opacity (4-6%), tinted with the Sage Green or Charcoal to avoid a "muddy" look. 

Interaction depth should feel like a soft press into paper rather than a hover state.

## Shapes
The shape language is organic and soft. Buttons and image containers use `rounded-lg` (1rem) or `rounded-xl` (1.5rem) to echo the curves of floral elements. Avoid sharp 90-degree corners to maintain the romantic, approachable aesthetic. Circular crops are encouraged for secondary imagery (e.g., gallery thumbnails) to contrast with large, rectangular hero images.

## Components
- **Buttons:** Primary buttons should be "Soft Gold" with Charcoal text. Use a high-contrast hover state that subtly increases the gold saturation. Use pill-shaped or `rounded-xl` buttons only.
- **Inputs:** Form fields for RSVPs should use a "Bottom-Border Only" style in Charcoal to mimic handwritten lines on an invitation.
- **Cards:** Background cards should use the Soft Beige palette with generous internal padding (min 32px).
- **Floral Accents:** Use SVG line art of leaves or petals, colored in Sage Green or Dusty Rose, as absolute-positioned background elements that "peek" behind content blocks.
- **RSVP Progress:** A thin Gold line at the top of the viewport to indicate steps in the invitation/registry process.
- **Countdown Timer:** Minimalist presentation using `headline-md` for numbers and `label-caps` for units (Days, Hours).