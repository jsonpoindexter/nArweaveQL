import fetch from 'node-fetch'
const URL = 'https://arweave.net/graphql'

export default async (body: string): Promise<unknown> => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body,
  })
  if (response.status !== 200) {
    throw Error(await response.text())
  }
  return response.json()
}
