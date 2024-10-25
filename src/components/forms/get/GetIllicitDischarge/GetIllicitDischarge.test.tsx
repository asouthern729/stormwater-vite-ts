import { QueryClient, QueryClientProvider } from 'react-query'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { instance, when } from 'ts-mockito'
import { mockDischarge } from '../../../../test/mocks'

// Components
import GetIllicitDischarge from './GetIllicitDischarge'
import UpdateSiteIllicitDischargeForm from '../../update/UpdateSiteIllicitDischargeForm/UpdateSiteIllicitDischargeForm'

describe('GetIllicitDischarge', () => {
  const resetStateMock = vi.fn()

  const queryClient = new QueryClient()

  const discharge = mockDischarge()
  when(discharge.date).thenReturn('2024-10-21')
  when(discharge.penaltyDate).thenReturn(undefined)
  when(discharge.penaltyDueDate).thenReturn(undefined)
  when(discharge.paymentReceived).thenReturn(undefined)

  it('Renders correctly', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <GetIllicitDischarge 
          uuid= {'123'}
          resetState={resetStateMock} />
      </QueryClientProvider>
    )

    const element = screen.getByTestId('get-illicit-discharge')
    expect(element).toBeInTheDocument()
  })

  it('Conditionally renders', () => {
    const TestComponent = () => {
      const data = {
        data: instance(discharge)
      }

      return (
        <>
          {data?.data && (
            <QueryClientProvider client={queryClient}>
              <UpdateSiteIllicitDischargeForm 
                illicitDischarge={data.data}
                resetState={resetStateMock} />
            </QueryClientProvider>
            
          )}
        </>
      )
    }

    render(<TestComponent />)

    const element = screen.getByTestId('update-site-illicit-discharge-form')
    expect(element).toBeInTheDocument()
  })
})