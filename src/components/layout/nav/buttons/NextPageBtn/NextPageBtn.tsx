import icon from '../../../../assets/icons/next/next.svg'
import styles from './NextPageBtn.module.css'

type NextPageBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, disabled: boolean }

function NextPageBtn(props: NextPageBtnProps) {
  
  return (
    <button 
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

export default NextPageBtn