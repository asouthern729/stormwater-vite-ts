import { useHandlePageLoad } from "../../helpers/hooks"
import { EnforcementProvider } from "@/components/enforcement/context"
import { useGetDischarges } from './hooks'

// Components
import Layout from "../../components/layout/Layout/Layout"
import HandleLoading from "../../utils/HandleLoading/HandleLoading"
import DischargesContainer from "../../components/enforcement/containers/DischargesContainer"
import ErrorBoundary from "../../components/error/ErrorBoundary/ErrorBoundary"

function Discharges() {
  useHandlePageLoad()

  const { data, isSuccess } = useGetDischarges()

  return (
    <Layout>
      <HandleLoading isSuccess={isSuccess}>
        <ErrorBoundary>
          <EnforcementProvider>
            <DischargesContainer discharges={data?.data || []} />
          </EnforcementProvider>
        </ErrorBoundary>
      </HandleLoading>
    </Layout>
  )
}

export default Discharges