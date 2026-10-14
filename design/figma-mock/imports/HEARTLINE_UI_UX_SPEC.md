# Heartline — UI/UX Design Specification
### For Figma Make AI

---

## 01. EMOTIONAL DESIGN PHILOSOPHY

This is not a productivity app with a pink coat of paint.

Heartline should feel like the inside of a love letter.
Like candlelight in a dark room. Like the moment before a kiss.
Every screen must carry **emotional weight** — the user should feel
that this space was made specifically for them and their person.

The design language is built on three emotional pillars:

**Intimacy** — small, quiet details that feel hand-made and personal.
Not polished like a bank app. Soft, warm, slightly imperfect — like a handwritten note.

**Safety** — rounded, gentle, never harsh. The user must never feel judged or exposed.
Sharing a feeling here should feel as safe as whispering in the dark.

**Depth** — layers. Translucency. Shadows with warmth. The app should feel like
there is always something more beneath the surface — just like a relationship.

---

## 02. VISUAL IDENTITY — THE DESIGN SYSTEM

### 2.1 Color Palette

#### Primary Emotional Palette

```
Deep Plum         #1A0A2E   — Dark mode background. The depth of night.
Midnight Rose     #2D1B3D   — Card surfaces on dark. A private, intimate space.
Velvet Crimson    #8B1A4A   — Primary brand. The color of deep love, not bright love.
Dusty Rose        #C4687A   — Secondary brand. Softer, approachable warmth.
Blush             #EBA8B4   — Light accents, highlights, selected states.
Petal             #F5D6DC   — Very light — hover states, skeleton loaders.
Warm Cream        #FDF6F0   — Light mode background. Like aged paper, not clinical white.
Ivory             #FAF0E8   — Light mode card surfaces.
```

#### Accent Palette

```
Ember Gold        #C8863A   — Milestone celebrations, special moments.
Sage Whisper      #7A9E8E   — "We're Good" resolved state. Growth, peace.
Lavender Dusk     #9B89C4   — AI suggestions. A gentle, otherworldly touch.
Dawn Blue         #7BA3C4   — Lonely/Sad feeling tag. Soft and melancholic, not harsh.
Warm Amber        #D4943A   — Overwhelmed/Anxious tag. Like a warning lantern.
```

#### Functional Colors

```
Error Blush       #C4687A   — Same as Dusty Rose — errors feel warm, not alarming
Success Sage      #7A9E8E   — Same as Sage Whisper — success feels calm
Text Primary Dark     #FAF0E8   — On dark backgrounds
Text Secondary Dark   #C4A8B4   — Muted, warm grey-rose
Text Primary Light    #1A0A2E   — On light backgrounds — deep plum, not black
Text Secondary Light  #6B4A5A   — Muted, warm
Divider Dark          #2D1B3D at 60% opacity
Divider Light         #C4A8B4 at 30% opacity
```

### 2.2 Typography

#### Font Families

**Display / Romantic Headers: `Cormorant Garamond`**
Elegant, editorial, old-world romance. Has a natural warmth that sans-serifs can never achieve.
Use for: screen titles, Memory Jar headers, onboarding headlines, celebration text.
Weights used: 300 (Light Italic), 400 (Regular), 600 (SemiBold Italic)

**Body / UI: `DM Sans`**
Clean, modern, humanist. Feels approachable and never sterile.
Use for: all body copy, labels, buttons, navigation.
Weights used: 300, 400, 500, 600

**Accent / Quotes: `Cormorant Garamond Italic`**
For pulled quotes, feeling tag labels, empty state copy, and moments of poetry.

#### Type Scale

```
Display XL    Cormorant Garamond SemiBold Italic   48px   line-height 1.1   letter-spacing -1px
Display LG    Cormorant Garamond Regular Italic     38px   line-height 1.2   letter-spacing -0.5px
Display MD    Cormorant Garamond Regular            32px   line-height 1.25  letter-spacing -0.3px
Headline      DM Sans SemiBold                      24px   line-height 1.3   letter-spacing -0.2px
Title         DM Sans Medium                        18px   line-height 1.4   letter-spacing -0.1px
Body LG       DM Sans Regular                       16px   line-height 1.65
Body MD       DM Sans Regular                       14px   line-height 1.6
Label         DM Sans Medium                        13px   line-height 1.4   letter-spacing 0.2px
Caption       DM Sans Regular                       11px   line-height 1.5   letter-spacing 0.3px
Micro         DM Sans Regular                        9px   line-height 1.4   letter-spacing 0.5px   ALL CAPS
```

### 2.3 Spacing System

Base unit: 4px

```
2xs   4px
xs    8px
sm    12px
md    16px
lg    24px
xl    32px
2xl   48px
3xl   64px
4xl   96px
```

### 2.4 Border Radius

```
xs    4px    — Tags in dense lists only
sm    8px    — Small chips, minor elements
md    16px   — Input fields, secondary buttons
lg    24px   — Cards, primary buttons
xl    32px   — Bottom sheets, modals
2xl   40px   — Large hero cards
full  9999px — Pill shapes, avatar circles
```

### 2.5 Elevation / Shadow System

Dark mode shadows carry warmth — never cold grey shadows.

```
Level 0   No shadow — flat, on-surface elements
Level 1   0 4px 16px rgba(26,10,46,0.4)      — cards resting on background
Level 2   0 8px 32px rgba(139,26,74,0.25)    — elevated cards, drawers
Level 3   0 16px 48px rgba(139,26,74,0.35)   — modals, bottom sheets
Level 4   0 24px 64px rgba(26,10,46,0.6)     — celebration overlays

Glow (for active/selected states):
Rose Glow    0 0 24px rgba(196,104,122,0.5)
Gold Glow    0 0 24px rgba(200,134,58,0.4)
Sage Glow    0 0 24px rgba(122,158,142,0.4)
```

### 2.6 Glassmorphism Treatment

Used on: floating action cards, overlay panels, notification toasts.

