import { useContext } from "react"
import SiteCtx from "@/components/site/context"

// Types
import { FormType } from "@/components/site/context"

export const useHandleFormNav = () => {
  const { activeForm, dispatch } = useContext(SiteCtx)

  const showNav = !!activeForm?.includes('update')

  return { showNav, onClick: (formType: FormType) => dispatch({ type: 'SET_ACTIVE_FORM', payload: formType }) }
}