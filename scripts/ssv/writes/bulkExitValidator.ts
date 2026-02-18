import { logger } from '../../common/helpers/logger'
import { SSVNetworkAbi } from '../contracts/SSVNetworkContract'
import { Address, encodeFunctionData } from 'viem'
import { ClusterState } from '../models/ClusterState'
import { sendTx } from '../../common/helpers/sendTx'
import { MetaTransaction } from '../../safe/models/MetaTransaction'
import { P2pSsvProxyFactoryAbi_3_1, P2pSsvProxyFactoryAddress_3_1 } from '../contracts/P2pSsvProxyFactoryContract_3_1'
import { waitForHashToBeApprovedAndExecute } from '../../safe/waitForHashToBeApprovedAndExecute'

export async function bulkExitValidator(
  proxy: string,
  publicKeys: string[],
  operatorIds: (number | bigint)[]
) {
  logger.log(
    'bulkRemoveValidator started for ' + proxy,
    operatorIds.join(',') + ' ' + publicKeys.join('\n'),
  )

  const txHash = await sendTx(
    proxy as Address,
    SSVNetworkAbi,
    'bulkExitValidator',
    [publicKeys, operatorIds],
  )

  // const calldata = encodeFunctionData({
  //   abi: SSVNetworkAbi,
  //   functionName: 'bulkExitValidator',
  //   args: [publicKeys, operatorIds],
  // })
  //
  // const metaTxs: MetaTransaction[] = []
  //
  // const metaTx = {
  //   to: proxy as Address,
  //   data: calldata,
  // }
  // metaTxs.push(metaTx)
  //
  // const txHash = await waitForHashToBeApprovedAndExecute(metaTxs)

  logger.log(
    'bulkRemoveValidator finished for ' + proxy,
    operatorIds.join(',') + ' ' + publicKeys.join('\n'),
  )

  return txHash
}
