import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { instance } from 'ts-mockito'
import { useValidateUser } from '../../../../helpers'
import { mockContact } from '../../../../test/mocks'

// Components
import GetContact from './GetContact'
import UpdateContactForm from '../../update/UpdateContactForm/UpdateContactForm'

describe('GetContact', () => {
  const handleCloseFormMock = vi.fn()

  vi.mock('../../../../helpers', () => ({
    useValidateUser: vi.fn(),
    setDateForForm: vi.fn(),
    useGetSiteUUID: vi.fn()
  }))

  beforeEach(() => {
    (useValidateUser as ReturnType<typeof vi.fn>).mockReturnValue(true)
  })

  it('Renders correctly', () => {
    const queryClient = new QueryClient()

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <GetContact
            uuid={'123'}
            handleCloseForm={handleCloseFormMock} />
        </QueryClientProvider>
      </BrowserRouter>
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
                handleCloseForm={handleCloseFormMock} />
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