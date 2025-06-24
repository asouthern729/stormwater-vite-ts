import { render, screen } from "@testing-library/react"
import { vi } from "vitest"
import * as MockAPI from '@/test/mocks/api'

// Types
import * as AppTypes from '@/context/App/types'
import { FormType } from "../../context"

// Components
import * as Components from './components'
import SiteContainer from "."

vi.mock('./components', () => ({
  Map: () => <div data-testid="map-component"></div>,
  Header: ({ site }: { site: AppTypes.SiteInterface }) => <div data-testid="site-header">{site.name}</div>,
  ActivityCalendar: () => <div data-testid="activity-calendar"></div>,
  Enforcement: () => <div data-testid="enforcement"></div>,
  Form: ({ site }: { site: AppTypes.SiteInterface }) => <div data-testid="form">{site.name}</div>
}))

const mockSite = MockAPI.createMockSite()

describe('SiteContainer', () => {

  it('Renders all child components', () => {

    render(
      <SiteContainer site={mockSite} />
    )

    const header = screen.queryByTestId('site-header')
    const activityCalendar = screen.queryByTestId('activity-calendar')
    const enforcement = screen.queryByTestId('enforcement')

    expect(header).toBeInTheDocument()
    expect(activityCalendar).toBeInTheDocument()
    expect(enforcement).toBeInTheDocument()
  })

  it('Renders form component when active', () => {
    const MockedForm = vi.mocked(Components.Form)

    render(
      <MockedForm />
    )
  })
})

describe('Header', () => {

  it('Renders the correct header value', () => {

    render(
      <SiteContainer site={mockSite} />
    )

    const header = screen.queryByTestId('site-header')

    expect(header).toBeInTheDocument()
  })
})