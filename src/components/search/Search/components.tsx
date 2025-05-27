import { useContext } from "react"
import SitesCtx from "@/components/sites/context"
import { useHandleSearch } from "./hooks"

export const Header = () => {

  return (
    <h2 className="absolute text-warning text-4xl font-[fugaz_one] text-shadow-lg -top-5 -left-5 z-10">Search</h2>
  )
}

export const SearchInput = () => {
  const { searchValue } = useContext(SitesCtx)

  const handleSearch = useHandleSearch()

  return (
    <input 
      type="text" 
      value={searchValue} 
      placeholder="by project name, COF #, or permit #.." 
      onChange={(e) => handleSearch(e)} 
      className="input input-lg w-full" />
  )
}

export const ClearBtn = () => { // Clear search button
  const { searchValue, dispatch } = useContext(SitesCtx)

  if(!searchValue) return null

  return (
    <button 
      type="button" 
      onClick={() => dispatch({ type: 'SET_SEARCH_VALUE', payload: '' })}
      className="absolute btn btn-lg btn-primary uppercase z-10 rounded-l-none right-0">
        Clear
    </button>
  )
}