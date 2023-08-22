import type { ICommodityDetail, IShipmentCargo } from '@/interfaces'

import type {
  IShipmentsRes,
  IDetails,
  IBillsList,
  IVendorsRes,
  ICurrencyRes,
  TPackageTypesRes,
  TWeightUnitsRes
} from '../interfaces'

export interface IShipmentsStore {
  shipments: IShipmentsRes | null
  shipmentBills: IBillsList | null
  shipmentDetails: IDetails | null
  vendors: IVendorsRes | null
  currencies: ICurrencyRes | null
  packageTypes: TPackageTypesRes | null
  weightUnits: TWeightUnitsRes | null
  pagesFetched: { [key: string]: boolean }
  fetchingShipments: boolean
  fetchingBills: boolean
  fetchingShipmentDetails: boolean
  fetchingVendors: boolean
  fetchingCurrencies: boolean
  fetchingPackageTypes: boolean
  fetchingWeightUnits: boolean
  uploadingBill: boolean
  confirmingCargo: boolean
  updatingBill: boolean
  currentCommodity: {
    commodity: TCommodity
    idx: number
  } | null
}

export interface IFile {
  files: IFileElement[]
}

export interface IFileElement {
  objectURL: string
  lastModified: number
  lastModifiedDate: string
  name: string
  size: number
  type: string
  webkitRelativePath: string
}

export interface IFileData {
  fileNames: string[]
  totalSize: number
  formData: FormData
}

export type TCommodity = ICommodityDetail &
  Omit<IShipmentCargo, 'commodity_details'> & {
    commodityId?: string
    cargoId?: string
    is_completed?: boolean
    cargo_condition?: 'Good' | 'Bad'
    description?: string
    confirmed_cargo_id?: string
    documents?: {
      confirmed_cargo_image: IConfirmationImage[]
    }
  }

export interface IConfirmationImage {
  id: number
  file_name: string
  original_url: string
  custom_properties: any[]
  status: null
  created_at: Date
}
