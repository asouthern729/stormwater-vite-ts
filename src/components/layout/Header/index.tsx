import { Link } from 'react-router'
import { APP_TITLE } from '../../../config'

// Components
import * as Components from './components'

function Header() {
  return (
    <header className="flex justify-between font-[play] tracking-[.25rem] items-center bg-primary py-1 px-8 w-full h-[14vh] shadow-xl 2xl:h-[10vh]">
      <Link to={'/sites'}>
        <div className="flex flex-col text-primary-content items-start">
          <h1 className="text-2xl font-bold text-center">City of Franklin</h1>
          <h2 className="text-xl ml-6 w-fit">{APP_TITLE}</h2>
        </div>
      </Link>

      <Components.Buttons />
    </header>
  )
}

export default Header
