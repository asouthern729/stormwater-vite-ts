import { useState } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

// Types
import { ContactsTableState } from '../../../tables/ContactsTable/types'

// Components
import PrevPageBtn from './PrevPageBtn'

describe('PrevPageBtn', () => {
  const handleClickMock = vi.fn()

  it('Renders correctly', () => {
      render(
        <PrevPageBtn
          handleClick={handleClickMock}
          disabled={false} />
      )

      const button = screen.getByRole('button')
  
      expect(button).toBeInTheDocument()
  })

  it('Executes handleClick fn on click', () => {
      const { rerender } = render(
        <PrevPageBtn
          handleClick={handleClickMock}
          disabled={false} /> // Active
      )
  
      let button = screen.getByRole('button')
      fireEvent.click(button)
  
      expect(handleClickMock).toHaveBeenCalled()

      rerender(
        <PrevPageBtn
          handleClick={handleClickMock}
          disabled={true} /> // Disabled
      )

      button = screen.getByRole('button')
      fireEvent.click(button)

      expect(handleClickMock).toHaveBeenCalledTimes(1)
    })
  
  it('Updates state on click', () => {
    const TestComponent = () => {
      const [state, setState] = useState<ContactsTableState>({ currentPage: 2 })

      return (
        <>
          <div>Current Page = {state.currentPage}</div>
          <PrevPageBtn
            handleClick={() => setState(prevState => ({ ...prevState, currentPage: prevState.currentPage - 1 }))}
            disabled={false} />
        </>
      )
    }

    render(<TestComponent />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)

    const text = screen.getByText('Current Page = 1')
    expect(text).toBeInTheDocument()
  })
})