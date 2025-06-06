// Components
import Layout from '@/components/layout/Layout'
import FormContainer from '@/components/form-elements/FormContainer'
import CreateContactForm from '@/components/contacts/forms/create/CreateContactForm'

function CreateContact() {

  return (
    <Layout>
      <div className="m-auto my-10 w-3/4 2xl:w-3/5">
        <FormContainer>
          <CreateContactForm />
        </FormContainer>
      </div>
    </Layout>
  )
}

export default CreateContact