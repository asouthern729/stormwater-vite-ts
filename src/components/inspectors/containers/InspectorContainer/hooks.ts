import { useContext, useEffect } from "react"
import InspectorTableCtx from "../../tables/InspectorTable/context"

export const useScrollToFormRef = (formRef: React.RefObject<HTMLDivElement>) => {
  const { formOpen } = useContext(InspectorTableCtx)

  useEffect(() => { // Scroll to form if active
    if(formOpen && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [formOpen, formRef])
}