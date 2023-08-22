import { defineStore } from 'pinia'
import { useApi } from '@/api'
import currentConfig from '@/config'

import type {
  IShipmentsStore,
  IShipmentsRes,
  IDetails,
  IBillsList,
  IVendorsRes,
  ICurrencyRes,
  TCommodity,
  TPackageTypesRes,
  TWeightUnitsRes,
  IConfirmedCargo,
  IConfirmedCargoDetail
} from '@/interfaces'

const { fetchData, mutate, invalidate } = useApi()

export const useShipmentsStore = defineStore({
  id: 'shipments',
  state: (): IShipmentsStore => ({
    shipments: null,
    shipmentBills: null,
    shipmentDetails: null,
    vendors: null,
    currencies: null,
    currentCommodity: null,
    packageTypes: null,
    weightUnits: null,
    pagesFetched: {},

    fetchingShipments: false,
    fetchingBills: false,
    fetchingShipmentDetails: false,
    fetchingVendors: false,
    fetchingCurrencies: false,
    fetchingPackageTypes: false,
    fetchingWeightUnits: false,
    uploadingBill: false,
    confirmingCargo: false,
    updatingBill: false
  }),

  getters: {
    shipmentsList: (state) => {
      if (state.shipments) {
        return state.shipments.data
      }
      return []
    },
    cargoList: (state) => {
      if (state.shipmentDetails) {
        return state.shipmentDetails.shipment_cargos
      }
      return []
    },
    commodities(state) {
      const cargos = state?.shipmentDetails?.shipment_cargos
      const confirmedCargos = state.shipmentDetails?.confirmed_cargo
      const commodities: TCommodity[] = []

      if (cargos) {
        cargos.forEach((cargo) => {
          const obj = JSON.parse(JSON.stringify(cargo))
          let foundConfirmedCargo: IConfirmedCargo | undefined

          if (confirmedCargos?.length) {
            foundConfirmedCargo = confirmedCargos?.find(
              (item, idx) => item.cargo_id === cargo.id
            )
            console.log(`foundCargo---->`, foundConfirmedCargo)
          }

          delete obj.commodity_details

          const items: TCommodity[] = cargo.commodity_details.map(
            (item, idx) => {
              let foundCommodity: IConfirmedCargoDetail | undefined
              if (foundConfirmedCargo) {
                foundCommodity =
                  foundConfirmedCargo.confirmed_cargo_details.find(
                    (obj) => obj.commodity_detail_id === item.id
                  )
              }

              console.log('found', foundCommodity)
              if (foundCommodity) {
                return {
                  cargoId: cargo.id,
                  commodityId: item.id,
                  ...obj,
                  ...foundCommodity
                }
              } else {
                return {
                  cargoId: cargo.id,
                  commodityId: item.id,
                  ...item,
                  ...obj
                }
              }
            }
          )

          commodities.push(...items)
        })
      }
      console.log('commodities --- > ', commodities)
      return commodities
    }
  },
  actions: {
    async fetchShipments(page: number | undefined = 1) {
      this.fetchingShipments = true
      if (this.pagesFetched[page]) {
        this.fetchingShipments = false
        return
      }
      const res = await fetchData(`/shipments?page=${page}&per_page=10`)
      if (res.success) {
        this.pagesFetched[page] = true
        if (!this.shipments) {
          this.shipments = res.data.data as IShipmentsRes
        } else {
          const currentList = res.data.data.data as IShipmentsRes['data']
          const previousList = this.shipments.data
          const combinedList = [...previousList, ...currentList]
          res.data.data.data = combinedList
          this.shipments = res.data.data
        }
      }
      this.fetchingShipments = false
    },
    async fetchShipmentBills(id: string) {
      this.fetchingBills = true
      const res = await fetchData(`/shipments/${id}/bills`)
      if (res.success) {
        this.shipmentBills = res.data.data as IBillsList
      }
      this.fetchingBills = false
    },
    async fetchShipmentDetails(id: string) {
      this.fetchingShipmentDetails = true
      const res = await fetchData(`/shipments/${id}`)
      if (res.success) {
        this.shipmentDetails = res.data.data as IDetails
      }
      this.fetchingShipmentDetails = false
    },
    async fetchVendors() {
      this.fetchingVendors = true
      const res = await fetchData(`/vendors?per_page=100`)
      if (res.success) {
        this.vendors = res.data.data as IVendorsRes
      }
      this.fetchingVendors = false
    },
    async fetchCurrencies() {
      this.fetchingCurrencies = true
      console.log('currentConfig.APP_BASE_URL', currentConfig.APP_API_URL)
      const res = await fetchData(
        `${currentConfig.APP_API_URL}/supported-currencies?per_page=100`
      )
      if (res.success) {
        this.currencies = res.data.data as ICurrencyRes
      }
      this.fetchingCurrencies = false
    },
    async uploadBill(formData: FormData, id: string) {
      this.uploadingBill = true

      const res = await mutate('post', '/bills', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (res.success) {
        invalidate(`/shipments/${id}/bills`)
      }

      this.uploadingBill = false

      return res
    },

    async updateBill(formData: FormData, billId: string, shipmentId: string) {
      this.updatingBill = true

      const res = await mutate('post', `/bills/${billId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      if (res.success) {
        invalidate(`/shipments/${shipmentId}/bills`)
      }

      this.updatingBill = false

      return res
    },

    async fetchPackageTypes() {
      this.fetchingPackageTypes = true

      const res = await fetchData(`${currentConfig.APP_API_URL}/cargo-types`)

      if (res.success) {
        this.packageTypes = res.data.data as TPackageTypesRes
      }

      this.fetchingPackageTypes = false
    },

    async fetchWeightUnits() {
      this.fetchingWeightUnits = true

      const res = await fetchData(`${currentConfig.APP_API_URL}/weight-units`)

      if (res.success) {
        this.weightUnits = res.data.data as TWeightUnitsRes
      }

      this.fetchingWeightUnits = false
    },

    async confirmCargo(details: any, shipmentId: string) {
      this.confirmingCargo = true
      const res = await mutate('post', '/cargos', details)
      if (res.success) {
        invalidate(`/shipments/${shipmentId}`)
      }
      this.confirmingCargo = false
      return res
    },

    async updateConfirmCargo(
      details: any,
      confirmedId: string,
      detailId: string,
      shipmentId: string
    ) {
      this.confirmingCargo = true
      const res = await mutate(
        'post',
        `/cargos/${confirmedId}/cargo_details/${detailId}`,
        details
      )
      if (res.success) {
        invalidate(`/shipments/${shipmentId}`)
      }
      this.confirmingCargo = false
      return res
    },

    setCurrentCommodity(details: { commodity: TCommodity; idx: number }) {
      this.currentCommodity = details
    }
  }
})
