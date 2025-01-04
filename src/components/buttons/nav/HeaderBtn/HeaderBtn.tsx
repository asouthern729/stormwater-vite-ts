import { useContext } from 'react'
import AppContext from '../../../../context/App/AppContext'
import { setBtnStyle } from './utils'

// Types
import { HeaderBtnProps } from "./types"

function HeaderBtn({ label, handleClick }: HeaderBtnProps) {
  const { activePage } = useContext(AppContext)

  return (
    <button
      type="button"
      onClick={handleClick}
      className={setBtnStyle(activePage, label)}>
        {label}
    </button>
  )
}

export default HeaderBtn