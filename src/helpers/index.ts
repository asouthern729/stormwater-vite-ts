import { useEffect, useContext, useCallback, useMemo } from "react"
import { useQuery } from "react-query"
import { useNavigate, useLocation, useParams } from "react-router-dom"
import UserContext from "../context/User/UserContext"
import AppContext from "../context/App/AppContext"
import { validateToken, refreshToken } from "../context/User/UserActions"
import { getInspectors, getContacts } from "../context/App/AppActions"
import { savedPopup, errorPopup } from "../utils/Toast/Toast"

// Types
import { MouseEvent } from "react"
import { UseQueryResult } from "react-query"
import { Page, Contact } from "../context/App/types"
import { ValidateTokenResponse } from "../context/User/types"
import { Issue } from "../components/tables/SiteIssuesTable/types"
import { UseHandleMapChangeProps, UseScrollToFormRefProps, HandleSuccessfulFormSubmitProps, HandleDeleteBtnClickProps, HandleIssuesTableRowClickProps, UseHandlePageData } from "./types"

export const useValidateUser = (): boolean => { // Validate user
  const { dispatch } = useContext(UserContext)

  const navigate = useNavigate()

  const { data } = useValidateToken()

  const { data: refreshData } = useRefreshToken(data?.success ? false : true)

  const onSuccess = useCallback(() => {
    if(data && data?.success) {
      dispatch({ type: 'SET_USER', payload: data.data })
    }
    
    if(refreshData && refreshData?.success) {
      dispatch({ type: 'SET_USER', payload: refreshData.data })
    } 
  }, [data, refreshData, dispatch])

  const onFail = useCallback(() => {
    if(refreshData && !refreshData?.success) {
      dispatch({ type: 'SET_USER', payload: undefined })
      navigate('/login')
    }
  }, [refreshData, navigate, dispatch])

  useEffect(() => {
    onSuccess()
    onFail()
  }, [onSuccess, onFail])

  return data?.success || refreshData?.success ? true : false
}

export const useHandlePageLoad = (validated: boolean): void => { // Set current page and reset ctx on page change
  const { dispatch } = useContext(AppContext)

  const location = useLocation()

  useGetInspectorsForForms(validated) // Set inspectors to ctx
  useGetContactsForForms(validated) // Set contacts to ctx

  const cb = useCallback(() => {
    let page: Page = 'Sites'

    switch(location.pathname.split('/')[1]) {
      case 'violations':
        page = 'Enforcement'
        break
      case 'complaints':
        page = 'Enforcement'
        break
      case 'discharges':
        page = 'Enforcement'
        break
      case 'green':
        page = 'Enforcement'
        break
      case 'create':
        page = 'Create'
        break
      case 'contacts':
        page = 'Contacts'
        break
      case 'inspectors':
        page = 'Inspectors'
        break
      case 'site':
        page = 'Site'
        break
      default:
        page = 'Sites'
        break
    }

    dispatch({ type: 'RESET_CTX', payload: undefined })
    dispatch({ type: 'SET_ACTIVE_PAGE', payload: page })
  }, [location, dispatch])

  useEffect(() => { // Reset ctx and update current page in ctx on page change
    cb()
  }, [cb])
}

export const useHandleMapChange = (coordinates: UseHandleMapChangeProps['coordinates'], options: UseHandleMapChangeProps['options']): void => { // Update form on site location change
  const { setValue } = options

  const cb = useCallback(() => { // Update form state on coordinates change
    if(coordinates.xCoordinate && coordinates.yCoordinate) {
      setValue('xCoordinate', coordinates.xCoordinate, { shouldValidate: false })
      setValue('yCoordinate', coordinates.yCoordinate, { shouldValidate: false })
    }
  }, [coordinates, setValue])

  useEffect(() => {
    cb()
  }, [cb])
}

export const useGetInspectorsForForms = (validated: boolean): void => { // Set inspector options to ctx
  const { dispatch } = useContext(AppContext)

  const { data } = useQuery('getInspectors', () => getInspectors(), { enabled: validated })

  const inspectorsArray = useMemo(() => {
    if(!data?.data) {
      return []
    }

    return data.data.map(inspector => ({ value: inspector.inspectorId, text: inspector.name, uuid: inspector.uuid }))
  }, [data?.data])

  const sorted = useMemo(() => {
    return inspectorsArray.sort((a, b) => a.text.localeCompare(b.text));
  }, [inspectorsArray])

  useEffect(() => {
    dispatch({ type: 'SET_INSPECTOR_OPTIONS', payload: sorted })
  }, [sorted, dispatch])
}

