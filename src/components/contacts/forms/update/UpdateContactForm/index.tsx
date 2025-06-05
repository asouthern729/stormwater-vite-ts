import { FormProvider } from "react-hook-form"
import { useUpdateContactForm, useOnCancelBtnClick, useHandleFormSubmit } from "./hooks"
import styles from '@/components/form-elements/Forms.module.css'

// Types
import { ContactInterface } from "@/context/App/types"

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import { NameInput, CompanyInput, PhoneAndEmailsInputs } from '../../create/CreateContactForm/components'
import * as Components from './components'

function UpdateContactForm({ contact }: { contact: ContactInterface }) {
  const methods = useUpdateContactForm(contact)

  const handleFormSubmit = useHandleFormSubmit()

  const onCancelBtnClick = useOnCancelBtnClick()

  return (
    <div data-testid="update-contact-form" className={styles.container}>

      <div className={styles.title}>Update Contact</div>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <Components.InactiveCheckbox />
          <NameInput />
          <CompanyInput />
          <PhoneAndEmailsInputs />

          <FormBtns onCancelBtnClick={onCancelBtnClick} />

          </form>
      </FormProvider>

    </div>
  )
}

export default UpdateContactForm