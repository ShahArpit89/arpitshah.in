import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type { SanityClient } from 'next-sanity'

vi.mock('next-sanity', () => ({
  createClient: vi.fn(),
}))

vi.mock('@sanity/image-url', () => ({
  default: vi.fn(() => ({ image: vi.fn() })),
}))

const ORIGINAL_ENV = { ...process.env }

beforeEach(() => {
  vi.resetModules()
  vi.clearAllMocks()
  process.env = { ...ORIGINAL_ENV }
  delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
})

afterEach(() => {
  process.env = ORIGINAL_ENV
})

describe('unconfigured (no NEXT_PUBLIC_SANITY_PROJECT_ID)', () => {
  it('client is null and sanityConfigured is false', async () => {
    const sanity = await import('./sanity')

    expect(sanity.client).toBeNull()
    expect(sanity.sanityConfigured).toBe(false)
  })

  it('urlFor() throws', async () => {
    const sanity = await import('./sanity')

    expect(() => sanity.urlFor({} as never)).toThrow(
      'urlFor() called without a configured Sanity client',
    )
  })

  it('getPhotos() resolves to []', async () => {
    const sanity = await import('./sanity')

    await expect(sanity.getPhotos()).resolves.toEqual([])
  })
})

describe('configured (NEXT_PUBLIC_SANITY_PROJECT_ID set)', () => {
  it('client is non-null and getPhotos() calls the client with the expected query', async () => {
    const fetchMock = vi.fn().mockResolvedValue([{ _id: 'photo-1' }])
    const { createClient } = await import('next-sanity')
    vi.mocked(createClient).mockReturnValue({
      fetch: fetchMock,
    } as unknown as SanityClient)
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'test-project'

    const sanity = await import('./sanity')

    expect(sanity.client).not.toBeNull()

    const result = await sanity.getPhotos()

    expect(fetchMock).toHaveBeenCalledWith(sanity.allPhotosQuery)
    expect(result).toEqual([{ _id: 'photo-1' }])
  })
})
