// Components
import GreenInfrastructure from "../GreenInfrastructure/GreenInfrastructure"

export const GreenInfrastructureIcon = ({ visible }: { visible: boolean }) => { // Site green infrastructure icon
  if(!visible) return null

  return (
    <GreenInfrastructure />
  )
}