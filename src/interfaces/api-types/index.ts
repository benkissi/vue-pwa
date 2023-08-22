export type { IShipmentsRes, IShipmentItem } from './shipment-list'
export type {
  IDetails,
  ICommodityDetail,
  IShipmentCargo
} from './shipment-details'

export type { IBillsList } from './bills'
export type { IVendorsRes, IVendorsItem, IVendorService } from './vendors'

export type TMutateMethods = 'post' | 'put' | 'delete'

export interface IApiCache {
  [key: string]: any
}

export type ICurrencyRes = ICurrencyItem[]

export interface ICurrencyItem {
  label: string
  value: string
}

export type TPackageTypesRes = IPackageType[]

export interface IPackageType {
  label: string
  value: string
}

export type TWeightUnitsRes = IWeightUnits[]
export interface IWeightUnits {
  label: string
  value: string
}

export type { IConfirmedCargo, IConfirmedCargoDetail } from './confirmed-cargo'
