import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

// Components
import ClearFilterBtn from '.'

describe('ClearFilterBtn', () => {
  const handleClickMock = vi.fn()

  it('Renders correctly', () => {
    render(<ClearFilterBtn label={'Clear Filter'} handleClick={handleClickMock} />)

    const button = screen.getByText('Clear Filter')
    const text = screen.getByText('Clear Filter')

    expect(button).toBeInTheDocument()
    expect(text).toBeInTheDocument()
  })

  it('Executes handleClick fn on click', () => {
    render(<ClearFilterBtn label={'Clear Filter'} handleClick={handleClickMock} />)

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(handleClickMock).toHaveBeenCalled()
  })
})
