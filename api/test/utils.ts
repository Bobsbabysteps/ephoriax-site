import { vi } from 'vitest'

export function createMockVercelRequest(overrides: {
  method?: string
  body?: any
  query?: Record<string, string>
  headers?: Record<string, string>
} = {}) {
  return {
    method: overrides.method ?? 'GET',
    body: overrides.body ?? {},
    query: overrides.query ?? {},
    headers: overrides.headers ?? {},
  }
}

export function createMockVercelResponse() {
  const res: any = {
    statusCode: 200,
    _json: null,
    _sent: false,
  }

  res.status = vi.fn((code: number) => {
    res.statusCode = code
    return res
  })

  res.json = vi.fn((data: any) => {
    res._json = data
    res._sent = true
    return res
  })

  res.send = vi.fn((data: any) => {
    res._data = data
    res._sent = true
    return res
  })

  return res
}

export function createMockFetch(response: any, ok = true) {
  return vi.fn().mockResolvedValue({
    ok,
    json: vi.fn().mockResolvedValue(response),
    text: vi.fn().mockResolvedValue(JSON.stringify(response)),
  })
}
