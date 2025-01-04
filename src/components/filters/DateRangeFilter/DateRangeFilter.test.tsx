import { useState, useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import AppContext, { AppProvider } from '../../../context/App/AppContext'
import { useHandleDateRangeChange } from './hooks'

// Types
import { DateRangeFilterState } from './types'

// Components
import DateRangeFilter from './DateRangeFilter'
import ClearFilterBtn from '../../buttons/filters/ClearFilterBtn/ClearFilterBtn'

describe('DateRangeFilter', () => {
  
  it('Renders correctly', () => {
    render(<DateRangeFilter />)

    const element = screen.getByTestId('date-range-filter')

    expect(element).toBeInTheDocument()
  })

  it('useHandleDateRangeChange updates ctx', () => {
    const TestComponent = () => {
      const { dateRangeFilter } = useContext(AppContext)

      const [state, setState] = useState<DateRangeFilterState>({ start: '2024-10-01', end: '2024-10-31' })

      useHandleDateRangeChange(state)

      return (
        <>
          <button type="button" onClick={() => setState({ start: undefined, end: undefined })}></button>
          <div>{dateRangeFilter.start}</div>
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

    const text = screen.getByText('2024-10-01')
    expect(text).toBeInTheDocument() // Date range in ctx

    const button = screen.getByRole('button')
    fireEvent.click(button)

    const afterText = screen.queryByText('2024-10-01')
    expect(afterText).not.toBeInTheDocument() // Date range removed from ctx
  })

  it('Conditionally renders', () => {
    const TestComponent = () => {
      const [state, setState] = useState<DateRangeFilterState>({ start: '2024-10-01', end: '2024-10-31' })

      return (
        <>
          <button data-testid="clear-btn" type="button" onClick={() => setState({ start: undefined, end: undefined })}></button>
          
          {(state.start && state.end) && (
            <ClearFilterBtn
              label={'Remove Date Range Filter'}
              handleClick={() => setState({ start: '', end: '' })} />
          )}
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

    const element = screen.getByTestId('clear-filter-btn')
    expect(element).toBeInTheDocument() // Active

    const button = screen.getByTestId('clear-btn')
    fireEvent.click(button)

    const elementAfter = screen.queryByTestId('clear-filter-btn')
    expect(elementAfter).not.toBeInTheDocument() // Inactive
  })
})
