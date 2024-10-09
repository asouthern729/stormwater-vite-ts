import { useHandlePageLoad, useGetInspectorsForForms, useGetContactsForForms } from "../../helpers"
import { useGetSite } from "."

// Types
import { Site as SiteType } from "../../context/App/types"

// Components
import Layout from "../../components/layout/Layout/Layout"
import HandleLoading from "../../utils/HandleLoading/HandleLoading"
import SiteContainer from "../../components/containers/SiteContainer/SiteContainer"

function Site() {
  const { data } = useGetSite()

  useHandlePageLoad()
  useGetInspectorsForForms()
  useGetContactsForForms()

  return (
    <Layout>
      <HandleLoading
        children={<SiteContainer site={data?.data as SiteType} />}
        data={data} />
    </Layout>
  )
}

export default Site