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
    const clientConfig: FeeRecipient = {
      basisPoints: 0,
      recipient: '0x5cb5ada4388454320325347be70f07602cc3b2d5'
    }
    const referrerConfig: FeeRecipient = {
      basisPoints: 10000,
      recipient: '0xD6E4aA932147A3FE5311dA1b67D9e73da06F9cEf',
    }

    const proxy: string = await predictP2pSsvProxyAddress_3_1(clientConfig, referrerConfig) as string
    console.log(proxy)

    // await setAllowedSsvOperatorOwners()
    // await setSsvOperatorIds()

    // const proxy = '0x367dAB908Cdd0058F51A26DD107F9C41549f51c2'
    // const _publicKeys = [
    //   "0xa333572684fd3c7c2f6eb6da9d9752120810d51133c65526a3ebc3762912613822005af4ad42767219de72659aa8b262",
    // ]
    // const _operatorIds = [
    //   365,
    //   1032,
    //   1033,
    //   1035
    // ]
    // const clusterState: ClusterState = {
    //   validatorCount: 1,
    //   networkFeeIndex: 243789742695n,
    //   index: 198912897708n,
    //   active: true,
    //   balance: 2103958240000000000n
    // }
    //
    // await bulkRemoveValidator(proxy, _publicKeys, _operatorIds, clusterState)

  } catch (error) {
    logger.error(error)
  }

  logger.info('97-test finished')
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

