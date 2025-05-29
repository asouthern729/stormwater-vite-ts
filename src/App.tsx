import { BrowserRouter as Router, Route, Routes } from "react-router"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from "react-toastify"
import { APP_BASE } from "./config"
import 'react-toastify/dist/ReactToastify.css'

// Components
import Login from "./pages/Login"
import Sites from "./pages/Sites"
import Site from "./pages/Site"
import Create from "./pages/Create"
import Inspector from "./pages/Inspector"
import Violations from "./pages/Enforcement/Violations"
import Complaints from "./pages/Enforcement/Complaints"
import Discharges from "./pages/Enforcement/Discharges"
import Contacts from "./pages/Contacts"
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename={APP_BASE}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Sites />} />
          <Route path="/site/:uuid" element={<Site />} />
          <Route path="/create" element={<Create />} />
          <Route path="/inspectors/:slug" element={<Inspector />} />
          <Route path="/enforcement/violations" element={<Violations />} />
          <Route path="/enforcement/complaints" element={<Complaints />} />
          <Route path="/enforcement/discharges" element={<Discharges />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App