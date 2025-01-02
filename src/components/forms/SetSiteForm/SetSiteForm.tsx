// Types
import { SetSiteFormProps } from "./types"

// Components
import { Form } from './components'

function SetSiteForm({ state, site, setState }: SetSiteFormProps) {

  return (
    <div data-testid="set-site-form">
      <Form
        state={state}
        setState={setState}
        site={site} />
    </div>
  )
}

export default SetSiteForm