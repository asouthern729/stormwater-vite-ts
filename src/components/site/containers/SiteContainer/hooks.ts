import { useContext, useEffect } from "react"
import SiteCtx from "../../context"

export const useScrollToFormRef = (formRef: React.RefObject<HTMLDivElement>) => {
  const { activeForm } = useContext(SiteCtx)

  useEffect(() => { // Scroll to form if active
    if(activeForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [activeForm, formRef])
}

export const useOnUpdateBtnClick = () => {
  const { activeForm, dispatch } = useContext(SiteCtx)

  const payload = !activeForm ? 'updateSite' : undefined

  return () => dispatch({ type: 'SET_ACTIVE_FORM', payload })
}