import { useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { instance } from 'ts-mockito'
import { mockSite } from '../../../test/mocks'
import AppContext, { AppProvider } from '../../../context/App/AppContext'

// Components
import MapContainer from './MapContainer'

describe('MapContainer', () => {
  const sitesArray = Array.from({ length: 5 }, () => instance(mockSite()))

  it('Renders correctly', () => {
      render(
        <BrowserRouter>
          <MapContainer
            sites={sitesArray}
            type={'default'}
            zoom={12} />
        </BrowserRouter>
      )

      const element = screen.getByTestId('map-container')
  
      expect(element).toBeInTheDocument()
  })

  it('Conditionally renders', () => {
    const TestComponent = () => {
      const { dispatch } = useContext(AppContext)

      return (
        <>
          <button type="button" onClick={() => dispatch({ type: 'SET_ACTIVE_PAGE', payload: 'Site' })}></button>
          <MapContainer
            sites={sitesArray}
            type={'default'}
            zoom={12} />
        </>
      )
    }

    render(
      <BrowserRouter>
        <AppProvider>
          <TestComponent />
        </AppProvider>
      </BrowserRouter>
    )

    let element = screen.queryByTestId('search')
    expect(element).toBeInTheDocument() // Active

    const button = screen.getByRole('button')
    fireEvent.click(button)

    element = screen.queryByTestId('search')
    expect(element).not.toBeInTheDocument() // Inactive
  })
})