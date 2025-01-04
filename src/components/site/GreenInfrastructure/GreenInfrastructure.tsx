import icon from '../../../assets/icons/leaf/leaf.svg'

function GreenInfrastructure() {
  
  return (
    <div data-testid="green-infrastructure" className="flex flex-col gap-1 items-center" title={`Green Infrastructure`}>
      <img src={icon} alt="green infrastructure icon" className={"w-8"} />
      <div className="flex flex-col items-center">
        <small className="text-success">Green Infrastructure</small>
      </div>
    </div>
  )
}

export default GreenInfrastructure