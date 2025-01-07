import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { instance } from 'ts-mockito'
import { useValidateUser } from '../../../../helpers'
import { mockSiteLog } from '../../../../test/mocks'

// Types
import UpdateSiteLogForm from '../../update/UpdateSiteLogForm/UpdateSiteLogForm'

// Components
import GetSiteLog from './GetSiteLog'

describe('GetSiteLog', () => {
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
            <GetSiteLog
              uuid={'123'}
              handleCloseForm={handleCloseFormMock} />
          </QueryClientProvider>
        </BrowserRouter>
      )

      const element = screen.getByTestId('get-site-log')
  
      expect(element).toBeInTheDocument()
  })

  it('Conditionally renders', () => {
    const TestComponent = () => {
      const data = {
        data: instance(mockSiteLog())
      }

      return (
        <>
          {data?.data && (
            <div className="flex flex-col items-center">
              <UpdateSiteLogForm
                siteLog={data.data}
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

    const element = screen.getByTestId('update-site-log-form')
    expect(element).toBeInTheDocument()
  })
})
