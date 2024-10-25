import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

// Components
import FormNav from './FormNav'

describe('FormNav', () => {
  const handleBtnClickMock = vi.fn()

  it('Renders correctly', () => {
    render(
      <FormNav
        activeForm={'createSiteLog'}
        handleBtnClick={handleBtnClickMock} />
    )

    const element = screen.getByRole('navigation')
    expect(element).toBeInTheDocument()
  })
})