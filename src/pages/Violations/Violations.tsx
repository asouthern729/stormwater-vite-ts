import { useGetSites } from '../Sites'

// Types
import { Site } from '../../context/App/types'

// Components
import Layout from '../../components/layout/Layout/Layout'
import HandleLoading from '../../utils/HandleLoading/HandleLoading'
import ViolationsContainer from '../../components/containers/ViolationsContainer/ViolationsContainer'

function Violations() {
  const { data } = useGetSites()

  return (
    <Layout>
      <HandleLoading
        data={data}>
          <ViolationsContainer sites={data?.data as Site[]} />
      </HandleLoading>
    </Layout>
  )
}

export default Violations