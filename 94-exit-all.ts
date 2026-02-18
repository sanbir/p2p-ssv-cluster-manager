import 'dotenv/config'
import { logger } from './scripts/common/helpers/logger'
import { getIsValidatorExited } from './scripts/ssv/reads/getIsValidatorExited'
import { getIsValidatorRemoved } from './scripts/ssv/reads/getIsValidatorRemoved'
import { exitValidator } from './scripts/ssv/writes/exitValidator'
import { reactivate } from './scripts/ssv/writes/reactivate'
import { setFeeRecipientAddress } from './scripts/ssv/writes/setFeeRecipientAddress'
import { removeExitedValidatorsFromClusters } from './scripts/ssv/writes/removeExitedValidatorsFromClusters'
import { transferSsvTokensFromFactoryToClusters } from './scripts/ssv/writes/transferSsvTokensFromFactoryToClusters'
import { liquidate } from './scripts/ssv/writes/liquidate'
import { bulkExitValidator } from './scripts/ssv/writes/bulkExitValidator'
import * as fs from 'fs';
import { sleep } from './scripts/common/helpers/sleep'
import { readFileSync } from 'fs'
import { setSmallExchangeRate } from './scripts/ssv/writes/setSmallExchangeRate'
import { transferOwnership } from './scripts/ssv/writes/transferOwnership'
import { FeeRecipient, SharesFile } from './scripts/ssv/models/SharesFileTypes'
import { getClusterStateFromApi } from './scripts/ssv/reads/getClusterStateFromApi'
import { toClusterState } from './scripts/ssv/models/ClusterStateApi'
import { zeroAddress } from 'viem'
import { bulkRegisterValidators } from './scripts/ssv/writes/bulkRegisterValidators'
import { ClusterState } from './scripts/ssv/models/ClusterState'
import { getNetworkFee } from './scripts/ssv/reads/getNetworkFee'
import { getMinimumLiquidationCollateral } from './scripts/ssv/reads/getMinimumLiquidationCollateral'
import { getLiquidationThresholdPeriod } from './scripts/ssv/reads/getLiquidationThresholdPeriod'
import process from 'process'
import { getOperatorFee } from './scripts/ssv/reads/getOperatorFee'
import { getCurrentClusterBalance } from './scripts/ssv/reads/getCurrentClusterBalance'
import { blocksPerDay } from './scripts/common/helpers/constants'
import { setSsvOperatorIds } from './scripts/ssv/writes/setOperatorIds'
import { setAllowedSsvOperatorOwners } from './scripts/ssv/writes/setAllowedSsvOperatorOwners'
import { predictP2pSsvProxyAddress_3_1 } from './scripts/ssv/reads/predictP2pSsvProxyAddress_3_1'
import { bulkRemoveValidator } from './scripts/ssv/writes/bulkRemoveValidator'
import { getAllP2pSsvProxies } from './scripts/ssv/reads/getAllP2pSsvProxies'
import { getAllP2pSsvProxies_3_1 } from './scripts/ssv/reads/getAllP2pSsvProxies_3_1'
import { getP2pSsvProxies_3_1 } from './scripts/ssv/reads/getP2pSsvProxies_3_1'
import { getProxiesWithPubkeys } from './scripts/ssv/reads/getProxiesWithPubkeys'

async function main() {
  logger.info('94-exit-all started')

  try {
    const proxies: Record<string, { publicKey: string, operatorIds: number[] }[]> = await getProxiesWithPubkeys()

    for (const proxy of Object.keys(proxies)) {
      logger.log('start proxy:', proxy)
      const pubkeys = proxies[proxy].map(entry => entry.publicKey)
      const operatorIds = proxies[proxy].map(entry => entry.operatorIds)
      logger.log('start pubkeys:', pubkeys)

      if (pubkeys.length) {
        await bulkExitValidator(proxy, pubkeys, operatorIds[0])
      }
      logger.log('finish proxy:', proxy)
    }

  } catch (error) {
    logger.error(error)
  }

  logger.info('94-exit-all finished')
}

function setZeroSsvPerEthExchangeRateDividedByWei() {

}

async function test_exitValidator() {
  await exitValidator()
}

async function test_removeExitedValidatorsFromClusters() {
  await removeExitedValidatorsFromClusters()
}

async function test_setFeeRecipientAddress() {
  const txHash = await setFeeRecipientAddress()
}

async function test_getIsValidatorExited() {
  const isExited = await getIsValidatorExited(
    '0xb8591e4016dc4aa56c72516c91c281154cde46f9fb2316c4c2e2d23870c907eca6a559227679a99ac2753b1bf8a9d6f2',
  )
}

async function test_getIsValidatorRemoved() {
  const isRemoved = await getIsValidatorRemoved(
    '0x293f1c1daaf99a13a92ebe76bccd2bedf9289906',
    '0xa555ce9c4aa8d3755aca8cd15aadbac671628e3600e35d4f7d8ba46bb5b133ac2b95cf8d2f02f911b6422e8efbc0b1cc',
  )
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

