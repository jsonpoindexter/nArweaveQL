import { getTransactionsByRecipients } from '../src'

describe.only('Get transactions by recipients', () => {
  // Note: Using my own wallet address is not a good / stable test
  test.concurrent(
    "Should return the only 2 transactions in the recipient's wallet",
    async () => {
      const recipient = '9ebVR5HKLSFGlCI9sNJPwVEp9ORyOoLK0iwIE7TlSuI'
      const transactions = await getTransactionsByRecipients([recipient], {
        count: 100,
        fields: ['recipient'],
      })
      expect(transactions.length).toEqual(2)
      expect(
        transactions.every(
          (transaction) => transaction.recipient === recipient,
        ),
      )
    },
  )
  test.concurrent(
    "Should return the first 100 transactions in the recipient's wallet",
    async () => {
      const recipient = '_m4ftvKoEnbB7toHVBkuZWXYRK0j1mmgyHsug2ayffY'
      const transactions = await getTransactionsByRecipients(
        ['_m4ftvKoEnbB7toHVBkuZWXYRK0j1mmgyHsug2ayffY'],
        { count: 100 },
      )
      expect(transactions.length).toEqual(100)
      expect(
        transactions.every(
          (transaction) => transaction.recipient === recipient,
        ),
      )
    },
  )
  test.concurrent(
    "Should return the first 101 transactions in the recipient's wallet",
    async () => {
      const recipient = '_m4ftvKoEnbB7toHVBkuZWXYRK0j1mmgyHsug2ayffY'
      const transactions = await getTransactionsByRecipients([recipient], {
        count: 101,
      })
      expect(transactions.length).toEqual(101)
      expect(
        transactions.every(
          (transaction) => transaction.recipient === recipient,
        ),
      )
    },
  )
  test.concurrent(
    "Should return the only 2 transactions when the 'count' option is not specified",
    async () => {
      const recipient = '9ebVR5HKLSFGlCI9sNJPwVEp9ORyOoLK0iwIE7TlSuI'
      const transactions = await getTransactionsByRecipients([recipient], {
        fields: ['recipient'],
      })
      expect(transactions.length).toEqual(2)
      expect(
        transactions.every(
          (transaction) => transaction.recipient === recipient,
        ),
      )
    },
  )
  test.concurrent(
    "Should return ALL of transactions when the 'count' option is not specified",
    async () => {
      const recipient = '_m4ftvKoEnbB7toHVBkuZWXYRK0j1mmgyHsug2ayffY'
      const transactions = await getTransactionsByRecipients([recipient], {
        fields: ['recipient'],
      })
      expect(transactions.length).toBeGreaterThan(100)
      expect(
        transactions.every(
          (transaction) => transaction.recipient === recipient,
        ),
      )
    },
    30000,
  )
  test.concurrent(
    "Should return ALL of transactions of multiple recipients when the 'count' option is not specified",
    async () => {
      const recipients = [
        '_m4ftvKoEnbB7toHVBkuZWXYRK0j1mmgyHsug2ayffY',
        '9ebVR5HKLSFGlCI9sNJPwVEp9ORyOoLK0iwIE7TlSuI',
      ]
      const transactions = await getTransactionsByRecipients(recipients, {
        fields: ['recipient'],
      })
      expect(transactions.length).toBeGreaterThan(100)
      expect(
        recipients.every((recipient) =>
          transactions.some(
            (transaction) => transaction.recipient === recipient,
          ),
        ),
      )
    },
    30000,
  )
  test.concurrent(
    "Should throw an error when a 'count' of 0 is defined",
    async () => {
      const recipient = '9ebVR5HKLSFGlCI9sNJPwVEp9ORyOoLK0iwIE7TlSuI'
      await expect(
        getTransactionsByRecipients([recipient], {
          count: 0,
        }),
      ).rejects.toThrow("'count' must be greater than 1 or undefined")
    },
  )
})
