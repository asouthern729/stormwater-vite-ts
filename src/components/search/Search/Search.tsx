import { useContext } from 'react'
import AppContext from '../../../context/App/AppContext'
import styles from './Search.module.css'

function Search() {
  const { searchValue, dispatch } = useContext(AppContext)

  return (
    <div className={styles.container}>
      <div className={styles.header}>Search</div>
      <div className="w-full">
        <input 
          type="text" 
          value={searchValue} 
          placeholder="by site name, cof #, or permit #.." 
          onChange={(e) => dispatch({ type: 'SET_SEARCH_VALUE', payload: e.currentTarget.value })} 
          className={styles.searchInput} />
        {searchValue && (
          <>
            <button 
              type="button"
              value={''} 
              onClick={() => dispatch({ type: 'SET_SEARCH_VALUE', payload: '' })}
              className={styles.clearBtn}>
              Clear
            </button>
          </>
        )}
      </div>
      
    </div>
  )
}

export default Search