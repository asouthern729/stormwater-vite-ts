import { useState, useRef } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { useScrollToFormRef } from '../../../helpers'

// Types
import { GreenContainerState } from './types'

// Components
import GreenContainer from './GreenContainer'
import FormContainer from '../../forms/FormContainer/FormContainer'

describe('GreenContainer', () => {

  beforeAll(() => { // Mock scroll to fns
    window.scrollTo = vi.fn()
    window.HTMLDivElement.prototype.scrollIntoView = vi.fn()
  })

  it('Renders correctly', () => {
      render(
        <BrowserRouter>
          <GreenContainer green={[]} />
        </BrowserRouter>
      )

      const element = screen.getByTestId('green-container')
  
      expect(element).toBeInTheDocument()
  })

  it('Conditionally renders correctly', () => {
    const TestComponent = () => {
      const [state, setState] = useState<GreenContainerState>({ formUUID: undefined })

      const formRef = useRef<HTMLDivElement>(null)

      useScrollToFormRef(state, formRef)

      return (
        <>
          <button type="button" onClick={() => setState({ formUUID: '123' })}></button>
          {state.formUUID && (
            <div ref={formRef}>
              <FormContainer key={`discharge-${ state.formUUID }`}>
                GetGreen
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