import icon from '../../../../assets/icons/prev/prev.svg'
import styles from './PrevPageBtn.module.css'

type PrevPageBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, disabled: boolean }

function PrevPageBtn(props: PrevPageBtnProps) {

  return (
    <button
      data-testid="prev-page-btn" 
      type="button"
      onClick={props.onClick}
      className={styles.btn}
      disabled={props.disabled}>
        <div className="flex flex-col gap-1 justify-around">
          <img src={icon} className={'w-6'} />
        </div>
    </button>
  )
}

export default PrevPageBtn