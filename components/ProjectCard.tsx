import type { Project } from '@/lib/projects'

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="border-line flex flex-col gap-3 rounded-md border p-6">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        {project.status && (
          <span className="text-ink-soft font-mono text-[10px] tracking-wider uppercase">
            {project.status}
          </span>
        )}
      </div>
      <p className="text-ink-soft text-sm leading-relaxed">
        {project.description}
      </p>
      {project.stack.length > 0 && (
        <ul className="text-ink-soft flex flex-wrap gap-2 font-mono text-[11px]">
          {project.stack.map((tech) => (
            <li
              key={tech}
              className="border-line rounded-full border px-2 py-0.5"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}
      <div className="mt-2 flex gap-4 font-mono text-xs">
        {project.repoUrl && (
          <a href={project.repoUrl} className="underline-grow text-ink">
            Repo →
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} className="underline-grow text-flare">
            Live →
          </a>
        )}
      </div>
    </article>
  )
}
