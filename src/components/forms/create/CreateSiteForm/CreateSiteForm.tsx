import { useContext } from "react"
import { FormProvider } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import MapContext from "../../../../context/Map/MapContext"
import { useHandleMapChange } from "../../../../helpers"
import { useCreateSiteForm, useHandleFormSubmit } from "./hooks"
import styles from '../../Forms.module.css'

// Components
import UpdateSiteContactsForm from "../../update/UpdateSiteContactsForm/UpdateSiteContactsForm"
import { Map, NameInput, LocationInput, PreconDateInput, GreenInfrastructureSelect, PermitInput, COFInput, TNQInput, InspectorSelect, Buttons } from './components'

function CreateSiteForm() {
  const { newSite } = useContext(MapContext)

  const navigate = useNavigate()

  const methods = useCreateSiteForm()

  useHandleMapChange(newSite, { setValue: methods.setValue })

  const handleFormSubmit = useHandleFormSubmit()

  return (
    <div data-testid="create-site-form" className={styles.container}>

      <h2 className={styles.title}>Create Site</h2>

        <FormProvider { ...methods }>
          <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>
          
          <Map />

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

          <Buttons handleCloseForm={() => navigate('/')} />

        </form>
      </FormProvider>

    </div>
  )
}

export default CreateSiteForm