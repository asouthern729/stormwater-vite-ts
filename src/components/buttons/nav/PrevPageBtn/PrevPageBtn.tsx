import icon from '../../../../assets/icons/prev/prev.svg'
import styles from './PrevPageBtn.module.css'

// Types
import { PrevPageBtnProps } from './types'

function PrevPageBtn({ handleClick, disabled }: PrevPageBtnProps) {
  return (
    <button
      data-testid="prev-page-btn" 
      type="button"
      onClick={handleClick}
      className={styles.btn}
      disabled={disabled}>
        <div className="flex flex-col gap-1 justify-around">
          <img src={icon} className={'w-6'} />
        </div>
    </button>
  )
}

export default PrevPageBtn