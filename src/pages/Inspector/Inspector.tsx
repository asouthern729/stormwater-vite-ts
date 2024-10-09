import { useParams } from 'react-router-dom'
import { useGetInspector } from '.'

// Components
import Layout from '../../components/layout/Layout/Layout'

function Inspector() {
  const { slug } = useParams()

  const { data } = useGetInspector(slug)

  return (
    <Layout>Inspector</Layout>
  )
}

export default Inspector