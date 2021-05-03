import { Fields } from 'query'

/**
 * Parse Field interface to GraphQL Query fields
 * @param object
 * @param {number} level
 * @returns {string}
 */
const parse = (object: unknown, level = 0): string => {
  return Object.entries(object)
    .map(([key, value]) => {
      if (value) {
        if (typeof value === 'object') return `${key} { ${parse(value, 10)} }`
        else return key
      }
    })
    .join(' ')
}

export const transactionQuery = (fields?: Fields): string => {
  return `query($ids: [ID!], $first: Int) {
      transactions(ids: $ids, first: $first) {
          edges {
              node {
                  id
                  ${fields ? parse(fields) : ''}
              }
          }
      }
  }`
}
