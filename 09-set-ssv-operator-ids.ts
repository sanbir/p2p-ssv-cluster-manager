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

async function main() {
  logger.info('97-test started')

  try {
    await setSsvOperatorIds()

  } catch (error) {
    logger.error(error)
  }

  logger.info('97-test finished')
}
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

