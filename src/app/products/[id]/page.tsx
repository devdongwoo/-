'use client'

import { use } from 'react'
import { useProduct } from '@/app/products/[id]/hooks/use-product'

export interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params)

  const { data, isLoading, error } = useProduct(id)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    throw new Error(error.message)
  }

  return (
    <div>
      <div id="container">
        {/* <img src={data?.images[0]}/> */}
        <h2>{data?.title}</h2>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  )
}
