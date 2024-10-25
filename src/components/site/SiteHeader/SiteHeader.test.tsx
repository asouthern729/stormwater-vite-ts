import { render, screen } from '@testing-library/react'
import { instance, when } from 'ts-mockito'
import { mockSite, mockInspector } from '../../../test/mocks'

// Components
import SiteHeader from './SiteHeader'

describe('SiteHeader', () => {
  const site = mockSite()

  it('Renders correctly', () => {
      render(<SiteHeader site={instance(site)} />)

      const element = screen.getByTestId('site-header')
  
      expect(element).toBeInTheDocument()
  })

  it('Conditionally renders', () => {
    when(site.Inspector).thenReturn(instance(mockInspector()))

    const { rerender } = render(
      <SiteHeader site={instance(site)} />
    )

    const element = screen.getByTestId('inspector')
    expect(element).toBeInTheDocument() // Active

    when(site.Inspector).thenReturn(null)

    rerender(
      <SiteHeader site={instance(site)} />
    )

    const elementAfter = screen.queryByTestId('inspector')
    expect(elementAfter).not.toBeInTheDocument() // Inactive
  })
})