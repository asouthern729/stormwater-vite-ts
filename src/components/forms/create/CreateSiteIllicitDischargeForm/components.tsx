import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import AppContext from "../../../../context/App/AppContext"
import { useCreateSiteIllicitDischargeFormContext } from "./hooks"
import styles from '../../Forms.module.css'

// Types
import { StreamWatershed } from "./types"

// Components
import FormLabel from "../../FormLabel/FormLabel"
import FormError from "../../FormError/FormError"
import MapContainer from "../../../map/MapContainer/MapContainer"
import SaveBtn from "../../../buttons/forms/SaveBtn/SaveBtn"
import CancelBtn from "../../../buttons/forms/CancelBtn/CancelBtn"

export const Map = ({ visible }: { visible: boolean }) => { // Map
  if(!visible) return null

  return (
    <div className={styles.mapDiv}>
      <MapContainer
        sites={[]}
        type={'create'}
        zoom={16} />
    </div>
  )
}

export const DateInput = () => { // Illicit discharge date
  const methods = useCreateSiteIllicitDischargeFormContext()

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex">
        <FormLabel
          label={'Illicit Discharge Date:'}
          name={'date'}
          required={true} />
        <input 
          type="date"
          className={styles.input}
          { ...methods.register('date', {
            required: 'Violation date is required',
            onBlur: () => methods.trigger('date')
          }) } />
      </div>
      <FormError field={'date'} />
    </div>
  )
}

export const InspectorSelect = ({ visible }: { visible: boolean }) => { // Inspector select
  if(!visible) return null

  const { inspectorOptions } = useContext(AppContext)

  const methods = useCreateSiteIllicitDischargeFormContext()

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex">
        <FormLabel
          label={'Inspector:'}
          name={'inspectorId'} />
        <select 
          className={styles.input}
          { ...methods.register('inspectorId') }>
            <option value={''}></option>
            {inspectorOptions.map((inspector) => (
              <option key={inspector.value} value={inspector.value}>
                {inspector.text}
              </option>
            ))}
        </select>
      </div>
    </div>
  )
}

export const LocationDescriptionInput = () => { // Location description input
  const methods = useCreateSiteIllicitDischargeFormContext()

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex">
        <FormLabel
          label={'Location Description:'}
          name={'locationDescription'} />
        <input 
          type="text"
          className={styles.input}
          { ...methods.register('locationDescription', {
            maxLength: {
              value: 50,
              message: 'Location description must be 50 characters or less'
            },
            onChange: () => methods.trigger('locationDescription')
          }) } />
      </div>
      <FormError field={'locationDescription'} />
    </div>
  )
}

export const ResponsiblePartyInput = () => { // Responsible party input
  const methods = useCreateSiteIllicitDischargeFormContext()

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex">
        <FormLabel
          label={'Responsible Party:'}
          name={'responsibleParty'} />
        <input 
          type="text"
          className={styles.input}
          { ...methods.register('responsibleParty', {
            maxLength: {
              value: 50,
              message: 'Responsible party must be 50 characters or less'
            },
            onChange: () => methods.trigger('responsibleParty')
          }) } />
      </div>
      <FormError field={'responsibleParty'} />
    </div>
  )
}

export const DetailsInput = () => { // Details input
  const methods = useCreateSiteIllicitDischargeFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'Details:'}
          name={'details'}
          required={true} />
        <textarea
          className={styles.input}
          rows={4}
          { ...methods.register('details', {
          required: 'Violation details is required',
          maxLength: {
            value: 2000,
            message: 'Violation details must be 2000 characters or less'
          },
          onBlur: () => methods.trigger('details')
        }) } />
      </div>
      <FormError field={'details'} />
    </div>
  )
}

export const StreamWatershedSelect = () => { // Stream / watershed select
  const methods = useCreateSiteIllicitDischargeFormContext()

  return (
    <div className="flex gap-3 w-full">
      <div className={styles.inputSection}>
        <div className="flex w-full">
          <FormLabel
            label={'Stream / Watershed:'}
            name={'streamWatershed'}
            required={true} />
          <select 
            className={styles.input}
            { ...methods.register('streamWatershed', {
              required: 'Stream / watershed is required',
              onBlur: () => methods.trigger('streamWatershed')
            }) }>
            <option value={''}></option>
            {Object.values(StreamWatershed).map((streamWatershed) => (
              <option key={streamWatershed} value={streamWatershed}>{streamWatershed}</option>
            ))}
          </select>
          <FormError field={'streamWatershed'} />
        </div>
      </div>
      <OtherStreamWatershedInput />
    </div>
  )
}

