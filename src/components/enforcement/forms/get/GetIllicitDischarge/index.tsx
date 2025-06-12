import { useGetIllicitDischarge } from './hooks'

// Components
import HandleLoading from '@/utils/HandleLoading'
import * as Components from './components'

type GetIllicitDischargeProps = { handleDeleteBtn: { onClick: React.MouseEventHandler<HTMLButtonElement>, label: string } }

function GetIllicitDischarge(props: GetIllicitDischargeProps) {
  const { data, isSuccess } = useGetIllicitDischarge()

  return (
    <HandleLoading isSuccess={isSuccess}>
      <Components.Form 
        illicitDischarge={data?.data}
        handleDeleteBtn={props.handleDeleteBtn} />
    </HandleLoading>
  )
}

export default GetIllicitDischarge