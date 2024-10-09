import { API_URL as baseUrl } from '../../config'

// Types
import { ServerResponse, GetSitesResponse, GetSiteResponse, GetActiveSiteNamesResponse, CreateSiteResponse, UpdateSiteResponse, GetContactsResponse, GetContactResponse, CreateContactResponse, UpdateContactResponse, CreateSiteContactsResponse, CreateFollowUpResponse, GetInspectorsResponse, CreateViolationResponse, CreateComplaintResponse, CreateIllicitDischargeResponse, GetSiteLogResponse, GetViolationResponse, GetViolationsResponse, GetComplaintResponse, GetComplaintsResponse, GetFollowUpResponse, GetIllicitDischargeResponse, GetInspectorResponse, SiteObj, ContactObj, SiteContactObj, SiteLogObj, ViolationObj, ComplaintObj, IllicitObj, FollowUpObj } from './types'

// Get sites
// GET /api/v1/eng/stormwater/sites
export const getSites = async (): Promise<GetSitesResponse> => {
  const res = await fetch(`${ baseUrl }/sites`)

  return await res.json()
}

// Get site
// GET /api/v1/eng/stormwater/sites/:uuid
export const getSite = async (uuid: string): Promise<GetSiteResponse> => {
  const res = await fetch(`${ baseUrl }/sites/${ uuid }`)

  return await res.json()
}

// Get active site names
// POST /api/v1/eng/stormwater/sites/active
export const getActiveSiteNames = async (): Promise<GetActiveSiteNamesResponse> => {
  const res = await fetch(`${ baseUrl }/sites/active/get`)

  return await res.json()
}

// Create site
// POST /api/v1/eng/stormwater/sites
export const createSite = async (formData: SiteObj): Promise<CreateSiteResponse> => {
  const res = await fetch(`${ baseUrl }/sites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update site
// PUT /api/v1/eng/stormwater/sites/:uuid
export const updateSite = async (formData: SiteObj): Promise<UpdateSiteResponse> => {
  const res = await fetch(`${ baseUrl }/sites/${ formData.uuid }`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete site
// DELETE /api/v1/eng/stormwater/sites/:uuid
export const deleteSite = async (uuid: string): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/sites/${ uuid }`, {
    method: 'DELETE'
  })

  return await res.json()
}

// Get contacts
// GET /api/v1/eng/stormwater/contacts
export const getContacts = async (): Promise<GetContactsResponse> => {
  const res = await fetch(`${ baseUrl }/contacts`)

  return await res.json()
}

// Get contact
// GET /api/v1/eng/stormwater/contacts/:uuid
export const getContact = async (uuid: string): Promise<GetContactResponse> => {
  const res = await fetch(`${ baseUrl }/contacts/${ uuid }`)

  return await res.json()
}

// Create contact
// POST /api/v1/eng/stormwater/contacts
export const createContact = async (formData: ContactObj): Promise<CreateContactResponse> => {
  const res = await fetch(`${ baseUrl }/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Update contact
// PUT /api/v1/eng/stormwater/contacts/:uuid
export const updateContact = async (formData: ContactObj): Promise<UpdateContactResponse> => {
  const res = await fetch(`${ baseUrl }/contact/${ formData.uuid }`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete contact
// DELETE /api/v1/eng/stormwater/contacts/:uuid 
export const deleteContact = async (uuid: string): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/contact/${ uuid }`, {
    method: 'DELETE'
  })

  return await res.json()
}

// Create site contact
// POST /api/v1/eng/stormwater/sitecontacts
export const createSiteContact = async (formData: SiteContactObj): Promise<CreateSiteContactsResponse> => {
  const res = await fetch(`${ baseUrl }/sitecontacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete site contacts by siteId
// DELETE /api/v1/stormwater/sitecontacts/site/:siteid
export const deleteSiteContacts = async (siteId: string): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/sitecontacts/site/${ siteId }`, {
    method: 'DELETE'
  })

  return await res.json()
}

// Create follow up date
// POST /api/v1/stormwater/followup
export const createFollowUp = async (formData: FollowUpObj): Promise<CreateFollowUpResponse> => {
  const res = await fetch(`${ baseUrl }/followup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Get follow up date
// GET /api/v1/stormwater/followup
export const getFollowUp = async (uuid: string): Promise<GetFollowUpResponse> => {
  const res = await fetch(`${ baseUrl }/followup/${ uuid }`)

  return await res.json()
}

// Delete follow up date
// DELETE /api/v1/eng/stormwater/followup?parentId=parentId&followUpDate=followUpDate
export const deleteFollowUp = async (uuid: string): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/followup/${ uuid }`, {
    method: 'DELETE'
  })

  return await res.json()
}

