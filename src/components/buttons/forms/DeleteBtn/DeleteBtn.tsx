import icon from '../../../../assets/icons/recycle/recycle.svg'
import styles from './DeleteBtn.module.css'

// Types
import { DeleteBtnProps } from './types'

function DeleteBtn({ label, handleClick }: DeleteBtnProps) {
  return (
    <button 
      type="button"
      className={styles.btn}
      onClick={handleClick}>
        <div className="flex items-center gap-2">
          {label}
          <img src={icon} alt="recycle icon" className="w-4" />
        </div>
    </button>
  )
}

export default DeleteBtn