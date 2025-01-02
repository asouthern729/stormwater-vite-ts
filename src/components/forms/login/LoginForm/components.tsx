import { useFormContext } from "react-hook-form"
import styles from './LoginForm.module.css'

// Types
import { LoginFormUseFormState } from "./types"

// Components
import FormError from "../../FormError/FormError"
import LoginBtn from "../../../buttons/forms/LoginBtn/LoginBtn"

export const EmailInput = () => { // Email input
  const methods = useFormContext<LoginFormUseFormState>()

  return (
    <div className={styles.inputSection}>
      <div className="flex flex-col">
        <label htmlFor="email" className={styles.label}>Email</label>
        <input 
          { ...methods.register('email', {
            required: 'Email is required',
            onBlur: () => methods.trigger('email')
          }) }
          type="email" 
          className={styles.input} />
      </div>
      <FormError field={'email'} />
    </div>
  )
}

export const PasswordInput = () => { // Password input
  const methods = useFormContext<LoginFormUseFormState>()

  return (
    <div className={styles.inputSection}>
      <div className="flex flex-col">
        <label htmlFor="password" className={styles.label}>Password</label>
        <input 
          { ...methods.register('password', {
            required:'Password is required',
            onBlur: () => methods.trigger('password')
          }) }
          type="password" 
          className={styles.input} />
      </div>
    </div>
  )
}

export const Button = () => { // Login button
  const methods = useFormContext<LoginFormUseFormState>()

  const disabled = !methods.formState.isValid || methods.formState.isSubmitting ? true : false

  return (
    <div className="flex flex-col mt-8 gap-3">
      <LoginBtn disabled={disabled} />
    </div>
  )
}