// Get inspectors
// GET /api/v1/eng/stormwater/inspectors
export const getInspectors = async (): Promise<GetInspectorsResponse> => {
  const res = await fetch(`${ baseUrl }/inspectors`)

  return await res.json()
}

// Get inspector
// GET /api/v1/eng/stormwater/inspectors/:slug
export const getInspector = async (slug: string): Promise<GetInspectorResponse> => {
  const res = await fetch(`${ baseUrl }/inspectors/${ slug }`)

  return await res.json()
}

// Create site log
// POST /api/v1/eng/stormwater/logs
export const createSiteLog = async (formData: SiteLogObj): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/logs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Get site log
// GET /api/v1/eng/stormwater/logs/:uuid
export const getSiteLog = async (uuid: string): Promise<GetSiteLogResponse> => {
  const res = await fetch(`${ baseUrl }/logs/${ uuid }`)

  return await res.json()
}

// Update site log
// PUT /api/v1/eng/stormwater/logs/:uuid
export const updateSiteLog = async (formData: SiteLogObj): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/logs/${ formData.uuid }`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete site log
// DELETE /api/v1/eng/stormwater/logs/:uuid
export const deleteSiteLog = async (uuid: string): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/logs/${ uuid }`, {
    method: 'DELETE'
  })

  return await res.json()
}

// Create construction violation
// POST /api/v1/eng/stormwater/violations
export const createViolation = async (formData: ViolationObj): Promise<CreateViolationResponse> => {
  const res = await fetch(`${ baseUrl }/violations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Get construction violation
// GET /api/v1/eng/stormwater/violations/:uuid
export const getViolation = async (uuid: string): Promise<GetViolationResponse> => {
  const res = await fetch(`${ baseUrl }/violations/${ uuid }`)

  return await res.json()
}

// Get construction violations
// GET /api/v1/eng/stormwater/violations
export const getViolations = async (): Promise<GetViolationsResponse> => {
  const res = await fetch(`${ baseUrl }/violations`)

  return await res.json()
}

// Update construction violation
// PUT /api/v1/eng/stormwater/violations/:uuid
export const updateViolation = async (formData: ViolationObj): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/violations/${ formData.uuid }`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete construction violation
// DELETE /api/v1/eng/stormwater/violations/:uuid
export const deleteViolation = async (uuid: string): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/violations/${ uuid }`, {
    method: 'DELETE'
  })
  
  return await res.json()
}

// Create complaint
// POST /api/v1/eng/stormwater/complaints
export const createComplaint = async (formData: ComplaintObj): Promise<CreateComplaintResponse> => {
  const res = await fetch(`${ baseUrl }/complaints`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Get complaint
// GET /api/v1/eng/stormwater/complaints/:uuid
export const getComplaint = async (uuid: string): Promise<GetComplaintResponse> => {
  const res = await fetch(`${ baseUrl }/complaints/${ uuid }`)

  return await res.json()
}

// Get complaints - no associated site
// GET /api/v1/eng/stormwater/complaints
export const getComplaints = async (): Promise<GetComplaintsResponse> => {
  const res = await fetch(`${ baseUrl }/complaints`)

  return await res.json()
}

// Update complaint
// PUT /api/v1/eng/stormwater/complaints/:uuid
export const updateComplaint = async (formData: ComplaintObj): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/complaints/${ formData.uuid }`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete complaint
// DELETE /api/v1/eng/stormwater/complaints/:uuid
export const deleteComplaint = async (uuid: string): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/complaints/${ uuid }`, {
    method: 'DELETE'
  })

  return await res.json()
}

// Create illicit discharge
// POST /api/v1/eng/stormwater/illicitdischarges
export const createIllicitDischarge = async (formData: IllicitObj): Promise<CreateIllicitDischargeResponse> => {
  const res = await fetch(`${ baseUrl }/illicitdischarges`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Get illicit discharge
// GET /api/v1/eng/stormwater/illicitdischarges/:uuid
export const getIllicitDischarge = async (uuid: string): Promise<GetIllicitDischargeResponse> => {
  const res = await fetch(`${ baseUrl }/illicitdischarges/${ uuid }`)

  return await res.json()
}

// Update illicit discharge
// PUT /api/v1/eng/stormwater/illicitdischarges/:uuid
export const updateIllicitDischarge = async (formData: IllicitObj): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/illicitdischarges/${ formData.uuid }`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...formData })
  })

  return await res.json()
}

// Delete illicit discharge
// DELETE /api/v1/eng/stormwater/illicitdischarges/:uuid
export const deleteIllicitDischarge = async (uuid: string): Promise<ServerResponse> => {
  const res = await fetch(`${ baseUrl }/illicitdischarges/${ uuid }`, {
    method: 'DELETE'
  })

  return await res.json()
}