import { useState } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

// Types
import { SiteIssuesTableState } from '../../../../site/tables/SiteIssuesTable/types'

// Components
import ShowAllBtn from './ShowAllBtn'

describe('ShowAllBtn', () => {
  const handleClickMock = vi.fn()

  it('Renders correctly', () => {
    render(<ShowAllBtn label={'Show All'} handleClick={handleClickMock} />)

    const button = screen.getByRole('button')
    const text = screen.getByText('Show All')

    expect(button).toBeInTheDocument()
    expect(text).toBeInTheDocument()
  })

  it('Executes handleClick fn on click', () => {
    render(<ShowAllBtn label={'Show All'} handleClick={handleClickMock} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleClickMock).toHaveBeenCalled()
  })

  it('Updates state on click', () => {
    const TestComponent = () => {
      const [state, setState] = useState<SiteIssuesTableState>({ showAll: false })

      return(
        <>
          <div>Show All = {state.showAll ? 'true' : 'false'}</div>
          <ShowAllBtn label={'Show All'} handleClick={() => setState(prevState => ({ showAll: !prevState.showAll }))} />
        </>
      )
    }

    render(<TestComponent />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    const text = screen.getByText('Show All = true')
    expect(text).toBeInTheDocument()
  })
})