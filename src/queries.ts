import { Fields, QueryResponse, Transaction } from 'query'

/**
 * Parse Field interface to GraphQL Query fields
 * @returns {string}
 * @param fields
 */
const parse = (fields: Fields): string => {
  return fields
    .map((field) => {
      if (typeof field === 'object')
        return `${Object.keys(field)[0]} { ${parse(Object.values(field)[0])} }`
      else return field
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
