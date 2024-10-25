import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { render, screen } from '@testing-library/react'

// Components
import FormError from './FormError'

describe('FormError', () => {
  it('Renders correctly', () => {
    const TestComponent = () => {
      const methods = useForm({
        defaultValues: {
          testField: 'testField'
        }
      })

      const { setError } = methods

      useEffect(() => {
        setError('testField', { // Manually set error
          type: 'manual',
          message: 'This is a test error message'
        })
      }, [setError])

      return (
        <FormProvider { ...methods }>
          <FormError field={'testField'} />
        </FormProvider>
      )
    }

    render(<TestComponent />)
    
    const element = screen.getByTestId('form-error')
    const text = screen.getByText('This is a test error message')

    expect(element).toBeInTheDocument()
    expect(text).toBeInTheDocument()
  })
})