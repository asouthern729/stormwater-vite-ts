import { useState } from "react"
import { useGetActiveSiteNames } from "./hooks"
import styles from './GetSite.module.css'

// Types
import { GetSiteProps, GetSiteState } from "./types"

// Components
import { SiteSelect, NoSiteBtn, Form } from "./components"

function GetSite({ form }: GetSiteProps) {
  const [state, setState] = useState<GetSiteState>({ siteId: null })

  const { data } = useGetActiveSiteNames()

  const selectedSite = data?.data.find(site => site.siteId === state.siteId)

  return (
    <div data-testid="get-site" className={styles.container}>
      <div className="flex flex-col gap-1 items-center">

        <h2 className="text-xl">Select Site</h2>

        <SiteSelect 
          sites={data?.data || []}
          setState={setState} />

        <NoSiteBtn
          form={form}
          handleClick={() => setState({ siteId: undefined })} />

      </div>

      <Form
        visible={state.siteId !== null}
        form={form}
        site={selectedSite} />
    </div>
  )
}

export default GetSite