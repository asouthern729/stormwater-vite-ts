import icon from '../../../assets/icons/loading/loading.svg'

function Loading() {
  return (
    <img src={icon} alt="loading icon" className="mx-auto w-40 animate-pulse" />
  )
}

export default Loading