/**
 * Full GraphQL Response Object
 */
export interface QueryResponse {
  data: {
    transactions: {
      cursor: string
      edges: {
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

export interface Options {
  anchor?: boolean
  signature?: boolean
  recipient?: boolean
  owner?: {
    address?: boolean
    key?: boolean
  }
  fee?: { winston?: boolean; ar?: boolean }
  quantity?: { winston?: boolean; ar?: boolean }
  data?: { size?: boolean; type?: boolean }
  tags?: { name?: boolean; value?: boolean }
  block?: {
    id?: boolean
    timestamp?: boolean
    height?: boolean
    previous?: boolean
  }
  parent?: {
    id?: boolean
  }
}

export type Fields = (string | unknown)[]
