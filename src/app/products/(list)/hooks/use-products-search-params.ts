import { parseAsInteger, parseAsString, useQueryState } from 'nuqs'
import { debounce } from 'lodash'
import { useMemo } from 'react'

export const useProductsSearchParams = () => {
  const [page, setPage] = useQueryState(
    'page',
    parseAsInteger.withDefault(1).withOptions({
      history: 'push',
    })
  )
  const [q, setQ] = useQueryState(
    'q',
    parseAsString.withDefault('').withOptions({
      history: 'push',
    })
  )
  const handleTermChange = useMemo(
    () =>
      debounce((term: string) => {
        setPage(1)
        setQ(term)
      }, 500),
    [q]
  )

  return {
    page,
    setPage,
    term: q,
    handleTermChange,
  }
}