```
background: rgba(45, 27, 61, 0.6)
backdrop-filter: blur(24px) saturate(180%)
border: 1px solid rgba(196,104,122,0.2)
border-radius: 24px
```

---

## 03. GLOBAL UI PATTERNS

### 3.1 Bottom Navigation Bar

5 tabs. Dark frosted glass. Sits 8px from bottom (with safe area respect).

```
Tab items: Home | Hearts | Mood | Us Time | Profile
Icon style: Custom outlined icons, 22px, stroke-width 1.5px
Active state: Dusty Rose (#C4687A) icon + label visible
Inactive state: Text Secondary Dark, no label
Background: rgba(26,10,46,0.85) + blur(32px)
Border top: 1px solid rgba(196,104,122,0.12)
Height: 64px + bottom safe area
Active indicator: Small pill underline (24px wide, 3px tall, Dusty Rose, border-radius full)
```

### 3.2 Top App Bar

```
Style: Transparent or frosted — never opaque block color
Title: Display MD (Cormorant Garamond) for primary screens
       Title (DM Sans Medium) for secondary screens
Left action: Back arrow (chevron-left, 24px)
Right actions: max 2 icons
Behavior: On scroll — fades in frosted glass background
```

### 3.3 Buttons

**Primary Button (Heart CTA)**
```
Height: 56px
Border radius: full (pill)
Background: gradient — 135deg, Velvet Crimson #8B1A4A → Dusty Rose #C4687A
Text: DM Sans SemiBold 16px, Warm Cream
Shadow: 0 8px 24px rgba(139,26,74,0.45)
Active/Press state: scale(0.97) + shadow reduces
Disabled: opacity 0.4, no shadow
Width: Full width minus 32px margins OR auto with min 180px
```

**Secondary Button**
```
Height: 48px
Border radius: full
Background: transparent
Border: 1.5px solid Dusty Rose
Text: DM Sans Medium 15px, Dusty Rose
Active: Background fills to rgba(196,104,122,0.12)
```

**Ghost Button / Text Action**
```
No border, no background
Text: DM Sans Medium 14px, Text Secondary
Underline on press
```

**Icon Button**
```
40x40 container, border radius full
Background: rgba(196,104,122,0.12)
Icon: 20px, Dusty Rose
Active: background rgba(196,104,122,0.25)
```

### 3.4 Input Fields

```
Height: 56px (single line) / auto (multiline)
Border radius: md (16px)
Background: rgba(45,27,61,0.5) dark / rgba(250,240,232,0.8) light
Border: 1.5px solid rgba(196,104,122,0.2)
Border (focused): 1.5px solid Dusty Rose + Rose Glow shadow
Placeholder text: Text Secondary, DM Sans Regular Italic 15px
Input text: DM Sans Regular 15px, Text Primary
Label: floats up on focus — DM Sans Medium 12px, Dusty Rose
Padding: 16px horizontal
Character counter: appears at 80% of max, Caption, right-aligned
```

### 3.5 Cards

**Standard Card**
```
Border radius: lg (24px)
Background: Midnight Rose #2D1B3D (dark) / Ivory #FAF0E8 (light)
Shadow: Level 1
Padding: 20px
Border: 1px solid rgba(196,104,122,0.1)
```

**Featured / Hero Card**
```
Border radius: 2xl (40px)
Background: gradient or glassmorphism
Shadow: Level 2
Padding: 24px
```

### 3.6 Avatars

```
Sizes: 32px, 40px, 48px, 64px, 96px
Border radius: full
Ring (active/online): 2px solid Dusty Rose, 2px offset
Ring (We're Good): 2px solid Sage Whisper, 2px offset
Default fallback: Gradient background (Velvet Crimson → Dusty Rose) + initials
Font: DM Sans SemiBold, Warm Cream
```

### 3.7 Chips / Tags

```
Height: 28px
Border radius: full
Padding: 6px 12px
Font: DM Sans Medium 12px
Background: color at 15% opacity
Border: 1px solid color at 40% opacity
Text: matching color at 100%
```

### 3.8 Dividers

```
1px height
Background: linear gradient (transparent → Divider Dark → transparent)
Horizontal margin: 24px
```

### 3.9 Loading States

**Shimmer**
```
Base: card background color
Shimmer: gradient sweep from left to right
Colors: rgba(196,104,122,0.05) → rgba(196,104,122,0.15) → rgba(196,104,122,0.05)
Duration: 1.5s, infinite, ease-in-out
```

**Pulse Dot (waiting states)**
```
8px circle, Dusty Rose
Scale animation: 1.0 → 1.4 → 1.0, 1.2s, infinite, ease-in-out
3 dots staggered by 200ms each
```

---

## 04. ANIMATION SYSTEM

All animations must feel **organic, not mechanical**. They breathe. They have weight.
Nothing should snap or jump. Every transition should feel like a sigh or a heartbeat.

### 4.1 Core Animation Values

```
Duration Scale:
  micro     100ms   — state changes (checkbox, toggle)
  quick     200ms   — hover effects, chip selection
  normal    300ms   — page transitions, card reveals
  slow      500ms   — bottom sheet, modal
  emotional 800ms   — Heart open, Hug send, celebration entry
  ceremonial 1200ms — We're Good celebration, onboarding reveals

Easing Curves:
  standard    cubic-bezier(0.4, 0.0, 0.2, 1.0)   — most UI movement
  decelerate  cubic-bezier(0.0, 0.0, 0.2, 1.0)   — elements entering screen
  accelerate  cubic-bezier(0.4, 0.0, 1.0, 1.0)   — elements leaving screen
  spring      cubic-bezier(0.34, 1.56, 0.64, 1.0) — bouncy, playful moments
  breathe     cubic-bezier(0.45, 0.05, 0.55, 0.95) — organic, living animations
```

### 4.2 Page Transitions

