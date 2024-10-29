import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { instance, when } from 'ts-mockito'
import { useValidateUser } from '../../../../helpers'
import { mockComplaint } from '../../../../test/mocks'

// Components
import GetComplaint from './GetComplaint'
import UpdateSiteComplaintForm from '../../update/UpdateSiteComplaintForm/UpdateSiteComplaintForm'

describe('GetComplaint', () => {
  const resetStateMock = vi.fn()

  vi.mock('../../../../helpers', () => ({
    useValidateUser: vi.fn(),
    setDateForForm: vi.fn(),
    useGetSiteUUID: vi.fn()
  }))

  beforeEach(() => {
    (useValidateUser as ReturnType<typeof vi.fn>).mockReturnValue(true)
  })

  const complaint = mockComplaint()
  when(complaint.date).thenReturn('2024-10-21')

  it('Renders correctly', () => {
    const queryClient = new QueryClient()

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <GetComplaint
            uuid={'123'}
            resetState={resetStateMock} />
        </QueryClientProvider>
      </BrowserRouter>
    )

    const element = screen.getByTestId('get-complaint')
    expect(element).toBeInTheDocument()
  })

  it('Conditionally renders', () => {
    const TestComponent = () => {
      const data = {
        data: instance(complaint)
      }

      return (
        <>
          {data?.data && (
            <div className="flex flex-col items-center">
              <UpdateSiteComplaintForm 
                complaint={data?.data}
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

    const element = screen.getByTestId('update-site-complaint-form')
    expect(element).toBeInTheDocument()
  })
})