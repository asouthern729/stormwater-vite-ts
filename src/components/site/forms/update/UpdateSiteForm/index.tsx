import { FormProvider } from "react-hook-form"
import { useUpdateSiteForm, useHandleFormSubmit } from "./hooks"
import styles from '@/components/form-elements/Forms.module.css'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import UpdateSiteContactsForm from "../UpdateSiteContactsForm"
import { NameInput, LocationInput, PreconDateInput, GreenInfrastructureSelect, PermitInput, COFInput, TNQInput, InspectorSelect } from '../../create/CreateSiteForm/components'
import * as Components from './components'

function UpdateSiteForm({ site }: { site: AppTypes.SiteInterface }) {
  const methods = useUpdateSiteForm(site)

  const handleFormSubmit = useHandleFormSubmit()

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Update Site</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <Components.Map site={site} />
          <Components.InactiveCheckbox />
          <NameInput />
          <LocationInput />

          <div className="flex gap-2 w-full">
            <PreconDateInput />
            <GreenInfrastructureSelect />
          </div>

          <div className="flex gap-2 w-full">
            <PermitInput />
            <COFInput />
            <TNQInput />
          </div>

          <InspectorSelect />

          <div className="py-10">
            <UpdateSiteContactsForm />
          </div>

          {/* TODO create on cancel btn click */}
          <FormBtns onCancelBtnClick={() => null} />

        </form>
      </FormProvider>

    </div>
  )
}

export default UpdateSiteForm