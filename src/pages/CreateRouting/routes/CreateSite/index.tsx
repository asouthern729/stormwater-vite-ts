// Components
import Layout from "@/components/layout/Layout"
import FormContainer from "@/components/form-elements/FormContainer"
import CreateSiteForm from "@/components/site/forms/create/CreateSiteForm"

function CreateSite() {

  return (
    <Layout>
      <div className="m-auto my-10 w-3/4 2xl:w-3/5">
        <FormContainer>
          <CreateSiteForm />
        </FormContainer>
      </div>
    </Layout>
  )
}

export default CreateSite