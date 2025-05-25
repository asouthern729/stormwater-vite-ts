import styles from './ClearFilterBtn.module.css'

type ClearFilterBtnProps = { onClick: React.MouseEventHandler<HTMLButtonElement>, children: React.ReactNode }

function ClearFilterBtn(props: ClearFilterBtnProps) {

  return (
    <button 
      type="button"
      onClick={props.onClick}
      className={styles.btn}>
        {props.children}
    </button>
  )
}

export default ClearFilterBtn