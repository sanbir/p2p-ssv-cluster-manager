import { logger } from '../common/helpers/logger'
import { encodeMultiSend } from './multisend'
import { getHashToApprove } from './getHashToApprove'
import { publicClient } from '../common/helpers/clients'
import process from 'process'
import { GnosisSafeAbi } from './contracts/GnosisSafe'
import { execTransaction } from './execTransaction'
import { MetaTransaction } from './models/MetaTransaction'

export async function waitForHashToBeApprovedAndExecute(
  metaTxs: MetaTransaction[],
) {
  logger.info(
    'waitForHashToBeApprovedAndExecute started for ' +
      metaTxs.length +
      ' metaTxs',
  )

  const chuckSize = 52
  if (metaTxs.length > chuckSize) {
    for (let i = 0; i < metaTxs.length; i++) {
      if (i % chuckSize === 0) {
        logger.info('Started chunk ' + i)

        const chuck = metaTxs.slice(i, i + chuckSize)

        const txsForMultiSend = encodeMultiSend(chuck)

        const hashToApprove = await getHashToApprove(txsForMultiSend)

        const unwatch = publicClient.watchContractEvent({
          address: process.env.SAFE_ADDRESS as `0x${string}`,
          abi: GnosisSafeAbi,
          eventName: 'ApproveHash',
          args: [hashToApprove, process.env.SAFE_OWNER_ADDRESS_2],
          onError: async (error) => {
            logger.info('Finished chunk ' + i)

            logger.info('Error occurred while waiting for hash to be approved')
            logger.error(error)
            unwatch()
          },
          onLogs: async () => {
            try {
              logger.info('Finished chunk ' + i)

              logger.info('Hash got approved. Executing GS tx started')
              await execTransaction(txsForMultiSend)
              logger.info('Executing GS tx finished')
              unwatch()
            } catch (error) {
              logger.info('Error occurred while executing GS tx')
              logger.error(error)
            }
          },
        })
      }
    }
  }

  logger.info(
    'waitForHashToBeApprovedAndExecute finished for ' +
      metaTxs.length +
      ' metaTxs',
  )
}
