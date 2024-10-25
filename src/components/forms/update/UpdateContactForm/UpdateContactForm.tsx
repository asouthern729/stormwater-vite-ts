import { useQueryClient } from "react-query"
import { FormProvider } from "react-hook-form"
import { useUpdateContactForm, handleUpdateContactFormSubmit, handleRequiredFieldValidation } from "."
import styles from '../../Forms.module.css'

// Types
import { UpdateContactFormProps } from "./types"

// Components
import FormLabel from "../../FormLabel/FormLabel"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"
import FormError from "../../FormError/FormError"

function UpdateContactForm({ contact, resetState }: UpdateContactFormProps) {
  const methods = useUpdateContactForm(contact)

  const queryClient = useQueryClient()

  return (
    <div data-testid="update-contact-form" className={styles.container}>

      <div className={styles.title}>Update Contact</div>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => handleUpdateContactFormSubmit(formData, { resetState, invalidateQuery: () => queryClient.invalidateQueries('getContacts') }))} className={styles.body}>

          <div className="flex items-center gap-2 mx-auto my-10 w-fit">
            <label htmlFor="inactiveSite" className={styles.checkboxLabel}>Inactive Contact</label>
            <input 
              type="checkbox"
              className="checkbox checkbox-secondary"
              { ...methods.register('inactive') } />
          </div>

          <div className={styles.inputSection}>
            <div className="flex">
              <FormLabel
                label={'Contact Name:'}
                name={'name'}
                required={true} />
              <input 
                type="text"
                className={styles.input}
                { ...methods.register('name', {
                  required: 'Contact name is required',
                  maxLength: {
                    value: 50,
                    message: 'Contact name must be 50 characters or less'
                  },
                  onBlur: () => handleRequiredFieldValidation('name', { watch: methods.watch, trigger: methods.trigger })
                }) } />
            </div>
            <FormError field={'name'} />
          </div>

          <div className={styles.inputSection}>
            <div className="flex">
              <FormLabel
                label={'Company'}
                name={'company'} />
              <input 
                type="text"
                className={styles.input}
                { ...methods.register('company', {
                  maxLength: {
                    value: 50,
                    message: 'Company must be 50 characters or less'
                  }
                }) } />
            </div>
            <FormError field={'company'} />
          </div>

          <section className="flex gap-2 w-full">
            <div className={styles.inputSection}>
              <div className="flex">
                <FormLabel
                  label={'Phone:'}
                  name={'phone'} />
                <input 
                  type="tel"
                  className={styles.input}
                  { ...methods.register('phone', {
                    minLength: {
                      value: 10,
                      message: 'Required format ex: 6155506691'
                    },
                    maxLength: {
                      value: 10,
                      message: 'Required format ex: 6155506691'
                    },
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Required format ex: 6155506691'
                    }
                  }) } />
              </div>
              <FormError field={'phone'} />
            </div>

            <div className={styles.inputSection}>
              <div className="flex">
                <FormLabel
                  label={'Email:'}
                  name={'email'} />
                <input 
                  type="email"
                  className={styles.input}
                  { ...methods.register('email', {
                    maxLength: {
                      value: 50,
                      message: 'Email must be 50 characters or less'
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Required format ex: bin.franklin@franklintn.gov'
                    }
                  }) } />
              </div>
              <FormError field={'email'} />
            </div>
          </section>

          <div className={styles.buttonsContainer}>
            <SaveBtn disabled={!methods.formState.isValid} />
            <CancelBtn handleClick={resetState} />
          </div>

          </form>
      </FormProvider>

    </div>
  )
}

export default UpdateContactForm