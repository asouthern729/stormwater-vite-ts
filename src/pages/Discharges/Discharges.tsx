import { useGetSites } from "../Sites"

// Types
import { Site } from "../../context/App/types"

// Components
import Layout from "../../components/layout/Layout/Layout"
import HandleLoading from "../../utils/HandleLoading/HandleLoading"
import DischargesContainer from "../../components/containers/DischargesContainer/DischargesContainer"

function Discharges() {
  const { data } = useGetSites()

  return (
    <Layout>
      <HandleLoading
        data={data}>
          <DischargesContainer sites={data?.data as Site[]} />
      </HandleLoading>
    </Layout>
  )
}

export default Discharges