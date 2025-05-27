import { useQueryClient } from "react-query"
import { useGetSiteUUID, handleDeleteBtnClick } from "../../../../../helpers/hooks"
import { deleteFollowUp } from "../../../../../context/App/AppActions"
import { useUpdateViolationFormContext } from './hooks'
import styles from '../../Forms.module.css'

// Types
import { FollowUp } from "../../../../../context/App/types"

// Components
import UpdateFollowUpForm from "../UpdateFollowUpForm/UpdateFollowUpForm"
import DeleteBtn from "../../../../form-elements/buttons/DeleteBtn/DeleteBtn"

export const ExistingFollowUpsInputs = ({ followUps, handleCloseForm }: { followUps: FollowUp[], handleCloseForm: () => void }) => { // Existing follow up dates inputs
  const queryClient = useQueryClient()

  const siteUUID = useGetSiteUUID()

  if(!followUps.length) return null

  return (
    <div className="flex flex-col gap-4 mt-4">
      {followUps.map(followUp => {
        return (
          <div key={`follow-up-${ followUp.uuid }`} className="flex flex-col gap-4 items-center p-10 pb-6 bg-error/10">
            <UpdateFollowUpForm followUp={followUp} />
            <DeleteBtn
              label={'Delete Follow Up'}
              handleClick={() => handleDeleteBtnClick(followUp.uuid, true, deleteFollowUp, { invalidateQuery: () => queryClient.invalidateQueries(['getSite', siteUUID]), handleCloseForm })} />
          </div>
        )
      })}
    </div>
  )
}

export const ComplianceCheckbox = () => { // Compliance checkbox
  const methods = useUpdateViolationFormContext()

  return (
    <div className="flex flex-col gap-1 items-center">
      <label htmlFor="compliance" className={styles.checkboxLabel}>Compliance:</label>
      <input
        type="checkbox"
        className="checkbox checkbox-warning"
        { ...methods.register('compliance') } />
    </div>
  )
}

export const ClosedCheckbox = () => { // Closed checkbox
  const methods = useUpdateViolationFormContext()

  return (
    <div className="flex flex-col gap-1 items-center">
      <label htmlFor="closed" className={styles.checkboxLabel}>Closed:</label>
      <input
        type="checkbox"
        className="checkbox checkbox-warning"
        { ...methods.register('closed') } />
    </div>
  )
}