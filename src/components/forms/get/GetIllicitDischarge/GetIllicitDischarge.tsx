import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { useGetSiteUUID, handleDeleteBtnClick } from '../../../../helpers'
import { deleteIllicitDischarge } from '../../../../context/App/AppActions'
import { useGetIllicitDischarge } from '.'

// Types
import { GetIllicitDischargeProps, GetIllicitDischargeState } from './types'

// Components
import UpdateSiteIllicitDischargeForm from '../../update/UpdateSiteIllicitDischargeForm/UpdateSiteIllicitDischargeForm'
import DeleteBtn from '../../../buttons/forms/DeleteBtn/DeleteBtn'

function GetIllicitDischarge({ uuid, resetState }: GetIllicitDischargeProps) {
  const [state, setState] = useState<GetIllicitDischargeState>({ deleteBtnActive: false })

  const { data } = useGetIllicitDischarge(uuid)

  const siteUUID = useGetSiteUUID()

  const queryClient = useQueryClient()

  return (
    <div>
      {data && (
        <div className="flex flex-col items-center">
          <UpdateSiteIllicitDischargeForm 
            illicitDischarge={data.data}
            resetState={resetState} />
          <DeleteBtn
            label={!state.deleteBtnActive ? 'Delete Illicit Discharge' : 'Confirm Delete'}
            handleClick={() => handleDeleteBtnClick(uuid as string, state.deleteBtnActive, deleteIllicitDischarge, { setState, resetState, invalidateQuery: queryClient.invalidateQueries(['getSite', siteUUID]) })} />
        </div>
      )}
    </div>
  )
}

export default GetIllicitDischarge