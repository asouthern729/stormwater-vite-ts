import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'

// Components
import SaveBtn from './SaveBtn'

describe('SaveBtn', () => {
  const handleClickMock = vi.fn()

  it('Renders correctly', () => {
      render(<SaveBtn handleClick={handleClickMock} disabled={false} />)
    
      const button = screen.getByRole('button')

      expect(button).toBeInTheDocument()
  })

  it('Executes handleClick fn on click', () => {
      render(<SaveBtn handleClick={handleClickMock} disabled={false} />)
  
      const button = screen.getByRole('button')
      fireEvent.click(button)
  
      expect(handleClickMock).toHaveBeenCalled()
    })
})