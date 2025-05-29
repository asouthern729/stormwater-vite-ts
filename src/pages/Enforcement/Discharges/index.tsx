import { EnforcementProvider } from "@/components/enforcement/context"
import { useGetDischarges } from './hooks'

// Components
import Layout from "../../../components/layout/Layout/Layout"
import HandleLoading from "../../../utils/HandleLoading/HandleLoading"
import DischargesContainer from "../../../components/enforcement/containers/DischargesContainer"
import ErrorBoundary from "../../../components/layout/error/ErrorBoundary/ErrorBoundary"

function Discharges() {
  const { data, isSuccess } = useGetDischarges()

  return (
    <Layout>
      <HandleLoading isSuccess={isSuccess}>
        <ErrorBoundary href={'/sites'}>
          <EnforcementProvider>
            <DischargesContainer discharges={data?.data || []} />
          </EnforcementProvider>
        </ErrorBoundary>
      </HandleLoading>
    </Layout>
  )
}

export default Discharges