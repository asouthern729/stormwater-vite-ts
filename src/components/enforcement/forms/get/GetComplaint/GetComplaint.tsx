import { useContext } from "react"
import EnforcementCtx from "@/components/enforcement/context"
import { useGetComplaint } from "./hooks"

// Components
import { Form } from './components'

function GetComplaint() {
  const { formUUID } = useContext(EnforcementCtx)

  const { data } = useGetComplaint(formUUID)

  return (
    <Form complaint={data?.data} />
  )
}

export default GetComplaint