import { useValidateUser, useHandlePageLoad } from "../../helpers"
import { useGetSites } from "."

// Components
import Layout from "../../components/layout/Layout/Layout"
import HandleLoading from '../../utils/HandleLoading/HandleLoading'
import SitesContainer from "../../components/containers/SitesContainer/SitesContainer"
import ErrorBoundary from "../../components/error/ErrorBoundary/ErrorBoundary"

function Sites() {
  const validated = useValidateUser()

  useHandlePageLoad(validated)

  const { data, isSuccess } = useGetSites(validated)

  return (
    <Layout>
      <HandleLoading
        isSuccess={isSuccess}>
          <ErrorBoundary>
            <SitesContainer sites={data?.data || []} />
          </ErrorBoundary>
        </HandleLoading>
    </Layout>
  )
}

export default Sites