/**
 * Full GraphQL Response Object
 */
export interface QueryResponse {
  data: {
    transactions: {
      edges: {
        cursor: string
        node: Transaction
      }[]
    }
  }
}

export interface Transaction {
  id: string
  anchor?: string
  signature?: string
  recipient?: string
  owner?: {
    address: string
    key: string
  }
  fee?: {
    winston: number
    ar: number
  }
  quantity?: {
    winston: number
    ar: number
  }
  data?: {
    size: number
    type: string
  }
  tags?: {
    name: string
    value: string
  }[]
  block?: {
    id: string
    timestamp: number
    height: number
    previous: string
  }
  parent?: {
    id: string
  }
}

export type Fields = Array<
  | 'anchor'
  | 'signature'
  | 'recipient'
  | { owner: Array<'address' | 'key'> }
  | { fee: Array<'winston' | 'ar'> }
  | { quantity: Array<'winston' | 'ar'> }
  | { data: Array<'size' | 'type'> }
  | { tags: Array<'name' | 'value'> }
  | { block: Array<'id' | 'timestamp' | 'height' | 'previous'> }
  | { parent: Array<'id'> }
>
