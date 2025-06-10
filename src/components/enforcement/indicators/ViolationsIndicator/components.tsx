import { useFilterIssues } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

export type SiteIssuesType = AppTypes.ConstructionViolationInterface | AppTypes.IllicitDischargeInterface | AppTypes.ComplaintInterface | undefined

export const Stats = ({ issues }: { issues: SiteIssuesType[] }) => {
  const filtered = useFilterIssues(issues)

  return (
    <div className="absolute flex flex-col font-[play] gap-2 w-fit right-0 translate-x-2/3 translate-y-2 whitespace-nowrap">
      <Stat className="badge badge-error text-error-content w-full shadow-xl">{filtered.length} Total</Stat>
      <Stat className="badge badge-warning w-full shadow-xl">{filtered.filter(violation => !violation?.closed).length} Open</Stat>
      <Stat className="badge badge-success w-full shadow-xl">{filtered.filter(violation => violation?.closed).length} Closed</Stat>
    </div>
  )
}

export type StatProps = { className: string, children: React.ReactNode }

export const Stat = (props: StatProps) => {

  return (
    <span className={props.className}>{props.children}</span>
  )
}