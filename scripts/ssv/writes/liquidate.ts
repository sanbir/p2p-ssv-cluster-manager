import { logger } from '../../common/helpers/logger'
import { P2pSsvProxyContractAbi } from '../contracts/P2pSsvProxyContractAbi'
import { sendTx } from '../../common/helpers/sendTx'
import { MetaTransaction } from '../../safe/models/MetaTransaction'
import { encodeFunctionData } from 'viem'
import { SSVNetworkAbi } from '../contracts/SSVNetworkContract'
import { waitForHashToBeApprovedAndExecute } from '../../safe/waitForHashToBeApprovedAndExecute'

export async function liquidate(
  clusters: {
    owner: string,
    operator_ids: number[],
    clusterState: {
      "validatorCount": number,
      "networkFeeIndex": bigint,
      "index": bigint,
      "active": boolean,
      "balance": bigint
  }}[]) {

  logger.log('liquidate started')

  const metaTxs: MetaTransaction[] = []

  for (const cluster of clusters) {
    const liquidateData = encodeFunctionData({
      abi: P2pSsvProxyContractAbi,
      functionName: 'liquidate',
      args: [
        cluster.operator_ids,
        [cluster.clusterState]
      ]
    })
    const metaTx = {
      to: cluster.owner as `0x${string}`,
      data: liquidateData,
    }
    metaTxs.push(metaTx)
  }

  await waitForHashToBeApprovedAndExecute(metaTxs)

  logger.log('liquidate finished')
}
