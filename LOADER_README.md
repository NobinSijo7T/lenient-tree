# Modern Page Loader with Framer Motion

## Overview
A sleek, professional loading screen built with Framer Motion featuring smooth animations and modern design aesthetics.

## Features

### 1. **Smooth Animations**
- Framer Motion powered animations for buttery smooth 60fps performance
- Animated gradient background that shifts colors
- Pulsing concentric circles with glow effects
- Animated loading bar with shimmer effect
- Bouncing dots animation
- Floating particle effects

### 2. **Modern Design**
- Clean, minimalist aesthetic
- Purple to cyan gradient theme (#8a2be2 to #00bfff)
- Glassmorphism effects with glows and shadows
- Professional typography with Orbitron font
- No "AI-generated" look - hand-crafted design

### 3. **Brand Integration**
- "lenient tree" brand text with animated gradient
- Smooth text reveal animation
- Consistent with site's color scheme

### 4. **Performance**
- Lightweight - uses existing Framer Motion dependency
- GPU-accelerated animations
- Prevents scroll during loading
- Clean unmount with no memory leaks
- Shows for 2.5 seconds then smoothly fades out

## Files

### New Files:
1. `components/PageLoader.tsx` - Main loader component
2. `components/PageLoader.module.css` - Loader styles

### Modified Files:
1. `app/layout.tsx` - Integrated PageLoader

### Removed Files:
1. `components/Loader.tsx` - Old loader (deleted)
2. `components/Loader.module.css` - Old styles (deleted)
3. `components/MagicRings.tsx` - Old component (deleted)
4. `components/MagicRings.css` - Old styles (deleted)

## Animation Details

### 1. **Concentric Circles**
- 3 circles that scale and fade in sequence
- Staggered animation with 0.4s delay between each
- Purple/cyan gradient borders with glow effects

### 2. **Brand Text**
- Animated gradient that moves across the text
- Smooth fade-in from bottom
- Drop shadow with glow effect

### 3. **Loading Bar**
- Fills from 0% to 100% over 2.3 seconds
- Shimmer effect that moves across the bar
- Glowing purple/cyan gradient

### 4. **Loading Dots**
- 3 dots that bounce up and down
- Staggered animation for wave effect
- Gradient colors with glow

### 5. **Particles**
- 20 floating particles across the screen
- Random positions and timing
- Subtle fade in/out effect

### 6. **Background**
- Animated radial gradient that moves around
- 8-second loop for smooth, subtle movement
- Purple and cyan accent colors

## Customization

### Change Duration:
Edit `PageLoader.tsx`, line 13:
```typescript
setTimeout(() => {
  setIsLoading(false);
}, 2500); // Change to desired milliseconds
```

### Change Colors:
Edit `PageLoader.module.css`:
- Purple: `#8a2be2`
- Cyan: `#00bfff`
- Background: `#0a0a1a` to `#1a1a2e`

### Adjust Animation Speed:
Edit transition durations in `PageLoader.tsx`:
- Circles: `duration: 2`
- Loading bar: `duration: 2.3`
- Dots: `duration: 1.2`

## Browser Compatibility
- Works on all modern browsers
- Fully responsive (mobile, tablet, desktop)
- Smooth 60fps animations
- No external dependencies beyond Framer Motion

## Performance Notes
- Uses CSS transforms for GPU acceleration
- Framer Motion optimizes animations automatically
- Prevents body scroll during loading
- Clean cleanup on unmount
- Minimal bundle size impact

## Responsive Design
- Desktop: Large circles (300px), full brand text
- Tablet: Medium circles (250px), adjusted spacing
- Mobile: Small circles (200px), compact layout
- All text scales with viewport using clamp()

