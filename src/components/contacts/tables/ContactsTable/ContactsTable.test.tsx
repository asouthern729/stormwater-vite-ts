import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { mockContact } from '../../../../test/mocks'

// Components
import ContactsTable from './ContactsTable'
import { instance, when } from 'ts-mockito'

describe('ContactsTable', () => {
  const contactsArray = Array.from({ length: 5 }, () => {
    const contact = mockContact()
    when(contact.phone).thenReturn(null)
    
    return instance(contact)
  })
  const handleRowClickMock = vi.fn()

  it('Renders correctly', () => {
      render(
        <ContactsTable
          contacts={contactsArray}
          handleRowClick={handleRowClickMock} />)
  
      const element = screen.getByTestId('contacts-table')

      expect(element).toBeInTheDocument()
  })
})