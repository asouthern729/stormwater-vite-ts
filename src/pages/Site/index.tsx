import { useHandlePageLoad } from "../../helpers/hooks"
import { useGetSite } from "./hooks"

// Types
import { Site as SiteType } from "../../context/App/types"

// Components
import Layout from "../../components/layout/Layout/Layout"
import HandleLoading from "../../utils/HandleLoading/HandleLoading"
import SiteContainer from "../../components/site/containers/SiteContainer/SiteContainer"
import ErrorBoundary from "../../components/layout/error/ErrorBoundary/ErrorBoundary"

function Site() {
  useHandlePageLoad()

  const { data, isSuccess } = useGetSite()
  
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