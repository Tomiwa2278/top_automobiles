# AutoVibe Motors — Premium Car Dealership Platform

AutoVibe Motors is a high-end, responsive multi-page website designed for a luxury car dealership in Nigeria. The platform features a sophisticated dark/light theme system, an interactive car inventory, and a professional aesthetic tailored for a premium user experience.

## Key Features

- **Dynamic Inventory System**: Filterable car listings by brand and price range.
- **Premium Design System**: Glassmorphism, gold accents, and smooth scroll animations.
- **Interactive Review System**: 5-star rating selector for customer feedback.
- **Multi-Theme Support**: Persistent dark/light mode toggle.
- **Responsive Layout**: Optimized for mobile, tablet, and desktop viewing.
- **Shared Components**: Dynamic footer loading across all pages for easy maintenance.
- **Functional UI Elements**: Interactive car detail modals, FAQ accordions, and simulated form handling.

## Project Structure

```text
├── assets/
│   ├── images/
│   │   ├── cars/      # High-resolution vehicle images
│   │   ├── hero/      # Page header backgrounds
│   │   ├── services/  # Service-related imagery
│   │   └── logo/      # Branding assets
├── css/
│   └── style.css      # Core design tokens and styles
├── js/
│   └── main.js       # Dynamic features and UI logic
├── index.html        # Homepage
├── about.html        # Our Story & Mission
├── services.html     # Inventory & Service offerings
├── reviews.html      # Customer feedback & Review submission
├── faq.html          # Frequently Asked Questions
├── contact.html      # Contact form & Location details
├── privacy-policy.html
└── terms-of-use.html
```

## Technology Stack

- **HTML5**: Semantic structure for better SEO and accessibility.
- **Vanilla CSS3**: Custom design tokens, CSS Grid, Flexbox, and Keyframe animations.
- **JavaScript (ES6)**: Dynamic DOM manipulation, Fetch API, and LocalStorage for theme persistence.
- **Font Awesome 6**: Premium icon set for consistent visual language.
- **Google Fonts**: Inter (Body) and Playfair Display (Heading).

## How to Run

1. Clone or download the repository.
2. Open `index.html` in any modern web browser.
3. *Note: Since the footer is loaded via JavaScript Fetch, you may need to run this through a local server (e.g., Live Server in VS Code) to avoid CORS issues with local file paths.*

## Legal

- Content, branding, and images are proprietary to AutoVibe Motors.
- Privacy Policy and Terms of Use are included in the documentation pages.

---
*Created by Antigravity — Your AI Coding Partner.*
