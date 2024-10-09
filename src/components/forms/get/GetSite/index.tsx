import { useQuery } from "react-query"
import { getActiveSiteNames } from "../../../../context/App/AppActions"
import { setDateForForm } from "../../../../helpers"

// Types
import { ReactElement } from "react"
import { UseQueryResult } from "react-query"
import { GetActiveSiteNamesResponse } from "../../../../context/App/types"
import { SetCreateFormProps, HandleSiteSelectProps } from "./types"

// Components
import CreateViolationForm from "../../create/CreateViolationForm/CreateViolationForm"
import CreateSiteComplaintForm from "../../create/CreateSiteComplaintForm/CreateSiteComplaintForm"
import CreateSiteIllicitDischargeForm from "../../create/CreateSiteIllicitDischargeForm/CreateSiteIllicitDischargeForm"

export const useGetActiveSiteNames = (): UseQueryResult<GetActiveSiteNamesResponse> => { // Get active site names
  return useQuery('getActiveSiteName', () => getActiveSiteNames())
}

export const setCreateForm = (form: SetCreateFormProps['form'], site: SetCreateFormProps['site'], options: SetCreateFormProps['options']): ReactElement | undefined => { // Set form
  const { navigate } = options

  const today = setDateForForm(new Date().toString())

  let component

  switch(form) {
    case 'createViolation':
      return component = (
        <CreateViolationForm 
          key={`create-violation-${ site?.siteId }`}
          date={today as string}
          site={site as { name: string, siteId: string, xCoordinate: number, yCoordinate: number, uuid: string }}
          navigate={navigate} />
      ) as ReactElement
    case 'createComplaint':
      return component = (
        <CreateSiteComplaintForm
          key={`create-complaints-${ site?.siteId }`}
          date={today as string}
          site={site}
          navigate={navigate} />
      )
    case 'createDischarge':
      return component = (
        <CreateSiteIllicitDischargeForm
          key={`create-discharge-${ site?.siteId }`}
          date={today as string}
          site={site}
          navigate={navigate} />
      )
  }

  return component
}

export const handleSiteSelect = (event: HandleSiteSelectProps['event'], options: HandleSiteSelectProps['options']): void => { // Handle site select
  const { setState } = options

  const selection = event.currentTarget.value

  setState({ siteId: selection })
}