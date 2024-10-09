// Types
import { Dispatch, SetStateAction } from "react"

export interface SearchProps { // Search props
  searchValue: string
  setSearchValue: Dispatch<SetStateAction<string>>
}