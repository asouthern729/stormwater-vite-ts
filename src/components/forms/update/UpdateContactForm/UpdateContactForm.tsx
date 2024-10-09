import { useUpdateContactForm } from "."

// Types
import { UpdateContactFormProps } from "./types"

function UpdateContactForm({ contact }: UpdateContactFormProps) {
  const methods = useUpdateContactForm(contact)

  return (
    <div>UpdateContactForm</div>
  )
}

export default UpdateContactForm