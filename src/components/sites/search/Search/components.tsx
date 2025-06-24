import { useContext } from "react"
import SitesCtx from "@/components/sites/context"

export const Header = () => {

  return (
    <h2 className="absolute text-warning text-4xl font-[fugaz_one] text-shadow-lg -top-5 -left-5 z-10">Search</h2>
  )
}

export const SearchInput = ({ onChange, searchValue }: { onChange: React.ChangeEventHandler<HTMLInputElement>, searchValue: string }) => {

  return (
    <input 
      type="text" 
      value={searchValue} 
      placeholder="by project name, COF #, or permit #.." 
      onChange={(e) => onChange(e)} 
      className="input input-lg w-full" />
  )
}

export const ClearBtn = ({ searchValue }: { searchValue: string }) => { // Clear search button
  const { dispatch } = useContext(SitesCtx)

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