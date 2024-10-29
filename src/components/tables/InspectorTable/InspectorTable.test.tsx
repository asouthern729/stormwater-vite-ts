import { render, screen } from '@testing-library/react'
import { instance } from 'ts-mockito'
import { mockSite } from '../../../test/mocks'

// Components
import InspectorTable from './InspectorTable'

describe('InspectorTable', () => {
  const sitesMock = Array.from({ length: 5 }).map(() => {
    return instance(mockSite())
  })

  it('Renders correctly', () => {
    render(<InspectorTable sites={sitesMock} />)

    const element = screen.getByTestId('inspector-table')

    expect(element).toBeInTheDocument()
  })
})