// Types
import { InspectorTableYearBtnsProps } from "./types"

// Components
import PrevPageBtn from "../../../layout/nav/buttons/PrevPageBtn/PrevPageBtn"
import NextPageBtn from "../../../layout/nav/buttons/NextPageBtn/NextPageBtn"

function InspectorTableYearBtns({ year, setState }: InspectorTableYearBtnsProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-6 m-auto items-center w-fit">
        <PrevPageBtn
          handleClick={() => setState(prevState => ({ ...prevState, year: prevState.year - 1 }))} />
        <div className="text-neutral-content font-bold">{year}</div>
        <NextPageBtn
          handleClick={() => setState(prevState => ({ ...prevState, year: prevState.year + 1 }))}
          disabled={year === new Date().getFullYear()} />
      </div>
    </div>
  )
}

export default InspectorTableYearBtns