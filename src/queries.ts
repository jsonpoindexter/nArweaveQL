import { Fields, QueryResponse, Transaction } from 'query'

/**
 * Parse Field interface to GraphQL Query fields
 * @param object
 * @returns {string}
 */
const parse = (object: unknown): string => {
  return Object.entries(object)
    .map(([key, value]) => {
      if (value) {
        if (typeof value === 'object') return `${key} { ${parse(value)} }`
        else return key
      }
    })
    .join(' ')
}

export const transactionQuery = (fields?: Fields): string => {
  return `query($ids: [ID!], $first: Int, $cursor: String) {
      transactions(ids: $ids, first: $first, after: $cursor) {
          edges {
            cursor
              node {
                  id
                  ${fields ? parse(fields) : ''}
              }
          }
      }
  }`
}

export const QueryResponseToTransactions = (
  response: QueryResponse,
): Transaction[] =>
  response.data.transactions.edges.flatMap((edge) => edge.node)
