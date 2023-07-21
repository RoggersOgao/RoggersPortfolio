import About from '@/components/aboutMe/About'
import styles from './page.module.scss'
import Hero from '@/components/hero/Hero'
import Skills from '@/components/skills/Skills'
import Portfolio from '@/components/portfolio/Portfolio'
import Contact from '@/components/contact/Contact'

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Contact />
    </main>
  )
}
