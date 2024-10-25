import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { instance } from 'ts-mockito'
import { mockDischarge } from '../../../test/mocks'
import { setDischargesObj } from '.'

// Components
import SiteIllicitDischargeIndicator from './SiteIllicitDischargeIndicator'

describe('SiteIllicitDischargeIndicator', () => {
  const dischargesArray = Array.from({ length: 5 }, () => instance(mockDischarge()))

  it('Renders correctly', () => {
      render(
        <BrowserRouter>
          <SiteIllicitDischargeIndicator 
            discharges={dischargesArray}
            disabled={false} />
        </BrowserRouter>
      )
      
      const element = screen.getByTestId('site-illicit-discharge-indicator')
      expect(element).toBeInTheDocument()
  })

  it('setDischargesObj returns discharges object', () => {
    const TestComponent = () => {
      const discharges = setDischargesObj(dischargesArray)

      return (
        <div>Total Discharges = {discharges.total}</div>
      )
    }

    render(<TestComponent />)

    const text = screen.getByText('Total Discharges = 5')
    expect(text).toBeInTheDocument()
  })
})