import { useHandlePageLoad } from '../../helpers'
import { useGetSites } from "."

// Components
import Layout from "../../components/layout/Layout/Layout"
import HandleLoading from '../../utils/HandleLoading/HandleLoading'
import SitesContainer from "../../components/containers/SitesContainer/SitesContainer"

function Sites() {
  const { data } = useGetSites()

  useHandlePageLoad()

  return (
    <Layout>
      <HandleLoading
        children={<SitesContainer sites={data?.data || []} />}
        data={data} />
    </Layout>
  )
}

export default Sites