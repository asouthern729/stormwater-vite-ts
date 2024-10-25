import { useState } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import styles from './BasemapSelector.module.css'

// Types
import { Basemap, MapContainerState } from '../MapContainer/types'

// Components
import BasemapSelector from './BasemapSelector'

describe('BasemapSelector', () => {
  const setStateMock = vi.fn()

  it('Renders correctly', () => {
      render(
        <BasemapSelector
          basemap={'dark-gray-vector'}
          setState={setStateMock} />
      )
      
      const element = screen.getByTestId('basemap-selector')

      expect(element).toBeInTheDocument()
  })

  it('onChange handler updates state', () => {
    const TestComponent = () => {
      const [state, setState] = useState<MapContainerState>({ basemap: 'dark-gray-vector' })

      return (
        <select 
          value={state.basemap}
          onChange={(e) => setState({ basemap: e.currentTarget.value as Basemap })}
          className="select select-sm select-bordered text-neutral-content w-full">
            <option value="dark-gray-vector" className={styles.option}>Dark Gray</option>
            <option value="streets-vector" className={styles.option}>Streets</option>
            <option value="streets-night-vector" className={styles.option}>Streets Night</option>
            <option value="satellite" className={styles.option}>Satellite</option>
        </select>
      )
    }

    render(<TestComponent />)

    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'satellite' } })

    expect(select).toHaveValue('satellite')
  })
})