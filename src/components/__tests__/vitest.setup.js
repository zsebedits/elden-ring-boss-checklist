import { vi } from 'vitest'
import { config } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'

// Mock Pinia stores
config.global.plugins = [createTestingPinia({ createSpy: vi.fn })]

// Mock vue-i18n
vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: (key) => key,
    d: (key) => key
  })
}))
