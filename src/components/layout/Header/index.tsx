// Components
import * as Components from './components'

function Header() {

  return (
    <header className="flex justify-between font-[play] tracking-[.25rem] items-center bg-primary py-1 px-8 w-full h-[14vh] shadow-xl 2xl:h-[10vh]">
      <Components.Title />
      <Components.Buttons />
    </header>
  )
}

export default Header
