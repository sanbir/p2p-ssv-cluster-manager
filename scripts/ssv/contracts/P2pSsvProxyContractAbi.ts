export const P2pSsvProxyContractAbi = [{
  'inputs': [{
    'internalType': 'address',
    'name': '_p2pSsvProxyFactory',
    'type': 'address'
  }], 'stateMutability': 'nonpayable', 'type': 'constructor'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_recipient', 'type': 'address' }, {
    'internalType': 'uint256',
    'name': '_amount',
    'type': 'uint256'
  }], 'name': 'AssetRecoverer__TransferFailed', 'type': 'error'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_caller', 'type': 'address' }, {
    'internalType': 'address',
    'name': '_owner',
    'type': 'address'
  }], 'name': 'OwnableBase__CallerNotOwner', 'type': 'error'
}, {
  'inputs': [],
  'name': 'P2pSsvProxy__AmountOfParametersError',
  'type': 'error'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_caller', 'type': 'address' }, {
    'internalType': 'address',
    'name': '_operator',
    'type': 'address'
  }, { 'internalType': 'address', 'name': '_owner', 'type': 'address' }],
  'name': 'P2pSsvProxy__CallerNeitherOperatorNorOwner',
  'type': 'error'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_caller', 'type': 'address' }],
  'name': 'P2pSsvProxy__CallerNeitherOperatorNorOwnerNorClient',
  'type': 'error'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_passedAddress', 'type': 'address' }],
  'name': 'P2pSsvProxy__NotP2pSsvProxyFactory',
  'type': 'error'
}, {
  'inputs': [{
    'internalType': 'address',
    'name': '_msgSender',
    'type': 'address'
  }, { 'internalType': 'contract IP2pSsvProxyFactory', 'name': '_actualFactory', 'type': 'address' }],
  'name': 'P2pSsvProxy__NotP2pSsvProxyFactoryCalled',
  'type': 'error'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_caller', 'type': 'address' }, {
    'internalType': 'bytes4',
    'name': '_selector',
    'type': 'bytes4'
  }], 'name': 'P2pSsvProxy__SelectorNotAllowed', 'type': 'error'
}, { 'inputs': [], 'name': 'TokenRecoverer__NoBurn', 'type': 'error' }, {
  'anonymous': false,
  'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': '_token', 'type': 'address' }, {
    'indexed': true,
    'internalType': 'address',
    'name': '_recipient',
    'type': 'address'
  }, { 'indexed': false, 'internalType': 'uint256', 'name': '_tokenId', 'type': 'uint256' }, {
    'indexed': false,
    'internalType': 'uint256',
    'name': '_amount',
    'type': 'uint256'
  }, { 'indexed': false, 'internalType': 'bytes', 'name': '_data', 'type': 'bytes' }],
  'name': 'ERC1155Transferred',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': '_token', 'type': 'address' }, {
    'indexed': true,
    'internalType': 'address',
    'name': '_recipient',
    'type': 'address'
  }, { 'indexed': false, 'internalType': 'uint256', 'name': '_amount', 'type': 'uint256' }],
  'name': 'ERC20Transferred',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': '_token', 'type': 'address' }, {
    'indexed': true,
    'internalType': 'address',
    'name': '_recipient',
    'type': 'address'
  }, { 'indexed': false, 'internalType': 'uint256', 'name': '_tokenId', 'type': 'uint256' }],
  'name': 'ERC721Transferred',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{
    'indexed': true,
    'internalType': 'address',
    'name': '_recipient',
    'type': 'address'
  }, { 'indexed': false, 'internalType': 'uint256', 'name': '_amount', 'type': 'uint256' }],
  'name': 'EtherTransferred',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': '_feeDistributor', 'type': 'address' }],
  'name': 'P2pSsvProxy__Initialized',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': '_contract', 'type': 'address' }, {
    'indexed': true,
    'internalType': 'bytes4',
    'name': '_selector',
    'type': 'bytes4'
  }],
  'name': 'P2pSsvProxy__SuccessfullyCalledExternalContract',
  'type': 'event'
}, {
  'anonymous': false,
  'inputs': [{ 'indexed': true, 'internalType': 'address', 'name': '_caller', 'type': 'address' }, {
    'indexed': true,
    'internalType': 'bytes4',
    'name': '_selector',
    'type': 'bytes4'
  }],
  'name': 'P2pSsvProxy__SuccessfullyCalledViaFallback',
  'type': 'event'
}, { 'stateMutability': 'nonpayable', 'type': 'fallback' }, {
  'inputs': [{
    'internalType': 'bytes[]',
    'name': 'publicKeys',
    'type': 'bytes[]'
  }, { 'internalType': 'uint64[]', 'name': 'operatorIds', 'type': 'uint64[]' }],
  'name': 'bulkExitValidator',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'bytes[]', 'name': 'publicKeys', 'type': 'bytes[]' }, {
    'internalType': 'uint64[]',
    'name': 'operatorIds',
    'type': 'uint64[]'
  }, { 'internalType': 'bytes[]', 'name': 'sharesData', 'type': 'bytes[]' }, {
    'internalType': 'uint256',
    'name': 'amount',
    'type': 'uint256'
  }, {
    'components': [{
      'internalType': 'uint32',
      'name': 'validatorCount',
      'type': 'uint32'
    }, { 'internalType': 'uint64', 'name': 'networkFeeIndex', 'type': 'uint64' }, {
      'internalType': 'uint64',
      'name': 'index',
      'type': 'uint64'
    }, { 'internalType': 'bool', 'name': 'active', 'type': 'bool' }, {
      'internalType': 'uint256',
      'name': 'balance',
      'type': 'uint256'
    }], 'internalType': 'struct ISSVNetworkCore.Cluster', 'name': 'cluster', 'type': 'tuple'
  }], 'name': 'bulkRegisterValidators', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_contract', 'type': 'address' }, {
    'internalType': 'bytes',
    'name': '_calldata',
    'type': 'bytes'
  }], 'name': 'callAnyContract', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
}, {
  'inputs': [{ 'internalType': 'uint256', 'name': '_tokenAmount', 'type': 'uint256' }, {
    'internalType': 'uint64[]',
    'name': '_operatorIds',
    'type': 'uint64[]'
  }, {
    'components': [{
      'internalType': 'uint32',
      'name': 'validatorCount',
      'type': 'uint32'
    }, { 'internalType': 'uint64', 'name': 'networkFeeIndex', 'type': 'uint64' }, {
      'internalType': 'uint64',
      'name': 'index',
      'type': 'uint64'
    }, { 'internalType': 'bool', 'name': 'active', 'type': 'bool' }, {
      'internalType': 'uint256',
      'name': 'balance',
      'type': 'uint256'
    }], 'internalType': 'struct ISSVNetworkCore.Cluster[]', 'name': '_clusters', 'type': 'tuple[]'
  }], 'name': 'depositToSSV', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
}, {
  'inputs': [],
  'name': 'getClient',
  'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [],
  'name': 'getFactory',
  'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [],
  'name': 'getFeeDistributor',
  'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_feeDistributor', 'type': 'address' }],
  'name': 'initialize',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{
    'internalType': 'uint64[]',
    'name': '_operatorIds',
    'type': 'uint64[]'
  }, {
    'components': [{
      'internalType': 'uint32',
      'name': 'validatorCount',
      'type': 'uint32'
    }, { 'internalType': 'uint64', 'name': 'networkFeeIndex', 'type': 'uint64' }, {
      'internalType': 'uint64',
      'name': 'index',
      'type': 'uint64'
    }, { 'internalType': 'bool', 'name': 'active', 'type': 'bool' }, {
      'internalType': 'uint256',
      'name': 'balance',
      'type': 'uint256'
    }], 'internalType': 'struct ISSVNetworkCore.Cluster[]', 'name': '_clusters', 'type': 'tuple[]'
  }], 'name': 'liquidate', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
}, {
  'inputs': [],
  'name': 'operator',
  'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [],
  'name': 'owner',
  'outputs': [{ 'internalType': 'address', 'name': '', 'type': 'address' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'uint256', 'name': '_tokenAmount', 'type': 'uint256' }, {
    'internalType': 'uint64[]',
    'name': '_operatorIds',
    'type': 'uint64[]'
  }, {
    'components': [{
      'internalType': 'uint32',
      'name': 'validatorCount',
      'type': 'uint32'
    }, { 'internalType': 'uint64', 'name': 'networkFeeIndex', 'type': 'uint64' }, {
      'internalType': 'uint64',
      'name': 'index',
      'type': 'uint64'
    }, { 'internalType': 'bool', 'name': 'active', 'type': 'bool' }, {
      'internalType': 'uint256',
      'name': 'balance',
      'type': 'uint256'
    }], 'internalType': 'struct ISSVNetworkCore.Cluster[]', 'name': '_clusters', 'type': 'tuple[]'
  }], 'name': 'reactivate', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
}, {
  'inputs': [{
    'components': [{
      'components': [{
        'internalType': 'address',
        'name': 'owner',
        'type': 'address'
      }, { 'internalType': 'uint64', 'name': 'id', 'type': 'uint64' }, {
        'internalType': 'bytes32',
        'name': 'snapshot',
        'type': 'bytes32'
      }, { 'internalType': 'uint256', 'name': 'fee', 'type': 'uint256' }],
      'internalType': 'struct SsvOperator[]',
      'name': 'ssvOperators',
      'type': 'tuple[]'
    }, {
      'components': [{ 'internalType': 'bytes', 'name': 'pubkey', 'type': 'bytes' }, {
        'internalType': 'bytes',
        'name': 'sharesData',
        'type': 'bytes'
      }], 'internalType': 'struct SsvValidator[]', 'name': 'ssvValidators', 'type': 'tuple[]'
    }, {
      'components': [{
        'internalType': 'uint32',
        'name': 'validatorCount',
        'type': 'uint32'
      }, { 'internalType': 'uint64', 'name': 'networkFeeIndex', 'type': 'uint64' }, {
        'internalType': 'uint64',
        'name': 'index',
        'type': 'uint64'
      }, { 'internalType': 'bool', 'name': 'active', 'type': 'bool' }, {
        'internalType': 'uint256',
        'name': 'balance',
        'type': 'uint256'
      }], 'internalType': 'struct ISSVNetworkCore.Cluster', 'name': 'cluster', 'type': 'tuple'
    }, { 'internalType': 'uint256', 'name': 'tokenAmount', 'type': 'uint256' }, {
      'internalType': 'bytes32',
      'name': 'ssvSlot0',
      'type': 'bytes32'
    }], 'internalType': 'struct SsvPayload', 'name': '_ssvPayload', 'type': 'tuple'
  }], 'name': 'registerValidators', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
}, {
  'inputs': [{ 'internalType': 'bytes[]', 'name': '_pubkeys', 'type': 'bytes[]' }, {
    'internalType': 'uint64[]',
    'name': '_operatorIds',
    'type': 'uint64[]'
  }, {
    'components': [{
      'internalType': 'uint32',
      'name': 'validatorCount',
      'type': 'uint32'
    }, { 'internalType': 'uint64', 'name': 'networkFeeIndex', 'type': 'uint64' }, {
      'internalType': 'uint64',
      'name': 'index',
      'type': 'uint64'
    }, { 'internalType': 'bool', 'name': 'active', 'type': 'bool' }, {
      'internalType': 'uint256',
      'name': 'balance',
      'type': 'uint256'
    }], 'internalType': 'struct ISSVNetworkCore.Cluster[]', 'name': '_clusters', 'type': 'tuple[]'
  }], 'name': 'removeValidators', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_feeRecipientAddress', 'type': 'address' }],
  'name': 'setFeeRecipientAddress',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'bytes4', 'name': 'interfaceId', 'type': 'bytes4' }],
  'name': 'supportsInterface',
  'outputs': [{ 'internalType': 'bool', 'name': '', 'type': 'bool' }],
  'stateMutability': 'view',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_token', 'type': 'address' }, {
    'internalType': 'address',
    'name': '_recipient',
    'type': 'address'
  }, { 'internalType': 'uint256', 'name': '_tokenId', 'type': 'uint256' }, {
    'internalType': 'uint256',
    'name': '_amount',
    'type': 'uint256'
  }, { 'internalType': 'bytes', 'name': '_data', 'type': 'bytes' }],
  'name': 'transferERC1155',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_token', 'type': 'address' }, {
    'internalType': 'address',
    'name': '_recipient',
    'type': 'address'
  }, { 'internalType': 'uint256', 'name': '_amount', 'type': 'uint256' }],
  'name': 'transferERC20',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_token', 'type': 'address' }, {
    'internalType': 'address',
    'name': '_recipient',
    'type': 'address'
  }, { 'internalType': 'uint256', 'name': '_tokenId', 'type': 'uint256' }],
  'name': 'transferERC721',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_recipient', 'type': 'address' }, {
    'internalType': 'uint256',
    'name': '_amount',
    'type': 'uint256'
  }], 'name': 'transferEther', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
}, {
  'inputs': [],
  'name': 'withdrawAllSSVTokensToFactory',
  'outputs': [],
  'stateMutability': 'nonpayable',
  'type': 'function'
}, {
  'inputs': [{ 'internalType': 'uint256', 'name': '_tokenAmount', 'type': 'uint256' }, {
    'internalType': 'uint64[]',
    'name': '_operatorIds',
    'type': 'uint64[]'
  }, {
    'components': [{
      'internalType': 'uint32',
      'name': 'validatorCount',
      'type': 'uint32'
    }, { 'internalType': 'uint64', 'name': 'networkFeeIndex', 'type': 'uint64' }, {
      'internalType': 'uint64',
      'name': 'index',
      'type': 'uint64'
    }, { 'internalType': 'bool', 'name': 'active', 'type': 'bool' }, {
      'internalType': 'uint256',
      'name': 'balance',
      'type': 'uint256'
    }], 'internalType': 'struct ISSVNetworkCore.Cluster[]', 'name': '_clusters', 'type': 'tuple[]'
  }], 'name': 'withdrawFromSSV', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
}, {
  'inputs': [{ 'internalType': 'uint256', 'name': '_tokenAmount', 'type': 'uint256' }, {
    'internalType': 'uint64[]',
    'name': '_operatorIds',
    'type': 'uint64[]'
  }, {
    'components': [{
      'internalType': 'uint32',
      'name': 'validatorCount',
      'type': 'uint32'
    }, { 'internalType': 'uint64', 'name': 'networkFeeIndex', 'type': 'uint64' }, {
      'internalType': 'uint64',
      'name': 'index',
      'type': 'uint64'
    }, { 'internalType': 'bool', 'name': 'active', 'type': 'bool' }, {
      'internalType': 'uint256',
      'name': 'balance',
      'type': 'uint256'
    }], 'internalType': 'struct ISSVNetworkCore.Cluster[]', 'name': '_clusters', 'type': 'tuple[]'
  }], 'name': 'withdrawFromSSVToFactory', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
}, {
  'inputs': [{ 'internalType': 'address', 'name': '_to', 'type': 'address' }, {
    'internalType': 'uint256',
    'name': '_amount',
    'type': 'uint256'
  }], 'name': 'withdrawSSVTokens', 'outputs': [], 'stateMutability': 'nonpayable', 'type': 'function'
}]
