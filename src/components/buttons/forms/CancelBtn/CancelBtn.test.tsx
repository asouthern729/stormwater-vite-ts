import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

// Components
import CancelBtn from './CancelBtn'

describe('CancelBtn', () => {
  const handleClickMock = vi.fn()

  it('Renders correctly', () => {
      render(<CancelBtn handleClick={handleClickMock} />)
  
      const button = screen.getByRole('button')

      expect(button).toBeInTheDocument()
  })
  
  it('Executes handleClick fn on click', () => {
      render(<CancelBtn handleClick={handleClickMock} />)
  
      const button = screen.getByRole('button')
      fireEvent.click(button)
  
      expect(handleClickMock).toHaveBeenCalled()
    })
})