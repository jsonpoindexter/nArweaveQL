# nArweave
A simple and lightweight wrapper for nodejs [Arweave GraphQL queries](https://gql-guide.vercel.app/)

### API Progress
- [X] [Transaction by ID w/ Pagination](https://gql-guide.vercel.app/#pagination)
- [X] [Transactions by IDs](https://gql-guide.vercel.app/#transaction)
- [ ] [Transactions by Recipients](https://gql-guide.vercel.app/#recipients)
- [ ] [Transactions by Owners](https://gql-guide.vercel.app/#owners)
- [ ] [Transactions by Tags](https://gql-guide.vercel.app/#tags)
- [ ] [Transactions by Block Height](https://gql-guide.vercel.app/#blockheight)
- [ ] [Sort Transactions by Block Height](https://gql-guide.vercel.app/#sorting)


### API
All Transaction queries will automatically include the transaction id(s) in the response, other returned fields will 
only be returned if specified in the *optional* `field: Fields`

*Note*: Calls may take a long time if fetching many transactions (calls are made in batches of 100)

### [Get latest transaction(s)](https://gql-guide.vercel.app/#pagination)
You may retrieve one or more of the latest transactions.

#### nArweave.getTransactions(count, *fields*)
#### Params
* `count: number` ( min: 1 ) - Number of transactions to fetch
* `fields: Fields` Optional fields returned in the response object
#### Response
Array<[Transaction]>

### [Get transactions by IDs](https://gql-guide.vercel.app/#transaction)
You may retrieve one or more transactions by specifying their IDs in an array.

#### `nArweave.getTransactionsByIds(IDs)`
#### Params
* `ids: string[]` - Array of transaction IDs
* `fields: Fields` Optional fields returned in the response object
#### Response
Array<[Transaction]>
