import { onMounted, onUnmounted } from 'vue'
import type { ComputedRef } from 'vue'
import debounce from 'lodash/debounce'

type THandler = (nextpage: number, perpage: number) => void

type TPagingInfo = ComputedRef<{
  perPage: number | undefined
  totalPages: number | undefined
  currentPage: number | undefined
  totalRecords: number | undefined
}>

export const useInfiniteScroll = (
  pagingInfo: TPagingInfo,
  handler: THandler
) => {
  const handleScroll = () => {
    const documentHeight = document.body.scrollHeight
    console.log(
      'pagingInfo-----',
      pagingInfo.value.perPage,
      pagingInfo.value.totalPages,
      pagingInfo.value.currentPage
    )
    if (
      pagingInfo.value.perPage === undefined ||
      pagingInfo.value.totalPages === undefined ||
      pagingInfo.value.currentPage === undefined
    ) {
      return
    }

    const atBottom = documentHeight <= window.scrollY + window.innerHeight
    const shouldFetchNext =
      pagingInfo.value.currentPage < pagingInfo.value.totalPages

    if (atBottom && shouldFetchNext) {
      const nextPage = pagingInfo.value.currentPage + 1
      handler(nextPage, pagingInfo.value.perPage)
    }
  }

  const handleDebouncedScroll = debounce(() => handleScroll(), 500)

  onMounted(() => {
    window.addEventListener('scroll', handleDebouncedScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleDebouncedScroll)
  })
}
