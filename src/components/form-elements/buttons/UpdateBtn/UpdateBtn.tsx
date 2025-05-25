import styles from './UpdateBtn.module.css'

// Types
import { UpdateBtnProps } from "./types"

function UpdateBtn({ label, handleClick, disabled }: UpdateBtnProps) {
  return (
    <button 
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={styles.btn}>
        {label}
    </button>
  )
}

export default UpdateBtn