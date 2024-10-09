import { useHandleError } from '.'
import icon from '../../../assets/icons/sad-face/sad-face.svg'
import styles from './Error.module.css'

// Types
import { ErrorProps } from './types'

function Error({ title, subtitle }: ErrorProps) {
  const { countdown } = useHandleError()

  return (
    <div className={styles.container}>
      <img src={icon} alt="sad face icon" className="w-28" />
      <div className="flex flex-col gap-3 items-center">
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.subTitle}>{subtitle} in <span className={styles.counter}>{countdown}</span> seconds</div>
      </div>
    </div>
  )
}

export default Error