import { render, screen } from '@testing-library/react'
import { instance } from 'ts-mockito'
import { mockComplaint } from '../../../../test/mocks'
import { setComplaintsObj } from './utils'

// Components
import SiteComplaintsIndicator from './SiteComplaintsIndicator'

describe('SiteComplaintsIndicator', () => {
  const complaintsArray = Array.from({ length: 5 }, () => instance(mockComplaint()))

  it('Renders correctly', () => {
      render(<SiteComplaintsIndicator complaints={complaintsArray} />)
  
      const element = screen.getByTestId('site-complaints-indicator')

      expect(element).toBeInTheDocument()
  })

  it('setComplaintsObj returns complaints object', () => {
    const TestComponent = () => {
      const complaints = setComplaintsObj(complaintsArray)

      return (
        <div>Total Complaints = { complaints.total }</div>
      )
    }

    render(<TestComponent />)

    const text = screen.getByText('Total Complaints = 5')
    expect(text).toBeInTheDocument()
  })
})