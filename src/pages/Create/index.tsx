import { useLocation } from 'react-router'
import { useHandlePageLoad } from '../../helpers/hooks'

// Types
import { CreateForm } from './types'

// Components
import Layout from "../../components/layout/Layout/Layout"
import ErrorBoundary from '../../components/error/ErrorBoundary/ErrorBoundary'
import { Form } from './components'

function Create() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const formType = queryParams.get('formType')

  useHandlePageLoad()

  return (
    <Layout>
      <ErrorBoundary>
        <Form form={formType as CreateForm} />
      </ErrorBoundary>
    </Layout>
  )
}

export default Create