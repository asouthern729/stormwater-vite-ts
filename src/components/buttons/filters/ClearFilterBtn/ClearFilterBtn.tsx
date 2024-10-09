import styles from './ClearFilterBtn.module.css'

// Types
import { ClearFilterBtnProps } from "./types"

function ClearFilterBtn({ label, handleClick }: ClearFilterBtnProps) {
  return (
    <button 
      type="button"
      onClick={handleClick}
      className={styles.btn}>
        {label}
    </button>
  )
}

export default ClearFilterBtn