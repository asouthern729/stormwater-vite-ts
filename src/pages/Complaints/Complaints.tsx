import { useGetSites } from "../Sites"
import { useGetComplaints } from '.'

// Types
import { Site, Complaint } from "../../context/App/types"

// Components
import Layout from "../../components/layout/Layout/Layout"
import HandleLoading from "../../utils/HandleLoading/HandleLoading"
import ComplaintsContainer from "../../components/containers/ComplaintsContainer/ComplaintsContainer"

function Complaints() {
  const { data: sitesData } = useGetSites()
  const { data: complaintsData } = useGetComplaints()

  return (
    <Layout>
      <HandleLoading
        data={sitesData}>
          <ComplaintsContainer 
            sites={sitesData?.data as Site[] || []}
            complaints={complaintsData?.data as Complaint[] || []} />
      </HandleLoading>
    </Layout>
  )
}

export default Complaints