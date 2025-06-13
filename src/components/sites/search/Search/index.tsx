// Components
import * as Components from './components'

function Search({ onSearchChange, searchValue }: { onSearchChange: React.ChangeEventHandler<HTMLInputElement>, searchValue: string }) {

  return (
    <div className="relative flex w-1/4 min-h-[50px] rounded-lg">
      <Components.Header />
      <Components.SearchInput 
        onChange={onSearchChange}
        searchValue={searchValue} />
      <Components.ClearBtn />
    </div>
  )
}

export default Search