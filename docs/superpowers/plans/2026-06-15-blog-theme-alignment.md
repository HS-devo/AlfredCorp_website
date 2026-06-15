# Blog Theme Alignment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align all static blog pages with the Maple Chalk light theme, header, and footer of the home page, and support seamless transitions/actions back to the homepage.

**Architecture:** Update HTML/CSS stylesheets of static pages to fall back to the main theme variables, adjust text contrast and overlay highlights, implement responsive header with toggleable mobile navigation drawer using inline JS, and add React `useEffect` routing helper in `App.tsx`.

**Tech Stack:** HTML, CSS, JavaScript, React, Tailwind CSS

---

### Task 1: Update Homepage React Logic to Support URL Hash/Params
**Files:**
- Modify: [App.tsx](file:///c:/dev/01_Business/AlfredCorp_website/src/App.tsx)

- [ ] **Step 1: Add useEffect to open contact modal or scroll to hash sections on mount**
  In [App.tsx](file:///c:/dev/01_Business/AlfredCorp_website/src/App.tsx), add a React `useEffect` to intercept `?contact=true` and hashes (`#services`, `#pricing`, `#about-us`, `#faq`), and scroll with the correct offset or open the contact modal.
  
  Code to add inside the `App` component:
  ```tsx
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash.substring(1);
    
    if (params.get('contact') === 'true' || hash === 'contact') {
      setIsContactModalOpen(true);
      // Clean up search param
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (hash) {
      // Allow DOM content to load fully before scrolling
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          const headerOffset = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 150);
    }
  }, []);
  ```

- [ ] **Step 2: Verify lint passes**
  Run `npm run lint` or check code in terminal.

---

### Task 2: Align Main Blog Listing Page (`/blog/`)
**Files:**
- Modify: [index.html](file:///c:/dev/01_Business/AlfredCorp_website/public/blog/index.html)

- [ ] **Step 1: Remove dark theme variables and body duplication**
  Delete the second `:root` block (lines 32-33) and its duplicate body styling.
  
- [ ] **Step 2: Update styles for Maple Chalk theme compatibility**
  Modify CSS under the `<style>` tag:
  - Change `background-color:rgba(12,11,10,0.95)` in `nav` to `background-color:rgba(250,248,245,0.95)`
  - Update `.nav-inner` to support responsive heights:
    ```css
    .nav-inner{max-width:1280px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:4rem}
    @media (min-width: 640px) {
      .nav-inner{height:5rem}
    }
    ```
  - Update `.nav-logo-text` and `.nav-logo-text em`:
    ```css
    .nav-logo-text{font-family:'Montserrat',sans-serif;font-weight:700;font-size:1.25rem;color:var(--slate-100);letter-spacing:-0.5px}
    .nav-logo-text em{font-style:normal;color:var(--slate-500);font-weight:400}
    ```
  - Update `.nav-link`:
    ```css
    .nav-link{font-family:'JetBrains Mono',monospace;font-size:0.75rem;text-transform:uppercase;letter-spacing:0.12em;color:var(--slate-400);transition:color 0.2s}
    ```
  - Update `h1` and `.post-title` colors to `var(--slate-100)`.
  - Add mobile toggle button and drawer styles:
    ```css
    #mobile-menu-toggle {
      display: none;
      background: none;
      border: none;
      color: var(--slate-200);
      cursor: pointer;
      padding: 0.5rem;
    }
    #mobile-menu-toggle:hover {
      color: var(--amber);
    }
    .mobile-menu {
      display: none;
      position: fixed;
      top: 4rem;
      left: 0;
      right: 0;
      background-color: rgba(250, 248, 245, 0.98);
      border-bottom: 1px solid var(--steel);
      padding: 1.5rem;
      flex-direction: column;
      gap: 1.5rem;
      z-index: 39;
    }
    .mobile-menu .nav-link {
      font-size: 0.75rem;
      width: 100%;
      text-align: left;
    }
    @media (max-width: 768px) {
      .nav-links { display: none; }
      #mobile-menu-toggle { display: block; }
      .mobile-menu.open { display: flex; }
    }
    ```
  - Map gold shadows/hovers to crimson:
    - Replace `.eyebrow` border and bg to `rgba(177, 34, 36, 0.3)` and `rgba(177, 34, 36, 0.08)`.
    - Replace `.post-card:hover` to `border-color: rgba(177, 34, 36, 0.4); box-shadow: 0 0 20px rgba(177, 34, 36, 0.08);`.
    - Replace `.post-stat` border to `rgba(177, 34, 36, 0.3)`.

- [ ] **Step 3: Update Header HTML structure**
  Add the mobile hamburger button inside the `.nav-inner` container and add the `<div class="mobile-menu">` drawer. Update nav links to:
  ```html
  <div class="nav-links">
    <a href="/#services" class="nav-link">Services</a>
    <a href="/#pricing" class="nav-link">Pricing</a>
    <a href="/#about-us" class="nav-link">About Us</a>
    <a href="/#faq" class="nav-link">FAQ</a>
    <a href="/blog/" class="nav-link active">Blog</a>
    <a href="/?contact=true" class="nav-link">Contact us</a>
  </div>
  ```

- [ ] **Step 4: Update Footer HTML structure**
  Remove `.footer-links` and change copy and text colors:
  ```html
  <footer>
    <div class="footer-inner">
      <div class="footer-logo">
        <img src="/logo.png" alt="Alfred Corp logo" width="24" height="24" />
        <span class="footer-logo-text" style="color: var(--slate-200)">Alfred Corp.</span>
      </div>
      <span class="footer-copy" style="color: var(--slate-600)">© 2026 Alfred Corp.</span>
    </div>
  </footer>
  ```

- [ ] **Step 5: Add script tag for mobile menu toggle**
  Add a script tag at the bottom of the body:
  ```html
  <script>
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (toggleBtn && mobileMenu) {
      const hamburger = toggleBtn.querySelector('.hamburger-icon');
      const closeIcon = toggleBtn.querySelector('.close-icon');
      toggleBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('open');
        if (isOpen) {
          hamburger.style.display = 'none';
          closeIcon.style.display = 'block';
        } else {
          hamburger.style.display = 'block';
          closeIcon.style.display = 'none';
        }
      });
    }
  </script>
  ```

---

### Task 3: Align Case Study 1 (`/blog/accounting-firm-ai-automation-case-study/`)
**Files:**
- Modify: [index.html](file:///c:/dev/01_Business/AlfredCorp_website/public/blog/accounting-firm-ai-automation-case-study/index.html)

- [ ] **Step 1: Make identical styles and HTML updates as Task 2**
  Apply the styles, header mobile menu, and footer modifications.
  *Note:* The "Blog" link in the header must NOT have the `active` class (as it is inside an individual post).
  *Note:* Also apply style updates for the article layout:
  - Change `h2` and `h3` colors from `#F1EDE8`/`var(--slate-200)` to `var(--slate-100)`.
  - Change `.cta-box` border and bg to use crimson colors `rgba(177, 34, 36, 0.3)` and `rgba(177, 34, 36, 0.05)`.
  - Change `.cta-btn:hover` to use `rgba(177, 34, 36, 0.08)` and box shadow `rgba(177, 34, 36, 0.2)`.
  - Update `blockquote` border and background to crimson red: `border-left: 3px solid var(--amber)` (maps to crimson) and `background: rgba(177, 34, 36, 0.05)`.

---

### Task 4: Align Case Study 2 (`/blog/ohs-automation-document-review-audit-assistant/`)
**Files:**
- Modify: [index.html](file:///c:/dev/01_Business/AlfredCorp_website/public/blog/ohs-automation-document-review-audit-assistant/index.html)

- [ ] **Step 1: Apply style, header, footer, mobile navigation, and article corrections**
  Duplicate identical CSS, HTML header/footer layout, and mobile drawer toggles as Task 3.

---

### Task 5: Align Case Study 3 (`/blog/startup-government-contracts-ai-lead-generation/`)
**Files:**
- Modify: [index.html](file:///c:/dev/01_Business/AlfredCorp_website/public/blog/startup-government-contracts-ai-lead-generation/index.html)

- [ ] **Step 1: Apply style, header, footer, mobile navigation, and article corrections**
  Duplicate identical CSS, HTML header/footer layout, and mobile drawer toggles as Task 3.

---

### Task 6: Testing & Verification
- [ ] **Step 1: Start development server**
  Run: `npm run build && npm run dev`
- [ ] **Step 2: Inspect pages in browser**
  Load `http://localhost:5000/blog/` and check light theme layout, headers, footers, and mobile menu toggles on multiple viewports.
- [ ] **Step 3: Verify navigation transitions**
  Click header links on blog pages and verify they correctly jump back to the homepage, scroll smoothly to sections, and open the contact modal.
