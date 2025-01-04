import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { setBtnStyle } from './utils'
import styles from './HeaderBtn.module.css'

// Components
import HeaderBtn from './HeaderBtn'

describe('HeaderBtn', () => {
  const handleClickMock = vi.fn()

  it('Renders correctly', () => {
      render(
        <HeaderBtn
          label={'Sites'}
          handleClick={handleClickMock} />
      )

      const button = screen.getByRole('button')
  
      expect(button).toBeInTheDocument()
      expect(screen.getByText('Sites')).toBeInTheDocument()
  })

  it('Executes handleClick fn on click', () => {
      render(
        <HeaderBtn
          label={'Sites'}
          handleClick={handleClickMock} />
      )
  
      const button = screen.getByRole('button')
      fireEvent.click(button)
  
      expect(handleClickMock).toHaveBeenCalled()
    })

  it('setBtnStyle returns correct class', () => {
    let result = setBtnStyle('Sites', 'Sites') // Active

    expect(result).toBe(styles.activeBtn)

    result = setBtnStyle('Sites', 'Complaints') // Inactive
    
    expect(result).toBe(styles.btn)
  })
})
