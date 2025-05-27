import cofIcon from '../../../assets/icons/cof/cof.svg'
import styles from './FormContainer.module.css'

function FormContainer({ children }: { children: React.ReactNode }) {

  return (
    <div className={styles.container}>
      <img src={cofIcon} className={styles.icon} />
        {children}
    </div>
  )
}

export default FormContainer