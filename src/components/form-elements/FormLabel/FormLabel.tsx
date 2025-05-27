import styles from '../Forms.module.css'

// Types
import { Path } from 'react-hook-form'
import { SiteCreateInterface, ConstructionViolationCreateInterface, ComplaintCreateInterface, IllicitDischargeCreateInterface } from '@/context/App/types'

// Components
import RequiredIcon from '../RequiredIcon'

type FormLabelProps = { name: Path<SiteCreateInterface|ConstructionViolationCreateInterface|ComplaintCreateInterface|IllicitDischargeCreateInterface>, required?: boolean, children: React.ReactNode }

function FormLabel(props: FormLabelProps) {
  
  return (
    <label data-testid="form-label" htmlFor={props.name} className={styles.label}>{props.children}{props.required && <RequiredIcon />}</label>
  )
}

export default FormLabel