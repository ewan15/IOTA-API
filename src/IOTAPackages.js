import { composeAPI } from '@iota/core'
import { createHttpClient } from '@iota/http-client'
import { createGetNodeInfo } from '@iota/core'


export const iota = composeAPI({
    provider: 'https://node02.iotatoken.nl:443'
})

export const client = createHttpClient({
    provider: 'https://node02.iotatoken.nl:443'
})

export const Converter = require('@iota/converter')