import { useValidateUser, useHandlePageLoad } from "../../helpers"
import { useGetSite } from "./hooks"

// Types
import { Site as SiteType } from "../../context/App/types"

// Components
import Layout from "../../components/layout/Layout/Layout"
import HandleLoading from "../../utils/HandleLoading/HandleLoading"
import SiteContainer from "../../components/containers/SiteContainer/SiteContainer"
import ErrorBoundary from "../../components/error/ErrorBoundary/ErrorBoundary"

function Site() {
  const validated = useValidateUser()

  useHandlePageLoad(validated)

  const { data, isSuccess } = useGetSite(validated)
  
  return (
    <Layout>
      <HandleLoading
        isSuccess={isSuccess}>
          <ErrorBoundary>
            <SiteContainer site={data?.data as SiteType} />
          </ErrorBoundary>
      </HandleLoading>
    </Layout>
  )
}

export default Site