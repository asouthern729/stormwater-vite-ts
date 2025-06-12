import { useLocation } from 'react-router'

export const useSetStyle = (hovered: boolean | undefined) => {
  const pathname = useLocation().pathname

  const textColor = pathname === '/sites' && !hovered ? 'text-neutral' : 'text-neutral-content'
  const fontWeight = pathname !== '/sites' && 'font-bold'

  return `${ textColor } ${ fontWeight }`
}