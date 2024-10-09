import { useNavigate } from "react-router-dom"
import { useQueryClient } from "react-query"
import { setForm } from "."

// Types
import { SetSiteFormProps } from "./types"

function SetSiteForm({ state, site, setState }: SetSiteFormProps) {
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  return (
    <div>
      {setForm(state, site, { setState, navigate, queryClient })}
    </div>
  )
}

export default SetSiteForm