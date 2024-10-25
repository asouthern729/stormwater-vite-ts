import { QueryClient, QueryClientProvider } from 'react-query'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { instance } from 'ts-mockito'
import { mockSiteLog } from '../../../../test/mocks'

// Types
import UpdateSiteLogForm from '../../update/UpdateSiteLogForm/UpdateSiteLogForm'

// Components
import GetSiteLog from './GetSiteLog'

describe('GetSiteLog', () => {
  const queryClient = new QueryClient()
  const resetStateMock = vi.fn()

  it('Renders correctly', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <GetSiteLog
            uuid={'123'}
            resetState={resetStateMock} />
        </QueryClientProvider>
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

    const element = screen.getByTestId('update-site-log-form')
    expect(element).toBeInTheDocument()
  })
})
