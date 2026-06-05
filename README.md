# Aiden Leong — Portfolio

A personal portfolio for Aiden Leong, Product Designer & Illustrator.
Built with Vite + React, plain CSS Modules, Framer Motion, and GSAP.

---

## Running the project locally

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Production build
npm run build
```

---

## Complete TODO list — replace before going live

Every placeholder has a `{/* TODO: ... */}` comment in the source code.
Here is the full list:

### Content

| File | What to replace |
|------|----------------|
| `Hero.jsx` | Headline copy and subtitle tagline |
| `About.jsx` | Both bio paragraphs |
| `About.module.css` / `About.jsx` | Photo placeholder div → real `<img src="..." alt="Aiden Leong" />` |
| `Projects.jsx` | `projects` array — title, desc, tags for each of the 4 projects |
| `Projects.jsx` | Each `[Project Title]` placeholder div → real project image |
| `Skills.jsx` | `categories` array — skill items per category |
| `Skills.jsx` | `tools` marquee array — your actual toolkit |
| `Experience.jsx` | `jobs` array — company, role, dates, bullets for each position |
| `Experience.jsx` | `href="#resume"` → your Google Drive resume URL |
| `Fun.jsx` | `illustrations` array labels → real `<img>` elements for your artwork |
| `Fun.jsx` | `likes` array → your actual interests |
| `Contact.jsx` | `href="#linkedin"` → your LinkedIn profile URL |
| `Contact.jsx` | Subtext copy beneath the headline |

### Meta

- `index.html` — update `<title>` and `<meta name="description">` if you want custom copy
- Add a `public/favicon.svg` or `public/favicon.ico` for the browser tab icon

---

## How to add a new project card

1. Open `src/components/Projects/Projects.jsx`
2. Add a new object to the `projects` array:

```js
{
  id: 5,                          // unique number
  title: 'Your Project Title',
  desc: 'One-line descriptor',
  tags: ['Tag A', 'Tag B'],
  size: 'full',                   // 'full' (spans width) or 'half' (half-width)
}
```

3. Replace the placeholder `<div className={styles.imagePlaceholder}>` inside the mapped card
   with a real image:

```jsx
<img
  src="/images/your-project.jpg"
  alt="Brief description of project screenshot"
  className={styles.projectImage}
/>
```

4. Add the image file to `public/images/`.

> **Layout note:** The grid is two columns. The pattern used by default is
> `full → half + half → full`. If you add a 5th project, place it after the
> last `full` card. Two consecutive `half` cards will pair automatically.

---

## Tech stack

| Tool | Purpose |
|------|---------|
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [React 18](https://react.dev/) | UI framework |
| [CSS Modules](https://github.com/css-modules/css-modules) | Scoped per-component styles |
| [Framer Motion](https://www.framer.com/motion/) | Scroll-driven entrance animations |
| [GSAP](https://gsap.com/) | Hero text reveal, custom cursor, illustration hover |
| Google Fonts | Fraunces (display) + Inclusive Sans (body) |
