// Types
import { CreateSiteLogBtnProps } from "./types"

function CreateSiteLogBtn({ selected, handleClick }: CreateSiteLogBtnProps) {
  const label = selected === 1 ? 'Create Inspection Log' : `Create Inspection Log For ${ selected } Sites`

  return (
    <button 
      type="button"
      className="btn btn-primary uppercase"
      onClick={handleClick}>
        {label}
    </button>
  )
}

export default CreateSiteLogBtn