export const EnforcementActionInput = () => { // Enforcement action input
  const methods = useCreateSiteIllicitDischargeFormContext()

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'Action:'}
          name={'enforcementAction'} />
        <textarea
          className={styles.input}
          rows={4}
          { ...methods.register('enforcementAction', {
            maxLength: {
              value: 2000,
              message: 'Enforcement action must be 2000 characters or less'
            }
          }) } />
      </div>
      <FormError field={'enforcementAction'} />
    </div>
  )
}

export const PenaltyInputs = () => { // Penalty inputs

  return (
    <div className="flex gap-3 w-full flex-wrap">
      <PenaltyDateInput />
      <PenaltyAmountInput />
      <PenaltyDueDate />
      <PaymentReceivedDateInput />
    </div>
  )
}

export const Buttons = ({ resetState }: { resetState: (() => void) | undefined }) => {
  const methods = useCreateSiteIllicitDischargeFormContext()

  const navigate = useNavigate()

  const disabled = !methods.formState.isValid || methods.formState.isSubmitting ? true : false

  return (
    <div className={styles.buttonsContainer}>
      <SaveBtn disabled={disabled} />
      <CancelBtn handleClick={resetState || (() => navigate('/'))} />
    </div>
  )
}

const OtherStreamWatershedInput = () => { // Other stream / watershed input
  const methods = useCreateSiteIllicitDischargeFormContext()

  const visible = methods.watch('streamWatershed') === 'Other' ? true : false

  if(!visible) return null

  return (
    <div className={styles.inputSection}>
      <div className="flex">
        <FormLabel
          label={'Other Stream / Watershed:'}
          name={'otherStreamWatershed'}
          required={true} />
        <input 
          type="text" 
          className={styles.input}
          { ...methods.register('otherStreamWatershed', {
            required: 'Stream / Watershed is required',
            maxLength: {
              value: 50,
              message: 'Stream / Watershed must be 50 characters or less'
            },
            onBlur: () => methods.trigger('otherStreamWatershed'),
            onChange: () => methods.trigger('otherStreamWatershed')
          }) } />
      </div>
      <FormError field={'otherStreamWatershed'} />
    </div>
  )
}

const PenaltyDateInput = () => { // Penalty date input
  const methods = useCreateSiteIllicitDischargeFormContext()

  return (
    <div className="flex-2 flex w-full">
      <FormLabel
        label={'Date:'}
        name={'penaltyDate'} />
      <input
        type="date"
        className={styles.input}
        { ...methods.register('penaltyDate') } />
    </div>
  )
}

const PenaltyAmountInput = () => { // Penalty amount input
  const methods = useCreateSiteIllicitDischargeFormContext()

  const visible = methods.watch('penaltyDate') ? true : false

  if(!visible) return null

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Amount:'}
          name={'penaltyAmount'}
          required={true} />
        <input
          type="number"
          className={styles.input}
          { ...methods.register('penaltyAmount', {
            required: 'Penalty amount is required',
            onBlur: () => methods.trigger('penaltyAmount')
          }) } />
      </div>
      <FormError field={'penaltyAmount'} />
    </div>
  )
}

const PenaltyDueDate = () => { // Penalty due date input
  const methods = useCreateSiteIllicitDischargeFormContext()

  const visible = methods.watch('penaltyDate')

  if(!visible) return null

  return (
    <div className="flex-1 flex flex-col gap-2">
      <div className="flex">
        <FormLabel
          label={'Due Date:'}
          name={'penaltyDueDate'}
          required={true} />
        <input
          type="date"
          className={styles.input}
          { ...methods.register('penaltyDueDate', {
            required: 'Penalty due date is required',
            onBlur: () => methods.trigger('penaltyDueDate')
          }) } />
      </div>
      <FormError field={'penaltyDueDate'} />
    </div>
  )
}

const PaymentReceivedDateInput = () => { // Payment received date input
  const methods = useCreateSiteIllicitDischargeFormContext()

  const visible = methods.watch('penaltyDate') ? true : false

  if(!visible) return null

  return (
    <div className="flex-1 flex w-full">
      <FormLabel
        label={'Received Date:'}
        name={'paymentReceived'} />
      <input
        type="date"
        className={styles.input}
        { ...methods.register('paymentReceived') } />
    </div>
  )
}