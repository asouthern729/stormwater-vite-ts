import { FormProvider } from "react-hook-form"
import image from '../../../../assets/icons/cof/cof.jpeg'
import { useLoginForm, useHandleFormSubmit } from './hooks'
import styles from './LoginForm.module.css'

// Components
import { EmailInput, PasswordInput, Button } from "./components"

function LoginForm() {
  const methods = useLoginForm()

  const handleFormSubmit = useHandleFormSubmit()

  return (
    <div className={styles.container}>

      <FormProvider { ...methods }>
        <form onSubmit={methods.handleSubmit(handleFormSubmit)}>

          <img src={image} alt="cof logo" className="w-fit hidden md:block" />

          <div className={styles.body}>
            <h2 className={styles.title}>Stormwater Dept Login</h2>
            
            <EmailInput />
            <PasswordInput />

            <Button />
          </div>

          </form>
      </FormProvider>

    </div>
  )
}

export default LoginForm