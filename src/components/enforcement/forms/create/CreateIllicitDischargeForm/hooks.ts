import React, { useCallback, useContext, useState, useEffect } from "react"
import { useQueryClient, useQuery } from "react-query"
import { useForm, useFormContext } from "react-hook-form"
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Point from '@arcgis/core/geometry/Point'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol"
import { TextSymbol } from "@arcgis/core/symbols"
import pinIcon from '@assets/icons/pin/warning-pin.svg'
import { useEnableQuery } from "@/helpers/hooks"
import EnforcementCtx from "@/components/enforcement/context"
import { errorPopup } from "@/utils/Toast/Toast"
import * as AppActions from '@/context/App/AppActions'
import { authHeaders } from "@/helpers/utils"
import { handleCreateIllicitDischarge } from "./utils"

// Types
import { SiteInterface, IllicitDischargeCreateInterface } from "@/context/App/types"

export const useCreateSiteIllicitDischargeForm = (site: SiteInterface, date: string) => { // CreateSiteIllicitDischargeForm useForm
  const illicitDate = new Date(date || '').toISOString().split('T')[0]

  return useForm<IllicitDischargeCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      siteId: site?.siteId || null,
      date: illicitDate,
      xCoordinate: site?.xCoordinate || null,
      yCoordinate: site?.yCoordinate || null,
      locationDescription: '',
      inspectorId: site?.inspectorId || null,
      details: '',
      responsibleParty: '',
      volumeLost: '',
      streamWatershed: undefined,
      otherStreamWatershed: '',
      enforcementAction: '',
      penaltyDate: '',
      penaltyAmount: null,
      penaltyDueDate: '',
      paymentReceived: '',
      compliance: null,
      closed: null,
      FollowUpDates: []
    }
  })
}

export const useCreateIllicitDischargeFormContext = () => { // CreateSiteIllicitDischargeForm context
  const methods = useFormContext<IllicitDischargeCreateInterface>()

  return methods
}

export const useSetInspectorOptions = () => { // Return inspectors and set <select> options
  const { enabled, token } = useEnableQuery()

  const result = useQuery('getInspectors', () => AppActions.getInspectors(authHeaders(token)), { enabled })

  if(result.data?.success) {
    const inspectors = result.data.data

    return inspectors.map(inspector => {
      return { value: inspector.inspectorId, text: inspector.name }
    })
  } else return []
}

export const useSetIllicitDischargeMapView = (mapRef: React.RefObject<HTMLDivElement>) => {
  const [state, setState] = useState<{ view: __esri.MapView | null }>({ view: null })

  useCreateMapView(mapRef, setState)
  useSetMapGraphics(state)

  return state.view
}

export const useHandleFormSubmit = () => { // Handle form submit
  const { dispatch } = useContext(EnforcementCtx)

  const { enabled, token } = useEnableQuery()

  const queryClient = useQueryClient()

  return useCallback((formData: IllicitDischargeCreateInterface) => {
    if(!enabled || !token) {
      return
    }

    handleCreateIllicitDischarge(formData, token)
      .then(_ => {
        queryClient.invalidateQueries('getIllicitDischarges')
        dispatch({ type: 'SET_FORM_UUID', payload: '' })
      })
      .catch(err => errorPopup(err))
  }, [enabled, token, queryClient])
}

const useCreateMapView = (mapRef: React.RefObject<HTMLDivElement>, setState: React.Dispatch<React.SetStateAction<{ view: __esri.MapView | null }>>) => {
  const { setValue } = useFormContext<IllicitDischargeCreateInterface>()

  useEffect(() => {
    if(!mapRef?.current) return

    const map = new Map({ basemap: 'dark-grey-vector' })
    const mapView = new MapView({
      container: mapRef.current,
      map,
      center: [-86.86897349, 35.92531721],
      zoom: 16,
      ui: { components: [] }
    })

    const pointGraphicsLayer = new GraphicsLayer({ id: 'pointGraphicsLayer' })
    map.add(pointGraphicsLayer)

    setState({ view: mapView })

    const onMapClick = mapView.on("click", (e) => {
      setValue('xCoordinate', e.mapPoint.longitude)
      setValue('yCoordinate', e.mapPoint.latitude)
    })

    return () => {
      onMapClick.remove()
      mapView.destroy()
    }
  }, [mapRef, setValue])
}

const useSetMapGraphics = (state: { view: __esri.MapView | null }) => {
  const { watch } = useFormContext<IllicitDischargeCreateInterface>()

  const xCoordinate = watch('xCoordinate')
  const yCoordinate = watch('yCoordinate')

  useEffect(() => {
    if(!state.view || !xCoordinate || !yCoordinate) return

    const pointGraphicsLayer = state.view.map.findLayerById('pointGraphicsLayer') as GraphicsLayer
    pointGraphicsLayer.removeAll()

    const point = new Point({
      longitude: xCoordinate,
      latitude: yCoordinate
    })

    const pictureMarker = new PictureMarkerSymbol({
      url: pinIcon, 
      width: "32px",
      height: "32px",
      yoffset: "14px"
    })

    const graphic = new Graphic({
      geometry: point,
      symbol: pictureMarker
    })

    const labelText = new TextSymbol({
      text: 'New Illicit Discharge',
      color: "#FFFFFF",
      yoffset: -14,
      font: { size: 10 }
    })

    const label = new Graphic({
      geometry: point,
      symbol: labelText
    })

    pointGraphicsLayer.addMany([graphic, label])
  }, [state.view, xCoordinate, yCoordinate])
}