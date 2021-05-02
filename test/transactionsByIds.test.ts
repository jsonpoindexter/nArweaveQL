import one01TransactionsIds from './101transactionIds'
import { transactionsByIds } from '../src'

describe('Get transactions by Ids', () => {
  it('should return empty response when supplied a bad Id', async () => {
    const response = await transactionsByIds(['invalid-id'])
    return expect(response).toEqual([])
  })
  it('should return a populated response when supplied a valid Id', async () => {
    const id = 'tmDmLDhGGaA_BAw8JETCB3n_fB4ItHadagfeeBoS06M'
    const response = await transactionsByIds([id])
    return expect(response).toEqual([{ id }])
  })
  it('should return 101 transactions when querying for 101 transactions', async () => {
    const ids: string[] = one01TransactionsIds
    const response = await transactionsByIds(ids)
    return expect(response.length).toEqual(101)
  })
})
