import { useGetContacts } from './hooks'

// Components
import Layout from '../../components/layout/Layout'
import HandleLoading from '../../utils/HandleLoading'
import ContactsContainer from '../../components/contacts/containers/ContactsContainer'
import { ContactsProvider } from '@/components/contacts/context'
import ErrorBoundary from '../../components/layout/error/ErrorBoundary'

function Contacts() {
  const { data, isSuccess } = useGetContacts()

  return (
    <Layout>
      <HandleLoading isSuccess={isSuccess}>
        <ErrorBoundary href={'/sites'}>
          <ContactsProvider>
            <ContactsContainer contacts={data?.data || []} />
          </ContactsProvider>
        </ErrorBoundary>
      </HandleLoading>
    </Layout>
  )
}

export default Contacts