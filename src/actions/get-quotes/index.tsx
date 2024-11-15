'use server'

import { QuoteDetailList, quoteDetailSchema } from '@/schemas/quote'
import { ActionResult } from '@/actions/action-result'

export const getQuotes = async (
  pageParam: number
): Promise<ActionResult<QuoteDetailList>> => {
  try {
    const url = `https://dummyjson.com/quotes?limit=30&skip=${pageParam}`

    const response = await fetch(url)
    const result = await response.json()
    const { success, data } = quoteDetailSchema.safeParse(result)

    if (success) {
      return {
        status: 'success',
        data: data,
      }
    } else {
      return {
        status: 'error',
        error: '데이터 형식이 올바르지 않습니다.',
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: 'error',
        error: error.message,
      }
    }

    return {
      status: 'error',
      error: '알 수 없는 에러가 발생했습니다.',
    }
  }
}
