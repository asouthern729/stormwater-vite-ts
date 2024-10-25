import icon from '../../../../assets/icons/next/next.svg'
import styles from './NextPageBtn.module.css'

// Types
import { NextPageBtnProps } from './types'

function NextPageBtn({ handleClick, disabled }: NextPageBtnProps) {
  return (
    <button 
      data-testid="next-page-btn"
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

export default NextPageBtn