// Types
import * as AppTypes from '@/context/App/types'
import { HandleSiteSelectProps } from "./types"

// Components
import CreateComplaintForm from "../../create/CreateComplaintForm"
import CreateIllicitDischargeForm from "../../create/CreateIllicitDischargeForm"
import CreateViolationForm from '../../create/CreateViolationForm'

export const handleSiteSelect = (event: HandleSiteSelectProps['event'], options: HandleSiteSelectProps['options']): void => { // Handle site select
  const { setState } = options

  const selection = event.currentTarget.value

  setState({ siteId: selection })
}

type CreateFormMapProps = { date: string, site: AppTypes.SiteInterface | undefined }

export type CreateFormType = 'complaint' | 'discharge' | 'violation'

export const createFormMap = new Map<CreateFormType, (props: CreateFormMapProps) => JSX.Element>([
  ['complaint', CreateComplaintForm],
  ['discharge', CreateIllicitDischargeForm],
  ['violation', CreateViolationForm]
])