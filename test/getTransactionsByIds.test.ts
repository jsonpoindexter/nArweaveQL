import one01TransactionsIds from './101transactionIds'
import { getTransactionsByIds } from '../src'

describe('Get transactions by Ids', () => {
  test.concurrent(
    'should return empty response when supplied a bad Id',
    async () => {
      const response = await getTransactionsByIds(['invalid-id'])
      return expect(response).toEqual([])
    },
  )
  test.concurrent(
    'should return a populated response when supplied a valid Id',
    async () => {
      const id = 'tmDmLDhGGaA_BAw8JETCB3n_fB4ItHadagfeeBoS06M'
      const response = await getTransactionsByIds([id])
      return expect(response).toEqual([{ id }])
    },
  )
  test.concurrent(
    'should return a partially populated response when supplied a valid Id and owner address',
    async () => {
      const id = 'tmDmLDhGGaA_BAw8JETCB3n_fB4ItHadagfeeBoS06M'
      const transactions = await getTransactionsByIds(
        [id],
        [{ owner: ['address'] }],
      )
      expect(transactions).toEqual([
        {
          id: 'tmDmLDhGGaA_BAw8JETCB3n_fB4ItHadagfeeBoS06M',
          owner: {
            address: '-5VMrJ6SIbT2yQT0cl_ftRJlDj4AzEq0e8ew8rYCNsE',
          },
        },
      ])
    },
  )
  test.concurrent(
    'should return a fully populated response when supplied a valid Id and owner address',
    async () => {
      const id = 'tmDmLDhGGaA_BAw8JETCB3n_fB4ItHadagfeeBoS06M'
      const transactions = await getTransactionsByIds([id], '*')
      expect(transactions).toEqual([
        {
          anchor:
            'craS8r6ZSA5wV5x2GIcT3obMZi9SWOJVIIytPOdLXskh-lQxI0tUypWNqOqnF7s_',
          block: {
            height: 678296,
            id:
              'VmTnhArBfZL250DEl-kVxw57UHRkTzGPkFPlgnisnL3Fvilz8UOrhy3vnAEx2qlD',
            previous:
              'zDlBenzQ9C33JgB4qaS4GsM4v6FgLXar5JZvkl0K-RrIq9HZrUm_HyPWCRq0XvQb',
            timestamp: 1619977218,
          },
          data: {
            size: '419',
            type: null,
          },
          fee: {
            ar: '0.000002125142',
            winston: '2125142',
          },
          id: 'tmDmLDhGGaA_BAw8JETCB3n_fB4ItHadagfeeBoS06M',
          owner: {
            address: '-5VMrJ6SIbT2yQT0cl_ftRJlDj4AzEq0e8ew8rYCNsE',
            key:
              'sTpQxPWj3RXWOqHkmePDqqbt3IcVxs_nnqrSfIAkeF41i1UgjPFzIX4_XetZ2xyz9yjrcVUvU4VuNYX2EVVGxXZHbV9hoqaXvGn71yO6W0geFvSJ9igZvVQdf-qtJRxfjhH6VVSJC-NF730clHolQEENJBIuFv2PPxreUjSxHJOvRI_CAoHs9DiKbKjQ2d7i8CVJCbJA67wsyUUw70-zxoaZ5IcBuKH1eyS0sCvdRFwxtEqB7bznVN8G1mnhgoO_DnVWlT_JBQDMN4qk54hEKm1m7l4KL4aiPIk3MsMoi52CFdSFY29ULJvobzP7NFQflDdocabSQpWDvAlx2_VWvkuOhCvxgoy1NSrNYNX06NX-oomCKdsodl7DiKCU03Zf4WAcS5PqXGr7L15O4ylNT2g-6a7cRjXUkQEtQ2Vr4dL6-GfG3PM42FsbzM2eVMvLZSj0AxcG7OuTLmmlsTmZdT8eugPOSNizeFqUTOia5tmdzMnlPjebPl2NeNFinE0j0S5PNFUmcrXe0KqXn9cXbhlLeByFvGSfv3BWWjqiAlUsOOs9K367g4Hx-lWZ1McWv5KYZG6jLUue1rtghtAKeCChpEAfFgQaQaisapW1h_o7A47TKRdCA94JgcQsLKvijxt0Tb5lQRzQwI0d0J5MvB_Of9U7SXTz0hJegAaohfk',
          },
          parent: null,
          quantity: {
            ar: '0.000000000000',
            winston: '0',
          },
          recipient: '',
          signature:
            'ACs3_kUeMViRqtsAgpWVBlXLvmQXR5TzC_w_bR3QgoS8EXYjm8qLdoBB4c3fzUcrE6-2dFGvxh6jXk19xQqJ_UeOfB1rVkmUAADAd0z3ChRupO4yk3_F3XBTXcAi4FAVjN6UzMYsLWqoRVRWWdTlU2Z1Y6mtQ9NQwIgX17UQItBUgoT-VNXGIzVP8q9lDZRa1aeap9sN_t6knPJugk_CYBP7LI-N-Q6kbdpm61WBIGSDAajxJ0_XqoEVvagJLvQSHCsfIaP1PVzR36P_W4eumi34aUkNBIqlyOvqbDGmXn0ZqFYxIj_b9UXswLXWoQ1AYNcEeNECiSLec50QafKKcbvHA3wrTZWMWbrHcMfc_LtKdLN2zz3LsxyeNqxIf245lu8bFNyU2qPe02E6MODfbn8MI46BLvs4q0ITNI7V4O6PzvAYQQnBjdroEfs0UkSWL0b4F-ykwaajLD7wOVXw9L0olKg4ZnlmTOQXyK6iYglYfyQVDAhUmHrdWRAsuGo-gt3XIQ6dcBaBmBX6iYZt7qM81rt0a_FKxRQIS1F80h1QXHveiyi7U2MZg3OButscTdlRq3yBNROKMSLloIBu229PhXuxeODaMgJbO70_QU6oPYrjLfylzWO2NH4Yn5GTwdOUcHM0SPUzrtUBhFmowAzp54MUt0J6ZXsQWjRacqM',
          tags: [
            {
              name: 'IPFS-Add',
              value: 'Qmbgr19vgnBanfZjzH7jePU9cmFwYt5WCCFa7eRGrMELhj',
            },
          ],
        },
      ])
    },
  )
  test.concurrent(
    'should return 101 transactions when querying for 101 transactions',
    async () => {
      const ids: string[] = one01TransactionsIds
      const transactions = await getTransactionsByIds(ids, [
        'anchor',
        { owner: ['address'] },
      ])
      expect(transactions.length).toEqual(101)
      expect(transactions[0].owner.address).toBeDefined()
    },
    30000,
  )
})
