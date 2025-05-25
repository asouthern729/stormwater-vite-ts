import styles from './FormNavBtn.module.css'

// Types
import { FormNavBtnProps } from './types'

function FormNavBtn({ label, value, isActive, handleClick }: FormNavBtnProps) {
  return (
    <button 
      type="button"
      className={isActive ? styles.activeBtn : styles.btn}
      value={value}
      onClick={(e) => handleClick(e)}>
        {label}
    </button>
  )
}

export default FormNavBtn