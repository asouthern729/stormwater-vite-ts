import { useState, useRef } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

// Types
import { ViolationsContainerState } from './types'

// Components
import ViolationsContainer from './ViolationsContainer'
import FormContainer from '../../forms/FormContainer/FormContainer'

describe('ViolationsContainer', () => {

  beforeAll(() => {
    window.scrollTo = vi.fn()
    window.HTMLDivElement.prototype.scrollIntoView = vi.fn()
  })

  it('Renders correctly', () => {
    render(
      <BrowserRouter>
        <ViolationsContainer sites={[]} />  
      </BrowserRouter>
    )

    const element = screen.getByTestId('violations-container')

    expect(element).toBeInTheDocument()
  })

  it('Renders conditionally', () => {
    const TestComponent = () => {
      const [state, setState] = useState<ViolationsContainerState>({ formUUID: undefined })

      const formRef = useRef<HTMLDivElement>(null)

      return (
        <>
          <button type="button" onClick={() => setState({ formUUID: '123' })}></button>
          {state.formUUID && (
            <div ref={formRef}>
              <FormContainer key={`violation-${ state.formUUID }`}>
                GetViolation
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