import { deleteSite } from "../../../context/App/AppActions"
import { handleSuccessfulFormSubmit } from "../../../helpers/hooks"
import { errorPopup } from "../../../utils/Toast/Toast"

// Types
import { HandleDeleteSiteBtnClickProps } from "./types"

export const handleDeleteSiteBtnClick = async (uuid: HandleDeleteSiteBtnClickProps['uuid'], deleteBtnActive: HandleDeleteSiteBtnClickProps['deleteBtnActive'], options: HandleDeleteSiteBtnClickProps['options']): Promise<void> => { // Handle delete site button click
  const { setState, navigate, queryClient } = options 

  if(!deleteBtnActive) {
    setState(prevState => ({ ...prevState, deleteBtnActive: true }))
  } else {
    const result = await deleteSite(uuid)

    if(result.success) {
      handleSuccessfulFormSubmit(result.msg || '', { invalidateQuery: () => queryClient.invalidateQueries('getSites'), navigate: () => navigate('/') })
    } else errorPopup(result.msg)
  }
}