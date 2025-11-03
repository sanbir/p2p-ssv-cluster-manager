import { logger } from '../../common/helpers/logger'
import { encodeFunctionData } from 'viem'
import { ClusterState } from '../models/ClusterState'
import { waitForHashToBeApprovedAndExecute } from '../../safe/waitForHashToBeApprovedAndExecute'
import { MetaTransaction } from '../../safe/models/MetaTransaction'
import { P2pSsvProxyFactoryAddresss } from '../contracts/P2pSsvProxyFactoryContract'
import { P2pSsvProxyFactoryAbi_3_1, P2pSsvProxyFactoryAddress_3_1 } from '../contracts/P2pSsvProxyFactoryContract_3_1'
import { FeeRecipient } from '../models/SharesFileTypes'
import { SSVNetworkAbi } from '../contracts/SSVNetworkContract'
import { predictP2pSsvProxyAddress_3_1 } from '../reads/predictP2pSsvProxyAddress_3_1'

export async function bulkRegisterValidators(
  _operatorOwners: string[],
  _operatorIds: (number | bigint)[],
  _publicKeys: string[],
  _sharesData: string[],
  _amount: bigint,
  _cluster: ClusterState,
  _clientConfig: FeeRecipient,
  _referrerConfig: FeeRecipient,
  ssvTokensValueInWei: bigint
) {
  logger.log(
    'bulkRegisterValidators started for ' + _clientConfig.recipient + _publicKeys.join('\n')
  )

  const proxy = await predictP2pSsvProxyAddress_3_1(_clientConfig, _referrerConfig)

  const metaTxs: MetaTransaction[] = []

  const registerValidatorsData = encodeFunctionData({
    abi: P2pSsvProxyFactoryAbi_3_1,
    functionName: 'registerValidators',
    args: [_operatorOwners, _operatorIds, _publicKeys, _sharesData, _amount, _cluster, _clientConfig, _referrerConfig],
  })
  const registerValidatorsMetaTx = {
    to: P2pSsvProxyFactoryAddress_3_1 as `0x${string}`,
    data: registerValidatorsData,
    value: ssvTokensValueInWei
  }
  metaTxs.push(registerValidatorsMetaTx)

  logger.info('_amount', _amount)
  logger.info('ssvTokensValueInWei', ssvTokensValueInWei)

  const setFeeRecipientAddressCalldata = encodeFunctionData({
    abi: SSVNetworkAbi,
    functionName: 'setFeeRecipientAddress',
    args: ['0x4205F876f0F6783a011bD11076583FE57C88AF33'],
  })
  const setFeeRecipientAddressMetaTx = {
    to: proxy as `0x${string}`,
    data: setFeeRecipientAddressCalldata,
  }
  metaTxs.push(setFeeRecipientAddressMetaTx)

  await waitForHashToBeApprovedAndExecute(metaTxs)

  logger.log(
    'bulkRegisterValidators finished for ' + _clientConfig.recipient + _publicKeys.join('\n')
  )
}
