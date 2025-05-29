import { useContext } from 'react'
import ContactsCtx from '../../context'

// Types
import { FormProps } from '@/components/enforcement/containers/ViolationsContainer/components'

// Components
import FormContainer from "../../../form-elements/FormContainer"

export const UpdateForm = (props: FormProps) => { // Update form
  const { formUUID } = useContext(ContactsCtx)
  
  if(!formUUID) return null

  return (
    <div ref={props.formRef}>
      <FormContainer>
        {props.children}
      </FormContainer>
    </div>
  )
}