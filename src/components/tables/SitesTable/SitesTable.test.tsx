import { BrowserRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { instance } from 'ts-mockito'
import { mockSite } from '../../../test/mocks'

// Components
import SitesTable from './SitesTable'

describe('SitesTable', () => {
  const sites = Array.from({ length: 5 }, () => instance(mockSite()))

  it('Renders correctly', () => {
      render(
        <BrowserRouter>
          <SitesTable sites={sites} />
        </BrowserRouter>
      )

      const element = screen.getByTestId('sites-table')
  
      expect(element).toBeInTheDocument()
  })
})