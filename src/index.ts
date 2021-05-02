import { Transaction } from 'query'
import httpClient from './httpClient'
import * as queries from './queries'

/**
 * Retrieve one or more transactions by specifying their IDs in an array
 *
 * NOTE: Supports recursive calling when ids are > 100 (100 is max allowed in one call)
 *
 * https://gql-guide.vercel.app/#transaction
 *
 * @param {string[]} ids
 * @param first
 * @returns {Promise<Transaction>}
 */
export async function transactionsByIds(
  ids: string[],
  first: number = 10,
): Promise<Transaction[]> {
  if (first > 100) {
    console.warn(
      "'first' parameter cannot be greater than 100. Defaulting to 100...",
    )
    first = 100
  }

  const body = JSON.stringify({
    query: queries.transactions,
    variables: { ids: ids.splice(0, first), first },
  })
  const response = await httpClient(body)

  const transactions = response.data.transactions.edges.flatMap(
    (edge) => edge.node,
  )
  if (ids.length) {
    return [...transactions, ...(await transactionsByIds(ids))]
  } else {
    return transactions
  }
}
