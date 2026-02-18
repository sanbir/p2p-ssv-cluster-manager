import { logger } from '../../common/helpers/logger'
import { getP2pSsvProxies } from './getP2pSsvProxies'
import { getPubkeysForProxy } from './getPubkeysForProxy'
import { getAllP2pSsvProxies } from './getAllP2pSsvProxies'
import { getAllP2pSsvProxies_3_1 } from './getAllP2pSsvProxies_3_1'

export async function getProxiesWithPubkeys() {
  logger.log('getProxiesWithPubkeys started')

  const proxies = await getAllP2pSsvProxies()
  const proxies_3_1 = await getAllP2pSsvProxies_3_1()
  proxies.push(...proxies_3_1)

  console.log(proxies)

  const proxiesWithPubkeys: Record<string, { publicKey: string, operatorIds: number[] }[]> = {}
  for (const proxy of proxies) {
    const pubkeysForProxy = await getPubkeysForProxy(proxy)
    proxiesWithPubkeys[proxy] = pubkeysForProxy
  }

  logger.log('getProxiesWithPubkeys finished')

  return proxiesWithPubkeys
}
