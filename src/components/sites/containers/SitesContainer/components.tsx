import { useContext, useRef } from "react"
import SitesCtx from '../../context'
import { basemapSelectOptions } from "@/components/map/BasemapSelector/utils.ts"
import { useSetSitesMapView } from './hooks.ts'

// Icons
import warningPinIcon from '@/assets/icons/pin/warning-pin.png'
import errorPinIcon from '@/assets/icons/pin/error-pin.png'

// Types
import * as AppTypes from '@/context/App/types'
import { BasemapType } from "../../context"

// Components
import MapLegend from "@/components/map/MapLegend/index.tsx"
import Loading from "@/components/layout/loading/Loading/index.tsx"

export const Map = ({ sites }: { sites: AppTypes.SiteInterface[] }) => {
  const mapRef = useRef<HTMLDivElement>(null)

  const isLoaded = useSetSitesMapView(mapRef, sites)

  return (
    <div className="flex-1 h-full">
      <div ref={mapRef} className="relative w-full h-full">
        <MapLoading isLoaded={isLoaded} />
        <div className="absolute top-2 right-4 z-10">
          <BasemapSelector />
        </div>
        <div className="absolute bottom-4 left-4 z-10">
          <MapLegend sites={sites} />
        </div>
      </div>
    </div>
  )
}

export const ActiveSitesBtn = () => {
  const { showActiveSitesOnly, dispatch } = useContext(SitesCtx)

  const label = showActiveSitesOnly ? 'Show Inactive Sites' : 'Hide Inactive Sites'

  return (
    <button 
      type="button"
      className="text-neutral-content font-[play] font-bold uppercase p-3 py-2 w-fit border border-neutral-content rounded shadow-xl hover:bg-neutral hover:border-neutral hover:cursor-pointer"
      onClick={() => dispatch({ type: 'TOGGLE_SHOW_ACTIVE_SITES_ONLY' })}>
        {label}
    </button>
  )
}

export const OpenIssuesBtn = () => {
  const { dispatch } = useContext(SitesCtx)

  return (
    <button 
      type="button"
      className="text-error font-[play] font-bold uppercase p-3 py-2 w-fit border border-error bg-error/20 rounded shadow-xl hover:bg-neutral hover:border-neutral hover:cursor-pointer"
      onClick={() => dispatch({ type: 'TOGGLE_OPEN_ISSUES_ONLY' })}>
        <OpenIssuesBtnLabel />
    </button>
  )
}

export const MapLoading = ({ isLoaded }: { isLoaded: boolean }) => {
  if(isLoaded) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center z-20">
      <Loading />
    </div>
  )
}

const BasemapSelector = () => {
  const { basemap, dispatch } = useContext(SitesCtx)

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="basemap selector" className="text-neutral-content font-[vt323] text-xl text-center uppercase translate-y-[4px]">Basemap</label>
      <div className="flex flex-col justify-around gap-2 p-1 bg-neutral/40 backdrop-blur rounded-xl w-fit">
        <select 
          value={basemap}
          onChange={(e) => dispatch({ type: 'SET_BASEMAP', payload: e.currentTarget.value as BasemapType })}
          className="select select-sm select-bordered text-neutral-content bg-neutral w-full">
            {basemapSelectOptions.map(option => (
              <BasemapSelectOption 
                key={`basemap-option-${ option.value }`}
                option={option} />
            ))}
        </select>
      </div>
    </div>
  )
}

const BasemapSelectOption = ({ option }: { option: { value: BasemapType, text: string } }) => {

  return (
    <option value={option.value} className="text-neutral-content bg-neutral">{option.text}</option>
  )
}

const OpenIssuesBtnLabel = () => {
  const { showOpenIssuesOnly } = useContext(SitesCtx)

  if(showOpenIssuesOnly) return (
    <div className="flex gap-4 items-center">
      Show All Sites
      <div className="flex">
        <img src={warningPinIcon} alt="warning pin icon" className="w-5" />
        <img src={errorPinIcon} alt="error pin icon" className="w-5" />
      </div>
    </div>
  )

  return (
    <div className="flex gap-1 items-center">
      Open Issues Only
      <img src={errorPinIcon} alt="error pin icon" className="w-5" />
    </div>
  )
}