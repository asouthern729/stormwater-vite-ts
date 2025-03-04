import { useHandlePageLoad } from '../../helpers'
import { useGetContacts } from './hooks'

// Types
import { Contact } from '../../context/App/types'

// Components
import Layout from '../../components/layout/Layout/Layout'
import HandleLoading from '../../utils/HandleLoading/HandleLoading'
import ContactsContainer from '../../components/containers/ContactsContainer/ContactsContainer'
import ErrorBoundary from '../../components/error/ErrorBoundary/ErrorBoundary'

function Contacts() {
  useHandlePageLoad()

  const { data, isSuccess } = useGetContacts()

  return (
    <Layout>
      <HandleLoading
        isSuccess={isSuccess}>
          <ErrorBoundary>
            <ContactsContainer contacts={data?.data as Contact[]} />
          </ErrorBoundary>
      </HandleLoading>
    </Layout>
  )
}

export default Contacts