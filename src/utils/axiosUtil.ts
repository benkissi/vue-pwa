import axios from 'axios'
import { getHeaders } from './methods'
import { useAuthStore } from '../stores/authStore'
import currentConfig from '@/config'

export const initialiseInterceptors = () => {
  axios.defaults.baseURL =
    currentConfig.APP_BASE_URL || 'https://jetvapi.jetstreamafrica.com/api/v1'

  const authStore = useAuthStore()

  axios.interceptors.request.use((config) => {
    const headers = getHeaders()
    const updatedConfig = { ...config, headers }
    return updatedConfig
  })

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // console.log(error);
      const { status } = error.response

      // console.log("status", status);
      const path = window.location.pathname
      if (status === 401 && path !== '/login') {
        authStore.resetProfile()
      } else {
        throw error
      }
      throw error
    }
  )
}

export default axios
