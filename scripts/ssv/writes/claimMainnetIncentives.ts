import 'dotenv/config'
import { logger } from '../../common/helpers/logger'
import { getP2pSsvProxies } from '../reads/getP2pSsvProxies'
import { MetaTransaction } from '../../safe/models/MetaTransaction'
import { encodeFunctionData } from 'viem'
import {
  CumulativeMerkleDropAbi,
  CumulativeMerkleDropAddresss,
  CumulativeMerkleDropContract
} from '../contracts/CumulativeMerkleDropContract'
import { waitForHashToBeApprovedAndExecute } from '../../safe/waitForHashToBeApprovedAndExecute'
import { getMerkleInfo } from '../reads/getMerkleInfo'
import { P2pSsvProxyContractAbi } from '../contracts/P2pSsvProxyContractAbi'
import { getProxyClient } from '../reads/getProxyClient'
import { SSVNetworkViewsContract } from '../contracts/SSVNetworkViewsContract'

const nonForwardToClientsProxies = [
  '0xc0Ec400995e2BC1e12837804d512302f7feEF769',
  '0x745Ced32ee83e1CC186dF0C32FeD1B54F3F15057'
]

export async function claimMainnetIncentives(shouldForwardToClients: boolean) {
  logger.info('claimMainnetIncentives started')

  const proxies = await getP2pSsvProxies()

  const metaTxs: MetaTransaction[] = []

  for (const proxy of proxies) {
    try {
      // if (proxy.toLowerCase() === '0x008522637b4f6c5a6a6992ec7d47205e3e1ea7d4'.toLowerCase()) {
      //   logger.info('skipping', '0x008522637b4f6c5a6a6992ec7d47205e3e1ea7d4')
      //   continue
      // }

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

      const preclaimed = (await CumulativeMerkleDropContract.read.cumulativeClaimed([proxy])) as bigint
      const amountToTransfer = BigInt(cumulativeAmount) - preclaimed

      if (!nonForwardToClientsProxies.map(a => a.toLowerCase()).includes(proxy.toLowerCase())) {
        const client = await getProxyClient(proxy)

        const withdrawSSVTokensData = encodeFunctionData({
          abi: P2pSsvProxyContractAbi,
          functionName: 'withdrawSSVTokens',
          args: [
            client,
            amountToTransfer,
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
            amountToTransfer,
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
