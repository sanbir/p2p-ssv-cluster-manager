import { logger } from '../../common/helpers/logger'
import { P2pSsvProxyFactoryContract } from '../contracts/P2pSsvProxyFactoryContract'
import { P2pSsvProxyFactoryContract_3_1 } from '../contracts/P2pSsvProxyFactoryContract_3_1'

export async function getAllP2pSsvProxies_3_1() {
  logger.info('getAllP2pSsvProxies_3_1 started')

  const proxies =
    (await P2pSsvProxyFactoryContract_3_1.read.getAllP2pSsvProxies()) as string[]

  logger.info('getAllP2pSsvProxies_3_1 finished')

  return proxies
}
