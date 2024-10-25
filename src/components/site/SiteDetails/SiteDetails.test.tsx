import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { instance, when } from 'ts-mockito'
import { mockSite } from '../../../test/mocks'

// Components
import SiteDetails from './SiteDetails'

describe('SiteDetails', () => {
  const site = mockSite()

  it('Renders correctly', () => {
      render(
        <BrowserRouter>
          <SiteDetails site={instance(site)} />
        </BrowserRouter>
      )

      const element = screen.getByTestId('site-details')
  
      expect(element).toBeInTheDocument()
  })

  it('Conditionally renders', () => {
    when(site.greenInfrastructure).thenReturn(true)

    const { rerender } = render(
      <BrowserRouter>
        <SiteDetails site={instance(site)} />
      </BrowserRouter>
    )

    const element = screen.getByTestId('green-infrastructure')
    expect(element).toBeInTheDocument()

    when(site.greenInfrastructure).thenReturn(false)

    rerender(
      <BrowserRouter>
        <SiteDetails site={instance(site)} />
      </BrowserRouter>
    )

    const elementAfter = screen.queryByTestId('green-infrastructure')
    expect(elementAfter).not.toBeInTheDocument()
  })
})