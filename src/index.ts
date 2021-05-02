import { Fields, Options, Transaction } from 'query'
import httpClient from './httpClient'
import { transactionQuery } from './queries'

/**
 * Retrieve one or more transactions by specifying their IDs in an array
 *
 * https://gql-guide.vercel.app/#transaction
 *
 * @param {string[]} ids
 * @param fields
 * @returns {Promise<Transaction>}
 */
export async function transactionsByIds(
  ids: string[],
  fields?: Options,
): Promise<Transaction[]> {
  const first = 100
  const body = JSON.stringify({
    query: transactionQuery(fields),
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
