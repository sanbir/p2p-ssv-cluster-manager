import { logger } from '../../common/helpers/logger'
import { isHolesky, publicClient } from '../../common/helpers/clients'
import { decodeEventLog } from 'viem'
import {
  SSVNetworkAbi,
  SSVNetworkAddresss,
} from '../contracts/SSVNetworkContract'

export async function getPubkeysForProxy(proxy: string) {
  logger.info('getPubkeysForProxy started for ' + proxy)

  const logs = await publicClient.getContractEvents({
    address: SSVNetworkAddresss,
    abi: SSVNetworkAbi,
    eventName: 'ValidatorAdded',
    fromBlock: isHolesky ? 1n : 1000000n,
    toBlock: 'latest',
    strict: true,
    args: {
      owner: proxy,
    },
  })

  const pubkeys = logs.map(
    (log) =>
      (
        decodeEventLog({
          abi: SSVNetworkAbi,
          data: log.data,
          topics: log.topics,
        }).args as unknown as { publicKey: string, operatorIds: number[] }
      ),
  )

  logger.info('getPubkeysForProxy finished for ' + proxy)

  return pubkeys
}
