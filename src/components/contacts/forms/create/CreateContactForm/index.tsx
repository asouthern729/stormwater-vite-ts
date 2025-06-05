import { FormProvider } from "react-hook-form"
import { useOnCancelBtnClick } from "@/components/enforcement/forms/create/CreateViolationForm/hooks"
import { useCreateContactForm, useHandleFormSubmit } from './hooks'
import styles from '@/components/form-elements/Forms.module.css'

// Components
import FormBtns from "@/components/form-elements/buttons/FormBtns"
import * as Components from './components'

function CreateContactForm() {
  const methods = useCreateContactForm()

  const handleFormSubmit = useHandleFormSubmit()

  const onCancelBtnClick = useOnCancelBtnClick()

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create Contact</h2>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)} className={styles.body}>

          <Components.NameInput />
          <Components.CompanyInput />
          <Components.PhoneAndEmailsInputs />

          <FormBtns onCancelBtnClick={onCancelBtnClick} />

        </form>
      </FormProvider>

    </div>
  )
}

export default CreateContactForm