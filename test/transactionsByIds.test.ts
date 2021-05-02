import { transactionsByIds } from '../src'

describe('Get transactions by Ids', () => {
  it('should return empty response when supplied a bad Id', async () => {
    const response = await transactionsByIds(['invalid-id'])
    return expect(response).toEqual({ data: { transactions: { edges: [] } } })
  })
  it('should return a populated response when supplied a valid Id', async () => {
    const id = 'tmDmLDhGGaA_BAw8JETCB3n_fB4ItHadagfeeBoS06M'
    const response = await transactionsByIds([id])
    return expect(response).toEqual({
      data: {
        transactions: {
          edges: [{ node: { id } }],
        },
      },
    })
  })
})
