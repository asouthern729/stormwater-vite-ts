// Types
import React from "react"
import { FormType } from "../../context"

// Components
import CreateSiteLogForm from "../create/CreateSiteLogForm"

export const formMap = new Map<FormType, React.ComponentType<>>([
  ['createSiteLog', CreateSiteLogForm]
])