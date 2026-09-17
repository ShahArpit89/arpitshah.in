import ProjectCard from '@/components/ProjectCard'
import { getAllProjects } from '@/lib/projects'

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <section className="py-14">
      <h1 className="font-display text-3xl italic">Projects</h1>
      {projects.length === 0 ? (
        <p className="text-ink-soft mt-4 max-w-xl">
          Nothing in content/projects.json yet — see{' '}
          <code className="font-mono text-xs">
            .claude/skills/content-authoring
          </code>{' '}
          for the shape to add one.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      )}
    </section>
  )
}
