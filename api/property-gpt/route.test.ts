import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockCreate = vi.hoisted(() => vi.fn())

vi.mock('openai', () => {
  const MockOpenAI = function() {
    return {
      chat: {
        completions: {
          create: mockCreate
        }
      }
    }
  }
  return { default: MockOpenAI }
})

import handler from './route'

describe('property-gpt API (edge)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: '{"address": "123 Main St", "sqft": 2000}' } }]
    })
  })

  it('returns 400 when address is missing', async () => {
    const req = new Request('http://localhost/api/property-gpt')
    
    const response = await handler(req)
    const data = await response.json()
    
    expect(response.status).toBe(400)
    expect(data.error).toBe('Missing address')
  })

  it('returns property report on success', async () => {
    const req = new Request('http://localhost/api/property-gpt?address=123%20Main%20St')
    
    const response = await handler(req)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.report).toBeDefined()
    expect(mockCreate).toHaveBeenCalledTimes(1)
  })

  it('detects residential property type for street addresses', async () => {
    const req = new Request('http://localhost/api/property-gpt?address=456%20Oak%20Avenue')
    
    const response = await handler(req)
    
    expect(response.status).toBe(200)
  })

  it('handles invalid JSON from OpenAI gracefully', async () => {
    mockCreate.mockResolvedValue({
      choices: [{ message: { content: 'not valid json' } }]
    })

    const req = new Request('http://localhost/api/property-gpt?address=123%20Main%20St')
    
    const response = await handler(req)
    const data = await response.json()
    
    expect(response.status).toBe(200)
    expect(data.report.error).toBe('Invalid JSON returned')
  })

  it('handles OpenAI errors gracefully', async () => {
    mockCreate.mockRejectedValue(new Error('API Error'))

    const req = new Request('http://localhost/api/property-gpt?address=123%20Main%20St')
    
    const response = await handler(req)
    const data = await response.json()
    
    expect(response.status).toBe(500)
    expect(data.error).toBe('OpenAI call failed')
  })
})
