import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { instance } from 'ts-mockito'
import { mockSite } from '../../../test/mocks'

// Components
import SitesIssuesTable from './SitesIssuesTable'

describe('SitesIssuesTable', () => {
  const sitesArray = Array.from({ length: 5 }, () => {
    const site = mockSite()
    return instance(site)
  })

  const handleRowClickMock = vi.fn()

  it('Renders correctly', () => {
    render(
      <BrowserRouter>
        <SitesIssuesTable
          sites={sitesArray}
          issues={{ complaints: [], discharges: [], green: [] }}
          handleRowClick={handleRowClickMock} />
      </BrowserRouter>
    )      
    
    const element = screen.getByTestId('sites-issues-table')

    expect(element).toBeInTheDocument()
  })
})