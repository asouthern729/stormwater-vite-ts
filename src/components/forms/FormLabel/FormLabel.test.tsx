import { render, screen } from '@testing-library/react'

// Components
import FormLabel from './FormLabel'

describe('FormLabel', () => {

  it('Renders correctly', () => {
    const { rerender } = render(
      <FormLabel 
        label={'Name'}
        name={'name'}
        required={true} />
    )

    const element = screen.getByTestId('form-label')
    expect(element).toBeInTheDocument()

    const text = screen.getByText('Name')
    expect(text).toBeInTheDocument() // Label

    const icon = screen.getByRole('img')
    expect(icon).toBeInTheDocument() // Required icon

    rerender(
      <FormLabel 
        label={'Name'}
        name={'name'} />
    )

    const iconAfter = screen.queryByRole('img')
    expect(iconAfter).not.toBeInTheDocument() // No required icon
  })

})