import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { instance } from 'ts-mockito'
import { mockViolation } from '../../../../test/mocks'
import { useValidateUser } from '../../../../helpers'

// Components
import GetViolation from './GetViolation'
import UpdateViolationForm from '../../update/UpdateViolationForm/UpdateViolationForm'

describe('GetViolation', () => {
  const handleCloseFormMock = vi.fn()
  const queryClient = new QueryClient()

  vi.mock('../../../../helpers', () => ({
    useValidateUser: vi.fn(),
    setDateForForm: vi.fn(),
    useGetSiteUUID: vi.fn()
  }))

  beforeEach(() => {
    (useValidateUser as ReturnType<typeof vi.fn>).mockReturnValue(true)
  })

  it('Renders correctly', () => {
      render(
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <GetViolation 
              uuid={'123'} 
              handleCloseForm={handleCloseFormMock} />
          </QueryClientProvider>
        </BrowserRouter>
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
                handleCloseForm={handleCloseFormMock} />
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