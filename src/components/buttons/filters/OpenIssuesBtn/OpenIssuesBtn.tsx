import { useContext } from "react"
import AppContext from "../../../../context/App/AppContext"
import styles from './OpenIssuesBtn.module.css'

// Components
import { Label } from "./components"

function OpenIssuesBtn() {
  const { dispatch } = useContext(AppContext)

  return (
    <button 
      type="button"
      className={styles.btn}
      onClick={() => dispatch({ type: 'TOGGLE_SHOW_OPEN_ISSUES_ONLY', payload: undefined })}>
        <Label />
    </button>
  )
}

export default OpenIssuesBtn