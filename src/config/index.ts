import production from './production'
import staging from './staging'
import test from './test'

// console.log('process.env', process.env.NODE_ENV)
const currentConfig =
  import.meta.env.MODE === 'production'
    ? production
    : import.meta.env.MODE === 'staging'
    ? staging
    : test

export default currentConfig
