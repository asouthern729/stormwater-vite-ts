import { useCallback, useContext, useEffect, useState } from "react"
import { useForm, useFormContext } from "react-hook-form"
import { useQueryClient } from "react-query"
import Map from '@arcgis/core/Map'
import MapView from '@arcgis/core/views/MapView'
import Point from '@arcgis/core/geometry/Point'
import Graphic from '@arcgis/core/Graphic'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol"
import { TextSymbol } from "@arcgis/core/symbols"
import EnforcementCtx from "@/components/enforcement/context"
import SiteCtx from "@/components/site/context"
import { useEnableQuery } from "@/helpers/hooks"
import pinWarningIcon from '@/assets/icons/pin/warning-pin.png'
import { errorPopup } from "@/utils/Toast/Toast"
import { handleUpdateSite } from "./utils"

// Types
import * as AppTypes from '@/context/App/types'

export const useUpdateSiteForm = (site: AppTypes.SiteInterface) => { // UpdateSiteForm useForm state

  return useForm<AppTypes.SiteCreateInterface>({
    mode: 'onBlur',
    defaultValues: {
      name: site.name,
      location: site.location,
      xCoordinate: site.xCoordinate,
      yCoordinate: site.yCoordinate,
      inspectorId: site.inspectorId,
      preconDate: site.preconDate,
      permit: site.permit,
      cof: site.cof,
      tnq: site.tnq,
      greenInfrastructure: site.greenInfrastructure,
      inactive: site.inactive,
      SiteContacts: site.SiteContacts,
      uuid: site.uuid
    }
  })
}

export const useUpdateSiteFormContext = () => { // UpdateSiteForm context
  const methods = useFormContext<AppTypes.SiteCreateInterface>()

  return methods
}

export const useSetCreateSiteMapView = (mapRef: React.RefObject<HTMLDivElement>) => {
  const [state, setState] = useState<{ view: __esri.MapView | null, isLoaded: boolean }>({ view: null, isLoaded: false })

  useCreateMapView(mapRef, setState)

  useSetMapGraphics(state)
  
  useEffect(() => {
    if(state.view) {
      state.view.when(() => {
        setState(prevState => ({ ...prevState, isLoaded: true }))
      })
    }
  }, [state.view])
}

export const useOnCancelBtnClick = () => {
  const { dispatch: enforcementDispatch } = useContext(EnforcementCtx)
  const { dispatch: siteDispatch } = useContext(SiteCtx)

  return () => {
    enforcementDispatch({ type: 'RESET_CTX' })
    siteDispatch({ type: 'RESET_CTX' })
  }
}

export const useHandleFormSubmit = () => { // Handle form submit
  const { dispatch } = useContext(SiteCtx)

  const queryClient = useQueryClient()

  const { enabled, token } = useEnableQuery()

  return useCallback((formData: AppTypes.SiteCreateInterface) => {
    if(!enabled || !token) return

    handleUpdateSite(formData, token)
      .then(() => {
        queryClient.invalidateQueries(['getSite', formData.uuid])
        dispatch({ type: 'RESET_CTX' })
      })
      .catch(err => errorPopup(err))
  }, [enabled, token, dispatch, queryClient])
}

const useCreateMapView = (mapRef: React.RefObject<HTMLDivElement>, setState: React.Dispatch<React.SetStateAction<{ view: __esri.MapView | null, isLoaded: boolean }>>) => {
  const { setValue, getValues } = useFormContext<AppTypes.SiteCreateInterface>()

  const xCoordinate = getValues('xCoordinate')
  const yCoordinate = getValues('yCoordinate')

  useEffect(() => {
    const coordinates = { xCoordinate, yCoordinate }

    if(!mapRef?.current || !coordinates) return

    const map = new Map({ basemap: 'dark-gray-vector' })

    const mapView = new MapView({
      container: mapRef.current,
      map,
      center: [coordinates.xCoordinate, coordinates.yCoordinate],
      zoom: 16,
      ui: { components: [] }
    })

    mapView.when(() => setState(prevState => ({ ...prevState, view: mapView })))

    const pointGraphicsLayer = new GraphicsLayer({ id: 'pointGraphicsLayer' })
    const textGraphicsLayer = new GraphicsLayer({ id: 'textGraphicsLayer' })
    map.addMany([pointGraphicsLayer, textGraphicsLayer])

    const onMapClick = mapView.on("click", async (e) => {
      const mappoint = e.mapPoint

      setValue('xCoordinate', mappoint.longitude, { shouldValidate: true, shouldDirty: true })
      setValue('yCoordinate', mappoint.latitude, { shouldValidate: true, shouldDirty: true })
    })

    return () => {
      setTimeout(() => {
        onMapClick?.remove()
        mapView?.destroy()
      }, 50)
    }
  }, [mapRef, xCoordinate, yCoordinate, setState, setValue])
}

const useSetMapGraphics = (state: { view: __esri.MapView | null }) => {
  const { watch } = useFormContext<AppTypes.SiteCreateInterface>()

  const xCoordinate = watch('xCoordinate')
  const yCoordinate = watch('yCoordinate')

  useEffect(() => {
    if(!state.view) return

    const coordinates = { xCoordinate, yCoordinate }

    const pointGraphicsLayer = state.view.map?.findLayerById('pointGraphicsLayer') as GraphicsLayer
    const textGraphicsLayer = state.view.map?.findLayerById('textGraphicsLayer') as GraphicsLayer
    pointGraphicsLayer?.removeAll()
    textGraphicsLayer?.removeAll()

    if(coordinates.xCoordinate && coordinates.yCoordinate) {
      const point = new Point({
      longitude: coordinates.xCoordinate,
      latitude: coordinates.yCoordinate
      })

      const pictureMarker = new PictureMarkerSymbol({
        url: pinWarningIcon, 
        width: "32px",
        height: "32px",
        yoffset: "14px"
      })

      const graphic = new Graphic({
        geometry: point,
        symbol: pictureMarker
      })

      const labelText = new TextSymbol({
        text: "Site Location",
        color: "#FFFFFF",
        yoffset: -14,
        font: { size: 10 }
      })

      const label = new Graphic({
        geometry: point,
        symbol: labelText
      })

      pointGraphicsLayer.add(graphic)
      textGraphicsLayer.add(label)
    }
  }, [state, xCoordinate, yCoordinate])
}