'use client'

import { QuoteCard } from '@/app/quotes/components/quote-card'
import { throttle } from 'lodash'
import { Fragment, useEffect, useState } from 'react'
import { useQuotes } from '../hooks/use-infinite-quotes'

export default function QuotesPage() {
  const [isSelectedData, setIsSelectedData] = useState(() => {
    if (typeof window !== 'undefined') {
      const selectedData = localStorage.getItem('SelectedData')
      return selectedData ? JSON.parse(selectedData) : []
    }
  })
  const [isSelected, setIsSelected] = useState(() => {
    if (typeof window !== 'undefined') {
      const wasSelected = localStorage.getItem('isSelected')
      return wasSelected ? JSON.parse(wasSelected) : {}
    }
  })
  const { data, isLoading, fetchNextPage } = useQuotes()

  const infiniteScroll = throttle(() => {
    // 세로 모니터
    // innerHeight 1779
    //scrollY 1000
    //offsetHeight 3142
    // innerHeight + scrollTop > offsetHeight - 500
    if (
      window.innerHeight + window.scrollY >
      document.documentElement.offsetHeight - 500
    ) {
      try {
        fetchNextPage()
      } catch (err) {
        console.log(err)
      }
    }
  }, 300)

  const selectItem = (id: number, item: { id: number; quote: string; author: string }) => {
    setIsSelectedData(
      (
        prev: Array<{
          id: number
          quote: string
          author: string
        }>
      ) => {
        if (prev.find((item) => item.id === id)) {
          const res = prev.filter((select) => select.id !== id)
          return res
        } else {
          return [...prev, item]
        }
      }
    )
  }

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll)

    return () => {
      window.removeEventListener('scroll', infiniteScroll)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('isSelected', JSON.stringify(isSelected))
    localStorage.setItem('SelectedData', JSON.stringify(isSelectedData))
  }, [isSelected])

  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <section>
      {data?.pages?.map((group, i) => (
        <Fragment key={i}>
          <>
            {group?.quotes?.map((quote, idx) => {
              {
                return (
                  <QuoteCard
                    key={quote.id}
                    id={String(quote.id)}
                    quote={quote.quote}
                    author={quote.author}
                    isSelected={isSelected}
                    onFavorite={() => {
                      setIsSelected((prev: { [key: number]: boolean }) => {
                        const result: { [key: number]: boolean } = {
                          ...prev,
                          [quote.id]: !isSelected[quote.id],
                        }
                        return result
                      })
                      selectItem(quote.id, quote)
                    }}
                  />
                )
              }
            })}
          </>
        </Fragment>
      ))}
    </section>
  )
}
