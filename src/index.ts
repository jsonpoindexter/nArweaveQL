import { Transaction } from 'query'
import httpClient from './httpClient'
import * as queries from './queries'

/**
 * Retrieve one or more transactions by specifying their IDs in an array
 * https://gql-guide.vercel.app/#transaction
 * @param {string[]} ids
 * @returns {Promise<Transaction>}
 */
export async function transactionsByIds(ids: string[]): Promise<Transaction[]> {
  const body = JSON.stringify({
    query: queries.transactions,
    variables: { ids },
  })
  const response = await httpClient(body)
  return response.data.transactions.edges.flatMap((edge) => edge.node)
}
