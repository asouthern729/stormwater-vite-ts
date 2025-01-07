import { useParams } from 'react-router-dom'
import { useValidateUser, useHandlePageLoad } from '../../helpers'
import { useGetInspector } from './hooks'

// Types
import { Inspector as InspectorType } from '../../context/App/types'

// Components
import Layout from '../../components/layout/Layout/Layout'
import HandleLoading from '../../utils/HandleLoading/HandleLoading'
import InspectorContainer from '../../components/containers/InspectorContainer/InspectorContainer'
import ErrorBoundary from '../../components/error/ErrorBoundary/ErrorBoundary'

function Inspector() {
  const validated = useValidateUser()

  useHandlePageLoad(validated)

  const { inspectorId } = useParams()

  const { data, isSuccess } = useGetInspector(inspectorId, validated)

  return (
    <Layout>
      <HandleLoading
        isSuccess={isSuccess}>
          <ErrorBoundary>
            <InspectorContainer 
              sites={data?.data.sites || []}
              inspector={data?.data.inspector as InspectorType} />
          </ErrorBoundary>
      </HandleLoading>
    </Layout>
  )
}

export default Inspector