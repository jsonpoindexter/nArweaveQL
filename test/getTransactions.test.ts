import { getTransactions } from '../src'

describe('Get latest transactions', () => {
  it('Should return the first latest transaction', async () => {
    const transactions = await getTransactions(1)
    expect(transactions.length).toEqual(1)
  })
  it('Should return the first 10 transactions', async () => {
    const transactions = await getTransactions(10)
    expect(transactions.length).toEqual(10)
  })
  it('Should return the first 101 transactions', async () => {
    const transactions = await getTransactions(101, { owner: { key: true } })
    console.log(transactions)
    expect(transactions.length).toEqual(101)
  })
  it('Should return the first transaction with owner.key', async () => {
    const transactions = await getTransactions(1, { owner: { key: true } })
    console.log(transactions)
    expect(transactions.length).toEqual(1)
    expect(transactions[1].owner.key).toBeDefined()
  })
})
