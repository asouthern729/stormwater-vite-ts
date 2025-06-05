import { createContext, useReducer } from "react"

// Types
import { ReactNode, Reducer, Dispatch } from "react"
import { BasemapType } from "../sites/context"

export type FormType = 
  | 'createSiteLog'
  | 'createViolation'
  | 'createComplaint'
  | 'createIllicitDischarge'
  | 'updateSite'
  | 'updateSiteLog'
  | 'updateViolation'
  | 'updateComplaint'
  | 'updateIllicitDischarge'

type SiteCtx = {
  dispatch: Dispatch<SiteAction>
  activeForm: FormType | undefined
  basemap: BasemapType
  formDate: string
  formUUID: string
  showClosedSiteIssues: boolean
}

type SiteState = Omit<SiteCtx, 'dispatch'>

type SiteAction =
  | { type: 'SET_FORM_UUID', payload: string }
  | { type: 'SET_BASEMAP', payload: BasemapType }
  | { type: 'SET_ACTIVE_FORM', payload: FormType | undefined }
  | { type: 'SET_FORM_DATE', payload: string }
  | { type: 'TOGGLE_SHOW_CLOSED_SITE_ISSUES' }
  | { type: 'RESET_CTX' }

const initialState: SiteState = {
  basemap: 'dark-gray-vector',
  activeForm: undefined,
  formDate: '',
  formUUID: '',
  showClosedSiteIssues: false
}

const SiteCtx = createContext<SiteCtx>({
  ...initialState,
  dispatch: () => null
})

const siteReducer = (state: SiteState, action: SiteAction) => {

  switch(action.type) {
    case 'SET_FORM_UUID':
      return {
        ...state,
        formUUID: action.payload
      }
    case 'SET_BASEMAP':
      return {
        ...state,
        basemap: action.payload
      }
    case 'SET_ACTIVE_FORM':
      return {
        ...state,
        activeForm: action.payload
      }
    case 'SET_FORM_DATE':
      return {
        ...state,
        formDate: action.payload
      }
    case 'TOGGLE_SHOW_CLOSED_SITE_ISSUES':
      return {
        ...state,
        showClosedSiteIssues: !state.showClosedSiteIssues
      }
    case 'RESET_CTX':
      return initialState
    default:
      return state
  }
}

export const SiteProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<SiteState, SiteAction>>(siteReducer, initialState)

  return (
    <SiteCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </SiteCtx.Provider>
  ) 
}

export default SiteCtx