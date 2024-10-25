import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { useValidateUser, useGetSiteUUID, handleDeleteBtnClick } from '../../../../helpers'
import { deleteIllicitDischarge } from '../../../../context/App/AppActions'
import { useGetIllicitDischarge } from '.'

// Types
import { GetIllicitDischargeProps, GetIllicitDischargeState } from './types'

// Components
import UpdateSiteIllicitDischargeForm from '../../update/UpdateSiteIllicitDischargeForm/UpdateSiteIllicitDischargeForm'
import DeleteBtn from '../../../buttons/forms/DeleteBtn/DeleteBtn'

function GetIllicitDischarge({ uuid, resetState }: GetIllicitDischargeProps) {
  const [state, setState] = useState<GetIllicitDischargeState>({ deleteBtnActive: false })

  const validated = useValidateUser()

  const { data } = useGetIllicitDischarge(uuid, validated)

  const siteUUID = useGetSiteUUID()

  const queryClient = useQueryClient()

  return (
    <div data-testid="get-illicit-discharge">
      {data?.data && (
        <div className="flex flex-col items-center">
          <UpdateSiteIllicitDischargeForm 
            illicitDischarge={data.data}
            resetState={resetState} />
          <DeleteBtn
            label={!state.deleteBtnActive ? 'Delete Illicit Discharge' : 'Confirm Delete'}
            handleClick={() => handleDeleteBtnClick(uuid as string, state.deleteBtnActive, deleteIllicitDischarge, { setState, resetState, invalidateQuery: () => queryClient.invalidateQueries(siteUUID ? ['getSite', siteUUID] : 'getSites') })} />
        </div>
      )}
    </div>
  )
}

export default GetIllicitDischarge