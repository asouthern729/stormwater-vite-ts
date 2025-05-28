import { API_URL as baseUrl, ACTIVE_SITES_URL } from '../../config'

// Types
import * as Types from './types'

// Get sites
// GET /api/v2/eng/stormwater/sites
export const getSites = async (headers: Headers): Promise<Types.ServerResponse & { data: Types.SiteInterface[] }> => {
  const res = await fetch(`${ baseUrl }/sites`, { headers })

  return await res.json()
}

// Get site
// GET /api/v2/eng/stormwater/sites/:uuid
export const getSite = async (uuid: string, headers: Headers): Promise<Types.ServerResponse & { data: Types.SiteInterface }> => {
  const res = await fetch(`${ baseUrl }/sites/${ uuid }`, { headers })

  return await res.json()
}

// Get active site names
// POST /api/v2/eng/public/active-sites
export const getActiveSiteNames = async (headers: Headers): Promise<Types.ServerResponse & { data: Types.SiteInterface[] }> => {
  const res = await fetch(`${ ACTIVE_SITES_URL }`, { headers })

  return await res.json()
}

// Create site
// POST /api/v2/eng/stormwater/sites
export const createSite = async (formData: Types.SiteCreateInterface, headers: Headers): Promise<Types.ServerResponse & { data: Types.SiteInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/sites`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update site
// PUT /api/v2/eng/stormwater/sites/:uuid
export const updateSite = async (formData: Types.SiteCreateInterface, headers: Headers): Promise<Types.ServerResponse & { data: Types.SiteInterface }> => {
  headers.append('Content-Type', 'application/json')
  
  const res = await fetch(`${ baseUrl }/sites/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData }),
  })

  return await res.json()
}

// Delete site
// DELETE /api/v2/eng/stormwater/sites/:uuid
export const deleteSite = async (uuid: string, headers: Headers): Promise<Types.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/sites/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

// Get contacts
// GET /api/v2/eng/stormwater/contacts
export const getContacts = async (headers: Headers): Promise<Types.ServerResponse & { data: Types.ContactInterface[] }> => {
  const res = await fetch(`${ baseUrl }/contacts`, { headers })

  return await res.json()
}

// Get contact
// GET /api/v2/eng/stormwater/contacts/:uuid
export const getContact = async (uuid: string, headers: Headers): Promise<Types.ServerResponse & { data: Types.ContactInterface }> => {
  const res = await fetch(`${ baseUrl }/contacts/${ uuid }`, { headers })

  return await res.json()
}

// Create contact
// POST /api/v2/eng/stormwater/contacts
export const createContact = async (formData: Types.ContactCreateInterface, headers: Headers): Promise<Types.ServerResponse & { data: Types.ContactInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/contacts`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update contact
// PUT /api/v2/eng/stormwater/contacts/:uuid
export const updateContact = async (formData: Types.ContactCreateInterface, headers: Headers): Promise<Types.ServerResponse & { data: Types.ContactInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/contacts/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete contact
// DELETE /api/v2/eng/stormwater/contacts/:uuid 
export const deleteContact = async (uuid: string, headers: Headers): Promise<Types.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/contacts/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

// Create site contact
// POST /api/v2/eng/stormwater/sitecontacts
export const createSiteContact = async (formData: Types.SiteContactCreateInterface, headers: Headers): Promise<Types.ServerResponse & { data: Types.SiteContactInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/sitecontacts`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete site contacts by siteId
// DELETE /api/v2/stormwater/sitecontacts/site/:siteid
export const deleteSiteContacts = async (siteId: string, headers: Headers): Promise<Types.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/sitecontacts/site/${ siteId }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

// Create follow up date
// POST /api/v2/stormwater/followup
export const createFollowUp = async (formData: Types.FollowUpCreateInterface, headers: Headers): Promise<Types.ServerResponse & { data: Types.FollowUpInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/followup`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData }),
  })

  return await res.json()
}

// Get follow up date
// GET /api/v2/stormwater/followup
export const getFollowUp = async (uuid: string, headers: Headers): Promise<Types.ServerResponse & { data: Types.FollowUpInterface }> => {
  const res = await fetch(`${ baseUrl }/followup/${ uuid }`, { headers })

  return await res.json()
}

// Update follow up date
// PUT /api/v2/stormwater/followup
export const updateFollowUp = async (formData: Types.FollowUpCreateInterface, headers: Headers) => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/followup/${ formData.uuid }`, { headers })

  return await res.json()
}

