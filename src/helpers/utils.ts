import { MapHitInterface } from "@/components/sites/containers/SitesContainer/types"

export const authHeaders = (token: string | undefined) => {
  const headers = new Headers()

  if(token) {
    headers.append('Authorization', `Bearer ${ token }`)
  }

  return headers
}

export const formatPhone = (phone: string): string | undefined => { // Format phone number
  if(phone) {
    return `${ phone.slice(0, 3) }-${ phone.slice(3, 6) }-${ phone.slice(6, 10) }`
  }
}

export const mapHitTest = (results: __esri.ViewHit[]) => { // Checks if a feature is present in map hit results
  return results.find(result => {
    const hit = result as MapHitInterface

    return hit.graphic?.attributes?.uuid
  })
}