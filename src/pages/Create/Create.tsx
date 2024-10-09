import { useLocation } from 'react-router-dom'
import { useGetInspectorsForForms, useGetContactsForForms } from '../../helpers'
import { setCreateForm } from '.'

// Types
import { CreateForm } from './types'

// Components
import Layout from "../../components/layout/Layout/Layout"

function Create() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const formType = queryParams.get('formType')

  useGetInspectorsForForms()
  useGetContactsForForms()

  return (
    <Layout>
      {setCreateForm(formType as CreateForm)}
    </Layout>
  )
}

export default Create