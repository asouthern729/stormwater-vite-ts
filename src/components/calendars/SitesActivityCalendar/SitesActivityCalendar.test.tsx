import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { instance } from 'ts-mockito'
import { mockSite } from '../../../test/mocks'

// Components
import SitesActivityCalendar from './SitesActivityCalendar'

describe('SitesActivityCalendar', () => {
  const handleCellClickMock = vi.fn()
  const handleEventClickMock = vi.fn()

  const site = mockSite()

  it('Renders correctly', () => {
      render(
        <SitesActivityCalendar
          sites={[instance(site)]}
          handleCellClick={handleCellClickMock}
          handleEventClick={handleEventClickMock} />
      )

      const element = screen.getByTestId('sites-acitivity-calendar')
  
      expect(element).toBeInTheDocument()
  })
})