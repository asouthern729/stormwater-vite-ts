import { useContext } from 'react'
import SitesCtx from '@/components/sites/context'
import { basemapSelectOptions } from './utils'

// Types
import { BasemapType } from '@/components/sites/context'

export const BasemapSelect = () => {
  const { basemap, dispatch } = useContext(SitesCtx)

  return (
    <select 
      value={basemap}
      onChange={(e) => dispatch({ type: 'SET_BASEMAP', payload: e.currentTarget.value as BasemapType })}
      className="select select-sm select-bordered text-neutral-content w-full">
        {basemapSelectOptions.map(option => (
          <BasemapSelectOption 
            key={`basemap-option-${ option.value }`}
            option={option} />
        ))}
    </select>
  )
}

const BasemapSelectOption = ({ option }: { option: { value: BasemapType, text: string } }) => {

  return (
    <option value={option.value} className="text-neutral-content bg-neutral">{option.text}</option>
  )
}