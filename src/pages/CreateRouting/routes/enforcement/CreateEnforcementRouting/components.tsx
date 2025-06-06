import { Routes, Route } from "react-router"

// Components
import CreateViolation from "./routes/CreateViolation"
import CreateComplaint from "./routes/CreateComplaint"
import CreateIlllicitDischarge from "./routes/CreateIllicitDischarge"

export const Routing = () => {

  return (
    <Routes>
      <Route path={'violation'} element={<CreateViolation />} />
      <Route path={'complaint'} element={<CreateComplaint />} />
      <Route path={'discharge'} element={<CreateIlllicitDischarge />} />
    </Routes>
  )
}