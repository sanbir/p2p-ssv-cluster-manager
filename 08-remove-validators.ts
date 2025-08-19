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
    // await setAllowedSsvOperatorOwners()
    // await setSsvOperatorIds()

    const fileContent = readFileSync('keyshares.json', 'utf-8');
    const sharesFile: SharesFile = JSON.parse(fileContent);
    const shares = sharesFile.shares

    let clusterState: ClusterState
    const _operatorOwners: string[] = []
    let _operatorIds: number[]
    const _publicKeys: string[] = []
    const _sharesData: string[] = []
    // const _clientConfig: FeeRecipient = { recipient: '0xF37FeF00Fe67956E9870114815c42F0Cc18373ce', basisPoints: 9300 }
    const _clientConfig: FeeRecipient = { recipient: '0xFe911e8BCF1E0BF7F8967b8E38B64036924d8Ef2', basisPoints: 0 }
    const _referrerConfig: FeeRecipient = { recipient: zeroAddress, basisPoints: 0 }


    if (!process.env.ALLOWED_DAYS_TO_LIQUIDATION) {
      throw new Error('No ALLOWED_DAYS_TO_LIQUIDATION in ENV')
    }
    const allowedDaysToLiquidation = BigInt(
      process.env.ALLOWED_DAYS_TO_LIQUIDATION,
    )
    const validatorCount = shares.length

    let totalFeePerBlock = 0n
    const networkFee = await getNetworkFee()
    totalFeePerBlock += networkFee

    const minimumLiquidationCollateral = await getMinimumLiquidationCollateral()
    const liquidationThresholdPeriod = await getLiquidationThresholdPeriod()
    const collateralForLiquidationThresholdPeriod = liquidationThresholdPeriod *
      totalFeePerBlock *
      BigInt(validatorCount)
    const collateral = minimumLiquidationCollateral > collateralForLiquidationThresholdPeriod
      ? minimumLiquidationCollateral
      : collateralForLiquidationThresholdPeriod
    const neededBalancePerValidator =
      totalFeePerBlock * blocksPerDay * allowedDaysToLiquidation
    const _amount =
      neededBalancePerValidator * BigInt(validatorCount) +
      collateral

    for (const share of shares) {
      _operatorIds = share.payload.operatorIds
      _publicKeys.push(share.data.publicKey)
      _sharesData.push(share.payload.sharesData)
    }

    _operatorOwners.push('0x95b3D923060b7E6444d7C3F0FCb01e6F37F4c418')
    _operatorOwners.push('0x47659cc5fB8CDC58bD68fEB8C78A8e19549d39C5')
    _operatorOwners.push('0x9a792B1588882780Bed412796337E0909e51fAB7')
    _operatorOwners.push('0xfeC26f2bC35420b4fcA1203EcDf689a6e2310363')

    const proxy: string = await predictP2pSsvProxyAddress_3_1(_clientConfig, _referrerConfig) as string

    const clusterStateFromApi = await getClusterStateFromApi(proxy, _operatorIds!)
    if (clusterStateFromApi === null) {
      clusterState = {
        validatorCount: 0,
        networkFeeIndex: 0n,
        index: 0n,
        active: true,
        balance: 0n
      }
    } else {
      clusterState = toClusterState(clusterStateFromApi)
    }

    const ssvTokensValueInWei = _amount * 1000000000000n / 1000000000000000000n


    await bulkRemoveValidator(proxy, _publicKeys, _operatorIds!, clusterState)

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

