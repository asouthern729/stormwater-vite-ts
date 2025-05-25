import { useContext } from 'react'
import EnforcementCtx from '@/components/enforcement/context'
import { useGetIllicitDischarge } from './hooks'

// Components
import { Form } from './components'

function GetIllicitDischarge() {
  const { formUUID } = useContext(EnforcementCtx)

  const { data } = useGetIllicitDischarge(formUUID)

  return (
    <Form illicitDischarge={data?.data} />
  )
}

export default GetIllicitDischarge