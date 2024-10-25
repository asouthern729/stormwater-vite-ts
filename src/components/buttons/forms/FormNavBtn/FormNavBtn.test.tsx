import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import styles from './FormNavBtn.module.css'

// Components
import FormNavBtn from './FormNavBtn'

describe('FormNavBtn', () => {
  const handleClickMock = vi.fn()

  it('Renders correctly', () => {
      render(
      <FormNavBtn 
        label={'Illicit Discharge'}
        value={'createIllicitDischarge'}
        isActive={true}
        handleClick={handleClickMock} />
      )
        
      const button = screen.getByRole('button')
      const text = screen.getByText('Illicit Discharge')

      expect(button).toBeInTheDocument()
      expect(text).toBeInTheDocument()
  })

  it('Executes handleClick fn on click', () => {
      render(<FormNavBtn 
        label={'Illicit Discharge'}
        value={'createIllicitDischarge'}
        isActive={true}
        handleClick={handleClickMock} />)
  
      const button = screen.getByRole('button')
      fireEvent.click(button)
  
      expect(handleClickMock).toHaveBeenCalled()
  })

  it('Styling property applied', () => {
    const { rerender } = render(
      <FormNavBtn 
        label={'Illicit Discharge'}
        value={'createIllicitDischarge'}
        isActive={true} // Active btn
        handleClick={handleClickMock} />
    )

    let button = screen.getByRole('button')
    expect(button).toHaveClass(styles.activeBtn)

    rerender(
      <FormNavBtn 
        label={'Illicit Discharge'}
        value={'createIllicitDischarge'}
        isActive={false} // Inactive btn
        handleClick={handleClickMock} />
    )

    button = screen.getByRole('button')
    expect(button).toHaveClass(styles.btn)
  })
})