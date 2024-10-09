// Types
import { HandleLoadingProps } from './types'

// Components
import Loading from '../../components/loading/Loading/Loading'

function HandleLoading({ children, data }: HandleLoadingProps) {
  return (
    <>
      {data ? (
        children
      ) : <Loading />}
    </>
  )
}

export default HandleLoading