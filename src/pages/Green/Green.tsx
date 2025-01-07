import { useValidateUser, useHandlePageLoad } from '../../helpers'
import { useGetGreenViolations } from './hooks'

// Components
import Layout from '../../components/layout/Layout/Layout'
import HandleLoading from '../../utils/HandleLoading/HandleLoading'
import GreenContainer from '../../components/containers/GreenContainer/GreenContainer'
import ErrorBoundary from '../../components/error/ErrorBoundary/ErrorBoundary'

function Green() {
  const validated = useValidateUser()

  useHandlePageLoad(validated)

  const { data, isSuccess } = useGetGreenViolations(validated)

  return (
    <Layout>
      <HandleLoading
        isSuccess={isSuccess}>
          <ErrorBoundary>
            <GreenContainer green={data?.data || []} />
          </ErrorBoundary>
      </HandleLoading>
    </Layout>
  )
}

export default Green