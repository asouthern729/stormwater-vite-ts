import { useContext } from "react"
import { FormProvider } from "react-hook-form"
import MapContext from "../../../../context/Map/MapContext"
import { useHandleMapChange } from "../../../../helpers/hooks"
import { useUpdateSiteForm, useHandleFormSubmit } from "./hooks"
import styles from '../../Forms.module.css'

// Types
import { UpdateSiteFormProps } from "./types"

// Components
import UpdateSiteContactsForm from "../UpdateSiteContactsForm/UpdateSiteContactsForm"
import { NameInput, LocationInput, PreconDateInput, GreenInfrastructureSelect, PermitInput, COFInput, TNQInput, InspectorSelect, Buttons } from '../../create/CreateSiteForm/components'
import { Map, InactiveCheckbox } from './components'

function UpdateSiteForm({ site, handleCancelBtnClick }: UpdateSiteFormProps) {
  const { updateSite } = useContext(MapContext)

  const methods = useUpdateSiteForm(site)

  useHandleMapChange(updateSite, { setValue: methods.setValue })

  const handleFormSubmit = useHandleFormSubmit()

  return (
    <div className={styles.container}>

      <h2 className={styles.title}>Update Site</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <Map site={site} />
          <InactiveCheckbox />
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

          <Buttons handleCloseForm={handleCancelBtnClick} />

        </form>
      </FormProvider>

    </div>
  )
}

export default UpdateSiteForm