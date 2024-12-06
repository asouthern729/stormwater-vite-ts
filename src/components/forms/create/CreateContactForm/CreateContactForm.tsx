import { useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { FormProvider } from "react-hook-form"
import { useCreateContactForm, handleCreateContactFormSubmit, handleRequiredFieldValidation } from "."
import styles from '../../Forms.module.css'

// Components
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"

function CreateContactForm() {
  const methods = useCreateContactForm()

  const queryClient = useQueryClient()

  const navigate = useNavigate()

  return (
    <div className={styles.container}>

      <div className={styles.title}>Create Contact</div>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(formData => handleCreateContactFormSubmit(formData, { invalidateQuery: () => queryClient.invalidateQueries('getContacts'), navigate: () => navigate('/contacts') }))} className={styles.body}>

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
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: 'No special characters or numbers'
                  },
                  onChange: () => methods.trigger('name'),
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
                  },
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: 'No special characters or numbers'
                  },
                  onChange: () => methods.trigger('company')
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
                    },
                    onChange: () => methods.trigger('phone')
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
                    },
                    onChange: () => methods.trigger('email')
                  }) } />
              </div>
              <FormError field={'email'} />
            </div>
          </section>

          <div className={styles.buttonsContainer}>
            <SaveBtn disabled={!methods.formState.isValid} />
            <CancelBtn handleClick={() => navigate('/')} />
          </div>

        </form>
      </FormProvider>

    </div>
  )
}

export default CreateContactForm