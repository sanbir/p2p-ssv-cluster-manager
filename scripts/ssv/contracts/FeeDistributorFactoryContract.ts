import { getContract } from 'viem'
import { publicClient, walletClient } from '../../common/helpers/clients'

export const FeeDistributorFactoryAbi = [
  {
    inputs: [
      {
        internalType: 'uint96',
        name: '_defaultClientBasisPoints',
        type: 'uint96',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    inputs: [
      { internalType: 'address', name: '_address', type: 'address' },
      { internalType: 'address', name: '_operator', type: 'address' },
      { internalType: 'address', name: '_owner', type: 'address' },
    ],
    name: 'Access__AddressNeitherOperatorNorOwner',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: '_operator', type: 'address' }],
    name: 'Access__SameOperator',
    type: 'error',
  },
  { inputs: [], name: 'Access__ZeroNewOperator', type: 'error' },
  {
    inputs: [
      { internalType: 'address', name: '_recipient', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
    ],
    name: 'AssetRecoverer__TransferFailed',
    type: 'error',
  },
  {
    inputs: [{ internalType: 'address', name: '_caller', type: 'address' }],
    name: 'FeeDistributorFactory__CallerNotAuthorized',
    type: 'error',
  },
  {
    inputs: [
      {
        internalType: 'uint96',
        name: '_defaultClientBasisPoints',
        type: 'uint96',
      },
    ],
    name: 'FeeDistributorFactory__InvalidDefaultClientBasisPoints',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'address', name: '_passedAddress', type: 'address' },
    ],
    name: 'FeeDistributorFactory__NotFeeDistributor',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'address', name: '_passedAddress', type: 'address' },
    ],
    name: 'FeeDistributorFactory__NotP2pEth2Depositor',
    type: 'error',
  },
  {
    inputs: [],
    name: 'FeeDistributorFactory__ReferenceFeeDistributorNotSet',
    type: 'error',
  },
  { inputs: [], name: 'Ownable2Step__CallerNotNewOwner', type: 'error' },
  {
    inputs: [],
    name: 'Ownable2Step__NewOwnerShouldNotBeCurrentOwner',
    type: 'error',
  },
  {
    inputs: [
      { internalType: 'address', name: '_caller', type: 'address' },
      { internalType: 'address', name: '_owner', type: 'address' },
    ],
    name: 'OwnableBase__CallerNotOwner',
    type: 'error',
  },
  { inputs: [], name: 'TokenRecoverer__NoBurn', type: 'error' },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      { indexed: false, internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'ERC1155Transferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'ERC20Transferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_tokenId',
        type: 'uint256',
      },
    ],
    name: 'ERC721Transferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'EtherTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint96',
        name: '_defaultClientBasisPoints',
        type: 'uint96',
      },
    ],
    name: 'FeeDistributorFactory__DefaultClientBasisPointsSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_newFeeDistributorAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_clientAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_referenceFeeDistributor',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint96',
        name: '_clientBasisPoints',
        type: 'uint96',
      },
    ],
    name: 'FeeDistributorFactory__FeeDistributorCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_p2pEth2Depositor',
        type: 'address',
      },
    ],
    name: 'FeeDistributorFactory__P2pEth2DepositorSet',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_previousOperator',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_newOperator',
        type: 'address',
      },
    ],
    name: 'OperatorChanged',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferStarted',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: '_previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: '_newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    inputs: [],
    name: 'acceptOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_client', type: 'address' }],
    name: 'allClientFeeDistributors',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'allFeeDistributors',
    outputs: [{ internalType: 'address[]', name: '', type: 'address[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_newOperator', type: 'address' },
    ],
    name: 'changeOperator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_address', type: 'address' }],
    name: 'checkOperatorOrOwner',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_address', type: 'address' }],
    name: 'checkP2pEth2Depositor',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_address', type: 'address' }],
    name: 'check_Operator_Owner_P2pEth2Depositor',
    outputs: [],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_referenceFeeDistributor',
        type: 'address',
      },
      {
        components: [
          { internalType: 'uint96', name: 'basisPoints', type: 'uint96' },
          {
            internalType: 'address payable',
            name: 'recipient',
            type: 'address',
          },
        ],
        internalType: 'struct FeeRecipient',
        name: '_clientConfig',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'uint96', name: 'basisPoints', type: 'uint96' },
          {
            internalType: 'address payable',
            name: 'recipient',
            type: 'address',
          },
        ],
        internalType: 'struct FeeRecipient',
        name: '_referrerConfig',
        type: 'tuple',
      },
    ],
    name: 'createFeeDistributor',
    outputs: [
      {
        internalType: 'address',
        name: 'newFeeDistributorAddress',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'defaultClientBasisPoints',
    outputs: [{ internalType: 'uint96', name: '', type: 'uint96' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'dismissOperator',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'operator',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'p2pEth2Depositor',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pendingOwner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_referenceFeeDistributor',
        type: 'address',
      },
      {
        components: [
          { internalType: 'uint96', name: 'basisPoints', type: 'uint96' },
          {
            internalType: 'address payable',
            name: 'recipient',
            type: 'address',
          },
        ],
        internalType: 'struct FeeRecipient',
        name: '_clientConfig',
        type: 'tuple',
      },
      {
        components: [
          { internalType: 'uint96', name: 'basisPoints', type: 'uint96' },
          {
            internalType: 'address payable',
            name: 'recipient',
            type: 'address',
          },
        ],
        internalType: 'struct FeeRecipient',
        name: '_referrerConfig',
        type: 'tuple',
      },
    ],
    name: 'predictFeeDistributorAddress',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint96',
        name: '_defaultClientBasisPoints',
        type: 'uint96',
      },
    ],
    name: 'setDefaultClientBasisPoints',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_p2pEth2Depositor', type: 'address' },
    ],
    name: 'setP2pEth2Depositor',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'bytes4', name: 'interfaceId', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_token', type: 'address' },
      { internalType: 'address', name: '_recipient', type: 'address' },
      { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
      { internalType: 'bytes', name: '_data', type: 'bytes' },
    ],
    name: 'transferERC1155',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_token', type: 'address' },
      { internalType: 'address', name: '_recipient', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
    ],
    name: 'transferERC20',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_token', type: 'address' },
      { internalType: 'address', name: '_recipient', type: 'address' },
      { internalType: 'uint256', name: '_tokenId', type: 'uint256' },
    ],
    name: 'transferERC721',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_recipient', type: 'address' },
      { internalType: 'uint256', name: '_amount', type: 'uint256' },
    ],
    name: 'transferEther',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

if (!process.env.FEE_DISTRIBUTOR_FACTORY) {
  throw new Error('No FEE_DISTRIBUTOR_FACTORY in ENV')
}

export const FeeDistributorFactoryAddresss = process.env
  .FEE_DISTRIBUTOR_FACTORY as `0x${string}`

export const FeeDistributorFactoryContract = getContract({
  address: FeeDistributorFactoryAddresss,
  abi: FeeDistributorFactoryAbi,
  client: {
    public: publicClient,
    wallet: walletClient,
  },
})
