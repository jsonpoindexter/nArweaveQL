# nArweave
A simple and lightweight wrapper for nodejs [Arweave GraphQL queries](https://gql-guide.vercel.app/)

### API Progress
- [X] [Transaction by ID w/ Pagination](https://gql-guide.vercel.app/#pagination)
- [X] [Transactions by IDs](https://gql-guide.vercel.app/#transaction)
- [X] [Transactions by Recipients](https://gql-guide.vercel.app/#recipients)
- [ ] [Transactions by Owners](https://gql-guide.vercel.app/#owners)
- [ ] [Transactions by Tags](https://gql-guide.vercel.app/#tags)
- [ ] [Transactions by Block Height](https://gql-guide.vercel.app/#blockheight)
- [ ] [Sort Transactions by Block Height](https://gql-guide.vercel.app/#sorting)


### API
All Transaction queries will automatically include the transaction id(s) in the response, other returned fields will 
only be returned if specified in the *optional* `field: Fields`

*Note*: Calls may take a long time if fetching many transactions (calls are made in batches of 100)

### [Get Latest Transaction(s)](https://gql-guide.vercel.app/#pagination)
Retrieve one or more of the latest transactions.

#### nArweave.getTransactions(count, *fields*)
#### Params
* `count: number` ( min: 1 ) - Number of transactions to fetch
* `fields: Fields` Optional fields returned in the response object (example: `['signature', { owner: ['address'] }]` or `'*'` for all fields)
#### Response
Array<[Transaction]>

### [Get Transactions by IDs](https://gql-guide.vercel.app/#transaction)
Retrieve one or more transactions by specifying their IDs in an array.

#### `nArweave.getTransactionsByIds(IDs)`
#### Params
* `ids: string[]` - Array of transaction IDs
* `fields: Fields` Optional fields returned in the response object (example: `['signature', { owner: ['address'] }]` or `'*'` for all fields)
#### Response
Array<[Transaction]>

### [Get Transactions by Recipients](https://gql-guide.vercel.app/#recipients)

Retrieve one or more recipients by specifying their address(es) in an array.

#### nArweave.getTransactionsByRecipients(recipients, *options*)
#### Params
* `recipients: string[]` Array of recipient IDs
* `options` Optional
  * `count: number` ( min: 1, `undefined`: fetch all ) - Optional number of transactions to fetch
  * `fields: Fields` Optional fields returned in the response object (example: `['signature', { owner: ['address'] }]` or `'*'` for all fields)
#### Response
Array<[Transaction]>
