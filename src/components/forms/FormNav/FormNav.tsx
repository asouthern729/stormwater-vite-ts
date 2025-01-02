import styles from './FormNav.module.css'

// Types
import { FormNavProps } from './types'

// Components
import FormNavBtn from "../../buttons/forms/FormNavBtn/FormNavBtn"

function FormNav({ activeForm, handleBtnClick }: FormNavProps) {
  
  return (
    <nav className={styles.container}>
      Select Form Type
      <div className="flex gap-8 w-full">
        <FormNavBtn 
          label={'Site Log'}
          value={'createSiteLog'}
          isActive={activeForm === 'createSiteLog'}
          handleClick={handleBtnClick} />
        <FormNavBtn 
          label={'Construction Violation'}
          value={'createSiteConstructionViolation'}
          isActive={activeForm === 'createSiteConstructionViolation'}
          handleClick={handleBtnClick} />
        <FormNavBtn 
          label={'Site Complaint'}
          value={'createSiteComplaint'}
          isActive={activeForm === 'createSiteComplaint'}
          handleClick={handleBtnClick} />
        <FormNavBtn 
          label={'Illicit Discharge'}
          value={'createIllicitDischarge'}
          isActive={activeForm === 'createIllicitDischarge'}
          handleClick={handleBtnClick} />
      </div>
    </nav>
  )
}

export default FormNav