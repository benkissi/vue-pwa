import type { Ref } from 'vue'

interface ISelection {
  [key: string]: boolean
}

interface IVariants {
  [key: string]: string
}

export const useVariant = (
  selection: Ref<ISelection>,
  variants: Ref<IVariants>
) => {
  if (!variants.value) return ''

  const selected: string[] = []

  Object.keys(variants.value).forEach((key) => {
    if (selection.value[key]) selected.push(variants.value[key])
  })

  return selected.join(' ')
}
