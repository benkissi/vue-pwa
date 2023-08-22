export interface IVendorsRes {
  current_page: number
  data: IVendorsItem[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: Link[]
  next_page_url: null
  path: string
  per_page: number
  prev_page_url: null
  to: number
  total: number
}

export interface IVendorsItem {
  id: string
  created_at: Date
  updated_at: Date
  deleted_at: null
  business_name: string
  vendor_type: string
  business_address: string
  business_phone_number: null | string
  business_email: null | string
  contact_person_first_name: null | string
  contact_person_last_name: null | string
  contact_person_phone_number: null | string
  contact_person_email: null | string
  status: string
  business_address_details: BusinessAddressDetails
  for_logistics_partner: boolean
  logistics_partner_id: null
  services: IVendorService[]
  payment_modes: PaymentModes
}

export interface PaymentModes {
  id: string
  vendor_id: string
  payment_modes: PaymentMode[]
  created_at: Date
  updated_at: Date
}

export interface PaymentMode {
  payment_mode_type: PaymentModeType
  payment_mode_details?: PaymentModeDetails
}

export enum PaymentModeType {
  Bank = 'bank',
  Cash = 'cash',
  MobileMoney = 'mobile_money'
}

export interface PaymentModeDetails {
  bank_name?: string
  swift_code?: string
  account_details?: AccountDetail[]
  mobile_network?: string
  mobile_money_details?: string
}

export interface AccountDetail {
  bank_branch: string
  account_name: string
  account_number: string
  account_currency: string
}

export interface BusinessAddressDetails {
  street: null | string
  sub_locality: null | string
  city: string
  country: string
  countryCode: string
  long: number
  lat: number
  name: string
}

export interface IVendorService {
  id: string
  name: string
  created_at: Date
  updated_at: Date
  deleted_at: null
  pivot: Pivot
}

export interface Pivot {
  vendor_id: string
  service_id: string
}

export interface Link {
  url: null | string
  label: string
  active: boolean
}
