# 🎨 Visual Optimization Guide

## ✨ **What's Been Optimized**

### **Glass-Morphism Design**

All cards now feature:

- Semi-transparent backgrounds (95% opacity)
- Backdrop blur for modern glass effect
- Subtle borders for elegant separation
- Smooth hover transitions

### **Background Image Support**

Pages now support background images with:

- Gradient overlays for text readability
- Fixed parallax effect
- Graceful fallback to gradients

### **Text Readability**

- Text shadows on headings over images
- High-contrast color combinations
- White/light overlays on background images

---

## 📸 **Adding Background Images**

### **Step 1: Create Images Directory**

```bash
mkdir -p static/images
```

### **Step 2: Add These Images**

| Filename                 | Purpose              | Recommended Theme               |
| ------------------------ | -------------------- | ------------------------------- |
| `hero-bg.jpg`            | Hero/Passcode page   | Coastal sunset, ocean waves     |
| `rsvp-bg.jpg`            | RSVP form background | Soft beach, elegant texture     |
| `wedding-details-bg.jpg` | Timeline section     | Great Ocean Road, cliffs        |
| `venue-bg.jpg`           | Venue info section   | Seacroft Estate, coastal estate |

### **Step 3: Image Requirements**

- **Format**: JPG or WebP
- **Size**: < 500KB each (optimize first!)
- **Dimensions**: 1920x1080 or higher
- **Orientation**: Landscape

### **Image Sources (Free & High-Quality)**

- [Unsplash](https://unsplash.com) - Search: "ocean coastline australia"
- [Pexels](https://pexels.com) - Search: "great ocean road victoria"
- [Pixabay](https://pixabay.com) - Search: "elegant wedding venue"

### **Optimization Tools**

- [TinyPNG](https://tinypng.com) - Compress images
- [Squoosh](https://squoosh.app) - WebP conversion
- [ImageOptim](https://imageoptim.com) - Mac app

---

## 🎨 **Current Color Palette**

### **Primary Colors**

- **Ocean Blue**: `hsl(200, 45%, 33%)` - #2C5F7C
- **Ocean Light**: `hsl(198, 50%, 65%)` - #7AB8D4
- **Secondary**: `hsl(200, 25%, 55%)` - #5A8AA0

### **Background Colors**

- **Primary BG**: Warm beige gradient
- **Card BG**: White with 95% opacity + backdrop blur
- **Overlay**: Light gradients (90-95% opacity)

---

## 🚀 **Without Images (Current State)**

The site uses elegant gradient backgrounds as fallbacks:

- Warm beige → peachy tones (hero)
- Light blue → ocean tones (sections)
- White → soft gray (cards)

**It looks great right now!** Background images are optional enhancements.

---

## 🎯 **Next Steps for Maximum Impact**

### **Immediate (No Images Needed)**

✅ Glass-morphism cards  
✅ Smooth animations  
✅ Readable text over gradients  
✅ Mobile-responsive design

### **With Images (Enhanced)**

1. Add 4 curated background images
2. Run through TinyPNG compression
3. Drop in `/static/images/`
4. Refresh browser - automatic!

---

## 💡 **Tips for Perfect Look**

### **Image Selection**

- Choose **soft, slightly blurred** backgrounds
- Avoid busy patterns or faces
- Prefer **horizon/coastal scenes**
- Match the elegant, romantic theme

### **Color Coordination**

- Images should have **blues, beiges, or warm tones**
- Avoid harsh reds, neons, or dark images
- Test with white text overlay

### **Testing**

1. View on desktop and mobile
2. Check text readability
3. Verify load times < 3 seconds
4. Test with/without images

---

## 🎨 **Custom Utility Classes**

Now available in your project:

```svelte
<!-- Glass-morphism -->
<div class="glass-card">Content</div>
<div class="glass-card-light">Lighter variant</div>

<!-- Text shadows for readability -->
<h1 class="text-shadow-lg">Large shadow</h1>
<p class="text-shadow">Medium shadow</p>

<!-- Background overlays -->
<section class="bg-overlay">
  <!-- Light overlay over background -->
</section>

<section class="bg-overlay-dark">
  <!-- Dark overlay (for light text) -->
</section>

<!-- Soft gradients -->
<div class="gradient-elegant">Warm wedding tones</div>
<div class="gradient-ocean">Ocean blues</div>
```

---

## 📱 **Mobile Optimization**

All backgrounds are:

- **Fixed** on desktop (parallax effect)
- **Scroll** on mobile (better performance)
- **Overlay-protected** (text always readable)

---

## ✅ **What's Done**

- ✅ Updated Card component with glass-morphism
- ✅ Added background image support to all sections
- ✅ Enhanced text contrast with shadows
- ✅ Removed unused Select component
- ✅ Added utility classes for custom styling
- ✅ Mobile-responsive design maintained
- ✅ Graceful fallbacks to gradients

**Your wedding website is now optimized for a beautiful, modern, and cute aesthetic!** 🎉
