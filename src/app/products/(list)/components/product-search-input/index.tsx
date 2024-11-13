import React, { useEffect, useRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import { useProductsSearchParams } from '@/app/products/(list)/hooks/use-products-search-params'
import { useSearchParams } from 'next/navigation'
// TODO: 현재 검색창이 제대로 동작하지 않습니다. 수정해주세요.
export function ProductSearchInput({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { handleTermChange } = useProductsSearchParams()
  const inputRef = useRef<HTMLInputElement>(null)
  const params = useSearchParams()

  /**
      input value에 있는 term을 제거하였습니다. 그이유는 onchange할때마다 value
      값이 변경되기 때문에 렌더링 발생이 계속 된것이였고 
      use-products-search-params쪽에 lodash 라이브러리를 사용하여
      debounce를 하여 최적화를 진행하고 불필요한 비동기를 제거하였습니다.
    */
  useEffect(() => {
    inputRef.current!.value = params.get('q') || ''
  }, [])
  return (
    <main className={cn('relative', className)} {...props}>
      <Input
        onChange={(e) => {
          handleTermChange(e.target.value)
        }}
        className={'h-12 pl-12 text-base'}
        placeholder={'Search product'}
        ref={inputRef}
      />
      <SearchIcon className={'absolute left-3 top-1/2 -translate-y-1/2'} />
    </main>
  )
}
