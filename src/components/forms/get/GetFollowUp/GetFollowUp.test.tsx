import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { instance, when } from 'ts-mockito'
import { useValidateUser } from '../../../../helpers'
import { mockFollowUp } from '../../../../test/mocks'

// Components
import GetFollowUp from './GetFollowUp'
import UpdateFollowUpForm from '../../update/UpdateFollowUpForm/UpdateFollowUpForm'

describe('GetFollowUp', () => {
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

  const followUp = mockFollowUp()
  when(followUp.followUpDate).thenReturn('2024-10-21')

  it('Renders correctly', () => {
      render(
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <GetFollowUp
              uuid={'123'}
              handleCloseForm={handleCloseFormMock} />
          </QueryClientProvider>
        </BrowserRouter>
      )

      const element = screen.getByTestId('get-follow-up')
      expect(element).toBeInTheDocument()
  })

  it('Conditionally renders', () => {
    const TestComponent = () => {
      const data = {
        data: instance(followUp)
      }

      return (
        <>
          {data?.data && (
            <div className="flex flex-col items-center">
              <UpdateFollowUpForm
                followUp={data?.data} />
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

    const element = screen.getByTestId('update-follow-up-form')
    expect(element).toBeInTheDocument()
  })
})