# Schnei Documentation: Landing Page Specification

## Introduction
This documentation provides a detailed specification for the Schnei landing page, based on the provided wireframe. Schnei is a subscription billing platform for microbusinesses, branded with the friendly nickname "Julie." The page aims to educate, build trust, and drive conversions.

**Version:** 1.0  
**Date:** October 03, 2025  
**Target Audience:** Microbusiness owners (coaches, freelancers, etc.) struggling with billing.

---

## Page Structure and Flow
The page follows a classic AIDA (Attention, Interest, Desire, Action) flow:
1. **Attention:** Hero grabs immediate interest.
2. **Interest:** Pain points and solutions build empathy and value.
3. **Desire:** Audience fit, social proof, and pricing create aspiration.
4. **Action:** Multiple CTAs guide to sign-up.

**Page Length:** Scrollable, ~5-7 sections; load time <2s.

---

## Detailed Section Breakdown

### 1. Hero Section
- **Purpose:** Immediate value proposition.
- **Layout:** Full-width background (subtle gradient blue/teal); centered text + visual.
- **Assets Needed:**
  - Illustration: Custom vector of dashboard with charts (resolution: 1200x600px).
- **Metrics to Track:** Hero CTA clicks.
- **Accessibility:** Alt text for visual; ARIA labels for button.

### 2. Pain Point Section
- **Purpose:** Validate user struggles.
- **Layout:** Three equal columns on desktop; stacked on mobile.
- **Icons:** Emoji or SVG (e.g., clock for time, dollar for money).
- **Copy Length:** 1-2 sentences per point.
- **Transition:** Smooth fade-in on scroll.

### 3. Solution Section
- **Purpose:** Showcase core benefits.
- **Layout:** Four-card grid (2x2 on desktop).
- **Icons:** Checkmarks or thematic SVGs (e.g., calendar for billing).
- **Details:** Bullet sub-points under each card for deeper info.
- **Integration Note:** Link to full features page for "Learn More" buttons.

### 4. Who It’s For
- **Purpose:** Personalize relevance.
- **Layout:** Horizontal scroll or bullet list with images.
- **Visuals:** 5 small persona avatars (diverse representation).
- **Copy:** One-liner per audience (e.g., "Turn one-off clients into loyal retainers.").

### 5. Social Proof
- **Purpose:** Credibility boost.
- **Layout:** Slider for testimonials; static grid for logos.
- **Content Sourcing:** Use placeholders initially; replace with real quotes post-launch.
- **Testimonial Format:** Quote + name/role + photo (if available).
- **Fallback:** If no real proof, use "Coming soon" or generic stats (e.g., "Join 500+ businesses").

### 6. Pricing Section
- **Purpose:** Transparent conversion driver.
- **Layout:** Two cards with toggle for annual/monthly (future enhancement).
- **Features List:** Bullet points under each tier (e.g., Starter: Basic dashboard; Growth: AI churn predictions).
- **Legal:** Include "Billed annually" if discount applies; link to full TOS.
- **CTA:** Inline "Start Free" per card.

### 7. Final CTA
- **Purpose:** Last-chance conversion.
- **Layout:** Full-width colored section (accent green).
- **Urgency Element:** Optional timer or stat (e.g., "Recover 20% more revenue").

### 8. Footer
- **Purpose:** Navigation and legal.
- **Layout:** Multi-column; centered tagline.
- **Links:** Internal (e.g., /features) and external (privacy policy PDF).
- **Social:** Icons linking to X/Twitter, LinkedIn.

---

## Technical Specifications
- **Framework:** Next.js 14+ with TypeScript.
- **Styling:** Tailwind CSS; responsive breakpoints (sm, md, lg).
- **Animations:** Framer Motion for subtle enters (e.g., fade-up on sections).
- **Analytics:** Integrate Google Analytics or PostHog for CTA tracking.
- **SEO/Performance:**
  - Meta: Title "Schnei: Easy Subscription Billing for Microbusinesses"; Description from sub-headline.
  - Images: WebP format, lazy-loaded.
  - Core Web Vitals: Aim for LCP <2.5s.
- **Backend Integration:** CTAs route to Supabase Auth for free trial sign-up.
- **Testing:** Cross-browser (Chrome, Safari, Firefox); mobile devices.

---

## Content Guidelines
- **Voice:** First-person friendly (e.g., "We've been there—chasing payments sucks.").
- **Length:** Concise; scannable with bold headings.
- **Inclusivity:** Gender-neutral language; diverse visuals.
- **Updates:** Review quarterly; A/B test high-impact copy.

---

## Launch Checklist
- [ ] Wireframe to Figma prototype.
- [ ] Copy finalized and proofread.
- [ ] Assets created (illustrations, icons).
- [ ] Development sprint (1-2 weeks).
- [ ] QA: Functionality, responsiveness, accessibility.
- [ ] Deploy to Vercel; monitor with Sentry.
- [ ] Post-launch: Gather feedback via Hotjar.

For questions, contact product@schnei.com.

---
*Schnei Documentation – Empowering microbusinesses, one subscription at a time.*