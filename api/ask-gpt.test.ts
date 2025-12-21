import { describe, it, expect, vi, beforeEach } from 'vitest'
import handler from './ask-gpt'
import { createMockVercelRequest, createMockVercelResponse, createMockFetch } from './test/utils'

describe('ask-gpt API', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', createMockFetch({
      output: [{ content: [{ text: 'Mock property report' }] }]
    }))
  })

  it('returns 405 for non-POST requests', async () => {
    const req = createMockVercelRequest({ method: 'GET' })
    const res = createMockVercelResponse()

    await handler(req as any, res)

    expect(res.status).toHaveBeenCalledWith(405)
    expect(res.json).toHaveBeenCalledWith({ error: 'Method not allowed' })
  })

  it('returns 400 when prompt is missing', async () => {
    const req = createMockVercelRequest({ method: 'POST', body: {} })
    const res = createMockVercelResponse()

    await handler(req as any, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing prompt' })
  })

  it('returns 200 with reply on successful GPT response', async () => {
    const req = createMockVercelRequest({
      method: 'POST',
      body: { prompt: '123 Main St' },
    })
    const res = createMockVercelResponse()

    await handler(req as any, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ reply: 'Mock property report' })
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('returns fallback message when GPT returns no content', async () => {
    vi.stubGlobal('fetch', createMockFetch({ output: [] }))
    
    const req = createMockVercelRequest({
      method: 'POST',
      body: { prompt: '123 Main St' },
    })
    const res = createMockVercelResponse()

    await handler(req as any, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ reply: 'No response generated.' })
  })

  it('returns 500 when fetch throws an error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))
    
    const req = createMockVercelRequest({
      method: 'POST',
      body: { prompt: '123 Main St' },
    })
    const res = createMockVercelResponse()

    await handler(req as any, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ error: 'Error connecting to GPT service.' })
  })
})
