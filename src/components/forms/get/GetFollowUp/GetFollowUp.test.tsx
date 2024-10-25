import { QueryClient, QueryClientProvider } from 'react-query'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { instance, when } from 'ts-mockito'
import { mockFollowUp } from '../../../../test/mocks'

// Components
import GetFollowUp from './GetFollowUp'
import UpdateFollowUpForm from '../../update/UpdateFollowUpForm/UpdateFollowUpForm'

describe('GetFollowUp', () => {
  const resetStateMock = vi.fn()
  const queryClient = new QueryClient()

  const followUp = mockFollowUp()
  when(followUp.followUpDate).thenReturn('2024-10-21')

  it('Renders correctly', () => {
      render(
        <QueryClientProvider client={queryClient}>
          <GetFollowUp
            uuid={'123'}
            resetState={resetStateMock} />
        </QueryClientProvider>
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