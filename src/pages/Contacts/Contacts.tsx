import { useHandlePageLoad, useValidateUser } from '../../helpers'
import { useGetContacts } from './hooks'

// Types
import { Contact } from '../../context/App/types'

// Components
import Layout from '../../components/layout/Layout/Layout'
import HandleLoading from '../../utils/HandleLoading/HandleLoading'
import ContactsContainer from '../../components/containers/ContactsContainer/ContactsContainer'
import ErrorBoundary from '../../components/error/ErrorBoundary/ErrorBoundary'

function Contacts() {
  const validated = useValidateUser()

  useHandlePageLoad(validated)

  const { data, isSuccess } = useGetContacts(validated)

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