import styles from './GetSite.module.css'

// Types
import { CreateFormType } from "@/pages/Create/types"

// Components
import { SiteSelect, NoSiteBtn, Form } from "./components"

function GetSite({ form }: { form: CreateFormType }) {

  return (
    <div className={styles.container}>
      <div className="flex flex-col gap-1 items-center">
        <h2 className="text-xl">Select Site</h2>

        <SiteSelect />
        <NoSiteBtn />

      </div>

      <Form form={form} />
    </div>
  )
}

export default GetSite