import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { initialiseInterceptors } from './utils/axiosUtil'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import TabMenu from 'primevue/tabmenu'
import TabPanel from 'primevue/tabpanel'
import TabView from 'primevue/tabview'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import ProgressSpinner from 'primevue/progressspinner'
import { registerSW } from 'virtual:pwa-register'

import App from './App.vue'
import router from './router'

import i18n from './locales/i18n'

const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.use(i18n)
initialiseInterceptors()

app.component('PToast', Toast)
app.component('PTabMenu', TabMenu)
app.component('PTabPanel', TabPanel)
app.component('PTabView', TabView)
app.component('PAccordion', Accordion)
app.component('PAccordionTab', AccordionTab)
app.component('PSpinner', ProgressSpinner)

app.mount('#app')
