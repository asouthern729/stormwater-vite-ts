import icon from '../../../../assets/icons/menu/menu.svg'
import activeIcon from '../../../../assets/icons/menu/menu-light.svg'

// Types
import { MenuBtnProps } from './types'

function MenuBtn({ handleClick, active }: MenuBtnProps) {
  return (
    <button 
      type="button"
      className="flex flex-col justify-center w-16"
      onClick={handleClick}>
        <img src={!active ? icon : activeIcon} alt="menu icon" className="m-auto w-3/4" />
    </button>
  )
}

export default MenuBtn