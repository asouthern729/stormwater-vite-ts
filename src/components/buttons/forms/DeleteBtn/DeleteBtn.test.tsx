import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

// Components
import DeleteBtn from './DeleteBtn'

describe('DeleteBtn', () => {
  const handleClickMock = vi.fn()

  it('Renders correctly', () => {
      render(<DeleteBtn label={'Delete Violation'} handleClick={handleClickMock} />)
  
      const button = screen.getByRole('button')
      const text = screen.getByText('Delete Violation')

      expect(button).toBeInTheDocument()
      expect(text).toBeInTheDocument()
  })

  it('Executes handleClick fn on click', () => {
      render(<DeleteBtn label={'Delete Violation'} handleClick={handleClickMock} />)
  
      const button = screen.getByRole('button')
      fireEvent.click(button)
  
      expect(handleClickMock).toHaveBeenCalled()
    })
})