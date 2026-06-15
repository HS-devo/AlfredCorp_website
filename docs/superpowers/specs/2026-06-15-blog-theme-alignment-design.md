# Design Spec: Blog Theme Alignment with Home Page

## Goal
Update all static blog pages under `/blog/` to match the home page's theme (Maple Chalk), colors, header, and footer. Enhance the home page to handle navigation transitions from static blog pages.

## Proposed Changes

### 1. Static HTML Pages
Modify the following files:
- `public/blog/index.html`
- `public/blog/accounting-firm-ai-automation-case-study/index.html`
- `public/blog/ohs-automation-document-review-audit-assistant/index.html`
- `public/blog/startup-government-contracts-ai-lead-generation/index.html`

#### Changes:
1. **Remove Second `:root` Overrides**: Remove the dark theme `:root` block so the theme defaults to light mode (Maple Chalk).
2. **Text Contrast Adjustment**:
   - Change logo text color (`.nav-logo-text`) to `var(--slate-100)`.
   - Change logo italic text color (`.nav-logo-text em`) to `var(--slate-500)`.
   - Change main heading tags (`h1`, `h2`, `h3`), post title, footer logo text color to `var(--slate-100)` or `var(--slate-200)` for readability on light background.
3. **Gold to Crimson Color Mapping**:
   - Map all gold overlays `rgba(232, 160, 32, ...)` to crimson `rgba(177, 34, 36, ...)` to align with `theme-maple-chalk`.
4. **Header Alignment**:
   - Navbar heights: `4rem` on mobile, `5rem` on desktop.
   - Navbar padding: responsive padding matching the home page (`px-4 sm:px-6 lg:px-8`).
   - Links: Services (`/#services`), Pricing (`/#pricing`), About Us (`/#about-us`), FAQ (`/#faq`), Blog (`/blog/`), Contact us (`/?contact=true`).
   - Add mobile menu button (hamburger/close) and drawer. Add a small inline script at the end of `<body>` to toggle class `open` for mobile navigation.
5. **Footer Alignment**:
   - Remove `.footer-links` container to match the home page.
   - Adjust copyright copy and logo colors to use `var(--slate-600)` and `var(--slate-200)`.

### 2. React Home Page Configuration (`src/App.tsx`)
- Add a `useEffect` hook to detect `?contact=true` or hash navigation on load.
- If `?contact=true` or `#contact` is detected, open the contact modal.
- If `#services`, `#pricing`, `#about-us`, or `#faq` is detected, scroll to the respective element with an 80px offset (to prevent the fixed header from covering the content).

## Verification Plan
1. Start development server: `npm run dev`.
2. Inspect the Blog index page and individual case studies on desktop and mobile viewports.
3. Verify that navigation links (Services, Pricing, About Us, FAQ, Contact us) from blog pages correctly transition to the home page, scroll to the correct section, and open the contact modal.
