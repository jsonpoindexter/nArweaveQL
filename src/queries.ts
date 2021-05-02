export const transactions = `query($ids: [ID!]) {
      transactions(ids: $ids) {
          edges {
              node {
                  id
              }
          }
      }
  }`
