import { useState } from 'react'
import { BrowserRouter, useNavigate} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { render, screen, fireEvent } from '@testing-library/react'
import { mockSite } from '../../../../test/mocks'
import { vi } from 'vitest'
import { instance } from 'ts-mockito'
import { useValidateUser } from '../../../../helpers'
import { setCreateForm } from '.'

// Types
import { CreateForm } from '../../../../pages/Create/types'
import { GetSiteState } from './types'

// Components
import GetSite from './GetSite'
import FormContainer from '../../FormContainer/FormContainer'

describe('GetSite', () => {
  const site = mockSite()
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
            <GetSite form={'createViolation'} />
          </QueryClientProvider>
        </BrowserRouter>
      )

      const element = screen.getByTestId('get-site')
  
      expect(element).toBeInTheDocument()
  })

  it('Conditionally renders', () => {
    const { rerender } = render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <GetSite form={'createViolation'} />
        </QueryClientProvider>
      </BrowserRouter>
  )

    let button = screen.queryByRole('button')
    expect(button).not.toBeInTheDocument() // Inactive

    rerender(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <GetSite form={'createComplaint'} />
        </QueryClientProvider>
      </BrowserRouter>
    )

    button = screen.getByRole('button')
    expect(button).toBeInTheDocument() // Active
  })

  it('Conditionally renders FormContainer', () => {
    const TestComponent = ({ form }: { form: CreateForm }) => {
      const [state, setState] = useState<GetSiteState>({ siteId: null })

      const navigate = useNavigate()

      return (
        <>
          <button type="button" onClick={() => setState({ siteId: '123' })}></button>
          {state.siteId !== null && (
            <FormContainer>
              {setCreateForm(form, instance(site), { navigate: () => navigate('/') })}
            </FormContainer>
          )}
        </>
      )
    }

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <TestComponent form={'createComplaint'} />
        </QueryClientProvider>
      </BrowserRouter>
    )

    const element = screen.queryByTestId('form-container')
    expect(element).not.toBeInTheDocument()

    const button = screen.getByRole('button')
    fireEvent.click(button)

    const afterElement = screen.getByTestId('create-site-complaint-form')
    expect(afterElement).toBeInTheDocument()
  })
})