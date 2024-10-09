import { useContext } from "react"
import AppContext from "../../../../context/App/AppContext"
import { setLabel } from "."

import styles from './OpenIssuesBtn.module.css'

function OpenIssuesBtn() {
  const { showOpenIssuesOnly, dispatch } = useContext(AppContext)

  return (
    <button 
      type="button"
      className={styles.btn}
      onClick={() => dispatch({ type: 'TOGGLE_SHOW_OPEN_ISSUES_ONLY', payload: undefined })}>
        {setLabel(showOpenIssuesOnly)}
    </button>
  )
}

export default OpenIssuesBtn