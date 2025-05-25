import { memo } from 'react'
import styles from './SaveBtn.module.css'

// Types
import { SaveBtnProps } from "./types"

const SaveBtn = ({ handleClick, disabled }: SaveBtnProps) => {
  return (
    <button
      type="submit"
      className={styles.btn}
      disabled={disabled}
      onClick={handleClick}>
        Save
    </button>
  )
}

export default memo(SaveBtn)