// import { useHandlePageLoad } from "../../helpers/hooks"
import { SitesProvider } from "@/components/sites/context"
import { useGetSites } from "./hooks"

// Components
import Layout from "../../components/layout/Layout/Layout"
import HandleLoading from '../../utils/HandleLoading/HandleLoading'
import SitesContainer from "../../components/sites/containers/SitesContainer"
import ErrorBoundary from "../../components/layout/error/ErrorBoundary/ErrorBoundary"

function Sites() {
  // useHandlePageLoad()

  const { data, isSuccess } = useGetSites()

  return (
    <Layout>
      <HandleLoading isSuccess={isSuccess}>
        <ErrorBoundary>
          <SitesProvider>
            <SitesContainer sites={data?.data || []} />
          </SitesProvider>
        </ErrorBoundary>
      </HandleLoading>
    </Layout>
  )
}

export default Sites