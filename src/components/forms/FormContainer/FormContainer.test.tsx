import { render, screen } from '@testing-library/react'

// Components
import FormContainer from './FormContainer'

describe('FormContainer', () => {
  
  it('Renders correctly', () => {
    render(
      <>
        <FormContainer>
          <div data-testid="child-element"></div>
        </FormContainer>
      </>
    )

    const element = screen.getByTestId('form-container')
    expect(element).toBeInTheDocument()

    const child = screen.getByTestId('child-element')
    expect(child).toBeInTheDocument() // Child element
  })
})
