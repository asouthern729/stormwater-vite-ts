import { useGetViolation } from './hooks'

// Components
import { Form } from './components'
import { useContext } from 'react'
import EnforcementCtx from '@/components/enforcement/context'

function GetViolation() {
  const { formUUID } = useContext(EnforcementCtx)

  const { data } = useGetViolation(formUUID)

  return (
    <Form violation={data?.data} />
  )
}

export default GetViolation