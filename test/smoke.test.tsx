import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { getAllProjects } from '@/lib/projects'

describe('vitest harness', () => {
  it('renders via React Testing Library and asserts with a jest-dom matcher', () => {
    render(<p>harness ok</p>)
    expect(screen.getByText('harness ok')).toBeInTheDocument()
  })

  it('resolves the @/ alias the same way tsconfig.json does', () => {
    expect(Array.isArray(getAllProjects())).toBe(true)
  })
})
