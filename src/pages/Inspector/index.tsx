import { useGetInspector } from './hooks'
import { InspectorProvider } from '@/components/inspectors/context'

// Types
import * as AppTypes from '@/context/App/types'

// Components
import Layout from '../../components/layout/Layout'
import HandleLoading from '../../utils/HandleLoading'
import InspectorContainer from '../../components/inspectors/containers/InspectorContainer'
import ErrorBoundary from '../../components/layout/error/ErrorBoundary/ErrorBoundary'

function Inspector() {
  const { data, isSuccess } = useGetInspector()

  return (
    <Layout>
      <HandleLoading isSuccess={isSuccess}>
        <ErrorBoundary href={'/sites'}>
          <InspectorProvider>
            <InspectorContainer 
              sites={data?.data.sites || []}
              inspector={data?.data.inspector as AppTypes.InspectorInterface} />
          </InspectorProvider>
        </ErrorBoundary>
      </HandleLoading>
    </Layout>
  )
}

export default Inspector