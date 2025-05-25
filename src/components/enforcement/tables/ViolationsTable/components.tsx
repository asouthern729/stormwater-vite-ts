import { useContext } from "react"
import EnforcementCtx from "../../context"

// Components
import PrevPageBtn from "@/components/layout/nav/buttons/PrevPageBtn/PrevPageBtn"
import NextPageBtn from "@/components/layout/nav/buttons/NextPageBtn/NextPageBtn"

export const ShowClosedIssuesCheckbox = () => {
  const { showClosedSiteIssues, dispatch } = useContext(EnforcementCtx)

  return (
    <div className="flex gap-2 text-neutral-content w-fit">
      <label>Show Closed:</label>
      <input 
        type="checkbox"
        className="checkbox checkbox-secondary"
        checked={showClosedSiteIssues}
        onChange={() => dispatch({ type: 'TOGGLE_SHOW_CLOSED_SITE_ISSUES' })} />
    </div>
  )
}

export const PageNavBtns = () => {

  return (
    <div className="flex gap-4 ml-auto">
      <PrevPageBtn 
        handleClick={() => handlePrevPageBtnClick(setState)}
        disabled={currentPage === 1} />
      <NextPageBtn 
        handleClick={() => handleNextPageBtnClick(setState)}
        disabled={!totalPages || currentPage === totalPages} />
    </div>
  )
}