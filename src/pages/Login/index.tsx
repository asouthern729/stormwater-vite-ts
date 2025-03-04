import styles from './Login.module.css'
import { useRedirectAuthenticated } from './hooks'

// Components
import Layout from '../../components/layout/Layout/Layout'
import LoginForm from '../../components/forms/login/LoginForm/LoginForm'

function Login() {
  useRedirectAuthenticated()

  return (
    <Layout>
      <div className={styles.container}>
        <LoginForm />
      </div>
    </Layout>
  )
}

export default Login