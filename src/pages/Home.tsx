import { Seo } from '@/components/Seo'
import { PageTransition } from '@/components/motion/PageTransition'
import { Hero } from '@/sections/Hero'
import { Stats } from '@/sections/Stats'
import { ScreenshotMarquee } from '@/sections/ScreenshotMarquee'
import { AboutBento } from '@/sections/AboutBento'
import { WorkShowcase } from '@/sections/WorkShowcase'
import { ProjectsStack } from '@/sections/ProjectsStack'
import { TechMarquee } from '@/sections/TechMarquee'
import { ExperienceTimeline } from '@/sections/ExperienceTimeline'
import { Learning } from '@/sections/Learning'
import { WordPressWork } from '@/sections/WordPressWork'
import { Contact } from '@/sections/Contact'

/** Home page: section order top to bottom. */
export default function Home() {
  return (
    <PageTransition focusHeading={false}>
      <Seo />
      <Hero />
      <Stats />
      <ScreenshotMarquee />
      <AboutBento />
      <WorkShowcase />
      <ProjectsStack />
      <TechMarquee />
      <ExperienceTimeline />
      <Learning />
      <WordPressWork />
      <Contact />
    </PageTransition>
  )
}
