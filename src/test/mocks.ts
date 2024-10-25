import { mock, when } from 'ts-mockito'
import { vi } from 'vitest'

// Types
import { Site, Inspector, ConstructionViolation, Complaint, IllicitDischarge, GreenInfrastructure, Contact, FollowUp, SiteLog, SiteContact } from '../context/App/types'

export const mockSite = () => { // Mock site
  const site = mock<Site>()
  
  when(site.Logs).thenReturn([])
  when(site.Complaints).thenReturn([])
  when(site.ConstructionViolations).thenReturn([])
  when(site.IllicitDischarges).thenReturn([])
  when(site.Attachments).thenReturn([])
  when(site.Inspector).thenReturn(mockInspector())
  when(site.SiteContacts).thenReturn([])

  return site
}

export const mockInspector = (): Inspector => { // Mock inspector
  const inspector = mock<Inspector>()

  return inspector
}

export const mockViolation = (): ConstructionViolation => { // Mock violation
  const violation = mock<ConstructionViolation>()

  when(violation.FollowUpDates).thenReturn([])

  return violation
}

export const mockComplaint = (): Complaint => { // Mock complaint
  const complaint = mock<Complaint>()

  when(complaint.FollowUpDates).thenReturn([])

  return complaint
}

export const mockDischarge = (): IllicitDischarge => { // Mock illicit discharge
  const discharge = mock<IllicitDischarge>()

  when(discharge.FollowUpDates).thenReturn([])

  return discharge
}

export const mockGreen = (): GreenInfrastructure => { // Mock green infrastructure violation
  const green = mock<GreenInfrastructure>()

  when(green.FollowUpDates).thenReturn([])

  return green
}

export const mockContact = (): Contact => { // Mock site contact
  const contact = mock<Contact>()

  when(contact.SiteContacts).thenReturn([])

  return contact
}

export const mockFollowUp = (): FollowUp => { // Mock follow up 
  const followUp = mock<FollowUp>()

  return followUp
}

export const mockSiteLog = (): SiteLog => { // Mock site log
  const siteLog = mock<SiteLog>()

  return siteLog
}

export const mockSiteContact = (): SiteContact => { // Mock site contact
  const siteContact = mock<SiteContact>()

  return siteContact
}

vi.mock('@arcgis/core/Map', () => ({ // Mock Map
  default: vi.fn().mockImplementation(() => ({
    basemap: 'streets-vector',
    add: vi.fn(),
    remove: vi.fn(),
    addMany: vi.fn(),
    view: vi.fn()
  }))
}))

vi.mock('@arcgis/core/views/MapView', () => ({ // Mock MapView
  default: vi.fn().mockImplementation(() => ({
    on: vi.fn(),
    when: vi.fn().mockImplementation(callback => callback()),
    goTo: vi.fn(),
    hitTest: vi.fn().mockResolvedValue({}),
    ui: {
      add: vi.fn()
    }
  }))
}))