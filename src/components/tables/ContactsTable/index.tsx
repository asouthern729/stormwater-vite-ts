import { Link } from "react-router-dom"
import { formatPhone } from "../../../helpers"

// Types
import { ReactElement } from "react"
import { SetTableDataProps } from "./types"

export const setContactTableDataCell = (contact: SetTableDataProps['contact']): ReactElement => { // Set contact table data
  const phone = formatPhone(contact.phone as string)
  
  return (
    <td>
      <div className="flex flex-col">
        <div className="font-extrabold">{contact.name}</div>
        <div>{contact.company}</div>
        <a href={`tel:${ phone }`} className="w-fit hover:text-info" onClick={(event) => event.stopPropagation()}>{phone}</a>
        <a href={`mailto:${contact.email}`} className="w-fit hover:text-info" onClick={(event) => event.stopPropagation()}>{contact.email}</a>
      </div>
    </td>
  )
}

export const setSitesTableData = (contact: SetTableDataProps['contact']): ReactElement => { // Set sites table data
  const sites: { name: string, uuid: string }[] = []

  contact.SiteContacts.forEach(sitecontact => {
    sites.push({ name: sitecontact.Site.name, uuid: sitecontact.Site.uuid })}
  )

  return (
    <td>
      <div className="flex flex-col items-center">
        {sites.sort().map(site => {
          return (
            <Link to={`/site/${ site.uuid }`} className="hover:text-info">{site.name}</Link>
          )
        })}
      </div>
    </td>
  )
}