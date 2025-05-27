import { useHandlePageLoad } from "../../helpers/hooks"
import { useGetSites } from "../Sites/hooks"
import { useGetComplaints } from './hooks'

// Types
import { Site, Complaint } from "../../context/App/types"

// Components
import Layout from "../../components/layout/Layout/Layout"
import HandleLoading from "../../utils/HandleLoading/HandleLoading"
import ComplaintsContainer from "../../components/enforcement/containers/ComplaintsContainer"
import ErrorBoundary from "../../components/layout/error/ErrorBoundary/ErrorBoundary"

function Complaints() {
  useHandlePageLoad()

  const { data, isSuccess } = useGetComplaints() 

  return (
    <Layout>
      <HandleLoading isSuccess={isSuccess}>
        <ErrorBoundary>
          <ComplaintsContainer 
            sites={sitesData?.data as Site[] || []}
            complaints={complaintsData?.data as Complaint[] || []} />
        </ErrorBoundary>
      </HandleLoading>
    </Layout>
  )
}

export default Complaints