import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

// Components
import CalendarTypeBtn from './CalendarTypeBtn'

describe('CalendarTypeBtn', () => {
  const handleClickMock = vi.fn()

  it('Renders correctly', () => {
    render(<CalendarTypeBtn label={'Monthly'} handleClick={handleClickMock} />)

    const button = screen.getByRole('button')
    const text = screen.getByText('Monthly')

    expect(button).toBeInTheDocument()
    expect(text).toBeInTheDocument()
  })

  it('Executes handleClick fn on click', () => {
    render(<CalendarTypeBtn label={'Monthly'} handleClick={handleClickMock} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleClickMock).toHaveBeenCalled()
  })
})