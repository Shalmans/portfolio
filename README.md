# Shalman S — Portfolio

React 19 + TypeScript + Vite + Tailwind CSS v4 + Framer Motion + Lucide.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # serve the build
```

## Updating content

All text, links and data live in **`src/data/profile.ts`** — no component edits needed.

| What | Where |
|---|---|
| Profile photo | Drop a square image at `public/profile.jpg` (initials show until then) |
| CV download | Drop the PDF at `public/cv/Shalman_S_CV.pdf` (or change `profile.cvPath`) |
| LinkedIn / GitHub | `contact.linkedin`, `contact.github` |
| Company names | `experience[].company` |
| Project live links | Add `url` to any entry in `projects` → shows an "Open project" button |
| Skill bar levels | `skillGroups[].skills[].level` (0–100) |
| CV download | Replace `public/cv/Shalman_S_CV.pdf` |
| Certificate links | Add `url` to a certification → button reads "Show credential" instead of "View on LinkedIn" |

## Going live

Set `VITE_SITE_URL` in `.env` to the public address (no trailing slash) before `npm run build`.
It fills the link-preview tags so WhatsApp / LinkedIn show `public/og-image.jpg` (1200×630).

## Contact

No form: the section links to email, WhatsApp and LinkedIn. The email tile also has a
copy button, because `mailto:` does nothing for visitors who only use webmail.

Unused source images (real headshot, older cartoon) are kept in `design/`, outside `public/`,
so they are not published.

## Structure

```
src/
  data/profile.ts          editable content
  components/layout/       Navbar, Beams (section light), Loader, Footer
  components/ui/           Button, Card, Reveal, Counter, ProjectMockup, Logo, ...
  sections/                Hero, About (bento + stats), Skills, Quote, Experience, Projects,
                           Achievements, Services, Contact
  index.css                design tokens (navy / royal-blue palette, LanderX-style)
  hooks/useActiveSection   nav highlighting
```

Animations respect the OS "reduce motion" setting.
