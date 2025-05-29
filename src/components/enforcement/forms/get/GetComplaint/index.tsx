import { useGetComplaint } from "./hooks"

// Components
import HandleLoading from "@/utils/HandleLoading/HandleLoading"
import * as Components from './components'

function GetComplaint() {
  const { data, isSuccess } = useGetComplaint()

  return (
    <HandleLoading isSuccess={isSuccess}>
      <Components.Form complaint={data?.data} />
    </HandleLoading>
  )
}

export default GetComplaint