import { useLocation } from 'react-router-dom'
import { useValidateUser,  useHandlePageLoad } from '../../helpers'
import { setCreateForm } from '.'

// Types
import { CreateForm } from './types'

// Components
import Layout from "../../components/layout/Layout/Layout"
import ErrorBoundary from '../../components/error/ErrorBoundary/ErrorBoundary'

function Create() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const formType = queryParams.get('formType')

  const validated = useValidateUser()

  useHandlePageLoad(validated)

  return (
    <Layout>
      <ErrorBoundary>
        {setCreateForm(formType as CreateForm)}
      </ErrorBoundary>
    </Layout>
  )
}

export default Create