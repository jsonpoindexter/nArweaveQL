const URL = 'https://arweave.net/graphql'
import * as fetch from 'node-fetch'

export async function transactionById(ids: string[]): Promise<void> {
  const query = `query($ids: [ID!]) {
      transactions(ids: $ids) {
          edges {
              node {
                  id
              }
          }
      }
  }`
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { ids },
    }),
  })
  if (response.status !== 200) {
    throw Error(await response.text())
  }
  return await response.json()
}

;(async () => {
  try {
    console.log(await transactionById(['123']))
  } catch (e) {
    console.log(e)
  }
})()
