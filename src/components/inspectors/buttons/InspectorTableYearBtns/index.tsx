import { useHandleInspectorTableYearBtns } from './hooks'

// Components
import PrevPageBtn from "@/components/layout/nav/buttons/PrevPageBtn"
import NextPageBtn from "@/components/layout/nav/buttons/NextPageBtn"

function InspectorTableYearBtns() {
  const { onPrevBtnClick, onNextBtnClick, nextBtnDisabled, year } = useHandleInspectorTableYearBtns()

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-6 m-auto items-center w-fit">
        <PrevPageBtn onClick={onPrevBtnClick} />
        <div className="text-neutral-content font-bold">{year}</div>
        <NextPageBtn
          onClick={onNextBtnClick}
          disabled={nextBtnDisabled} />
      </div>
    </div>
  )
}

export default InspectorTableYearBtns