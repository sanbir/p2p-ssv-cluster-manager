import 'dotenv/config'
import { logger } from '../../common/helpers/logger'
import { getP2pSsvProxies } from '../reads/getP2pSsvProxies'
import { MetaTransaction } from '../../safe/models/MetaTransaction'
import { encodeFunctionData } from 'viem'
import { CumulativeMerkleDropAbi, CumulativeMerkleDropAddresss } from '../contracts/CumulativeMerkleDropContract'
import { waitForHashToBeApprovedAndExecute } from '../../safe/waitForHashToBeApprovedAndExecute'
import { getMerkleInfo } from '../reads/getMerkleInfo'
import { P2pSsvProxyContractAbi } from '../contracts/P2pSsvProxyContractAbi'
import { getProxyClient } from '../reads/getProxyClient'

export async function claimMainnetIncentives(shouldForwardToClients: boolean) {
  logger.info('claimMainnetIncentives started')

  const proxies = await getP2pSsvProxies()

  const metaTxs: MetaTransaction[] = []

  for (const proxy of proxies) {
    try {
      const { cumulativeAmount, expectedMerkleRoot, merkleProof } = getMerkleInfo(proxy)

      const claimCalldata = encodeFunctionData({
        abi: CumulativeMerkleDropAbi,
        functionName: 'claim',
        args: [proxy, cumulativeAmount, expectedMerkleRoot, merkleProof],
      })
      // const callAnyContractCalldata = encodeFunctionData({
      //   abi: P2pSsvProxyContractAbi,
      //   functionName: 'callAnyContract',
      //   args: ['0xe16d6138B1D2aD4fD6603ACdb329ad1A6cD26D9f', claimCalldata],
      // })
      const metaTx = {
        to: CumulativeMerkleDropAddresss,
        data: claimCalldata,
      }
      metaTxs.push(metaTx)

      if (shouldForwardToClients) {
        const client = await getProxyClient(proxy)

        const withdrawSSVTokensData = encodeFunctionData({
          abi: P2pSsvProxyContractAbi,
          functionName: 'withdrawSSVTokens',
          args: [
            client,
            cumulativeAmount,
          ],
        })
        const withdrawSSVTokensMetaTx = {
          to: proxy as `0x${string}`,
          data: withdrawSSVTokensData,
        }
        metaTxs.push(withdrawSSVTokensMetaTx)
      } else {
        const withdrawSSVTokensData = encodeFunctionData({
          abi: P2pSsvProxyContractAbi,
          functionName: 'withdrawSSVTokens',
          args: [
            process.env.P2P_SSV_PROXY_FACTORY_ADDRESS,
            cumulativeAmount,
          ],
        })
        const withdrawSSVTokensMetaTx = {
          to: proxy as `0x${string}`,
          data: withdrawSSVTokensData,
        }
        metaTxs.push(withdrawSSVTokensMetaTx)
      }
    } catch (error) {
      logger.error(error)
    }
  }

  logger.info(metaTxs.length, 'proxies will receive rewards')

  if (metaTxs.length) {
    await waitForHashToBeApprovedAndExecute(metaTxs)
  }

  logger.info('claimMainnetIncentives finished')
}
