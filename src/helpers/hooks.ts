import React, { useState, useEffect, useContext, useCallback, useMemo } from "react"
import { useNavigate, useLocation, useParams } from "react-router"
import { useQuery } from "react-query"
import { useMsal } from "@azure/msal-react"
import { NODE_ENV } from '@config/index'
import AppContext from "../context/App/AppContext"
import EnforcementCtx from "@/components/enforcement/context"
import { getInspectors, getContacts } from "../context/App/AppActions"

// Types
import * as Types from '@/context/App/types'
import { Issue } from "../components/site/tables/SiteIssuesTable/types"
import { UseHandleMapChangeProps, UseScrollToFormRefProps, UseHandlePageData } from "./types"

export const useGetToken = () => {
  const [state, setState] = useState<{ token: string | undefined }>({ token: undefined })

  const { instance, inProgress } = useMsal()

  const activeAccount = instance.getActiveAccount()

  const navigate = useNavigate()

  if(NODE_ENV === 'development') {
    return 'dev-token'
  }

  const checkToken = async () => {
    let token: string | undefined = undefined

    if(activeAccount?.idTokenClaims && activeAccount.idTokenClaims.exp) { // Check if token is expired or about to expire
      const expiresOn = activeAccount.idTokenClaims.exp * 1000
      const now = Date.now()
  
      if(expiresOn > now + 3000000) { // Still valid
        token = activeAccount.idToken
        setState({ token })
        return
      }
  
      const request = {
        scopes: ["openid", "profile", "email"],
        account: activeAccount,
        forceRefresh: true
      }
  
      const response = await instance.acquireTokenSilent(request) // Refresh token

      setState({ token: response.idToken })
    }

    if(activeAccount && !activeAccount.idTokenClaims) { // Active account but !idTokenClaims
      const request = {
        scopes: ["openid", "profile", "email"],
        account: activeAccount
      }

      const response = await instance.acquireTokenSilent(request) // Refresh token

      setState({ token: response.idToken })
    }

    if(!activeAccount) { // !Active account - redirect to login
      navigate('/projects')
    }
  }

  useEffect(() => {
    if(inProgress !== 'none') { // Wait for instance to fully initialize
      return
    }

    checkToken()

    const intervalId = setInterval(checkToken, 4 * 60 * 1000) // Check every 4 minutes
    
    return () => clearInterval(intervalId)
  }, [inProgress])

  return state.token
}

export const useEnableQuery = () => {
  const [state, setState] = useState<{ enabled: boolean }>({ enabled: false })

  const token = useGetToken()

  useEffect(() => {
    let timeout = null

    if(token) {
      timeout = setTimeout(() => {
        setState({ enabled: true })
      }, 300) // 300ms delay
    } else setState({ enabled: false })

    return () => {
      if(timeout) {
        clearTimeout(timeout)
      }
    }
  }, [token])

  return { enabled: state.enabled, token }
}

export const useRedirectAfterLogin = () => {
  const { instance, inProgress } = useMsal()
  const activeAccount = instance.getActiveAccount()

  useEffect(() => {
    if(inProgress === 'none') {

      if(activeAccount) {
        const redirectUrl = sessionStorage.getItem('redirectUrl') // Check for redirectUrl

        if(redirectUrl) {        
          window.location.href = redirectUrl
          sessionStorage.removeItem('redirectUrl')
        }
      } else window.location.pathname = '/stormwater'
    }
  }, [activeAccount, inProgress])
}

export const useReturnUserRoles = () => { // Return active user roles
  const { instance } = useMsal()

  const activeAccount = instance.getActiveAccount()

  const roles = activeAccount?.idTokenClaims?.roles

  return roles || []
}

export const useHandlePageLoad = (): void => { // Set current page and reset ctx on page change
  const { dispatch } = useContext(AppContext)

  const { isAuthenticated } = useValidateUser()

  const location = useLocation()

  useGetInspectorsForForms(isAuthenticated) // Set inspectors to ctx
  useGetContactsForForms(isAuthenticated) // Set contacts to ctx

  const cb = useCallback(() => {
    let page: Types.PageType = 'Sites'

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

  const updateFormValues = useCallback((x: number, y: number) => {
    setValue('xCoordinate', x, { shouldValidate: false })
    setValue('yCoordinate', y, { shouldValidate: false })
  }, [setValue])

  useEffect(() => {
    if(coordinates?.xCoordinate && coordinates.yCoordinate) {
      updateFormValues(coordinates.xCoordinate, coordinates.yCoordinate)
    }
  }, [coordinates, updateFormValues])
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

export const useScrollToFormRef = (formRef: React.RefObject<HTMLDivElement>): void => {
  const { formUUID } = useContext(EnforcementCtx)

  useEffect(() => { // Scroll to form if active
    if(formUUID && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [formUUID, formRef])
}

export const useHandlePageData = (tableData: UseHandlePageData['tableData'], currentPage: UseHandlePageData['currentPage']): Issue[] | ContactInterface[] => {
  const pageData = useMemo(() => {
    return tableData.slice((currentPage * 20) - 20, currentPage * 20)
  }, [tableData, currentPage])

  return pageData
}