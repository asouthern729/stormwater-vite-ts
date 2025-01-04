import styles from './ActivityCalendarLegend.module.css'

function ActivityCalendarLegend() {
  
  return (
    <div className={styles.container}>
      <div className={styles.inspection}>Inspection</div>
      <div className={styles.violation}>Violation</div>
      <div className={styles.illicit}>Illicit Discharge</div>
      <div className={styles.complaint}>Complaint</div>
      <div className={styles.followUp}>Follow Up</div>
      <div className={styles.penalty}>Penalty</div>
      <div className={styles.swo}>SWO</div>
    </div>
  )
}

export default ActivityCalendarLegend