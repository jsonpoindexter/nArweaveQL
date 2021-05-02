import httpClient from './httpClient'
import * as queries from './queries'

/**
 * Retrieve one or more transactions by specifying their IDs in an array
 * https://gql-guide.vercel.app/#transaction
 * @param {string[]} ids
 * @returns {Promise<unknown>}
 */
export async function transactionsByIds(ids: string[]): Promise<unknown> {
  const body = JSON.stringify({
    query: queries.transactions,
    variables: { ids },
  })
  return await httpClient(body)
}
