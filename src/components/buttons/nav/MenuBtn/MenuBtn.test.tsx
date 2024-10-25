import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import icon from '../../../../assets/icons/menu/menu.svg'
import activeIcon from '../../../../assets/icons/menu/menu-light.svg'

// Components
import MenuBtn from './MenuBtn'

describe('MenuBtn', () => {
  const handleClickMock = vi.fn()

  it('Renders correctly', () => {
      render(
        <MenuBtn
          handleClick={handleClickMock}
          active={false} />
      )

      const button = screen.getByRole('button')
  
      expect(button).toBeInTheDocument()
  })

  it('Executes handleClick fn on click', () => {

      render(
        <MenuBtn
          handleClick={handleClickMock}
          active={false} />
      )
  
      const button = screen.getByRole('button')
      fireEvent.click(button)
  
      expect(handleClickMock).toHaveBeenCalled()
    })

  it('Correct icon rendered', () => {
    const { rerender } = render(
      <MenuBtn
        handleClick={handleClickMock}
        active={false} /> // Inactive
    )

    let image = screen.getByRole('img')

    expect(image).toHaveAttribute('src', icon)

    rerender(
      <MenuBtn
        handleClick={handleClickMock}
        active={true} /> // Active
    )

    image = screen.getByRole('img')

    expect(image).toHaveAttribute('src', activeIcon)
  })
})
