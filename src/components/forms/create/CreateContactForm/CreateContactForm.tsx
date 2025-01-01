import { FormProvider } from "react-hook-form"
import { useCreateContactForm, useHandleFormSubmit } from './hooks'
import styles from '../../Forms.module.css'

// Components
import { NameInput, CompanyInput, PhoneInput, EmailInput, Buttons } from './components'

function CreateContactForm() {
  const methods = useCreateContactForm()

  const handleFormSubmit = useHandleFormSubmit()

  return (
    <div className={styles.container}>

      <h2 className={styles.title}>Create Contact</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <NameInput />
          <CompanyInput />

          <div className="flex gap-2 w-full">
            <PhoneInput />
            <EmailInput />
          </div>

          <Buttons />

        </form>
      </FormProvider>

    </div>
  )
}

export default CreateContactForm