import { useHandlePageLoad } from '../../helpers'
import { useGetSites } from '../Sites/hooks'

// Types
import { Site } from '../../context/App/types'

// Components
import Layout from '../../components/layout/Layout/Layout'
import HandleLoading from '../../utils/HandleLoading/HandleLoading'
import ViolationsContainer from '../../components/containers/ViolationsContainer/ViolationsContainer'
import ErrorBoundary from '../../components/error/ErrorBoundary/ErrorBoundary'

function Violations() {
  useHandlePageLoad()

  const { data, isSuccess } = useGetSites()

  return (
    <Layout>
      <HandleLoading
        isSuccess={isSuccess}>
          <ErrorBoundary>
            <ViolationsContainer sites={data?.data as Site[] || []} />
          </ErrorBoundary>
      </HandleLoading>
    </Layout>
  )
}

export default Violations