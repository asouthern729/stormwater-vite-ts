import { useState } from 'react'
import { useQueryClient } from 'react-query'
import { useValidateUser, useGetSiteUUID, handleDeleteBtnClick } from '../../../../helpers'
import { deleteViolation } from '../../../../context/App/AppActions'
import { useGetViolation } from '.'

// Types
import { GetViolationProps, GetViolationState } from './types'

// Components
import UpdateViolationForm from '../../update/UpdateViolationForm/UpdateViolationForm'
import DeleteBtn from '../../../buttons/forms/DeleteBtn/DeleteBtn'

function GetViolation({ uuid, resetState }: GetViolationProps) {
  const [state, setState] = useState<GetViolationState>({ deleteBtnActive: false, formUUID: uuid })

  const validated = useValidateUser()

  const { data } = useGetViolation(uuid, validated)

  const siteUUID = useGetSiteUUID()

  const queryClient = useQueryClient()

  return (
    <div data-testid="get-violation">
      {data?.data && (
        <div className="flex flex-col items-center">
          <UpdateViolationForm 
            violation={data.data}
            resetState={resetState} />
          <DeleteBtn
            label={!state.deleteBtnActive ? 'Delete Violation' : 'Confirm Delete'}
            handleClick={() => handleDeleteBtnClick(uuid as string, state.deleteBtnActive, deleteViolation, { setState, resetState, invalidateQuery: () => queryClient.invalidateQueries(siteUUID ? ['getSite', siteUUID] : 'getSites') })} />
        </div>
      )}
    </div>
  )
}

export default GetViolation