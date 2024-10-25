import { useState, useRef } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { instance } from 'ts-mockito'
import { mockInspector } from '../../../test/mocks'

// Types
import { InspectorContainerState } from './types'

// Components
import InspectorContainer from './InspectorContainer'
import FormContainer from '../../forms/FormContainer/FormContainer'

describe('InspectorContainer', () => {
  const inspectorMock = mockInspector()
  const queryClient = new QueryClient()

  beforeAll(() => { // Mock scroll to fns
    window.scrollTo = vi.fn()
    window.HTMLDivElement.prototype.scrollIntoView = vi.fn()
  })

  it('Renders correctly', () => {
    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <InspectorContainer sites={[]} inspector={instance(inspectorMock)} />
        </QueryClientProvider>
      </BrowserRouter>
    )

    const element = screen.getByTestId('inspector-container')

    expect(element).toBeInTheDocument()
  })

  it('Conditionally renders correctly', () => {
    const TestComponent = () => {
      const [state, setState] = useState<InspectorContainerState>({ formUUID: undefined, deleteBtnActive: false })

      const formRef = useRef<HTMLDivElement>(null)

      return (
        <>
          <button type="button" onClick={() => setState(({ formUUID: '123', deleteBtnActive: false }))}></button>
          {state.formUUID && (
            <div ref={formRef}>
              <FormContainer key={`violation-${ state.formUUID }`}>
                UpdateInspectorForm
              </FormContainer>
            </div>
          )}
        </>
      )
    }

    render(<TestComponent />)

    let element = screen.queryByTestId('form-container')
    expect(element).not.toBeInTheDocument() // Inactive

    const button = screen.getByRole('button')
    fireEvent.click(button)

    element = screen.getByTestId('form-container')
    expect(element).toBeInTheDocument() // Active
  })
})