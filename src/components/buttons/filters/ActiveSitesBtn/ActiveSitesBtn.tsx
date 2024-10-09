import { useContext } from 'react'
import AppContext from '../../../../context/App/AppContext'
import styles from './AtiveSitesBtn.module.css'

function ActiveSitesBtn() {
  const { showActiveSitesOnly, dispatch } = useContext(AppContext)

  return (
    <button 
      type="button"
      className={styles.btn}
      onClick={() => dispatch({ type: 'TOGGLE_SHOW_ACTIVE_SITES_ONLY', payload: undefined })}>
        {showActiveSitesOnly ? 'Show Inactive Sites' : 'Hide Inactive Sites'}
    </button>
  )
}

export default ActiveSitesBtn