import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useValidateUser } from "../../../../helpers"
import { useGetActiveSiteNames, setCreateForm, handleSiteSelect } from "."
import styles from './GetSite.module.css'

// Types
import { GetSiteProps, GetSiteState } from "./types"

// Components
import FormContainer from "../../FormContainer/FormContainer"

function GetSite({ form }: GetSiteProps) {
  const [state, setState] = useState<GetSiteState>({ siteId: null })

  const navigate = useNavigate()

  const validated = useValidateUser()

  const { data } = useGetActiveSiteNames(validated)

  const selectedSite = data?.data.find(site => site.siteId === state.siteId)

  return (
    <div data-testid="get-site" className={styles.container}>
      <div className="flex flex-col gap-1 items-center">

        <div className="text-xl">Select Site</div>

        <select 
          className="text-info select select-bordered"
          onChange={(event) => handleSiteSelect(event, { setState })}
          value={state.siteId as string}>
            <option value=""></option>
            {data ? data?.data.map(site => {
              return (
                <option key={`site-option-${ site.siteId }`} value={site.siteId}>{site.name}</option>
              )
            }) : null}
        </select>

        {['createComplaint', 'createDischarge'].includes(form) ? ( // Show button for complaints and illicit discharge forms
          <button 
            type="button"
            className="btn btn-ghost hover:text-warning"
            onClick={() => setState(({ siteId: undefined }))}>
              Continue Without Site
          </button>
        ) : null}

      </div>

      {state.siteId !== null && (
        <FormContainer>
          {setCreateForm(form, selectedSite, { navigate: () => navigate('/') })}
        </FormContainer>
      )}
    </div>
  )
}

export default GetSite