// Delete follow up date
// DELETE /api/v2/eng/stormwater/followup?parentId=parentId&followUpDate=followUpDate
export const deleteFollowUp = async (uuid: string, headers: Headers): Promise<Types.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/followup/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

// Get inspectors
// GET /api/v2/eng/stormwater/inspectors
export const getInspectors = async (headers: Headers): Promise<Types.ServerResponse & { data: Types.InspectorInterface[] }> => {
  const res = await fetch(`${ baseUrl }/inspectors`, { headers })

  return await res.json()
}

// Get inspector
// GET /api/v2/eng/stormwater/inspectors/:inspectorId
export const getInspector = async (inspectorId: string, headers: Headers): Promise<Types.ServerResponse & { data: Types.InspectorInterface }> => {
  const res = await fetch(`${ baseUrl }/inspectors/${ inspectorId }`, { headers })

  return await res.json()
}

// Create inspector
// POST /api/v2/eng/stormwater/inspectors
export const createInspector = async (formData: Types.InspectorCreateInterface, headers: Headers): Promise<Types.ServerResponse & { data: Types.InspectorInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/inspectors`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update inspector
// PUT /api/v2/eng/stormwater/inspectors/:inspectorid
export const updateInspector = async (formData: Types.InspectorCreateInterface, headers: Headers): Promise<Types.ServerResponse & { data: Types.InspectorInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/inspectors/${ formData.inspectorId }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete inspector
// DELETE /api/v2/eng/stormwater/inspectors/:inspectorid
export const deleteInspector = async (inspectorid: string, headers: Headers): Promise<Types.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/inspectors/${ inspectorid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

// Create site log
// POST /api/v2/eng/stormwater/logs
export const createSiteLog = async (formData: Types.SiteLogCreateInterface, headers: Headers): Promise<Types.ServerResponse & { data: Types.SiteLogInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/logs`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Get site log
// GET /api/v2/eng/stormwater/logs/:uuid
export const getSiteLog = async (uuid: string, headers: Headers): Promise<Types.ServerResponse & { data: Types.SiteLogInterface }> => {
  const res = await fetch(`${ baseUrl }/logs/${ uuid }`, { headers })

  return await res.json()
}

// Update site log
// PUT /api/v2/eng/stormwater/logs/:uuid
export const updateSiteLog = async (formData: Types.SiteLogCreateInterface, headers: Headers): Promise<Types.ServerResponse & { data: Types.SiteLogInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/logs/${ formData.uuid }`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData }),
    credentials: 'include'
  })

  return await res.json()
}

// Delete site log
// DELETE /api/v2/eng/stormwater/logs/:uuid
export const deleteSiteLog = async (uuid: string, headers: Headers): Promise<Types.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/logs/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

// Create construction violation
// POST /api/v2/eng/stormwater/violations
export const createViolation = async (formData: Types.ConstructionViolationCreateInterface, headers: Headers): Promise<Types.ServerResponse & { data: Types.ConstructionViolationInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/violations`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Get construction violation
// GET /api/v2/eng/stormwater/violations/:uuid
export const getViolation = async (uuid: string, headers: Headers): Promise<Types.ServerResponse & { data: Types.ConstructionViolationInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/violations/${ uuid }`, {
    credentials: 'include'
  })

  return await res.json()
}

// Get construction violations
// GET /api/v2/eng/stormwater/violations
export const getViolations = async (headers: Headers): Promise<Types.ServerResponse & { data: Types.ConstructionViolationInterface[] }> => {
  const res = await fetch(`${ baseUrl }/violations`, { headers })

  return await res.json()
}

// Update construction violation
// PUT /api/v2/eng/stormwater/violations/:uuid
export const updateViolation = async (formData: Types.ConstructionViolationCreateInterface, headers: Headers): Promise<Types.ServerResponse & { data: Types.ConstructionViolationInterface }> => {
  headers.append('Conten-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/violations/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData }),
  })

  return await res.json()
}

// Delete construction violation
// DELETE /api/v2/eng/stormwater/violations/:uuid
export const deleteViolation = async (uuid: string, headers: Headers): Promise<Types.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/violations/${ uuid }`, {
    method: 'DELETE',
    headers
  })
  
  return await res.json()
}

// Create complaint
// POST /api/v2/eng/stormwater/complaints
export const createComplaint = async (formData: Types.ComplaintCreateInterface, headers: Headers): Promise<Types.ServerResponse & { data: Types.ComplaintInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/complaints`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Get complaint
// GET /api/v2/eng/stormwater/complaints/:uuid
export const getComplaint = async (uuid: string, headers: Headers): Promise<Types.ServerResponse & { data: Types.ComplaintInterface }> => {
  const res = await fetch(`${ baseUrl }/complaints/${ uuid }`, { headers })

  return await res.json()
}

// Get complaints - no associated site
// GET /api/v2/eng/stormwater/complaints
export const getComplaints = async (headers: Headers): Promise<Types.ServerResponse & { data: Types.ComplaintInterface[] }> => {
  const res = await fetch(`${ baseUrl }/complaints`, { headers })

  return await res.json()
}

// Update complaint
// PUT /api/v2/eng/stormwater/complaints/:uuid
export const updateComplaint = async (formData: Types.ComplaintCreateInterface, headers: Headers): Promise<Types.ServerResponse & { data: Types.ComplaintInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/complaints/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete complaint
// DELETE /api/v2/eng/stormwater/complaints/:uuid
export const deleteComplaint = async (uuid: string, headers: Headers): Promise<Types.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/complaints/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}

// Create illicit discharge
// POST /api/v2/eng/stormwater/illicitdischarges
export const createIllicitDischarge = async (formData: Types.IllicitDischargeCreateInterface, headers: Headers): Promise<Types.ServerResponse & { data: Types.IllicitDischargeInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/illicitdischarges`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Get illicit discharge
// GET /api/v2/eng/stormwater/illicitdischarges/:uuid
export const getIllicitDischarge = async (uuid: string, headers: Headers): Promise<Types.ServerResponse & { data: Types.IllicitDischargeInterface }> => {
  const res = await fetch(`${ baseUrl }/illicitdischarges/${ uuid }`, { headers })

  return await res.json()
}

// Get illicit discharges - no associated site
// GET /api/v2/eng/stormwater/illicitdischarges
export const getIllicitDischarges = async (headers: Headers): Promise<Types.ServerResponse & { data: Types.IllicitDischargeInterface[] }> => {
  const res = await fetch(`${ baseUrl }/illicitdischarges`, { headers })

  return await res.json()
}

// Update illicit discharge
// PUT /api/v2/eng/stormwater/illicitdischarges/:uuid
export const updateIllicitDischarge = async (formData: Types.IllicitDischargeCreateInterface, headers: Headers): Promise<Types.ServerResponse & { data: Types.IllicitDischargeInterface }> => {
  headers.append('Content-Type', 'application/json')

  const res = await fetch(`${ baseUrl }/illicitdischarges/${ formData.uuid }`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete illicit discharge
// DELETE /api/v2/eng/stormwater/illicitdischarges/:uuid
export const deleteIllicitDischarge = async (uuid: string, headers: Headers): Promise<Types.ServerResponse> => {
  const res = await fetch(`${ baseUrl }/illicitdischarges/${ uuid }`, {
    method: 'DELETE',
    headers
  })

  return await res.json()
}