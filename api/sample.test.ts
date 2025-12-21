import { describe, it, expect } from 'vitest'
import handler from './sample.js'
import { createMockVercelRequest, createMockVercelResponse } from './test/utils'

describe('sample API', () => {
  it('returns mock property data with 200 status', () => {
    const req = createMockVercelRequest()
    const res = createMockVercelResponse()

    handler(req, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({
      address: '123 Main St',
      city: 'Sampleville',
      state: 'CA',
      message: 'Fetched mock property data successfully!',
    })
  })
})
