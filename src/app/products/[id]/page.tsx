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

  // color, random_color 유저 프로필 배경 색깔 랜덤, date 변경
  const colors = ['bg-red-200', 'bg-lime-500', 'bg-emerald-400']

  const random_color = () => {
    return Math.floor(Math.random() * colors.length)
  }

  const date_conversion = (date: string) => {
    const search_num = date.indexOf('T')
    const new_date = date.slice(0, search_num)
    return new_date
  }

  return (
    <div className={'flex flex-col items-center'} id="main_container">
      <img src={data?.images[0]} width={'450px'} />
      <div
        className={
          'flex flex-col items-start w-full font-bold text-xl max-sm:items-center max-sm:w-auto'
        }
        id="section1_container"
      >
        <h2>{data?.title}</h2>
        <p className={'text-sm text-gray-400'}>{data?.description}</p>
      </div>
      <div
        className={
          'grid grid-cols-4 gap-x-7 gap-y-2 text-base w-full font-bold mt-7 max-sm:grid-cols-2 max-sm:gap-x-2'
        }
      >
        <p className={'max-sm:mb-2'}>
          price: <span className={'text-orange-500'}>{data?.price}$</span>
        </p>
        <p className={'max-sm:mb-2'}>
          discountPercentage:{' '}
          <span className={'text-red-600'}>{data?.discountPercentage}%</span>
        </p>
        <p>
          rating: <span className={'text-yellow-500'}>{data?.rating}</span>
        </p>
        <p className={'max-sm:mb-2'}>category: {data?.category}</p>
        <p>brand: {data?.brand}</p>
        <p>warrant: {data?.warrantyInformation}</p>
        <p>sku: {data?.sku}</p>
        <p>weight: {data?.weight}</p>
        <p>height: {data?.dimensions.height}</p>
        <p>returnPolicy: {data?.returnPolicy}</p>
      </div>
      <div
        className={
          'mt-20 w-full border-t-2 border-slate-300 pt-3 h-64 overflow-scroll max-sm:h-48'
        }
      >
        {data?.reviews.map((item, idx) => {
          return (
            <div key={idx + 1} className={'flex mb-7'}>
              <span
                className={`rounded-full w-12 h-12 inline-block text-white text-xl leading-[2.4] text-center ${colors[random_color()]}`}
              >
                {item.reviewerName[0]}
              </span>
              <div className={'flex flex-col items-start ml-3 w-full'}>
                <div
                  className={
                    'flex text-xs text-gray-400 w-full justify-between'
                  }
                >
                  <span className={'mr-3'}>email: {item.reviewerEmail}</span>
                  <span>rating: {item.rating} / 5</span>
                </div>
                <div className={'flex w-full justify-between'}>
                  <span>{item.comment}</span>
                  <span className={'text-sm text-gray-400'}>
                    {date_conversion(item.date)}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
