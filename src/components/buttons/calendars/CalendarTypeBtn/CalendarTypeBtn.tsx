import styles from './CalendarTypeBtn.module.css'

// Types
import { CalendarTypeBtnProps } from "./types"

function CalendarTypeBtn({ handleClick, label }: CalendarTypeBtnProps) {
  return (
    <button 
      type="button"
      onClick={handleClick}
      className={styles.btn}>
      {label}
    </button>
  )
}

export default CalendarTypeBtn