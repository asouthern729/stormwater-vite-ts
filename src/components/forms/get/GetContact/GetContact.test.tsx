import { QueryClientProvider, QueryClient } from 'react-query'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { instance } from 'ts-mockito'
import { mockContact } from '../../../../test/mocks'

// Components
import GetContact from './GetContact'
import UpdateContactForm from '../../update/UpdateContactForm/UpdateContactForm'

describe('GetContact', () => {
  const resetStateMock = vi.fn()

  it('Renders correctly', () => {
    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <GetContact
          uuid={'123'}
          resetState={resetStateMock} />
      </QueryClientProvider>
    )

    const element = screen.getByTestId('get-contact')
    expect(element).toBeInTheDocument()
  })

  it('Conditionally renders', () => {
    const TestComponent = () => {
      const data = {
        data: instance(mockContact())
      }

      return (
        <>
          {data?.data && (
            <div className="flex flex-col items-center">
              <UpdateContactForm
                contact={data.data}
                resetState={resetStateMock} />
            </div>
          )}
        </>
      )
    }

    const queryClient = new QueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    )

    const element = screen.getByTestId('update-contact-form')
    expect(element).toBeInTheDocument()
  })
})