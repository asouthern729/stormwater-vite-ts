import styles from './HeaderBtn.module.css'

// Types
import { SetBtnStyleProps } from "./types"

export const setBtnStyle = (activePage: SetBtnStyleProps['activePage'], label: SetBtnStyleProps['label']): string => { // Set button style based on current active page
  if(label === activePage) { // Active page
    return styles.activeBtn
  }

  return styles.btn
}