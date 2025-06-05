import cofIcon from '../../../assets/icons/cof/cof.svg'
import styles from './FormContainer.module.css'

function FormContainer({ children }: { children: React.ReactNode }) {

  return (
    <div className="relative flex flex-col bg-neutral/20 overflow-hidden px-15 py-10 m-auto shadow-xl">
      <img src={cofIcon} className={styles.icon} />
        {children}
    </div>
  )
}

export default FormContainer