import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { instance } from 'ts-mockito'
import { mockSite } from '../../../test/mocks'

// Types
import { SiteContainerState } from '../../containers/SiteContainer/types'

// Components
import SetSiteForm from './SetSiteForm'

describe('SetSiteForm', () => {
  const setStateMock = vi.fn()
  const queryClient = new QueryClient()

  it('Renders correctly', () => {
      const state: SiteContainerState = {
        activeForm: 'createSiteLog',
        formDate: '2024-10-22',
        deleteBtnActive: false,
        formUUID: '123'
      }

      render(
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <SetSiteForm 
                state={state}
                site={instance(mockSite())}
                setState={setStateMock} />)
          </QueryClientProvider>
        </BrowserRouter>
      )

      const element = screen.getByTestId('set-site-form')
  
      expect(element).toBeInTheDocument()
  })

  it('setForm renders the correct form', () => {
    const state: SiteContainerState = {
      activeForm: 'createSiteLog',
      formDate: '2024-10-22',
      deleteBtnActive: false,
      formUUID: '123'
    }

    render(
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <SetSiteForm 
              state={state}
              site={instance(mockSite())}
              setState={setStateMock} />)
        </QueryClientProvider>
      </BrowserRouter>
    )

    const element = screen.getByTestId('create-site-log-form')
    expect(element).toBeInTheDocument()
  })
})