import {
  siBitbucket,
  siBootstrap,
  siCss,
  siGit,
  siHtml5,
  siJavascript,
  siLinux,
  siOdoo,
  siPostgresql,
  siPython,
  siXml,
} from 'simple-icons'

type Tech = { path?: string; color: string; text?: string }

/**
 * Brand marks for the About tiles (Simple Icons, CC0).
 * Colours are the brand hex, lifted where the original is too dark on navy.
 */
export const techIcons: Record<string, Tech> = {
  Python: { path: siPython.path, color: '#4B8BBE' },
  Odoo: { path: siOdoo.path, color: '#B17BA4' },
  PostgreSQL: { path: siPostgresql.path, color: '#6A9BD8' },
  JavaScript: { path: siJavascript.path, color: `#${siJavascript.hex}` },
  OWL: { text: 'OWL', color: '#B17BA4' },
  XML: { path: siXml.path, color: '#4A9EE8' },
  HTML5: { path: siHtml5.path, color: `#${siHtml5.hex}` },
  CSS: { path: siCss.path, color: '#5A8DEE' },
  Bootstrap: { path: siBootstrap.path, color: '#9B6BF2' },
  Git: { path: siGit.path, color: `#${siGit.hex}` },
  Bitbucket: { path: siBitbucket.path, color: '#4C9AFF' },
  Linux: { path: siLinux.path, color: '#FCC624' },
}
