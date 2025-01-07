import { render, screen } from '@testing-library/react'
import { instance, when } from 'ts-mockito'
import { mockSiteContact, mockContact } from '../../../test/mocks'
import { setSiteContactsTableData } from './utils'

// Components
import SiteContactsTable from './SiteContactsTable'

describe('SiteContactsTable', () => {
  const siteContactsArray = Array.from({ length: 5 }, () => {
    const siteContact = mockSiteContact()
    const contact = mockContact()
    when(contact.phone).thenReturn(null)
    when(siteContact.Contact).thenReturn(instance(contact))

    return instance(siteContact)
  })

  it('Renders correctly', () => {
      render(<SiteContactsTable siteContacts={siteContactsArray} />)

      const element = screen.getByTestId('site-contacts-table')
  
      expect(element).toBeInTheDocument()
  })

  it('setSiteContactsTableData returns SiteContactObj[]', () => {
    const TestComponent = () => {
      const tableData = setSiteContactsTableData(siteContactsArray)

      return (
        <div>Total Rows = {tableData.length}</div>
      )
    }

    render (
      <TestComponent />
    )

    const text = screen.getByText('Total Rows = 5')
    expect(text).toBeInTheDocument()
  })
})
