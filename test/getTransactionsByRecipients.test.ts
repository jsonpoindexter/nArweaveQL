import { getTransactionsByRecipients } from '../src'

describe.only('Get transactions by recipients', () => {
  // Note: Using my own wallet address is not a good / stable test
  test.concurrent('', async () => {
    const transactions = await getTransactionsByRecipients(
      ['9ebVR5HKLSFGlCI9sNJPwVEp9ORyOoLK0iwIE7TlSuI'],
      100,
    )
    expect(transactions.length).toEqual(2)
  })
  test.concurrent('', async () => {
    const transactions = await getTransactionsByRecipients(
      ['_m4ftvKoEnbB7toHVBkuZWXYRK0j1mmgyHsug2ayffY'],
      100,
    )
    expect(transactions.length).toEqual(100)
  })
  test.concurrent('', async () => {
    const transactions = await getTransactionsByRecipients(
      ['_m4ftvKoEnbB7toHVBkuZWXYRK0j1mmgyHsug2ayffY'],
      101,
    )
    expect(transactions.length).toEqual(101)
  })
})
