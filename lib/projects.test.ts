import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('node:fs', () => ({
  default: {
    existsSync: vi.fn(),
    readFileSync: vi.fn(),
  },
}))

import fs from 'node:fs'
import { getAllProjects, type Project } from './projects'

describe('getAllProjects', () => {
  beforeEach(() => vi.clearAllMocks())

  it('returns [] when content/projects.json does not exist', () => {
    vi.mocked(fs.existsSync).mockReturnValue(false)
    expect(getAllProjects()).toEqual([])
  })

  it('returns the parsed array when the file exists', () => {
    const projects: Project[] = [
      { title: 'A', description: 'd', stack: ['TypeScript'] },
    ]
    vi.mocked(fs.existsSync).mockReturnValue(true)
    vi.mocked(fs.readFileSync).mockReturnValue(
      JSON.stringify(projects) as never,
    )

    expect(getAllProjects()).toEqual(projects)
  })
})
