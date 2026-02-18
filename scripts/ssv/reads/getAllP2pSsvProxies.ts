import { logger } from '../../common/helpers/logger'
import { P2pSsvProxyFactoryContract } from '../contracts/P2pSsvProxyFactoryContract'

export async function getAllP2pSsvProxies() {
  logger.info('getAllP2pSsvProxies started')

  const proxies =
    (await P2pSsvProxyFactoryContract.read.getAllP2pSsvProxies()) as string[]

  logger.info('getAllP2pSsvProxies finished')

  return proxies
}
