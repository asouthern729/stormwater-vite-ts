import { FormProvider } from "react-hook-form"
import { useUpdateContactForm, useHandleFormSubmit } from "./hooks"
import styles from '../../Forms.module.css'

// Types
import { ContactInterface } from "@/context/App/types"
import { UpdateContactFormProps } from "./types"

// Components
import { NameInput, CompanyInput, PhoneInput, EmailInput, Buttons } from '../../create/CreateContactForm/components'
import { InactiveCheckbox } from './components'

function UpdateContactForm({ contact }: { contact: ContactInterface }) {
  const methods = useUpdateContactForm(contact)


  return (
    <div data-testid="update-contact-form" className={styles.container}>

      <div className={styles.title}>Update Contact</div>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <InactiveCheckbox />
          <NameInput />
          <CompanyInput />

          <div className="flex gap-2 w-full">
            <PhoneInput />
            <EmailInput />
          </div>

          {/* <Buttons handleCloseForm={handleCloseForm} /> */}

          </form>
      </FormProvider>

    </div>
  )
}

export default UpdateContactForm