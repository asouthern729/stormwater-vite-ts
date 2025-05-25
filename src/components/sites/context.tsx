import { createContext, useReducer } from "react"

// Types
import { ReactNode, Reducer, Dispatch } from "react"

type SitesCtx = {
  dispatch: Dispatch<SitesAction>
  hoveredSite: string
  searchValue: string
  showActiveSitesOnly: boolean
  showOpenIssuesOnly: boolean
}

type SitesState = Omit<SitesCtx, 'dispatch'>

type SitesAction =
  | { type: 'SET_SEARCH_VALUE', payload: string }
  | { type: 'TOGGLE_SHOW_ACTIVE_SITES_ONLY' }
  | { type: 'TOGGLE_OPEN_ISSUES_ONLY' }
  | { type: 'SET_HOVERED_SITE', payload: string }

const initialState: SitesState = {
  searchValue: '',
  hoveredSite: '',
  showActiveSitesOnly: true,
  showOpenIssuesOnly: true,
}

const SitesCtx = createContext<SitesCtx>({
  ...initialState,
  dispatch: () => null
})

const projectsReducer = (state: SitesState, action: SitesAction) => {

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
    default:
      return state
  }
}

export const SitesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<Reducer<SitesState, SitesAction>>(projectsReducer, initialState)

  return (
    <SitesCtx.Provider value={{ ...state, dispatch }}>
      {children}
    </SitesCtx.Provider>
  ) 
}

export default SitesCtx