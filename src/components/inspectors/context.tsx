import { createContext, useReducer } from "react"

// Types
import { ReactNode, Reducer, Dispatch } from "react"

type InspectorsCtx = {
  dispatch: Dispatch<InspectorsAction>
  formUUID: string
  hoveredSite: string
  searchValue: string
  showActiveSitesOnly: boolean
  showOpenIssuesOnly: boolean
}

type InspectorsState = Omit<InspectorsCtx, 'dispatch'>

type InspectorsAction =
  | { type: 'SET_SEARCH_VALUE', payload: string }
  | { type: 'TOGGLE_SHOW_ACTIVE_SITES_ONLY' }
  | { type: 'TOGGLE_OPEN_ISSUES_ONLY' }
  | { type: 'SET_HOVERED_SITE', payload: string }
  | { type: 'SET_FORM_UUID', payload: string }

const initialState: InspectorsState = {
  formUUID: '',
  searchValue: '',
  hoveredSite: '',
  showActiveSitesOnly: true,
  showOpenIssuesOnly: true,
}

const InspectorsCtx = createContext<InspectorsCtx>({
  ...initialState,
  dispatch: () => null
})

const inspectorsReducer = (state: InspectorsState, action: InspectorsAction) => {

  switch(action.type) {
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.payload
      }
    case 'TOGGLE_SHOW_ACTIVE_SITES_ONLY':
      return {
        ...state,
        showActiveSitesOnly: !state.showActiveSitesOnly
      }
    case 'TOGGLE_OPEN_ISSUES_ONLY':
      return {
        ...state,
        showOpenIssuesOnly: !state.showOpenIssuesOnly
      }
    case 'SET_HOVERED_SITE':
      return {
        ...state,
        hoveredSite: action.payload
      }
    case 'SET_FORM_UUID':
      return {
        ...state,
        formUUID: action.payload
      }
    default:
      return state
  }
}

export const InspectorsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<InspectorsState, InspectorsAction>>(inspectorsReducer, initialState)

  return (
    <InspectorsCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </InspectorsCtx.Provider>
  ) 
}

export default InspectorsCtx