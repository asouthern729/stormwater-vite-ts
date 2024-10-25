import { useState, useRef } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { instance } from 'ts-mockito'
import { mockSite, mockComplaint } from '../../../test/mocks'
import { useScrollToFormRef } from '../../../helpers'

// Types
import { ComplaintsContainerState } from './types'

// Components
import ComplaintsContainer from './ComplaintsContainer'
import FormContainer from '../../forms/FormContainer/FormContainer'

describe('ComplaintsContainer', () => {
  const site = mockSite()
  const complaint = mockComplaint()

  beforeAll(() => { // Mock scroll to fns
    window.scrollTo = vi.fn()
    window.HTMLElement.prototype.scrollIntoView = vi.fn()
  })

  it('Renders correctly', () => {
      render(
        <BrowserRouter>
          <ComplaintsContainer
            sites={[instance(site)]}
            complaints={[complaint]} />
        </BrowserRouter>
      )

      const element = screen.getByTestId('complaints-container')
  
      expect(element).toBeInTheDocument()
  })

  it('Conditionally renders correctly', () => {
    const TestComponent = () => {
      const [state, setState] = useState<ComplaintsContainerState>({ formUUID: undefined })

      const formRef = useRef<HTMLDivElement>(null)

      useScrollToFormRef(state, formRef)

      return (
        <>
          <button type="button" onClick={() => setState({ formUUID: '123' })}></button>
          {state.formUUID && (
            <div ref={formRef}>
              <FormContainer key={`complaint-${ state.formUUID }`}>
                GetComplaint
              </FormContainer>
            </div>
          )}
        </>
      )
    }

    render(<TestComponent />)
    
    let element = screen.queryByTestId('form-container')
    const button = screen.getByRole('button')

    expect(element).not.toBeInTheDocument()

    fireEvent.click(button)

    element = screen.getByTestId('form-container')
    expect(element).toBeInTheDocument()
  })
})