# nArweave
A simple and lightweight wrapper for nodejs [Arweave GraphQL queries](https://gql-guide.vercel.app/)

### API Progress
- [ ] [Transaction by Pagination](https://gql-guide.vercel.app/#pagination)
- [X] [Transactions by IDs](https://gql-guide.vercel.app/#transaction)
- [ ] [Transactions by Recipients](https://gql-guide.vercel.app/#recipients)
- [ ] [Transactions by Owners](https://gql-guide.vercel.app/#owners)
- [ ] [Transactions by Tags](https://gql-guide.vercel.app/#tags)
- [ ] [Transactions by Block Height](https://gql-guide.vercel.app/#blockheight)
- [ ] [Sort Transactions by Block Height](https://gql-guide.vercel.app/#sorting)


### API

### [Get transactions by IDs](https://gql-guide.vercel.app/#transaction)
You may retrieve one or more transactions by specifying their IDs in an array.

*Note*: Call may take a long time if fetching many transactions (calls are made in batches of 100)
#### `nArweave.getTransactionsByIds(IDs)`
#### Params
* `ids: string[]` - Array of transaction IDs
#### Response
Array<[Transaction]>
