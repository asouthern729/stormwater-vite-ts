import { useHandlePageLoad } from "../../helpers"
import { useGetSites } from "../Sites/hooks"
import { useGetComplaints } from './hooks'

// Types
import { Site, Complaint } from "../../context/App/types"

// Components
import Layout from "../../components/layout/Layout/Layout"
import HandleLoading from "../../utils/HandleLoading/HandleLoading"
import ComplaintsContainer from "../../components/containers/ComplaintsContainer/ComplaintsContainer"
import ErrorBoundary from "../../components/error/ErrorBoundary/ErrorBoundary"

function Complaints() {
  useHandlePageLoad()

  const { data: sitesData, isSuccess: sitesSuccess } = useGetSites()
  const { data: complaintsData, isSuccess: complaintsSuccess } = useGetComplaints()

  const isSuccess = sitesSuccess && complaintsSuccess

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