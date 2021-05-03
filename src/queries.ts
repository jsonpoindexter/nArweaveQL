import { Fields, QueryResponse, Transaction } from 'query'

// Use when 'fields' parameter is passed in as '*'
const ALL_FIELDS: Fields = [
  'anchor',
  'signature',
  'recipient',
  { owner: ['address', 'key'] },
  { fee: ['winston', 'ar'] },
  { quantity: ['winston', 'ar'] },
  { data: ['size', 'type'] },
  { tags: ['name', 'value'] },
  { block: ['id', 'timestamp', 'height', 'previous'] },
  { parent: ['id'] },
]

/**
 * Parse Field interface to GraphQL Query fields
 * @returns {string}
 * @param fields
 */
const parse = (fields: Fields): string => {
  if (fields === '*') fields = ALL_FIELDS
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