export const useGetContactsForForms = (validated: boolean): void => { // Set contact options to ctx
  const { dispatch } = useContext(AppContext)

  const { data } = useQuery('getContacts', () => getContacts(), { enabled: validated })

  const contactsArray = useMemo(() => {
    if(!data?.data) {
      return []
    }

    return data.data.map(contact => ({ text: contact.name, value: contact.contactId }))
  }, [data?.data])

  const sorted = useMemo(() => {
    return contactsArray.sort((a, b) => a.text.localeCompare(b.text));
  }, [contactsArray])

  useEffect(() => {
    dispatch({ type: 'SET_CONTACT_OPTIONS', payload: sorted })
  }, [sorted, dispatch])
}

export const useGetSiteUUID = (): string | undefined => { // REturn site uuid
  const { uuid: siteUUID } = useParams()

  return siteUUID
}

export const useScrollToFormRef = (state: UseScrollToFormRefProps['state'], formRef: UseScrollToFormRefProps['formRef']): void => {
  useEffect(() => { // Scroll to form if active
    if(state.formUUID && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [state.formUUID, formRef])
}

export const useHandlePageData = (tableData: UseHandlePageData['tableData'], currentPage: UseHandlePageData['currentPage']): Issue[] | Contact[] => {
  const pageData = useMemo(() => {
    return tableData.slice((currentPage * 20) - 20, currentPage * 20)
  }, [tableData, currentPage])

  return pageData
}

export const useSetDataForViolationsIndicators = (data: { date: string }[]): { date: string }[] => {
  const { dateRangeFilter } = useContext(AppContext)

  if(dateRangeFilter.start && dateRangeFilter.end) { // Filter data by date range if active
    const start = new Date(dateRangeFilter.start)
    const end = new Date(dateRangeFilter.end)

    return data.filter(obj => new Date(obj.date) >= start && new Date(obj.date) <= end)
  } else return data // Else return all data
}

export const setDateForForm = (date: Date | string | undefined): string | undefined => { // Format date from server for react hook form
  if(date === null || date === undefined) {
    return undefined
  }

  const dateObj = typeof date === 'string' || typeof date === 'function' ? new Date(date) : date

  const year = dateObj.getFullYear()
  const month = String(dateObj.getMonth() + 1).padStart(2, '0')
  const day = String(dateObj.getDate()).padStart(2, '0')

  return `${ year }-${ month }-${ day }`
}

export const formatPhone = (phone: string): string | undefined => { // Format phone number
  if(phone) {
    return `${ phone.slice(0, 3) }-${ phone.slice(3, 6) }-${ phone.slice(6, 10) }`
  }
}

export const handleSuccessfulFormSubmit = async (msg: HandleSuccessfulFormSubmitProps['msg'], options: HandleSuccessfulFormSubmitProps['options']): Promise<void> => { // Handle successful form submit
  const { invalidateQuery, navigate, resetState } = options

  savedPopup(msg)
  await invalidateQuery()

  if(resetState) { // Reset component state
    resetState()
  } 

  if(navigate) { // Navigate
    navigate()
  }
}

export const handleDeleteBtnClick = async (uuid: HandleDeleteBtnClickProps['uuid'], deleteBtnActive: HandleDeleteBtnClickProps['deleteBtnActive'], deleteFn: HandleDeleteBtnClickProps['deleteFn'], options: HandleDeleteBtnClickProps['options']): Promise<void> => { // Handle delete button click
  const { setState, resetState, invalidateQuery } = options 

  if(!deleteBtnActive && setState) {
    setState(prevState => ({ ...prevState, deleteBtnActive: true }))
  } else {
    const result = await deleteFn(uuid)

    if(result.success) {
      handleSuccessfulFormSubmit(result.msg as string, { invalidateQuery, resetState })
    } else errorPopup(result.msg)
  }
}

export const handleIssuesTableRowClick = (setState: HandleIssuesTableRowClickProps['setState']) => (event: MouseEvent<HTMLTableRowElement>): void => { // Handle row click - open form
  const { uuid } = event.currentTarget.dataset

  setState(prevState => ({ ...prevState, formUUID: uuid }))
}

const useValidateToken = (): UseQueryResult<ValidateTokenResponse> => { // Handle token validation
  return useQuery('validateToken', () => validateToken(), { suspense: true })
}

const useRefreshToken = (refresh: boolean | undefined): UseQueryResult<ValidateTokenResponse> => { // Handle token refresh
  return useQuery('refreshToken', () => refreshToken(), { enabled: refresh })
}