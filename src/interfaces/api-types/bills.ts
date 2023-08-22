export type IBillsList = IBill[]

export interface IBill {
  id: string
  vendor_id: string
  bill_amount: string
  currency: string
  created_at: Date
  updated_at: Date
  payment_status: string
  shipment_id: string
  financing_request_id: string
  shipment_bill_id: string
  invoice_number: string
  vendor_name: string
  alternate_currency: string | null
  alternate_amount: string | null
  exchange_rate: string | null
  primary_currency: string | null
  primary_amount: string | null
  po_number: string | null
  uploaded_by: string | null
  company_name: string | null
  payment_mode: string | null
  note: string | null
  documents: BillDocuments
  vendor: Vendor
  services: Service[]
  bill_payment: BillPayment
  media: Media[]
}

export interface BillPayment {
  id: string
  amount_paid: string
  payment_mode: string
  payment_note: string
  bill_id: string
  payment_date: Date
  alternate_amount_paid: string | null
  alternate_amount_paid_currency: string | null
  created_at: Date
  updated_at: Date
  deleted_at: string | null
  approved_amount_paid: string | null
  approved_amount_paid_currency: string | null
  repayment_date: string | null
  currency: string
  bank_id: string | null | string
  account_name: string | null | string
  documents: BillPaymentDocuments
  media: Media[]
}

export interface BillPaymentDocuments {
  bill_payment_receipt: VendorBill[]
}

export interface VendorBill {
  id: number
  file_name: string
  original_url: string
  custom_properties: any[]
  status: string | null
  created_at: Date
}

export interface Media {
  id: number
  model_type: string
  model_id: string
  uuid: string
  collection_name: string
  name: string
  file_name: string
  mime_type: string
  disk: string
  conversions_disk: string
  size: number
  manipulations: any[]
  custom_properties: any[]
  generated_conversions: any[]
  responsive_images: any[]
  order_column: number
  created_at: Date
  updated_at: Date
  original_url: string
  preview_url: string
}

export interface BillDocuments {
  vendor_bill: VendorBill[]
}

export interface Service {
  id: string
  name: string
  created_at: Date
  updated_at: Date
  deleted_at: string | null
  pivot: Pivot
}

export interface Pivot {
  bill_id: string
  service_id: string
  service_name: string
  amount: string
}

export interface Vendor {
  id: string
  created_at: Date
  updated_at: Date
  deleted_at: string | null
  business_name: string
  vendor_type: string
  business_address: string
  business_phone_number: string
  business_email: string
  contact_person_first_name: string
  contact_person_last_name: string
  contact_person_phone_number: string | null
  contact_person_email: string | null
  status: string
  business_address_details: BusinessAddressDetails
  for_logistics_partner: boolean
  logistics_partner_id: string | null
}

export interface BusinessAddressDetails {
  street: string
  sub_locality: string | null
  city: string
  country: string
  countryCode: string
  long: number
  lat: number
  name: string
}
