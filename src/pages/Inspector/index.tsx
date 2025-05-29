import { useGetInspector } from './hooks'

// Components
import Layout from '../../components/layout/Layout/Layout'
import HandleLoading from '../../utils/HandleLoading/HandleLoading'
import InspectorContainer from '../../components/inspectors/containers/InspectorContainer'
import ErrorBoundary from '../../components/layout/error/ErrorBoundary/ErrorBoundary'

function Inspector() {
  const { data, isSuccess } = useGetInspector()

  return (
    <Layout>
      <HandleLoading isSuccess={isSuccess}>
        <ErrorBoundary href={'/sites'}>
          <InspectorContainer 
            sites={data?.data.sites || []}
            inspector={data?.data.inspector} />
        </ErrorBoundary>
      </HandleLoading>
    </Layout>
  )
}

export default Inspector