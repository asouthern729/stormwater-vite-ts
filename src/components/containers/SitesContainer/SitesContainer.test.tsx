import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { instance, when } from 'ts-mockito'
import { mockSite } from '../../../test/mocks'
import { AppProvider } from '../../../context/App/AppContext'
import { useSetSitesData } from './hooks'

// Components
import SitesContainer from './SitesContainer'

describe('SitesContainer', () => {
  const site = mockSite()
  when(site.name).thenReturn("Andrew's Test Site")
  when(site.inactive).thenReturn(false)

  it('Renders correctly', () => {
    render(
      <BrowserRouter>
        <SitesContainer sites={[instance(site)]} />
      </BrowserRouter>
    )

    const element = screen.getByTestId('sites-container')

    expect(element).toBeInTheDocument()
  })

  it('useSetSitesData returns Site[]', () => {
    const TestComponent = () => {
      const sitesArray = useSetSitesData([instance(site)])

      return (
        <div>{sitesArray[0]?.name}</div>
      )
    }

    render(
      <BrowserRouter>
        <AppProvider>
          <TestComponent />
        </AppProvider>
      </BrowserRouter>
    )

    const text = screen.getByText("Andrew's Test Site")

    expect(text).toBeInTheDocument()
  })
})