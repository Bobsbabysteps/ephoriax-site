import { beforeEach, vi } from 'vitest'
import '@testing-library/jest-dom'

beforeEach(() => {
  vi.resetAllMocks()
  
  process.env.OPENAI_API_KEY = 'test-api-key'
  process.env.OPENAI_PROJECT_ID = 'test-project-id'
})
