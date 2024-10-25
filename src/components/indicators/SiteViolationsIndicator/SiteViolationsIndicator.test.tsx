import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { instance } from 'ts-mockito'
import { mockViolation } from '../../../test/mocks'
import { setViolationsObj } from '.'

// Components
import SiteViolationsIndicator from './SiteViolationsIndicator'

describe('SiteViolationsIndicator', () => {
  const violationsArray = Array.from({ length: 5 }, () => instance(mockViolation()))

  it('Renders correctly', () => {
      render(
        <BrowserRouter>
          <SiteViolationsIndicator 
            violations={violationsArray}
            disabled={false} />
        </BrowserRouter>
      )

      const element = screen.getByTestId('site-violations-indicator')

      expect(element).toBeInTheDocument()
  })

  it('setViolationsObj returns violations object', () => {
    const TestComponent = () => {
      const violationsObj = setViolationsObj(violationsArray)

      return (
        <div>Total Violations = {violationsObj.total}</div>
      )
    }

    render(
      <BrowserRouter>
        <TestComponent />
      </BrowserRouter>
    )

    const text = screen.getByText('Total Violations = 5')
    expect(text).toBeInTheDocument()
  })
})