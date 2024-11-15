import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getQuotes } from '@/actions/get-quotes'

export const useQuotes = () => {
  return useInfiniteQuery({
    queryKey: ['quotes'],
    queryFn: async ({ pageParam }) => {
      const res = await getQuotes(pageParam)
      if (res.status === 'error') {
        throw new Error(res.error)
      }
      return res.data
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.skip + 30,
  })
}
