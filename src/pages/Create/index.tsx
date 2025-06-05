import { useSetFormType } from './hooks'

// Components
import Layout from "../../components/layout/Layout"
import ErrorBoundary from '../../components/layout/error/ErrorBoundary/ErrorBoundary'
import { Form } from './components'

function Create() {
  const formType = useSetFormType()

  return (
    <Layout>
      <ErrorBoundary href={'/sites'}>
        <Form form={formType} />
      </ErrorBoundary>
    </Layout>
  )
}

export default Create