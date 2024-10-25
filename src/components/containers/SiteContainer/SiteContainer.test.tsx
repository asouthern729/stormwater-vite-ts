import { useState, useRef } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { instance, when } from 'ts-mockito'
import { mockSite, mockViolation } from '../../../test/mocks'
import { useScrollToFormRef, useSetIssuesObj } from '.'

// Types
import { SiteContainerState } from './types'

// Components
import SiteContainer from './SiteContainer'
import SetSiteForm from '../../forms/SetSiteForm/SetSiteForm'

describe('SiteContainer', () => {
  const site = mockSite()
  const violation = mockViolation()
  when(site.ConstructionViolations).thenReturn([instance(violation)])

  beforeAll(() => { // Mock scroll to fns
    window.scrollTo = vi.fn()
    window.HTMLDivElement.prototype.scrollIntoView = vi.fn()
  })

  it('Renders correctly', () => {
    render(
      <BrowserRouter>
        <SiteContainer site={instance(site)} />
      </BrowserRouter>
    )

    const element = screen.getByTestId('site-container')
    
    expect(element).toBeInTheDocument()
  })

  it('Conditionally renders correctly', () => {
    const TestComponent = () => {
      const [state, setState] = useState<SiteContainerState>({ activeForm: null, formDate: undefined, deleteBtnActive: false, formUUID: undefined  })

      const formRef = useRef<HTMLDivElement>(null)

      useScrollToFormRef(state, formRef)

      const queryClient = new QueryClient()

      return (
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <>
              <button type="button" onClick={() => setState(prevState => ({ ...prevState, activeForm: 'createSiteLog', formDate: '2024-10-21' }))}></button>
              {state.activeForm && (
                <div ref={formRef}>
                  <SetSiteForm
                    state={state}
                    site={site}
                    setState={setState} />
                </div>
              )}
            </>
          </QueryClientProvider>
        </BrowserRouter>
      )
    }

    render(<TestComponent />)

    let element = screen.queryByTestId('set-site-form')
    expect(element).not.toBeInTheDocument() // Inactive

    const button = screen.getByRole('button')
    fireEvent.click(button)

    element = screen.getByTestId('set-site-form')
    expect(element).toBeInTheDocument() // Active
  })

  it('useSetIssuesObj returns issues object', () => {
    const TestComponent = () => {
      const issuesObj = useSetIssuesObj(instance(site)) // Should return an object with 1 violation

      return (
        <div>Violations Length = {issuesObj.violations.length}</div>
      )
    }

    render(<TestComponent />)
    const text = screen.getByText('Violations Length = 1')

    expect(text).toBeInTheDocument()
  })
})