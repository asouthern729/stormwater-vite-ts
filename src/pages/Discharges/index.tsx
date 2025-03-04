import { useHandlePageLoad } from "../../helpers"
import { useGetSites } from "../Sites/hooks"
import { useGetDischarges } from "./hooks"

// Types
import { Site, IllicitDischarge } from "../../context/App/types"

// Components
import Layout from "../../components/layout/Layout/Layout"
import HandleLoading from "../../utils/HandleLoading/HandleLoading"
import DischargesContainer from "../../components/containers/DischargesContainer/DischargesContainer"
import ErrorBoundary from "../../components/error/ErrorBoundary/ErrorBoundary"

function Discharges() {
  useHandlePageLoad()

  const { data: sitesData, isSuccess: sitesSuccess } = useGetSites()
  const { data: dischargesData, isSuccess: dischargesSuccess } = useGetDischarges()

  const isSuccess = sitesSuccess && dischargesSuccess

  return (
    <Layout>
      <HandleLoading
        isSuccess={isSuccess}>
          <ErrorBoundary>
            <DischargesContainer 
              sites={sitesData?.data as Site[] || []}
              discharges={dischargesData?.data as IllicitDischarge[] || []} />
          </ErrorBoundary>
      </HandleLoading>
    </Layout>
  )
}

export default Discharges