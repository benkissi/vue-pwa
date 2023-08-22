export interface Link {
  url: null | string
  label: string
  active: boolean
}

export interface CommodityDetail {
  id: string
  created_at: Date
  updated_at: Date
  weight: string
  weight_unit: string
  package_type: string
  package_quantity: number | null
  total_cargo_value: string
  currency: string
  commodity_type: string
  imo_class: string | null
  un_number: string | null
  is_dangerous_good: boolean
  notes: string | null
  shipment_cargo_id: string
  hscode: string | null
  hscode_subcategory: string | null
}

export interface ShipmentCargo {
  id: string
  created_at: Date
  updated_at: Date
  container_type: string
  container_quantity: string
  container_temperature: null
  container_temperature_unit: null
  shipment_id: string
  commodity_details: CommodityDetail[]
}

export interface Info {
  id: string
  name: string
  primary: boolean
  company_id: string
  deleted_at: string | null
  created_at: Date
  updated_at: Date
  email: string
  phone: string
  address: string | null
  country: string | null
  city: string
  state: string | null
  landmark: string | null
  postal_code: null
}

export interface QuoteDetails {
  id: number
  file_name: string
  original_url: string
  custom_properties: any[]
  status?: null
  created_at: Date
}

export interface AcceptedQuote {
  accepted_at: Date
  quote_details: QuoteDetails
}

export interface Details {
  street: null
  sub_locality: null
  city: string | null
  country: string
  countryCode: string
  long: number
  lat: number
  name: string
}

export interface CompletedStatus {
  shipment_status: string
  date: Date
}

export interface ShipmentServices {
  logistics: string[]
  finance: string[]
}

export interface Demurrage {
  free_days: null
  start_date: null
  charge_per_day: null
  currency: string
}

export interface Detention {
  return_date: null
  charge_per_day: null
  currency: string
}

export interface AdditionalContainerDetail {
  shipping_carrier: null | string
  bill_of_lading: null
  container_numbers: any[]
  demurrage: Demurrage
  detention: Detention
}

export interface Company {
  id: string
  company_name: string
  currency: string | null
  documents: any | null
  account_manager: any | null
  sales_rep: any | null
  media: any[]
}

export interface IShipmentItem {
  id: string
  mode: string
  origin: string
  origin_long: string
  origin_lat: string
  destination: string
  destination_long: string
  destination_lat: string
  company_id: string
  goods_ready_at: null
  delivered_at: null
  incoterm_id: null
  request_for_financing: boolean
  completed: boolean
  deleted_at: null
  created_at: Date
  updated_at: Date
  status: string
  shipper_info: Info
  consignee_info: Info
  freight_class: null
  by_backoffice: boolean
  eta: string | null
  cost_till_date: number
  booking_id: string
  type: string
  departure: string | null
  shipment_role_type: string
  issues_to_address: null
  estimated_cost: string
  delayed_reason: null
  origin_code: string
  destination_code: string
  booking_date: Date
  decline_quote: null
  accepted_quote: AcceptedQuote[] | null
  estimated_cost_currency: null
  cost_till_date_currency: null
  origin_details: Details
  destination_details: Details
  completed_statuses: CompletedStatus[]
  shipment_services: ShipmentServices
  requires_insurance: boolean
  additional_container_details: AdditionalContainerDetail[]
  shipment_status: string
  additional_airfreight_details: null
  cargo_pickup_address_details: Details | null
  cargo_delivery_address_details: null
  cargo_pickup_date: Date | null
  for_logistics_partner: boolean
  logistics_partner_id: null
  cargo: null
  shipment_cargos: ShipmentCargo[]
  company: Company
  reservation: null
}

export interface IShipmentsRes {
  current_page: number
  data: IShipmentItem[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: string
  path: string
  per_page: number
  prev_page_url: null
  to: number
  total: number
}
