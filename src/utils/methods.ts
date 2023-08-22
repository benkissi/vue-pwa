import debounce from 'lodash/debounce'

import currentConfig from '@/config'

export const getInitials = (name: string) => {
  const nameSplit = name.split(' ')
  if (nameSplit.length > 1) {
    return (
      nameSplit[0].charAt(0) +
      '' +
      nameSplit[nameSplit.length - 1].charAt(0)
    ).toUpperCase()
  }
  return nameSplit[0].charAt(0)
}

export const promisify = (data: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data)
    }, 2000)
  })
}

export const getValidUser = () => {
  let user

  if (localStorage.getItem('jlpwa')) {
    user = JSON.parse(localStorage.getItem('jlpwa') || '')
  }

  if (user && user?.profile?.token) {
    return user
  }
  return false
}

export const getHeaders = () => {
  const requiredHeaders: { [key: string]: string } = {}
  requiredHeaders['Content-Type'] = 'application/json'
  if (getValidUser()) {
    const {
      profile: { token = null }
    } = getValidUser()
    if (token) {
      requiredHeaders.Authorization = `Bearer ${token}`
    }
  }

  if (showInEnv(['development'])) {
    requiredHeaders.Authorization = `Bearer ${currentConfig.APP_TOKEN}`
  }

  return requiredHeaders
}

export const formatNumber = (value) => {
  return new Intl.NumberFormat('en-GB').format(value)
}

export const formatDate = (date, type = 'full', showTime = false) => {
  if (!date) return ''
  const options = {
    dateStyle: type
  }

  if (showTime) {
    options.timeStyle = 'short'
  }
  return new Intl.DateTimeFormat('en-GB', options).format(new Date(date))
}

export const formatDateShort = (date) => {
  let getYear = date.toLocaleString('default', { year: 'numeric' })
  let getMonth = date.toLocaleString('default', { month: '2-digit' })
  let getDay = date.toLocaleString('default', { day: '2-digit' })
  let dateFormat = getYear + '-' + getMonth + '-' + getDay

  return dateFormat
}

export const formatTime = (date) => {
  return new Intl.DateTimeFormat('en-GB', {
    timeStyle: 'short'
  }).format(new Date(date))
}

export const debouncedHandler = debounce((cb) => {
  cb()
}, 500)

export const getFilterString = (filters, flatKey) => {
  const filterKeys = Object.keys(filters)
  let filter = ''

  if (filterKeys.length > 0) {
    filterKeys.forEach((item) => {
      if (filters[item] && typeof filters[item] === 'object') {
        if (filters[item][flatKey]) {
          filter = filter + `&filter[${item}]=${filters[item][flatKey]}`
        }
      } else if (filters[item]) {
        filter = filter + `&filter[${item}]=${filters[item]}`
      }
    })
  }

  return filter
}

export const timeAgo = (hoursAgo = 0) => {
  return new Date(new Date().getTime() - hoursAgo * 60 * 60 * 1000)
}

export const daysAgo = (days = 0) => {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000)
}

export const trimObject = (target) => {
  const keys = Object.keys(target)
  const updated = Object.assign({}, target)
  keys.forEach((key) => {
    if (!target[key]) {
      delete updated[key]
    }
  })
  return updated
}

export const filesToFormData = (formDataField, files, allow = '') => {
  const formData = new FormData()
  const fileArray = files.files
  let totalSize = 0
  if (!fileArray.length) return

  const fileNames = fileArray.map((item) => {
    return item.name
  })

  const fileTypes = fileArray.map((item) => {
    return item.type
  })

  let filesPassed = true

  const verifyExtension = (type, allow) => {
    return allow.includes(type)
  }

  for (let i = 0; i < fileTypes.length; i++) {
    let passed = true

    if (allow) {
      passed = verifyExtension(fileTypes[i], allow)
    }

    if (!passed) {
      filesPassed = passed
      break
    }
  }

  if (!filesPassed) return

  // append the files to FormData
  fileArray.forEach((item) => {
    formData.append(formDataField, item, item.name)
    totalSize = totalSize + item.size
  })

  return {
    fileNames,
    totalSize,
    formData
  }
}

export const truncate = (string = '', length = 0) => {
  if (!string) return ''
  if (string.length <= length) return string
  return string.substring(0, length) + '...'
}

export const isObjectFilled = (target, keys) => {
  let isFilled = true
  keys.forEach((key) => {
    if (target[key] === null && target[key] === undefined) {
      isFilled = false
    }
  })
  return isFilled
}

export const delay = (duration) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, duration)
  })
}

export const relativeDays = (date) => {
  const timestamp = new Date(date).getTime()
  const rtf = new Intl.RelativeTimeFormat('en', {
    numeric: 'auto'
  })

  const sdf = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short'
  })
  const oneDayInMs = 1000 * 60 * 60 * 24
  const daysDifference = Math.round(
    (timestamp - new Date().getTime()) / oneDayInMs
  )
  console.log('days diff', daysDifference)
  if (daysDifference > 2) return rtf.format(daysDifference, 'day')

  return sdf.format(new Date(date))
}

export const showInEnv = (envList: string[]): boolean => {
  const match = envList.some((item) => item === process.env.NODE_ENV)

  return match
}
