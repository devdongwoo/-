'use client'
import { useFavoriteQuotes } from '@/app/quotes/hooks/use-favorite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'
import { useEffect, useState } from 'react'

export default function FavoriteQuotesPage() {
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

  const selectItem = (id: number,item: { id: number; quote: string; author: string }) => {
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
    localStorage.setItem('isSelected', JSON.stringify(isSelected))
    localStorage.setItem('SelectedData', JSON.stringify(isSelectedData))
  }, [isSelected])

  return (
    <div>
      <h1
        className={'mb-4 text-3xl font-bold italic text-secondary-foreground'}
      >
        My Favorite
      </h1>
      <ul>
        {JSON.parse(localStorage.getItem('SelectedData') || '[]').length > 0 ? (
          <>
            {isSelectedData?.map(
              (quote: { id: number; quote: string; author: string }) => (
                <QuoteCard
                  key={quote.id}
                  id={String(quote.id)}
                  isSelected={isSelected}
                  quote={quote.quote}
                  author={quote.author}
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
            )}
          </>
        ) : (
          <></>
        )}
      </ul>
    </div>
  )
}
