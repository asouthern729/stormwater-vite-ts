import styles from './CancelBtn.module.css'

// Types
import { CancelBtnProps } from './types'

function CancelBtn({ handleClick }: CancelBtnProps) {
  return (
    <button
      type="submit"
      className={styles.btn}
      onClick={handleClick}>
        Cancel
    </button>
  )
}

export default CancelBtn