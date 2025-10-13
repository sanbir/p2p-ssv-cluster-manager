import { holesky, hoodi, mainnet } from 'viem/chains'
import { createPublicClient, createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import process from 'process'

if (!process.env.RPC_URL) {
  throw new Error('No RPC_URL in ENV')
}

export const isHolesky = process.env.RPC_URL.includes('hoodi')

const chain = isHolesky
  ? hoodi
  : process.env.RPC_URL.includes('mainnet')
    ? mainnet
    : null

if (!chain) {
  throw new Error('Chain is not clear from RPC_URL. Use Infura')
}

if (!process.env.PRIVATE_KEY) {
  throw new Error('No PRIVATE_KEY in ENV')
}

const key = process.env.PRIVATE_KEY as `0x${string}`

export const account = privateKeyToAccount(key)

export const publicClient = createPublicClient({
  chain,
  transport: http(process.env.RPC_URL),
})

export const walletClient = createWalletClient({
  chain,
  transport: http(process.env.RPC_URL_SEND),
  account,
})
