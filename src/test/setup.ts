import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock the ResizeObserver for testing arcgis/core library
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

// Stub the global ResizeObserver
vi.stubGlobal('ResizeObserver', ResizeObserverMock)