import { logger } from './logger'
import { account, publicClient, walletClient } from './clients'
import {
  Address,
  BaseError,
  ContractFunctionRevertedError,
  parseGwei,
} from 'viem'
import process from 'process'

export async function sendTx(
  address: Address,
  abi: unknown[],
  functionName: string,
  args: unknown[],
) {
  logger.log('sendTx started for ' + address + ' ' + functionName)

  if (!process.env.MAX_FEE_PER_GAS_IN_GWEI) {
    throw new Error('No MAX_FEE_PER_GAS_IN_GWEI in ENV')
  }
  if (!process.env.MAX_PIORITY_FEE_PER_GAS_IN_GWEI) {
    throw new Error('No MAX_PIORITY_FEE_PER_GAS_IN_GWEI in ENV')
  }

  let txHash = ''

  try {
    // const { request } = await publicClient.simulateContract()

    txHash = await walletClient.writeContract({
      address,
      abi,
      functionName,
      args,
      account,
      maxFeePerGas: parseGwei(process.env.MAX_FEE_PER_GAS_IN_GWEI),
      maxPriorityFeePerGas: parseGwei(
        process.env.MAX_PIORITY_FEE_PER_GAS_IN_GWEI,
      ) / BigInt(10) +  BigInt(1),
      gas: 900000n
    })

    logger.log('Tx sent: ' + txHash)
  } catch (err) {
    logger.error(err)

    if (err instanceof BaseError) {
      const revertError = err.walk(
        (err) => err instanceof ContractFunctionRevertedError,
      )
      if (revertError instanceof ContractFunctionRevertedError) {
        const errorName = revertError.data?.errorName ?? ''

        logger.error(errorName)
      }
    }
  }

  logger.log('sendTx finished for ' + address + ' ' + functionName)

  return txHash
}
