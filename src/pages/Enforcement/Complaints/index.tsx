import { useGetComplaints } from './hooks'

// Components
import Layout from "../../../components/layout/Layout/Layout"
import HandleLoading from "../../../utils/HandleLoading/HandleLoading"
import ComplaintsContainer from "../../../components/enforcement/containers/ComplaintsContainer"
import ErrorBoundary from "../../../components/layout/error/ErrorBoundary/ErrorBoundary"

function Complaints() {
  const { data, isSuccess } = useGetComplaints() 

  return (
    <Layout>
      <HandleLoading isSuccess={isSuccess}>
        <ErrorBoundary href={'/sites'}>
          <ComplaintsContainer complaints={data?.data || []} />
        </ErrorBoundary>
      </HandleLoading>
    </Layout>
  )
}

export default Complaints