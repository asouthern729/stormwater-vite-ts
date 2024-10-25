import { useState, useRef } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { instance } from 'ts-mockito'
import { mockSite, mockDischarge } from '../../../test/mocks'
import { useScrollToFormRef } from '../../../helpers'

// Types
import { DischargesContainerState } from './types'

// Components
import DischargesContainer from './DischargesContainer'
import FormContainer from '../../forms/FormContainer/FormContainer'

describe('DischargesContainer', () => {
  const site = mockSite()
  const discharge = mockDischarge()

  beforeAll(() => { // Mock scroll to fns
    window.scrollTo = vi.fn()
    window.HTMLDivElement.prototype.scrollIntoView = vi.fn()
  })
  
  it('Renders correctly', () => {
      render(
        <BrowserRouter>
          <DischargesContainer
            sites={[instance(site)]}
            discharges={[discharge]} />
        </BrowserRouter>
      )

      const element = screen.getByTestId('discharges-container')

      expect(element).toBeInTheDocument()
  })

  it('Conditionally renders correctly', () => {
    const TestComponent = () => {
      const [state, setState] = useState<DischargesContainerState>({ formUUID: undefined })

      const formRef = useRef<HTMLDivElement>(null)

      useScrollToFormRef(state, formRef)

      return (
        <>
          <button type="button" onClick={() => setState({ formUUID: '123' })}></button>
          {state.formUUID && (
            <div ref={formRef}>
              <FormContainer key={`discharge-${ state.formUUID }`}>
                GetIllicitDischargeForm
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
