import { Reducer, createContext, useReducer } from 'react'
import appReducer from './AppReducer'

// Types
import { ReactNode } from 'react'
import { AppContextObj, AppState, AppAction } from './types'

const AppContext = createContext<AppContextObj>({
  dispatch: () => {},
  activePage: 'Sites',
  contactOptions: [],
  dateRangeFilter: {
    start: undefined,
    end: undefined
  },
  hoveredSite: undefined,
  inspectorOptions: [],
  searchValue: '',
  showActiveSitesOnly: true,
  showClosedSiteIssues: false,
  showMenu: false,
  showOpenIssuesOnly: false,
  showSiteComplaints: true,
  showSiteIllicitDischarges: true,
  showSiteViolations: true
})

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const initialState: AppState = {
    activePage: 'Sites',
    contactOptions: [],
    dateRangeFilter: {
      start: undefined,
      end: undefined
    },
    hoveredSite: undefined,
    inspectorOptions: [],
    searchValue: '',
    showActiveSitesOnly: true,
    showClosedSiteIssues: false,
    showMenu: false,
    showOpenIssuesOnly: false,
    showSiteComplaints: true,
    showSiteIllicitDischarges: true,
    showSiteViolations: true
  }

  const [state, dispatch] = useReducer<Reducer<AppState, AppAction>>(appReducer, initialState)

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppContext