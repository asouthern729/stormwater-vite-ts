// Types
import { HandleLoadingProps } from './types'

// Components
import Loading from '../../components/loading/Loading/Loading'

function HandleLoading({ children, isSuccess }: HandleLoadingProps) {
  return (
    <>
      {isSuccess ? (
        children
      ) : <Loading />}
    </>
  )
}

export default HandleLoading