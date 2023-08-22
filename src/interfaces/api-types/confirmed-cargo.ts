export interface IConfirmedCargo {
  id: string
  shipment_id: string
  cargo_id: string
  created_at: Date
  updated_at: Date
  shipment_cargo_id: null
  confirmed_cargo_details: IConfirmedCargoDetail[]
}

export interface IConfirmedCargoDetail {
  id: string
  weight: string
  weight_unit: string
  confirmed_cargo_id: string
  created_at: Date
  updated_at: Date
  description: string
  package_quantity: number
  commodity_type: string
  volume: null
  cargo_detail_id: null
  is_completed: boolean
  package_type: string
  cargo_condition: string
  commodity_detail_id: string
  documents: Documents
  media: Media[]
}

export interface Documents {
  confirmed_cargo_image: ConfirmedCargoImage[]
}

export interface ConfirmedCargoImage {
  id: number
  file_name: string
  original_url: string
  custom_properties: any[]
  status: null
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
