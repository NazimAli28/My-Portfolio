import { useParams } from 'react-router'
import { Seo } from '@/components/Seo'
import { PageTransition } from '@/components/motion/PageTransition'
import { getProject } from '@/content/projects'
import { CaseHero } from '@/components/case-study/CaseHero'
import { StatsStrip } from '@/components/case-study/StatsStrip'
import { CaseSection, MarkerList, Paragraphs } from '@/components/case-study/CaseSection'
import { VersionCompare } from '@/components/case-study/VersionCompare'
import { FeatureGallery } from '@/components/case-study/FeatureGallery'
import { ArchitectureDiagram } from '@/components/case-study/ArchitectureDiagram'
import { Decisions } from '@/components/case-study/Decisions'
import { NextProject } from '@/components/case-study/NextProject'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const project = getProject(useParams().slug)
  if (!project) return <NotFound />

  return (
    <PageTransition>
      <Seo title={project.title} description={project.tagline} />
      <CaseHero project={project} />
      <StatsStrip stats={project.stats} />
      <CaseSection title="The problem">
        <Paragraphs items={project.problem} />
      </CaseSection>
      <CaseSection title="Goals">
        <MarkerList items={project.goals} />
      </CaseSection>
      {project.versions && (
        <CaseSection title="Two versions">
          <VersionCompare versions={project.versions} />
        </CaseSection>
      )}
      <CaseSection title="The solution">
        <Paragraphs items={project.solution} />
        <FeatureGallery features={project.features} gallery={project.gallery} />
      </CaseSection>
      <CaseSection title="Architecture">
        <ArchitectureDiagram architecture={project.architecture} />
      </CaseSection>
      <CaseSection title="Key decisions">
        <Decisions decisions={project.decisions} />
      </CaseSection>
      <CaseSection title="Results">
        <MarkerList items={project.results} />
      </CaseSection>
      <CaseSection title="What I learned">
        <MarkerList items={project.lessons} />
      </CaseSection>
      <NextProject project={project} />
    </PageTransition>
  )
}
