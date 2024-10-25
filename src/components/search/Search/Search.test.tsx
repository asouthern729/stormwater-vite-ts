import { BrowserRouter } from 'react-router-dom'
import { useContext } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import AppContext, { AppProvider } from '../../../context/App/AppContext'

// Components
import Search from './Search'

describe('Search', () => {

  it('Renders correctly', () => {
      render(<Search placeholder={'placeholder'} />)
  
      const element = screen.getByTestId('search')

      expect(element).toBeInTheDocument()
  })

  it('Conditionally renders', () => {
    const TestComponent = () => {
      const { dispatch } = useContext(AppContext)

      return (
        <>
          <button type="button" onClick={() => dispatch({ type: 'SET_SEARCH_VALUE',  payload: 'test search value' })}></button>
          <Search placeholder={'placeholder'} />
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

    let element = screen.queryByTestId('clear-btn')
    expect(element).not.toBeInTheDocument() // Inactive

    const button = screen.getByRole('button')
    fireEvent.click(button)

    element = screen.getByTestId('clear-btn')
    expect(element).toBeInTheDocument() // Active
  })
})