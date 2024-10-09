import { useEffect, useContext, useCallback, useMemo } from "react"
import { useQuery } from "react-query"
import { useNavigate, useLocation, useParams } from "react-router-dom"
import UserContext from "../context/User/UserContext"
import AppContext from "../context/App/AppContext"
import { validateToken, refreshToken } from "../context/User/UserActions"
import { getInspectors, getContacts } from "../context/App/AppActions"
import { savedPopup, errorPopup } from "../utils/Toast/Toast"

// Types
import { Page } from "../context/App/types"
import { ValidateTokenResponse } from "../context/User/types"
import { UseHandleMapChangeProps, UseScrollToFormRefProps, HandleSuccessfulFormSubmitProps, HandleDeleteBtnClickProps } from "./types"

export const useValidateUser = (): void => { // Validate user
  const { dispatch } = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    validateUser()
      .then(response => {
        if(isMounted) {
          if(response.success) {
            dispatch({ type: 'SET_USER', payload: response.data })
          } else {
            refreshToken()
              .then(data => {
                if(isMounted) {
                  const payload = data.success ? data.data : undefined
                  dispatch({ type: 'SET_USER', payload })

                  if(!payload) { // If refreshToken call fails - redirect to login
                    navigate('/login')
                  }
                }
              })
              .catch(_ => {
                errorPopup()
                navigate('/login')
              })
          }
        }
      })
    .catch(_ => {
      errorPopup()
      navigate('/login')
    })

    return () => {
      isMounted = false
    }
  }, [dispatch, navigate])
}

export const useHandlePageLoad = (): void => { // Set current page and reset ctx on page change
  const { dispatch } = useContext(AppContext)

  const location = useLocation()

  let page: Page = 'Sites'

  const cb = useCallback(() => {
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
      default:
        page = 'Sites'
        break
    }

    dispatch({ type: 'RESET_CTX', payload: undefined })
    dispatch({ type: 'SET_ACTIVE_PAGE', payload: page })
  }, [location])

  useEffect(() => { // Reset ctx and update current page in ctx on page change
    cb()
  }, [location])
}

export const useHandleMapChange = (coordinates: UseHandleMapChangeProps['coordinates'], options: UseHandleMapChangeProps['options']): void => { // Update form on site location change
  const { setValue } = options

  const cb = useCallback(() => { // Update form state on coordinates change
    if(coordinates.xCoordinate && coordinates.yCoordinate) {
      setValue('xCoordinate', coordinates.xCoordinate, { shouldValidate: false })
      setValue('yCoordinate', coordinates.yCoordinate, { shouldValidate: false })
    }
  }, [coordinates])

  useEffect(() => {
    cb()
  }, [coordinates])
}

export const useGetInspectorsForForms = (): void => { // Set inspector options to ctx
  const { dispatch } = useContext(AppContext)

  const { data } = useQuery('getInspectors', () => getInspectors(), { staleTime: Infinity })

  const inspectorsArray = useMemo(() => {
    if(!data) {
      return[]
    }

    return data.data.map(inspector => ({ value: inspector.inspectorId, text: inspector.name }))
  }, [data?.data])

  const sorted = useMemo(() => {
    return inspectorsArray.sort((a, b) => a.text.localeCompare(b.text));
  }, [inspectorsArray])

  useEffect(() => {
    dispatch({ type: 'SET_INSPECTOR_OPTIONS', payload: sorted })
  }, [sorted])
}

export const useGetContactsForForms = (): void => { // Set contact options to ctx
  const { dispatch } = useContext(AppContext)

  const { data } = useQuery('getContacts', () => getContacts(), { staleTime: Infinity })

  const contactsArray = useMemo(() => {
    if(!data) {
      return []
    }

    return data.data.records.map(contact => ({ text: contact.name, value: contact.contactId }))
  }, [data?.data])

  const sorted = useMemo(() => {
    return contactsArray.sort((a, b) => a.text.localeCompare(b.text));
  }, [contactsArray])

  useEffect(() => {
    dispatch({ type: 'SET_CONTACT_OPTIONS', payload: sorted })
  }, [sorted])
}

export const useGetSiteUUID = (): string | undefined => { // REturn site uuid
  const { uuid: siteUUID } = useParams()

  return siteUUID
}

export const useScrollToFormRef = (state: UseScrollToFormRefProps['state'], formRef: UseScrollToFormRefProps['formRef']): void => {
  useEffect(() => { // Scroll to form if active
    if(state.formUUID && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    } else window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [state.formUUID, formRef])
}

export const setDateForForm = (date: string | undefined): string | undefined => { // Format date from server for react hook form
  if(date === null || date === undefined) {
    return undefined
  }

  const [month, day, year] = date.split('-')

  return `${ year }-${ month }-${ day }`
}

export const formatPhone = (phone: string): string | undefined => { // Format phone number
  if(phone) {
    return `${ phone.slice(0, 3) }-${ phone.slice(3, 6) }-${ phone.slice(6, 10) }`
  }
}

export const handleSuccessfulFormSubmit = (msg: HandleSuccessfulFormSubmitProps['msg'], options: HandleSuccessfulFormSubmitProps['options']): void => { // Handle successful form submit
  const { invalidateQuery, navigate, resetState } = options

  savedPopup(msg)
  invalidateQuery
  
  if(resetState) { // Reset component state
    resetState()
  } else navigate // Navigate home
}

const validateUser = async (): Promise<ValidateTokenResponse> => {
  const result = await validateToken()

  return result
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