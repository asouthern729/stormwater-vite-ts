import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { instance, when } from 'ts-mockito'
import { useValidateUser } from '../../../../helpers'
import { mockGreen } from '../../../../test/mocks'

// Components
import GetGreen from './GetGreen'
import UpdateGreenViolationForm from '../../update/UpdateGreenViolationForm/UpdateGreenViolationForm'

describe('GetGreen', () => {
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

  const green = mockGreen()
  when(green.date).thenReturn('2024-10-21')
  when(green.penaltyDate).thenReturn(undefined)
  when(green.penaltyDueDate).thenReturn(undefined)
  when(green.paymentReceived).thenReturn(undefined)

  it('Renders correctly', () => {
      render(
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <GetGreen
              uuid={'123'}
              handleCloseForm={handleCloseFormMock} />
          </QueryClientProvider>
        </BrowserRouter>
      )
      
      const element = screen.getByTestId('get-green')
      expect(element).toBeInTheDocument()
  })

  it('Conditionally renders', () => {
    const TestComponent = () => {
      const data = {
        data: instance(green)
      }

      return (
        <>
          {data?.data && (
            <div className="flex flex-col items-center">
              <UpdateGreenViolationForm
                green={data.data}
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

    const element = screen.getByTestId('update-green-violation-form')
    expect(element).toBeInTheDocument()
  })
})