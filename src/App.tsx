import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer } from "react-toastify"
import { APP_BASE } from "./config"
import { UserProvider } from "./context/User/UserContext"
import { AppProvider } from "./context/App/AppContext"
import 'react-toastify/dist/ReactToastify.css'

// Components
import Login from "./pages/Login"
import Sites from "./pages/Sites"
import Site from "./pages/Site"
import Create from "./pages/Create"
import Inspector from "./pages/Inspector"
import Violations from "./pages/Violations"
import Complaints from "./pages/Complaints"
import Discharges from "./pages/Discharges"
import Green from "./pages/Green"
import Contacts from "./pages/Contacts"
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient()

function App() {
  return (
    <UserProvider>
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <Router basename={APP_BASE}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Sites />} />
              <Route path="/site/:uuid" element={<Site />} />
              <Route path="/create" element={<Create />} />
              <Route path="/inspectors/:inspectorId" element={<Inspector />} />
              <Route path="/violations" element={<Violations />} />
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/discharges" element={<Discharges />} />
              <Route path="/green" element={<Green />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </Router>
          <ToastContainer />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AppProvider>
    </UserProvider>
  )
}

export default App