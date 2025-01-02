import { render, screen } from '@testing-library/react'
import { instance } from 'ts-mockito'
import { mockGreen } from '../../../test/mocks'
import { setGreenObj } from './utils'

// Components
import GreenViolationsIndicator from './GreenViolationsIndicator'

describe('GreenViolationsIndicator', () => {
  const greenViolationsArray = Array.from({ length: 5 }, () => instance(mockGreen()))

  it('Renders correctly', () => {
      render(<GreenViolationsIndicator green={greenViolationsArray} />)
  
      const element = screen.getByTestId('green-violations-indicator')

      expect(element).toBeInTheDocument()
  })
  
  it('setGreenObj returns green violations object', () => {
    const TestComponent = () => {
      const greenObj = setGreenObj(greenViolationsArray)

      return (
        <div>Total Violations = {greenObj.total}</div>
      )
    }

    render(<TestComponent />)

    const text = screen.getByText('Total Violations = 5')
    expect(text).toBeInTheDocument()
  })
})