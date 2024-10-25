import { QueryClient, QueryClientProvider } from 'react-query'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { instance } from 'ts-mockito'
import { mockViolation } from '../../../../test/mocks'

// Components
import GetViolation from './GetViolation'
import UpdateViolationForm from '../../update/UpdateViolationForm/UpdateViolationForm'

describe('GetViolation', () => {
  const queryClient = new QueryClient()
  const resetStateMock = vi.fn()

  it('Renders correctly', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <GetViolation 
            uuid={'123'} 
            resetState={resetStateMock} />
        </QueryClientProvider>
      )

      const element = screen.getByTestId('get-violation')
  
      expect(element).toBeInTheDocument()
  })

  it('Conditionally renders', () => {
    const TestComponent = () => {
      const data = {
        data: instance(mockViolation())
      }

      return (
        <>
          {data?.data && (
            <div className="flex flex-col items-center">
              <UpdateViolationForm 
                violation={data.data}
                resetState={resetStateMock} />
            </div>
          )}
        </>
      )
    }

    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent />
      </QueryClientProvider>
    )

    const element = screen.getByTestId('update-violation-form')
    expect(element).toBeInTheDocument()
  })
})