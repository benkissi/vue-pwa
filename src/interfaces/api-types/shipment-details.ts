import type { IConfirmedCargo } from './confirmed-cargo'

export interface IDetails {
  id: string
  mode: string
  origin: string
  origin_long: string
  origin_lat: string
  destination: string
  destination_long: string
  destination_lat: string
  company_id: string
  goods_ready_at: null | string
  delivered_at: null | string
  incoterm_id: null | string
  request_for_financing: boolean
  completed: boolean
  deleted_at: null | string
  created_at: Date
  updated_at: Date
  status: string
  shipper_info: Info
  consignee_info: Info
  freight_class: null | string
  by_backoffice: boolean
  eta: null | string
  cost_till_date: number
  booking_id: string
  type: string
  departure: null | string
  shipment_role_type: string
  issues_to_address: null | string
  estimated_cost: string
  delayed_reason: null | string
  origin_code: string
  destination_code: string
  booking_date: Date
  decline_quote: null | string
  accepted_quote: AcceptedQuote[]
  estimated_cost_currency: null | string
  cost_till_date_currency: null | string
  origin_details: NDetails
  destination_details: NDetails
  completed_statuses: DetailsCompletedStatus[]
  shipment_services: ShipmentServices
  requires_insurance: boolean
  additional_container_details: AdditionalContainerDetail[]
  shipment_status: string
  additional_airfreight_details: null | string
  cargo_pickup_address_details: null | string
  cargo_delivery_address_details: null | string
  cargo_pickup_date: null | string
  for_logistics_partner: boolean
  logistics_partner_id: null | string
  documents: DetailsDocuments
  cargo: null | string
  shipment_cargos: IShipmentCargo[]
  company: Company
  shipment_activities: ShipmentActivity[]
  workflow: DetailsWorkflow
  confirmed_cargo: null | IConfirmedCargo[]
  financing: Financing
  reservation: null | string
  media: any[]
}

export interface AcceptedQuote {
  accepted_at: Date
  quote_details: QuoteDetails
}

export interface QuoteDetails {
  id: number
  file_name: string
  original_url: string
  custom_properties: any[]
  status: null | string
  created_at: Date
}

export interface AdditionalContainerDetail {
  shipping_carrier: null | string
  bill_of_lading: null | string
  container_numbers: any[]
  demurrage: Demurrage
  detention: Detention
}

export interface Demurrage {
  free_days: null | string
  start_date: null | string
  charge_per_day: null | string
  currency: string
}

export interface Detention {
  return_date: null | string
  charge_per_day: null | string
  currency: string
}

export interface Company {
  id: string
  company_name: string
  phone_number: string
  email: string
  deleted_at: null | string
  created_at: Date
  updated_at: Date
  company_segment: string
  account_manager_id: string
  country: string
  city: string
  address: string
  state: null | string
  is_active: boolean
  customer_segment: string
  sales_rep_id: string
  for_logistics_partner: boolean
  logistics_partner_id: null | string
  currency: string
  documents: CompanyDocuments
  account_manager: AccountManager
  sales_rep: AccountManager
  media: any[]
}

export interface AccountManager {
  id: string
  first_name: string
  last_name: string
  phone_number: string
  email: string
  job_title: string
  last_logged_in: null | string
  deleted_at: null | string
  created_at: Date
  updated_at: Date
  email_verified_at: null | string
  current_team_id: null | string
  for_logistics_partner: boolean
  logistics_partner_id: null | string
  is_logistics_partner_primary_admin: boolean
}

export interface CompanyDocuments {
  'business-certificate': null | string
  'bank-statement': null | string
  'financial-statement': null | string
  'utility-bill': null | string
}

export interface DetailsCompletedStatus {
  shipment_status: string
  date: Date
}

export interface Info {
  id: string
  name: string
  primary: boolean
  company_id: string
  deleted_at: null | string
  created_at: Date
  updated_at: Date
  email: string
  phone: string
  address: null | string
  country: null | string
  city: string
  state: null | string
  landmark: null | string
  postal_code: null | string
}

export interface NDetails {
  street: null | string
  sub_locality: null | string
  city: string
  country: string
  countryCode: string
  long: number
  lat: number
  name: string
}

