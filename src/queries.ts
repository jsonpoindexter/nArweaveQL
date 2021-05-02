export const transactions = `query($ids: [ID!], $first: Int) {
      transactions(ids: $ids, first: $first) {
          edges {
              node {
                  id
              }
          }
      }
  }`
