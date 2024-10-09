import styles from './ShowAllBtn.module.css'

// Types
import { ShowAllBtnProps } from './types'

function ShowAllBtn({ label, handleClick }: ShowAllBtnProps) {
  return (
    <button 
      type="button"
      className={styles.btn}
      onClick={handleClick}>
      {label}
    </button>
  )
}

export default ShowAllBtn