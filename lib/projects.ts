import fs from 'node:fs'
import path from 'node:path'

// Shape per PRD.md §3 — `status` values aren't enumerated there, kept as a
// free string until a real taxonomy is needed (see
// .claude/skills/content-authoring/SKILL.md).
export interface Project {
  title: string
  description: string
  stack: string[]
  repoUrl?: string
  liveUrl?: string
  cover?: string
  status?: string
}

export function getAllProjects(): Project[] {
  const filePath = path.join(process.cwd(), 'content', 'projects.json')
  if (!fs.existsSync(filePath)) return []
  return JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Project[]
}
