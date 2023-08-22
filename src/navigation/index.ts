import production from './production'
import staging from './staging'
import test from './test'

const currentNavigation =
  import.meta.env.MODE === 'production'
    ? production
    : import.meta.env.MODE === 'staging'
    ? staging
    : test

export default currentNavigation
