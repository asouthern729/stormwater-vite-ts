import { useSetTableData } from './hooks'

// Types
import { ConstructionViolationInterface, SiteInterface } from '@/context/App/types'

function ViolationsTable({ violations, sites }: { violations: ConstructionViolationInterface[], sites: SiteInterface[] }) {
  const tableData = useSetTableData(violations, sites)

  return (
    <div>ViolationsTable</div>
  )
}

export default ViolationsTable