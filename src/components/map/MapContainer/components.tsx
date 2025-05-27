// Components
import Search from "../../search/Search"

export const MapSearch = ({ visible }: { visible: boolean }) => { // Map search component - for Sites and Inspectors pages
  if(!visible) return null

  return (
    <div className="absolute bottom-8 top-10 left-10 z-10 h-fit">
      <Search placeholder={'by site name, COF #, or permit..'} />
    </div>
  )
}