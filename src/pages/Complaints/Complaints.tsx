import { useValidateUser, useHandlePageLoad } from "../../helpers"
import { useGetSites } from "../Sites"
import { useGetComplaints } from '.'

// Types
import { Site, Complaint } from "../../context/App/types"

// Components
import Layout from "../../components/layout/Layout/Layout"
import HandleLoading from "../../utils/HandleLoading/HandleLoading"
import ComplaintsContainer from "../../components/containers/ComplaintsContainer/ComplaintsContainer"
import ErrorBoundary from "../../components/error/ErrorBoundary/ErrorBoundary"

function Complaints() {
  const validated = useValidateUser()

  useHandlePageLoad(validated)

  const { data: sitesData, isSuccess: sitesSuccess } = useGetSites(validated)
  const { data: complaintsData, isSuccess: complaintsSuccess } = useGetComplaints(validated)

  const isSuccess = sitesSuccess && complaintsSuccess

  return (
    <Layout>
      <HandleLoading
        isSuccess={isSuccess}>
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