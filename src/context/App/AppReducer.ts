// Types
import { AppReducerProps } from './types'

const appReducer = (state: AppReducerProps['state'], action: AppReducerProps['action']) => {
  switch(action.type) {
    case 'SET_ACTIVE_PAGE':
      return {
        ...state,
        activePage: action.payload
      }
    case 'SET_SEARCH_VALUE':
      return {
        ...state,
        searchValue: action.payload
      }
    case 'TOGGLE_SHOW_OPEN_ISSUES_ONLY':
      return {
        ...state,
        showOpenIssuesOnly: !state.showOpenIssuesOnly
      }
    case 'TOGGLE_SHOW_ACTIVE_SITES_ONLY':
      return {
        ...state,
        showActiveSitesOnly: !state.showActiveSitesOnly
      }
    case 'SET_HOVERED_SITE':
      return {
        ...state,
        hoveredSite: action.payload
      }
    case 'TOGGLE_SHOW_SITE_COMPLAINTS':
      return {
        ...state,
        showSiteComplaints: !state.showSiteComplaints
      }
    case 'TOGGLE_SHOW_SITE_VIOLATIONS':
      return {
        ...state,
        showSiteViolations: !state.showSiteViolations
      }
    case 'TOGGLE_SHOW_SITE_ILLICIT_DISCHARGES':
      return {
        ...state,
        showSiteIllicitDischarges: !state.showSiteIllicitDischarges
      }
    case 'TOGGLE_SHOW_CLOSED_SITE_ISSUES':
      return {
        ...state,
        showClosedSiteIssues: !state.showClosedSiteIssues
      }
    case 'SET_INSPECTOR_OPTIONS':
      return {
        ...state,
        inspectorOptions: action.payload
      }
    case 'SET_CONTACT_OPTIONS':
      return {
        ...state,
        contactOptions: action.payload
      }
    case 'SET_DATE_RANGE_FILTER':
      return {
        ...state,
        dateRangeFilter: action.payload
      }
    case 'RESET_CTX':
      return {
        ...state,
        dateRangeFilter: {
          start: undefined,
          end: undefined
        },
        hoveredSite: undefined,
        searchValue: '',
        showActiveSitesOnly: true,
        showClosedSiteIssues: false,
        showOpenIssuesOnly: false,
        showSiteComplaints: true,
        showSiteViolations: true
      }
    default:
      return state
  }
}

export default appReducer