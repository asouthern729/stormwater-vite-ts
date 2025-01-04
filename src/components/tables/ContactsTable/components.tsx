// Types
import { Dispatch, SetStateAction } from "react"
import { ContactsTableState } from './types'

// Components
import PrevPageBtn from "../../buttons/nav/PrevPageBtn/PrevPageBtn"
import NextPageBtn from "../../buttons/nav/NextPageBtn/NextPageBtn"

export const PageBtns = ({ currentPage, totalPages, setState }: { currentPage: number, totalPages: number, setState: Dispatch<SetStateAction<ContactsTableState>> }) => { // Page buttons

  return (
    <div className="flex justify-between items-end w-full">
      <div className="flex gap-4 ml-auto">
        <PrevPageBtn 
          handleClick={() => setState(prevState => ({ ...prevState, currentPage: prevState.currentPage - 1 }))}
          disabled={currentPage === 1} />
        <NextPageBtn 
          handleClick={() => setState(prevState => ({ ...prevState, currentPage: prevState.currentPage + 1 }))}
          disabled={currentPage === totalPages} />
      </div>
    </div>
  )
}