export interface DetailsDocuments {
  'commercial-invoice': null | string
  'packing-list': null | string
  others: null | string
  shipment_quote: null | string
  updated_cost: null | string
}

export interface Financing {
  id: string
  shipment_id: string
  request_status: string
  tenure: number
  offer_status: string
  deny_reason: null | string
  reviewed_by: string
  reviewed_at: Date
  decided_by: string
  decided_at: Date
  amount_approved: string
  amount_disbursed: null | string
  repayment_amount: null | string
  repayment_duration: null | string
  repayment_starts_at: null | string
  funding_status: string
  interest_rate: number
  document_request: null | string
  incompliant_reason: null | string
  incompliant_reason_description: null | string
  company_id: string
  financing_type: null | string
  currency: string
  deleted_at: null | string
  created_at: Date
  updated_at: Date
  marked_incompliant_at: null | string
  marked_incompliant_by: null | string
  request_collateral: null | string
  offer_letter: null | string
  type: string[]
  signature_id: null | string
  signature_signed: boolean
  completed: boolean
  amount_requested: string
  hellosign_url: string
  request_reason: null | string
  disbursement_date: null | string
  settlement_date: null | string
  completed_statuses: FinancingCompletedStatus[]
  disbursed_principal: null | string
  assessed_status: string
  invoice_number: null | string
  approved_tenure: string
  loan_id: string
  alternate_approved_amount: null | string
  exchange_rate: null | string
  alternate_approved_currency: null | string
  approved_amount_currency: string
  application_date: Date
  incompliance_note: null | string
}

export interface FinancingCompletedStatus {
  status: string
  date: Date
}

export interface ShipmentActivity {
  id: string
  shipment_id: string
  admin_id: null | string
  type: string
  title: string
  description: string
  slug: string
  deleted_at: null | string
  created_at: Date
  updated_at: Date
  status_progress: null | string
  send_to_client: boolean
  user_id: null | string
  media: null | string
  admin: AccountManager | null | string
  user: User | null | string
}

export interface User {
  id: string
  first_name: string
  last_name: string
  phone_number: string
  email: string
  job_title: null | string
  last_logged_in: null | string
  deleted_at: null | string
  created_at: Date
  updated_at: Date
  role: null | string
  company_id: string
  reset_code: string
  is_primary_contact: boolean
  is_active: boolean
  for_logistics_partner: boolean
  logistics_partner_id: string | null | string
}

export interface IShipmentCargo {
  id: string
  created_at: Date
  updated_at: Date
  container_type: string
  container_quantity: string
  container_temperature: null | string
  container_temperature_unit: string | null | string
  shipment_id: string
  commodity_details: ICommodityDetail[]
}

export interface ICommodityDetail {
  id: string
  created_at: Date
  updated_at: Date
  weight: string
  weight_unit: string
  package_type: string
  package_quantity: number
  total_cargo_value: string
  currency: string
  commodity_type: string
  imo_class: string | null
  un_number: string | null
  is_dangerous_good: boolean
  notes: string | undefined
  shipment_cargo_id: string
  hscode: string | null
  hscode_subcategory: string | null
}

export interface ShipmentServices {
  logistics: string[]
  finance: string[]
}

export interface DetailsWorkflow {
  id: string
  shipment_id: string
  workflow_template_id: string
  workflow: WorkflowElement[]
  admin_id: string
  deleted_at: Date | null | string
  created_at: Date
  updated_at: Date
  includes_financing: boolean
  completed_steps: number[]
  shipment_mode: string
  shipment_type: string
  description: string
  name: string
}

export interface WorkflowElement {
  id: number
  title: string
  is_initial_step: boolean
  enable_after_step: number[]
  component: any | null | string
  sla_tenor_value: number
  sla_tenor_type: string
  reminder_notification_sla_tenor_value: number
  reminder_notification_sla_tenor_type: string
  on_step_activation: OnStepActivation
  is_active: boolean
  is_completed: boolean
  reminder_notification_frequency_value: number
  reminder_notification_frequency_type: string
  notes: string | null | string
  end_time: Date | null | string
  step_status: string
}

export interface OnStepActivation {
  notification_routes: string[]
  notifiable_entity: string[]
}
