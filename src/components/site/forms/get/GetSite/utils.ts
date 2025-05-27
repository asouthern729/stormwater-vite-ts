// Types
import { HandleSiteSelectProps } from "./types"

export const handleSiteSelect = (event: HandleSiteSelectProps['event'], options: HandleSiteSelectProps['options']): void => { // Handle site select
  const { setState } = options

  const selection = event.currentTarget.value

  setState({ siteId: selection })
}