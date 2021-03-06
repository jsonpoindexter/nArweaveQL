import { getTransactions } from '../src'

describe('Get latest transactions', () => {
  test.concurrent('Should return the first latest transaction', async () => {
    const transactions = await getTransactions(1)
    expect(transactions.length).toEqual(1)
  })
  test.concurrent('Should return the first 10 transactions', async () => {
    const transactions = await getTransactions(10)
    expect(transactions.length).toEqual(10)
  })
  test.concurrent(
    'Should return the first 101 transactions',
    async () => {
      const transactions = await getTransactions(101, [{ owner: ['key'] }])
      expect(transactions.length).toEqual(101)
      expect(transactions[0].owner.key).toBeDefined()
    },
    30000,
  )
  test.concurrent(
    'Should return the first transaction with owner.key',
    async () => {
      const transactions = await getTransactions(1, [{ owner: ['key'] }])
      expect(transactions.length).toEqual(1)
      expect(transactions[0].owner.key).toBeDefined()
    },
  )
  test.concurrent(
    "Should throw an error when a 'count' of 0 is defined",
    async () => {
      await expect(getTransactions(0, [{ owner: ['key'] }])).rejects.toThrow(
        "'count' must be greater than 1",
      )
    },
  )
})
