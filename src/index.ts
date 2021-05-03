import { Fields, Transaction } from 'query'
import httpClient from './httpClient'
import { QueryResponseToTransactions, transactionQuery } from './queries'

// Max amount of transaction we can retrieve in one request
const RETRIEVE_MAX = 100

/**
 * Retrieve latest transactions
 *
 * https://gql-guide.vercel.app/#pagination
 *
 * @param {number} count ( min: 1 ) - Number of the latest transactions to fetch
 * @param {Fields} fields
 * @param cursor - Pagination cursor
 * @returns {Promise<Transaction[]>}
 */
export async function getTransactions(
  count: number,
  fields?: Fields,
  cursor?: string,
): Promise<Transaction[]> {
  if (count < 1) throw Error("'count' must be greater than 1")
  const body = JSON.stringify({
    query: transactionQuery(fields),
    variables: { first: count < RETRIEVE_MAX ? count : RETRIEVE_MAX, cursor },
  })
  const {
    data: {
      transactions: { edges },
    },
  } = await httpClient(body)
  count -= RETRIEVE_MAX
  cursor = edges.length ? edges[edges.length - 1].cursor : null
  const transactions = edges.map((edge) => edge.node)
  return count > 0 && cursor
    ? [...transactions, ...(await getTransactions(count, fields, cursor))]
    : transactions
}

/**
 * Retrieve one or more transactions by specifying their IDs in an array
 *
 * https://gql-guide.vercel.app/#transaction
 *
 * @param {string[]} ids
 * @param fields
 * @returns {Promise<Transaction>}
 */
export async function getTransactionsByIds(
  ids: string[],
  fields?: Fields,
): Promise<Transaction[]> {
  const first = RETRIEVE_MAX
  const body = JSON.stringify({
    query: transactionQuery(fields),
    variables: { ids: ids.splice(0, first), first },
  })
  const response = await httpClient(body)

  const transactions = QueryResponseToTransactions(response)
  return ids.length
    ? [...transactions, ...(await getTransactionsByIds(ids, fields))]
    : transactions
}

/**
 * Retrieve one or more recipients by specifying their address(es) in an array.
 *
 * https://gql-guide.vercel.app/#recipients
 *
 * @param {string[]} recipients
 * @param {number} count  ( min: 1 ) - Number of the transactions to fetch
 * @param fields
 * @param cursor
 * @returns {Promise<Transaction[]>}
 */
export async function getTransactionsByRecipients(
  recipients: string[],
  count?: number,
  fields?: Fields,
  cursor?: string,
): Promise<Transaction[]> {
  const body = JSON.stringify({
    query: transactionQuery(fields),
    variables: {
      recipients,
      first: count < RETRIEVE_MAX ? count : RETRIEVE_MAX,
      cursor,
    },
  })
  const {
    data: {
      transactions: { edges },
    },
  } = await httpClient(body)
  count -= RETRIEVE_MAX
  cursor = edges.length ? edges[edges.length - 1].cursor : null
  const transactions = edges.map((edge) => edge.node)
  return count > 0 && cursor
    ? [...transactions, ...(await getTransactions(count, fields, cursor))]
    : transactions
}
