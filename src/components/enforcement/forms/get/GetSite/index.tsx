// Components
import * as Components from './components'

function GetSite() {

  return (
    <div className="flex flex-col gap-6 text-neutral-content font-[play] mt-10">
      <Components.SiteSelect />
      <Components.Form />
    </div>
  )
}

export default GetSite