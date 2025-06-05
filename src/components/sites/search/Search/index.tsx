// Components
import * as Components from './components'

function Search() {

  return (
    <div className="relative flex w-1/4 min-h-[50px] rounded-lg">
      <Components.Header />
      <Components.SearchInput />
      <Components.ClearBtn />
    </div>
  )
}

export default Search