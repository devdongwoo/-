import { z } from 'zod'

export const quoteDetailSchema = z.object({
  quotes: z.array(
    z.object({ id: z.number(), quote: z.string(), author: z.string() })
  ),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
})

export type QuoteDetailList = z.infer<typeof quoteDetailSchema>
