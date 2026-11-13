import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion'
import { Divider } from './components/layout/Beams'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { About } from './sections/About'
import { Certifications } from './sections/Certifications'
import { Contact } from './sections/Contact'
import { Experience } from './sections/Experience'
import { Hero } from './sections/Hero'
import { Process } from './sections/Process'
import { Projects } from './sections/Projects'
import { Quote } from './sections/Quote'
import { Services } from './sections/Services'
import { Skills } from './sections/Skills'
import { SoftSkills } from './sections/SoftSkills'

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-gradient-to-r from-brand to-sky"
    />
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only z-[110] rounded-lg bg-white px-4 py-2 text-black focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero ready />
        <About />
        <Divider />
        <Skills />
        <SoftSkills />
        <Divider />
        <Quote />
        <Divider />
        <Experience />
        <Divider />
        <Process />
        <Divider />
        <Projects />
        <Divider />
        <Certifications />
        <Divider />
        <Services />
        <Divider />
        <Contact />
      </main>
      <Divider />
      <Footer />
    </MotionConfig>
  )
}
