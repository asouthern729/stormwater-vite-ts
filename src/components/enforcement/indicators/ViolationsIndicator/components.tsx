import { useFilterIssues } from './hooks'

// Types
import * as AppTypes from '@/context/App/types'

export type SiteIssuesType = AppTypes.ConstructionViolationInterface | AppTypes.IllicitDischargeInterface | AppTypes.ComplaintInterface | undefined

export const Stats = ({ issues }: { issues: SiteIssuesType[] }) => {
  const filtered = useFilterIssues(issues)

  return (
    <div className="indicator-item flex flex-col font-[play] gap-2 w-full translate-x-44 translate-y-8">
      <Stat className="badge badge-error text-error-content w-1/2">{filtered.length} Total</Stat>
      <Stat className="badge badge-warning badge-outline w-1/2">{filtered.filter(violation => !violation?.closed).length} Open</Stat>
      <Stat className="badge badge-success badge-outline w-1/2">{filtered.filter(violation => violation?.closed).length} Closed</Stat>
    </div>
  )
}

export type StatProps = { className: string, children: React.ReactNode }

export const Stat = (props: StatProps) => {

  return (
    <span className={props.className}>{props.children}</span>
  )
}