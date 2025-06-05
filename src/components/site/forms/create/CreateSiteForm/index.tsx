import { FormProvider } from "react-hook-form"
import styles from '@/components/form-elements/Forms.module.css'
import { useCreateSiteForm, useOnCancelBtnClick, useHandleFormSubmit } from "./hooks"

// Components
import UpdateSiteContactsForm from "../../update/UpdateSiteContactsForm"
import * as Components from './components'
import FormBtns from "@/components/form-elements/buttons/FormBtns"

function CreateSiteForm() {
  const methods = useCreateSiteForm()

  const handleFormSubmit = useHandleFormSubmit()

  const onCancelBtnClick = useOnCancelBtnClick()

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Site</h2>

        <FormProvider { ...methods }>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>
          
          <Components.Map />

          <Components.NameInput />
          <Components.LocationInput />

          <div className="flex gap-2 w-full">
            <Components.PreconDateInput />
            <Components.GreenInfrastructureSelect />
          </div>

          <div className="flex gap-2 w-full">
            <Components.PermitInput />
            <Components.COFInput />
            <Components.TNQInput />
          </div>

          <Components.InspectorSelect />

          <div className="py-10">
            <UpdateSiteContactsForm />
          </div>

          <FormBtns onCancelBtnClick={onCancelBtnClick} />

        </form>
      </FormProvider>

    </div>
  )
}

export default CreateSiteForm