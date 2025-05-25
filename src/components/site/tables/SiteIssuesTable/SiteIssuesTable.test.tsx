import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { mockSite, mockViolation } from '../../../../test/mocks'

// Components
import SiteIssuesTable from './SiteIssuesTable'
import { instance, when } from 'ts-mockito'

describe('SiteIssuesTable', () => {
  const site = mockSite()
  const violationsArray = Array.from({ length: 10 }, () => {
    const violation = mockViolation()
    when(violation.FollowUpDates).thenReturn([])

    return instance(violation)
  })
  when(site.Complaints).thenReturn([])
  when(site.ConstructionViolations).thenReturn(violationsArray)

  const handleRowClickMock = vi.fn()

  it('Renders correctly', () => {
      render(
        <SiteIssuesTable
          site={instance(site)}
          handleRowClick={handleRowClickMock} />
      )
  
      const element = screen.getByRole('table')

      expect(element).toBeInTheDocument()
  })

  it('Conditionally renders', () => {
    render(
      <SiteIssuesTable
        site={instance(site)}
        handleRowClick={handleRowClickMock} />
    )

    const element = screen.getByTestId('show-all-btn')
    
    expect(element).toBeInTheDocument()
  })
})