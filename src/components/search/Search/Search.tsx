import { useContext } from 'react'
import AppContext from '../../../context/App/AppContext'
import styles from './Search.module.css'

// Types
import { SearchProps } from './types'

function Search({ placeholder }: SearchProps) {
  const { searchValue, dispatch } = useContext(AppContext)

  return (
    <div data-testid="search" className={styles.container}>
      <div className={styles.header}>Search</div>
      <div className="w-full">
        <input 
          type="text" 
          value={searchValue} 
          placeholder={placeholder}
          onChange={(e) => dispatch({ type: 'SET_SEARCH_VALUE', payload: e.currentTarget.value })} 
          className={styles.searchInput} />
        {searchValue && (
          <>
            <button
              data-testid="clear-btn" 
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