**Standard forward navigation:**
New screen slides up 16px + fades in. Old screen fades to 80% opacity.
Duration: 300ms, decelerate curve.

**Back navigation:**
Reverse of above. 250ms, accelerate curve.

**Modal/Bottom sheet entry:**
Slides up from bottom, spring curve, 500ms.
Background dims with a warm overlay: rgba(26,10,46,0.7).

**Celebration overlay (We're Good):**
Scale from 0.92 + fade in, ceremonial 1200ms, decelerate.

### 4.3 Micro-interactions

**Button press:**
scale(0.97) + shadow compress. 100ms micro, spring curve.
Release: scale(1.0) + shadow restore. 200ms, spring curve.

**Card tap:**
scale(0.98) + slight elevation increase. 150ms.
Release + navigate: card fades to 0.8 opacity as new page slides in.

**Chip selection:**
Background color floods in from center. 200ms, standard curve.
Selected chip gets a small scale pop: scale(1.05) then 1.0. Spring curve, 300ms.

**Toggle/Switch:**
Thumb slides with spring curve. Fill follows 50ms behind.

**Input field focus:**
Border color transitions (200ms) + label floats up (150ms).
Glow shadow fades in (300ms).

**Icon button tap:**
Background ripple from touch point. 300ms.

### 4.4 Emotional Animations (Key Moments)

**Heart Opened — Particle Burst:**
On Heart confirmation screen:
12-16 small heart particles (4–8px) burst outward from screen center.
Each takes a random trajectory (360°) with random distances (60–140px).
Each particle fades out over 800ms.
Stagger: all launch within 100ms of each other.
Color mix: Blush, Dusty Rose, Velvet Crimson, Ember Gold.
After burst: one large heart icon (48px) pulses at center.
Pulse: scale 0.8 → 1.2 → 1.0, 600ms, breathe curve.

**Hug Button — Heartbeat:**
Idle state: the Hug button has a slow heartbeat animation.
Scale: 1.0 → 1.06 → 1.0, 1000ms, infinite, breathe curve.
A soft rose glow pulses in sync: 0 → Rose Glow → 0.
On press: button compresses (scale 0.9, 100ms) then expands (scale 1.15, 200ms spring)
then settles (scale 1.0, 150ms).
Followed by a warm ripple radiating outward (like a heartbeat on a monitor).
Ripple: circle grows from button center, starts at button width, grows to 200% + fades.
Duration: 600ms, opacity 0.4 → 0.

**We're Good — Celebration:**
Phase 1 (0–400ms): Both confirmation buttons pulse with Sage Glow.
Phase 2 (400–1200ms): Screen flashes briefly to Sage Whisper at 30% opacity, fades.
Phase 3 (600–1800ms): Confetti burst — 40 particles in Dusty Rose, Ember Gold, Sage Whisper,
Blush. They fall with gravity (accelerating downward), slight horizontal drift.
Phase 4 (800ms): Celebration text fades + slides up: Cormorant Garamond Italic.
"You two worked it out." — fades in letter by letter (stagger 30ms per character).
Phase 5 (1200ms): Memory Jar icon fades in below text.

**Mood Submission:**
On submit: selected mood emoji scales up 1.0 → 1.4, then transitions upward 16px + fades out (300ms).
A soft colored cloud/aura (matching mood color) expands from the emoji position and fades (500ms).
The "sent to partner" confirmation fades in below.

**Onboarding Screen Reveal:**
Each slide: content fades in staggered — headline first (0ms), body (150ms), visual (300ms), CTA (450ms).
Background: subtle particle field — 8–12 tiny dots (2px) floating slowly upward.
Opacity: 0.1–0.3. Speed: very slow, random.

**Partner Mood Update (Home Screen):**
When partner's mood updates in realtime:
Their mood card gets a soft pulse (Rose Glow, 2 pulses at 400ms intervals).
The mood emoji does a small bounce (scale 1.0 → 1.2 → 1.0, spring curve, 400ms).

**Memory Jar Entry:**
On tap into a resolved Heart:
Card expands (not navigates) — scales up from its position to fill the screen.
Feels like opening a locket, not switching pages.
Duration: 400ms, decelerate curve.

---

## 05. SCREEN SPECIFICATIONS

---

### SCREEN 01 — Splash Screen

**Purpose:** Brand moment. 1.5 seconds.

**Background:**
Full screen, Dark mode: Deep Plum #1A0A2E.
A very subtle radial gradient at center: Deep Plum → slightly lighter Midnight Rose.
Noise texture overlay at 4% opacity (film grain feel).

**Content:**
Center of screen — the Heartline wordmark.
Font: Cormorant Garamond SemiBold Italic, 40px, Warm Cream.
Below wordmark: a single thin horizontal line, 48px wide, 1px, Dusty Rose at 60% opacity.
Below line: tagline — "Your relationship, in one place."
Font: DM Sans Light 13px, Text Secondary Dark, letter-spacing 1.5px, UPPERCASE.

**Animation:**
Wordmark fades in: 0 → 1, 600ms, decelerate.
Line draws from center outward: width 0 → 48px, 400ms, starts at 400ms.
Tagline fades in: 0 → 0.7, 300ms, starts at 700ms.
Hold 600ms.
All content fades out: 300ms.
Transition to next screen.

**Decorative:**
Two very faint concentric rings centered on the wordmark.
Ring 1: 200px diameter, 1px stroke, Dusty Rose at 8% opacity.
Ring 2: 320px diameter, 1px stroke, Dusty Rose at 4% opacity.
Both slowly rotate (360° / 60s) in opposite directions.

---

### SCREEN 02 — Onboarding (3 Slides)

**Global:**
Background: Deep Plum #1A0A2E.
Floating particle field: 10 dots, 2px, opacity 0.08–0.15, drifting upward slowly.
Bottom: page indicator dots (6px, Dusty Rose active / 6px Dusty Rose at 30% inactive).
Skip button: top right, DM Sans Medium 14px, Text Secondary Dark.

**Slide 1 — "A space only for you two"**

Visual (top 45% of screen):
Two overlapping circles, 120px diameter each, offset by 40px.
Left circle: gradient fill Velvet Crimson → transparent.
Right circle: gradient fill Dusty Rose → transparent.
Where they overlap: a warm Blush glow.
Both circles have a soft pulse animation (heartbeat cadence, 1.2s).

Headline: "A space only for you two."
Font: Cormorant Garamond SemiBold Italic, 38px, Warm Cream, centered.
Line height: 1.2.

Body: "Not WhatsApp. Not a diary. A private world built just for your relationship."
Font: DM Sans Regular 15px, Text Secondary Dark, centered, line-height 1.65.
Max width: 80% of screen.

---

**Slide 2 — "Say what you feel, gently"**

Visual:
A stylized heart outline (not filled, just outline) — 100px.
Stroke: 2px gradient from Velvet Crimson → Dusty Rose.
Inside the heart: small text in Cormorant Garamond Italic 14px, Blush:
"I've been feeling a little lonely."
This text appears with a typewriter effect (one character per 40ms).
Below it: a small dot indicator suggesting a message was sent.

Headline: "Say what you feel, gently."
Font: Cormorant Garamond SemiBold Italic, 38px, Warm Cream.

Body: "Open a Heart when something is bothering you. No confrontation. Just honesty."
Font: DM Sans Regular 15px, Text Secondary.

---

**Slide 3 — "Built for the long run"**

Visual:
A simple Memory Jar illustration — 80px wide, 100px tall.
Rounded jar shape, outlined in Dusty Rose.
Inside: 4–5 tiny glowing dots in different feeling tag colors.
A warm golden glow emanates from the jar opening.
Gentle floating animation: jar bobs up and down 4px, 2s ease-in-out, infinite.

Headline: "Every moment you work through, saved."
Font: Cormorant Garamond SemiBold Italic, 38px, Warm Cream.

Body: "Your Memory Jar holds every Heart you've resolved together. Look back anytime."
Font: DM Sans Regular 15px, Text Secondary.

CTA: "Get Started" — Primary Button, full width, bottom of screen.

---

### SCREEN 03 — Auth Screen (Sign Up / Sign In)

**Background:**
Dark mode: Deep Plum.
Top 40%: decorative — very faint rose mandala pattern at 6% opacity (SVG geometric).
Or: a soft radial gradient bloom at top center in Velvet Crimson at 10%.

**Content Layout (bottom 60% of screen):**

Title: "Welcome to Heartline"
Font: Cormorant Garamond SemiBold Italic, 34px, Warm Cream.
Below: "Sign in to your space." — DM Sans Regular 14px, Text Secondary.

Email input field.
Password input field (with show/hide toggle — eye icon, Dusty Rose).
"Forgot password?" — Ghost Button, right-aligned, below password.

Primary button: "Continue" — full width.

Divider: "— or —" centered, Text Secondary, DM Sans Regular 13px.

Google OAuth button: Secondary Button style, full width, Google logo (24px) left-aligned.
Label: "Continue with Google"

Toggle at bottom: "Don't have an account? Sign up" — DM Sans Regular 14px, Text Secondary.
"Sign up" underlined in Dusty Rose.

---

### SCREEN 04 — Profile Setup

**Layout:**
Single scroll. All fields visible without scroll if possible.

Top: Avatar picker — 96px circle, centered.
Default: gradient circle (Velvet Crimson → Dusty Rose) with initials.
Tap: bottom sheet with camera / gallery option.
Upload state: circular progress ring around avatar (Dusty Rose, 2px stroke).

Title: "How should {partner name} know you?"
Font: Cormorant Garamond Regular Italic, 28px, Warm Cream.

Fields:
- Display name (required)
- Avatar (optional — already covered above)

Love Language selection (below fields):
Section label: "Your love language" — DM Sans Medium 13px, Text Secondary, letter-spacing 0.3px, UPPERCASE.
5 cards, vertically stacked, 64px height each, card style.
Left: icon (20px, Dusty Rose). Center: label DM Sans Medium 15px.
Right: radio button (custom — filled circle in Dusty Rose gradient when selected).
Selected card: border becomes Dusty Rose, background gets rose tint at 8%.

Skip link: "I'll set this later" — Ghost Button, centered, below cards.

Primary CTA: "Save and Continue"

---

### SCREEN 05 — Couple Linking (Create)

**Concept:** This screen is a ceremony. Linking is a moment.

**Background:** Deep Plum. A soft radial glow centered on screen — Velvet Crimson at 12%, 300px radius.

**Visual (top third):**
Two avatar circles (96px each) — left is the user, right is a placeholder ("?").
They sit 40px apart. A subtle dashed line connects them (Dusty Rose at 40%, 1px, dashes 4px gap 4px).
The placeholder circle pulses gently (scale 1.0 → 1.05, breathe animation).

**Content:**
Label: "Create your space"
Font: Cormorant Garamond SemiBold Italic, 32px, Warm Cream, centered.

Body: "Share this code with your partner. Once they join, your space opens."
Font: DM Sans Regular 14px, Text Secondary, centered.

**Invite Code Display:**
Large code display card — glassmorphism style.
Height: 80px, full width minus 32px margin.
Code: DM Sans SemiBold 36px, Warm Cream, letter-spacing 10px, centered.
Below code: Caption text "Expires in 72 hours" — Text Secondary.

Buttons:
"Share Code" — Primary Button (opens native share sheet)
"Copy Link" — Secondary Button

Both full width, stacked vertically with 12px gap.

---

### SCREEN 06 — Couple Linking (Waiting)

**Background:** Deep Plum. Same radial glow.

**Visual:**
Same two circles — but now the right circle shows the partner's initial/avatar slot.
The dashed line between them has a traveling dot animation —
a small Dusty Rose dot travels from left circle to right circle, loops, 2s infinite.
Feels like a heartbeat reaching out.

**Content:**
"Waiting for your person..."
Font: Cormorant Garamond Regular Italic, 28px, Warm Cream, centered.

Below: Pulse dots (3 × 8px dots, rose, staggered animation).

"Share the code again" — Ghost Button, centered.

---

### SCREEN 07 — Couple Linked (Celebration)

**This is a moment. Give it space.**

**Background:** Deep Plum → momentary flash of Dusty Rose at 20% → back to Deep Plum.

**Visual:**
The two avatar circles slide together and gently overlap (an intersection, like the onboarding visual).
On intersection: Blush glow pulses.
Below them: a small infinity symbol (∞) draws itself in Dusty Rose (SVG stroke animation, 800ms).

**Content:**
"You're together 💛"
Font: Cormorant Garamond SemiBold Italic, 42px, Warm Cream, centered.

"{Partner name} is now in your space."
Font: DM Sans Regular 16px, Text Secondary, centered.

Confetti (subtle — not overwhelming): 20 small particles, same celebration system as We're Good.

CTA: "Open your space" — Primary Button, appears at 1200ms with fade-in.

---

### SCREEN 08 — Home Screen

**The emotional dashboard. Should feel like entering your shared room.**

**Background:** Deep Plum. Subtle noise texture at 3%.
Top right: a very faint decorative bloom — Dusty Rose radial gradient, 200px, 8% opacity.

**Top Section — Couple Header (full width card):**
Height: 100px. Glassmorphism card.
Left: User avatar (48px).
Center: "Your Space" — Cormorant Garamond Regular Italic, 22px, Warm Cream.
Below center: couple linked duration — "Together for 8 months" — DM Sans Regular 12px, Text Secondary.
Right: Partner avatar (48px).
Between avatars: small animated connection line (same traveling dot as waiting screen, very subtle).

**Partner Mood Section:**
Below header, 16px gap.
Card, standard style, 72px height.
Left: Partner avatar (40px) + mood emoji (24px, overlaid bottom-right of avatar).
Center: "{Partner name} is feeling calm today" — DM Sans Regular 14px, Warm Cream.
If mood not submitted: "{Partner name} hasn't checked in yet" — italic, Text Secondary.
Right: timestamp — Caption, Text Secondary.
Realtime update: when mood changes, card pulses Rose Glow twice.

**Open Hearts Section:**
Section label: "Open Hearts" — DM Sans Medium 13px, Text Secondary, UPPERCASE, letter-spacing 0.4px.
Right: count badge if > 0 — small pill, Velvet Crimson background, Warm Cream text.

If no open hearts:
Empty state card — glassmorphism style, 80px height.
Centered italic text: "Nothing open right now. Things are good 💚"
Font: Cormorant Garamond Regular Italic, 16px, Text Secondary.

If open hearts exist:
HeartCard(s) — see component spec below.

**Open a Heart CTA:**
Full width, primary button.
Label: "Open a Heart"
Below button: very small caption — "Share what's on your mind, gently." — Caption, Text Secondary, italic, centered.

**Quick Actions Row:**
Horizontal row of 4 icon buttons.
Icons: Appreciation Drop | Memory Jar | Mood | Us Time
Labels below icons: Caption text, Text Secondary.
Equally spaced. 64px each (including label).

---

### SCREEN 09 — Heart Raise Flow

#### Step 1 of 2 — Feeling Selection

**Background:** Deep Plum.
Top: back arrow + "Open a Heart" title (DM Sans Medium 18px).

Prompt text: "What are you feeling right now?"
Font: Cormorant Garamond Regular Italic, 28px, Warm Cream, centered.
Margin top: 32px.

Sub-text: "Choose the one that fits most."
Font: DM Sans Regular 14px, Text Secondary, centered.

**Feeling Cards — 2-column grid, 3 rows:**
Each card: height 88px, border-radius lg (24px), background Midnight Rose.
Left 8px: vertical accent bar in the feeling's color.
Center: feeling emoji (28px) + feeling label (DM Sans Medium 15px, Warm Cream).
Below label: a short 1-line descriptor in DM Sans Regular 12px, Text Secondary, Italic.
  - Ignored: "Like you weren't heard"
  - Overwhelmed: "Too much at once"
  - Unheard: "Like your words got lost"
  - Lonely: "Even when we're together"
  - Anxious: "Something feels off"
  - Hurt: "Something stung"

Selected state: card border becomes the feeling color (1.5px solid), background gets feeling color at 10%.
Accent bar expands slightly (10px wide vs 8px).
Scale: 1.02 spring animation on selection.

Next button: appears with fade-in 200ms after selection. Full width primary button. "Next →"

---

#### Step 2 of 2 — Note (Optional)

**Top:** Back arrow. Step indicator: "2 of 2" — DM Sans Regular 12px, Text Secondary.

Feeling tag: shown as a chip at top — reminder of selection.

Prompt: "Want to say anything?"
Font: Cormorant Garamond Regular Italic, 28px, Warm Cream.

Sub-text: "Optional. Even just one sentence helps."
DM Sans Regular 14px, Text Secondary, Italic.

Textarea input:
Min height: 120px. Border radius md. Multiline.
Placeholder (Italic): "I've been feeling this when..."
Character counter: appears at 400+ chars. "376 / 500"

Below textarea:
AI assist chip (Lavender Dusk):
Icon: sparkle (12px) + "Help me put it into words" — DM Sans Medium 13px.
On tap: opens a small modal with AI-guided prompts (3 sentence starters to choose from).

CTA: "Send to {partner name}" — Primary Button, full width.
Below CTA: Ghost text "They'll receive a gentle notification." — Caption, Text Secondary, centered, Italic.

---

### SCREEN 10 — Heart Sent Confirmation

**A moment of vulnerability completed. Honour it.**

**Background:** Deep Plum. Heart particle burst animation (as defined in Section 4.4).

**Content (center of screen):**
Icon: Large heart outline (64px), Dusty Rose, stroke-only.
Fills with color over 800ms (flood fill animation, bottom to top).

Headline: "Your heart is open."
Font: Cormorant Garamond SemiBold Italic, 36px, Warm Cream.
Appears at 600ms with fade+slide-up.

Sub-text: "{Partner name} will receive a gentle nudge."
Font: DM Sans Regular 15px, Text Secondary.
Appears at 800ms.

Bottom: "Back to home" — Ghost Button. Appears at 1200ms.

---

### SCREEN 11 — Heart Card Component

**Used on Home screen, Memory Jar, and notifications.**

```
Container: Standard Card (24px border radius, Midnight Rose bg)
Left accent bar: 6px wide, full height, feeling tag color, border-radius left side only
Padding: 16px (excluding left bar)

Row 1:
  Left: Feeling Tag Chip (see chip spec, feeling color)
  Right: Timestamp — Caption, Text Secondary

Row 2 (if note exists):
  Note preview — DM Sans Regular 14px, Warm Cream, max 2 lines, ellipsis
  Line height 1.6.

Row 3:
  Left: status indicator
    Open: pulsing Dusty Rose dot (6px) + "Waiting for hug" — Caption, Text Secondary
    Hugged: Dusty Rose check + "Hugged" — Caption, Dusty Rose
    In Resolution: speech bubble icon + "In resolution" — Caption, Text Secondary
    Resolved: Sage check + "Resolved" — Caption, Sage Whisper
  Right: raised by avatar (24px circle)

States:
  Open: card has a very subtle Dusty Rose glow on border (Rose Glow at 0.3)
  Resolved: card fades slightly (0.85 opacity), accent bar becomes Sage Whisper
```

---

### SCREEN 12 — Resolution Space

**This is the most emotionally important screen in the app.**
**It must feel like a safe room — quiet, intimate, serious.**

**Background:** Deep Plum. No decorative elements. Clean.
A single 1px horizontal line at the top of the message area — Divider Dark.

**Top Card (pinned, not scrolling):**
Glassmorphism card, 80px height.
Left: Feeling tag chip. Center: "{Name} feels {feeling}" — DM Sans Medium 15px, Warm Cream.
Right: compact timestamp.
Below: note text (if exists) — italic, DM Sans Regular 14px, Text Secondary. Max 2 lines + expand.

**Hug Section (shown before hug is sent — partner side only):**
Centered, fills space between top card and keyboard.
Text: "Start with a hug."
Font: Cormorant Garamond Regular Italic, 24px, Text Secondary, centered.

Hug Button (centered):
110px diameter, fully circular.
Background: radial gradient Velvet Crimson center → Dusty Rose edge.
Shadow: Level 2 + heartbeat glow animation.
Inside: custom hug icon (heart with arms) — 40px, Warm Cream.
Label below: "Send a hug" — DM Sans Medium 14px, Dusty Rose.
Heartbeat pulse animation: as defined in Section 4.4.

**Message Thread (after hug):**
Scrollable list of messages.

Outgoing message bubble:
Border radius: 20px 20px 4px 20px.
Background: gradient Velvet Crimson → Dusty Rose.
Text: DM Sans Regular 15px, Warm Cream.
Padding: 12px 16px.
Align: right. Max width: 72% of screen.

Incoming message bubble:
Border radius: 20px 20px 20px 4px.
Background: Midnight Rose + 1px border Divider Dark.
Text: DM Sans Regular 15px, Warm Cream.
Align: left. Max width: 72% of screen.

AI Suggestion chip (appears once, after hug):
Full width, glassmorphism, Lavender Dusk border.
Left: sparkle icon, Lavender Dusk. Text: suggestion content, DM Sans Regular 14px, italic.
Below text: "Tap to use this · Dismiss" — Caption, Lavender Dusk.
Fades out after dismiss or after 2 messages exchanged.

Timestamp dividers between message clusters:
Caption text, Text Secondary, centered, italic. E.g. "Just now" / "2 minutes ago".

**Bottom bar:**
Message input field (height 48px, border radius full).
Right of input: send icon button.
Above input (pinned): "We're Good" button — Secondary Button style, full width, Sage Whisper border + text.

---

### SCREEN 13 — We're Good Confirmation

**Two steps — both partners must confirm.**

**Step 1 (initiating partner):**
Bottom sheet (xl border radius top corners).
Background: Midnight Rose.

Icon: Two overlapping hearts, 48px, outlined, Sage Whisper.
Title: "Ready to close this?"
Font: Cormorant Garamond Regular Italic, 26px, Warm Cream.
Body: "Both of you need to confirm. This Heart will go into your Memory Jar."
Font: DM Sans Regular 14px, Text Secondary.
CTA: "Yes, we're good 💚" — Primary Button (Sage Whisper gradient instead of rose).
Secondary: "Not yet" — Ghost Button.

**Step 2 (waiting):**
Same bottom sheet stays open.
Replace content: "{Partner name} has confirmed. Are you ready?"
CTA: "We're good 💚"

**Celebration (both confirmed):**
Full screen takeover. As defined in Section 4.4 — We're Good celebration.

---

### SCREEN 14 — Memory Jar

**A gallery of intimacy. Should feel like looking through old photographs together.**

**Background:** Deep Plum.

**Header:**
Decorative: small Memory Jar illustration (40px) — outlined, golden glow.
Title: "Memory Jar"
Font: Cormorant Garamond SemiBold Italic, 36px, Warm Cream.
Sub: "{count} hearts resolved together" — DM Sans Regular 13px, Text Secondary, Italic.

**Filter Row:**
Horizontal scroll chips: All | Ignored | Overwhelmed | Unheard | Lonely | Anxious | Hurt
Chip style: standard chip spec. No-fill by default, filled when active.

**Entry List:**
Vertical scroll. Cards staggered on entry (each card slides up 8px + fades in, stagger 60ms).

Each Memory Jar Card:
Height: 96px.
Left: vertical accent bar (feeling color, 6px).
Content:
  Row 1: Feeling chip (small) + date resolved (Caption, Sage Whisper — "Resolved April 3").
  Row 2: Note preview — DM Sans Regular 14px, Warm Cream, 2 lines max, Italic.
  Row 3: "{X} messages exchanged" — Caption, Text Secondary.

On tap: card expands to full screen (as described in animation section).

**Empty State:**
Jar illustration (80px) centered.
Title: "Your jar is empty."
Body: "Every Heart you resolve together lives here. Start one."
Font: Cormorant Garamond Regular Italic, centered.

---

### SCREEN 15 — Memory Jar Detail

**The expanded view of a single resolved Heart.**

**Header:**
Back button top left.
Feeling chip + date — centered.

**Content:**
Note card (if note exists):
Glassmorphism card. Left-aligned quote mark (Cormorant Garamond, 64px, Dusty Rose at 30%).
Note text: Cormorant Garamond Regular Italic, 18px, Warm Cream, line-height 1.7.

Divider. Label: "Your resolution" — DM Sans Medium 12px, Text Secondary, UPPERCASE.

Message thread (read-only, same bubble styles as Resolution Space).
Timeline: messages appear with very subtle entry animation (fade, no slide).

Bottom: Sage Whisper tag "💚 Resolved on {date}" — centered, Caption.

---

### SCREEN 16 — Daily Mood Check-in

**Background:** Deep Plum.

**Header:**
Title: "How are you feeling?"
Font: Cormorant Garamond Regular Italic, 30px, Warm Cream, centered.
Sub: "Once a day · {Partner name} will see this."
Font: DM Sans Regular 14px, Text Secondary, centered.

**Mood Grid (2-column, 3 rows with last row centered — 5 options):**

Each Mood Card: 80px height, border radius lg.
Background: Midnight Rose.
Center: mood emoji (36px) + mood label (DM Sans Medium 14px, Warm Cream).
Below label: short descriptor (DM Sans Regular 11px, Text Secondary, Italic).
  - 😄 Joyful: "Feeling bright and full"
  - 😌 Calm: "Settled and at peace"
  - 😰 Anxious: "A little on edge"
  - 😔 Sad: "Carrying something heavy"
  - 😤 Overwhelmed: "Too much right now"

Selected state:
Card scales to 1.04 (spring, 200ms).
Border: 1.5px solid matching accent color.
Background tint: accent color at 10%.
Emoji scales to 1.3 (spring, 250ms).
Colored aura behind emoji: matching color at 25%, 48px radius, blurred.

**Optional note field:**
Appears with slide-down animation after mood selection.
Placeholder: "Anything you want {partner name} to know?" — Italic.
Max: 200 chars. Small and unobtrusive.

**CTA:** "Share with {partner name}" — Primary Button.

Already submitted state:
Replace entire content with:
Large mood emoji (64px) centered.
"You checked in today 💛" — Cormorant Garamond Italic, 24px, Warm Cream.
"{Partner name} can see how you're feeling." — DM Sans Regular 14px, Text Secondary.

---

### SCREEN 17 — Appreciation Drop Compose

**Background:** Deep Plum.

**Decorative:** Top 30% — very subtle illustration of an envelope, outlined, Dusty Rose at 15%.

**Header:**
"Leave something for {partner name}"
Font: Cormorant Garamond Regular Italic, 28px, Warm Cream, centered.

**Textarea:**
Large, full width, min-height 160px. Border radius md.
Placeholder: "I noticed something today that made me love you more..."
Font: Cormorant Garamond Regular Italic, 16px — the text feels like a letter.
Character counter: 500 max.

**Send button:** "Drop it 💌" — Primary Button.

---

### SCREEN 18 — Gratitude Wall

**Background:** Deep Plum.
**Header:** "Gratitude Wall" — Cormorant Garamond SemiBold Italic, 32px.
Sub: "All the little things you've said to each other."

**Card list (vertical scroll):**
Gratitude Card:
Background: slight gradient from Midnight Rose to Deep Plum.
Large decorative quote mark: Cormorant Garamond, 80px, Velvet Crimson at 20%, top-left.
Drop text: Cormorant Garamond Regular Italic, 16px, Warm Cream, line-height 1.75.
Bottom: sender avatar (32px) + sender name (DM Sans Medium 13px) + date (Caption).
Cards alternate subtle left/right border accent.

---

### SCREEN 19 — Love Language Profile Screen

**Background:** Deep Plum.

**Top Section — Partner comparison:**
Two columns, user vs partner.
Each column: avatar (48px) + name (DM Sans Medium 14px) + love language chip.
If partner not yet set: "Not set yet" — Text Secondary, Italic.
Centered between columns: small "vs" or "+" label.

**Bottom Section — Selector:**
Title: "Your love language"
5 option cards (same as profile setup, see Screen 04).
Each card: Left icon + Name + 1-line description.
Selected: filled accent. Unselected: outlined.

Save button: "Update" — Primary Button.

**Informational strip (below selected option):**
Expands with slide-down animation after selection.
1-sentence tip: "People who feel loved through {language} appreciate..."
DM Sans Regular 13px, Text Secondary, Italic.

---

### SCREEN 20 — Profile & Settings

**Background:** Deep Plum.

**Top Section — User card:**
96px avatar, centered.
Display name: Cormorant Garamond Regular 28px, Warm Cream, centered.
"Edit profile" — Ghost Button, small, centered.

**Partner card:**
Standard card. Shows partner name, avatar, love language. Read-only.
"Your space since {date}" — Caption, Text Secondary, Italic, centered.

**Settings list:**
Section dividers with labels (DM Sans Medium 12px, Text Secondary, UPPERCASE, letter-spacing 0.4px).
Settings rows: 56px height, border-bottom divider.
Label (DM Sans Regular 15px, Warm Cream) + right: toggle/chevron/value.
Sections: Notifications | Appearance | Privacy | Subscription | About

**Danger zone (bottom):**
"Disconnect from {partner name}" — Ghost text, Error Blush color.
Confirmation requires both partners.

---

## 06. COMPONENT LIBRARY SUMMARY (for Figma)

Create the following components in Figma with all variants:

```
Atoms:
  Color Styles (all from Section 2.1)
  Text Styles (all from Section 2.2)
  Icon Set (24 icons, outlined, 1.5px stroke, Dusty Rose)
  Avatar (5 sizes, 3 states: default, active, ring)
  Badge (count, dot, status)

Molecules:
  Button/Primary (default, pressed, disabled, loading)
  Button/Secondary (default, pressed, disabled)
  Button/Ghost (default, pressed)
  Button/Icon (default, pressed)
  Input/Single Line (empty, focused, filled, error)
  Input/Multiline (empty, focused, filled)
  Chip/FeelingTag (each feeling, selected/unselected)
  Chip/Filter (default, selected)
  Card/Standard (empty, with content)
  Card/Glass (light, dark)
  Card/HeartCard (open, hugged, in-resolution, resolved)
  Card/MoodCard (each mood, selected/unselected)
  Card/GratitudeCard
  Card/MemoryJarEntry
  MessageBubble/Outgoing
  MessageBubble/Incoming
  HugButton (idle with animation spec, pressed, sent)
  NavBar (all 5 states)
  TopAppBar (with title, with back, transparent, frosted)
  PageIndicator (3 dots variants)
  Divider

Organisms:
  CoupleHeader
  PartnerMoodBanner
  OpenHeartSection (empty, with cards)
  QuickActionsRow
  ResolutionTopCard
  AIsuggestionChip
  WeAreGoodSheet (step 1, step 2)
  MoodGrid
  SettingsRow
  LoveLanguageCard (each language, selected/unselected)

Templates:
  ScreenTemplate/Dark (with nav, without nav, with back)
  ScreenTemplate/Light
  BottomSheetTemplate
  CelebrationOverlay
```

---

## 07. DARK MODE (PRIMARY) / LIGHT MODE

Dark mode is the primary experience. This app lives at night — in quiet moments,
in bed, when you can't sleep, when something is on your mind.

**Dark Mode:** All specs above are dark mode.

**Light Mode Overrides:**
```
Background:      Warm Cream #FDF6F0
Surface:         Ivory #FAF0E8
Surface elevated: White #FFFFFF
Text Primary:    Deep Plum #1A0A2E
Text Secondary:  #6B4A5A
Card background: Ivory
Dividers:        rgba(196,104,122,0.15)
Nav bar bg:      rgba(253,246,240,0.9) + blur
Shadows:         0 4px 16px rgba(26,10,46,0.08)
```

Primary brand colors (Velvet Crimson, Dusty Rose, Blush) remain unchanged in both modes.

---

## 08. ICONOGRAPHY GUIDE

Icon style: **Outlined, rounded caps, 1.5px stroke, 24px grid.**
Never filled icons (except navigation active state — use slightly thicker stroke: 2px).

Custom icons needed for Heartline (not in standard libraries):
```
heart-with-arms     — the Hug icon (heart shape with two small arms extending)
memory-jar          — rounded jar with tiny hearts inside
feeling-ignored     — person in a crowd, slightly faded
feeling-overwhelmed — wavy lines around a figure
feeling-unheard     — speech bubble with a crossed sound wave
feeling-lonely      — single figure, small, lots of empty space
feeling-anxious     — triangle/lightning within a circle
feeling-hurt        — cracked heart (not broken — cracked)
open-heart          — heart with small opening at top (like unlocked)
```

Standard icons (Lucide or similar):
```
home, heart, smile-face, calendar, user, settings,
arrow-left, arrow-right, x, check, send, camera,
bell, lock, eye, eye-off, share, copy, sparkles,
plus, minus, chevron-right, chevron-down, message-circle
```

---

## 09. EMPTY STATES

Every empty state should feel **poetic, not generic.**

```
No open Hearts:
  Icon: open-heart (48px, Dusty Rose at 50%)
  Title: "All is well 💚"
  Body: "No open hearts right now. Things feel good."

Memory Jar empty:
  Icon: memory-jar (64px, Ember Gold at 60%)
  Title: "Your jar is waiting."
  Body: "Every heart you resolve together will live here."

No mood from partner:
  Icon: smile-face (40px, Text Secondary)
  Body: "{Name} hasn't checked in yet today."

No appreciation drops:
  Icon: envelope (48px, Lavender Dusk at 60%)
  Title: "Nothing yet."
  Body: "Be the first to leave something."

No Us Time plans:
  Icon: calendar (48px, Ember Gold at 60%)
  Title: "Nothing planned."
  Body: "What do you two want to do?"
```

All empty state text: Cormorant Garamond Regular Italic for title, DM Sans Regular for body.
Centered. Generous vertical padding.

---

## 10. MOTION PRINCIPLES SUMMARY (for Figma Make AI)

When defining interactions and prototypes in Figma:

1. **Nothing is instant** — minimum 200ms on all transitions.
2. **Everything breathes** — idle states have gentle animations (heartbeat, floating, pulsing).
3. **Emotional moments get ceremony** — Heart opened, Hug sent, We're Good deserve 800ms+.
4. **Spring curves for positive moments** — selection, success, celebration.
5. **Decelerate curves for entries** — content appearing, sheets opening.
6. **Never use linear easing** — it feels robotic and kills the emotional tone.
7. **Haptics (annotated for dev):**
   - Hug button tap: medium impact
   - We're Good confirm: heavy impact (once)
   - Feeling tag selection: light impact
   - Message sent: light impact
   - Heart raise confirm: medium impact

---

*This document is the single source of truth for Heartline's UI/UX.*
*Every screen, every color, every animation defined here serves one goal:*
*making two people feel closer.*
