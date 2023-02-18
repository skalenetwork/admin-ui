export default {
  message_proxy_mainnet_address: '0x8629703a9903515818C2FeB45a6f6fA5df8Da404',
  message_proxy_mainnet_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'ExtraContractRegistered',
      inputs: [
        {
          type: 'bytes32',
          name: 'chainHash',
          indexed: true,
        },
        {
          type: 'address',
          name: 'contractAddress',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'ExtraContractRemoved',
      inputs: [
        {
          type: 'bytes32',
          name: 'chainHash',
          indexed: true,
        },
        {
          type: 'address',
          name: 'contractAddress',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'GasCostMessageHeaderWasChanged',
      inputs: [
        {
          type: 'uint256',
          name: 'oldValue',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'newValue',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'GasCostMessageWasChanged',
      inputs: [
        {
          type: 'uint256',
          name: 'oldValue',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'newValue',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'GasLimitWasChanged',
      inputs: [
        {
          type: 'uint256',
          name: 'oldValue',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'newValue',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'Initialized',
      inputs: [
        {
          type: 'uint8',
          name: 'version',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'OutgoingMessage',
      inputs: [
        {
          type: 'bytes32',
          name: 'dstChainHash',
          indexed: true,
        },
        {
          type: 'uint256',
          name: 'msgCounter',
          indexed: true,
        },
        {
          type: 'address',
          name: 'srcContract',
          indexed: true,
        },
        {
          type: 'address',
          name: 'dstContract',
          indexed: false,
        },
        {
          type: 'bytes',
          name: 'data',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'PostMessageError',
      inputs: [
        {
          type: 'uint256',
          name: 'msgCounter',
          indexed: true,
        },
        {
          type: 'bytes',
          name: 'message',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleAdminChanged',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'bytes32',
          name: 'previousAdminRole',
          indexed: true,
        },
        {
          type: 'bytes32',
          name: 'newAdminRole',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleGranted',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'address',
          name: 'account',
          indexed: true,
        },
        {
          type: 'address',
          name: 'sender',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleRevoked',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'address',
          name: 'account',
          indexed: true,
        },
        {
          type: 'address',
          name: 'sender',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'SchainPaused',
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'SchainResumed',
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'VersionUpdated',
      inputs: [
        {
          type: 'string',
          name: 'oldVersion',
          indexed: false,
        },
        {
          type: 'string',
          name: 'newVersion',
          indexed: false,
        },
      ],
    },
    {
      type: 'function',
      name: 'CHAIN_CONNECTOR_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'CONSTANT_SETTER_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'DEFAULT_ADMIN_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'EXTRA_CONTRACT_REGISTRAR_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'MAINNET_HASH',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'MESSAGES_LENGTH',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'PAUSABLE_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'REVERT_REASON_LENGTH',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'addConnectedChain',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'communityPool',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'connectedChains',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'incomingMessageCounter',
        },
        {
          type: 'uint256',
          name: 'outgoingMessageCounter',
        },
        {
          type: 'bool',
          name: 'inited',
        },
      ],
    },
    {
      type: 'function',
      name: 'contractManagerOfSkaleManager',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'gasLimit',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getContractRegisteredLength',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getContractRegisteredRange',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'uint256',
          name: 'from',
        },
        {
          type: 'uint256',
          name: 'to',
        },
      ],
      outputs: [
        {
          type: 'address[]',
          name: 'contractsInRange',
        },
      ],
    },
    {
      type: 'function',
      name: 'getIncomingMessagesCounter',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'fromSchainName',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getOutgoingMessagesCounter',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'targetSchainName',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getRoleAdmin',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
      ],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getRoleMember',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'uint256',
          name: 'index',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getRoleMemberCount',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'grantRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'hasRole',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'headerMessageGasCost',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractManagerOfSkaleManagerValue',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'initializeMessageProxy',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'newGasLimit',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'isAgentAuthorized',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'sender',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'isConnectedChain',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'isContractRegistered',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'contractAddress',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'isPaused',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'isSchainOwner',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'sender',
        },
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'messageGasCost',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'messageInProgress',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'pause',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'pauseInfo',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: 'paused',
        },
      ],
    },
    {
      type: 'function',
      name: 'postIncomingMessages',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'fromSchainName',
        },
        {
          type: 'uint256',
          name: 'startingCounter',
        },
        {
          type: 'tuple[]',
          name: 'messages',
          components: [
            {
              type: 'address',
              name: 'sender',
            },
            {
              type: 'address',
              name: 'destinationContract',
            },
            {
              type: 'bytes',
              name: 'data',
            },
          ],
        },
        {
          type: 'tuple',
          name: 'sign',
          components: [
            {
              type: 'uint256[2]',
              name: 'blsSignature',
            },
            {
              type: 'uint256',
              name: 'hashA',
            },
            {
              type: 'uint256',
              name: 'hashB',
            },
            {
              type: 'uint256',
              name: 'counter',
            },
          ],
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'postOutgoingMessage',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'targetChainHash',
        },
        {
          type: 'address',
          name: 'targetContract',
        },
        {
          type: 'bytes',
          name: 'data',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'registerExtraContract',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'extraContract',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'registerExtraContractForAll',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'extraContract',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'removeConnectedChain',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'removeExtraContract',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'extraContract',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'removeExtraContractForAll',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'extraContract',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'renounceRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'resume',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'revokeRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setCommunityPool',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'newCommunityPoolAddress',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setNewGasLimit',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'newGasLimit',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setNewHeaderMessageGasCost',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'newHeaderMessageGasCost',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setNewMessageGasCost',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'newMessageGasCost',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setVersion',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'newVersion',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'supportsInterface',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes4',
          name: 'interfaceId',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'version',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'string',
          name: '',
        },
      ],
    },
  ],
  linker_address: '0x6ef406953bac772C2146389ED37846BA3b6086D1',
  linker_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'Initialized',
      inputs: [
        {
          type: 'uint8',
          name: 'version',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleAdminChanged',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'bytes32',
          name: 'previousAdminRole',
          indexed: true,
        },
        {
          type: 'bytes32',
          name: 'newAdminRole',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleGranted',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'address',
          name: 'account',
          indexed: true,
        },
        {
          type: 'address',
          name: 'sender',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleRevoked',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'address',
          name: 'account',
          indexed: true,
        },
        {
          type: 'address',
          name: 'sender',
          indexed: true,
        },
      ],
    },
    {
      type: 'function',
      name: 'DEFAULT_ADMIN_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'LINKER_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'addSchainContract',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'contractReceiver',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'connectSchain',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address[]',
          name: 'schainContracts',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'contractManagerOfSkaleManager',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'disconnectSchain',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'getRoleAdmin',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
      ],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getRoleMember',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'uint256',
          name: 'index',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getRoleMemberCount',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'grantRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'hasMainnetContract',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'mainnetContract',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'hasRole',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'hasSchain',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: 'connected',
        },
      ],
    },
    {
      type: 'function',
      name: 'hasSchainContract',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractManagerOfSkaleManagerValue',
        },
        {
          type: 'address',
          name: 'messageProxyValue',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'newContractManagerOfSkaleManager',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'isAgentAuthorized',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'sender',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'isNotKilled',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'isSchainOwner',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'sender',
        },
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'kill',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'messageProxy',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'registerMainnetContract',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'newMainnetContract',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'removeMainnetContract',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'mainnetContract',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'removeSchainContract',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'renounceRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'revokeRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'schainLinks',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'statuses',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'uint8',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'supportsInterface',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes4',
          name: 'interfaceId',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
  ],
  community_pool_address: '0x588801cA36558310D91234aFC2511502282b1621',
  community_pool_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'Initialized',
      inputs: [
        {
          type: 'uint8',
          name: 'version',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'MinTransactionGasWasChanged',
      inputs: [
        {
          type: 'uint256',
          name: 'oldValue',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'newValue',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'MultiplierWasChanged',
      inputs: [
        {
          type: 'uint256',
          name: 'oldMultiplierNumerator',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'oldMultiplierDivider',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'newMultiplierNumerator',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'newMultiplierDivider',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleAdminChanged',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'bytes32',
          name: 'previousAdminRole',
          indexed: true,
        },
        {
          type: 'bytes32',
          name: 'newAdminRole',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleGranted',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'address',
          name: 'account',
          indexed: true,
        },
        {
          type: 'address',
          name: 'sender',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleRevoked',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'address',
          name: 'account',
          indexed: true,
        },
        {
          type: 'address',
          name: 'sender',
          indexed: true,
        },
      ],
    },
    {
      type: 'function',
      name: 'CONSTANT_SETTER_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'DEFAULT_ADMIN_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'LINKER_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'activeUsers',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: '',
        },
        {
          type: 'bytes32',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'addSchainContract',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'contractReceiver',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'checkUserBalance',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'receiver',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'contractManagerOfSkaleManager',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getBalance',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'user',
        },
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getRecommendedRechargeAmount',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'receiver',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getRoleAdmin',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
      ],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getRoleMember',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'uint256',
          name: 'index',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getRoleMemberCount',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'grantRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'hasRole',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'hasSchainContract',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractManagerOfSkaleManagerValue',
        },
        {
          type: 'address',
          name: 'newMessageProxy',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractManagerOfSkaleManagerValue',
        },
        {
          type: 'address',
          name: 'linker',
        },
        {
          type: 'address',
          name: 'messageProxyValue',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'newContractManagerOfSkaleManager',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'isAgentAuthorized',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'sender',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'isSchainOwner',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'sender',
        },
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'messageProxy',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'minTransactionGas',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'multiplierDivider',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'multiplierNumerator',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'rechargeUserWallet',
      constant: false,
      stateMutability: 'payable',
      payable: true,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'user',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'refundGasBySchainWallet',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'node',
        },
        {
          type: 'uint256',
          name: 'gas',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'refundGasByUser',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'node',
        },
        {
          type: 'address',
          name: 'user',
        },
        {
          type: 'uint256',
          name: 'gas',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'removeSchainContract',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'renounceRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'revokeRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'schainLinks',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'setMinTransactionGas',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'newMinTransactionGas',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setMultiplier',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'newMultiplierNumerator',
        },
        {
          type: 'uint256',
          name: 'newMultiplierDivider',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'supportsInterface',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes4',
          name: 'interfaceId',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'withdrawFunds',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'uint256',
          name: 'amount',
        },
      ],
      outputs: [],
    },
  ],
  deposit_box_eth_address: '0x49F583d263e4Ef938b9E09772D3394c71605Df94',
  deposit_box_eth_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'ActiveEthTransfers',
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
          indexed: true,
        },
        {
          type: 'bool',
          name: 'active',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'Initialized',
      inputs: [
        {
          type: 'uint8',
          name: 'version',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleAdminChanged',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'bytes32',
          name: 'previousAdminRole',
          indexed: true,
        },
        {
          type: 'bytes32',
          name: 'newAdminRole',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleGranted',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'address',
          name: 'account',
          indexed: true,
        },
        {
          type: 'address',
          name: 'sender',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleRevoked',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'address',
          name: 'account',
          indexed: true,
        },
        {
          type: 'address',
          name: 'sender',
          indexed: true,
        },
      ],
    },
    {
      type: 'function',
      name: 'DEFAULT_ADMIN_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'DEPOSIT_BOX_MANAGER_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'LINKER_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'activeEthTransfers',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'addSchainContract',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'contractReceiver',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'approveTransfers',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'contractManagerOfSkaleManager',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'deposit',
      constant: false,
      stateMutability: 'payable',
      payable: true,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'depositDirect',
      constant: false,
      stateMutability: 'payable',
      payable: true,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'receiver',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'disableActiveEthTransfers',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'disableWhitelist',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'enableActiveEthTransfers',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'enableWhitelist',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'gasPayer',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'sender',
        },
        {
          type: 'bytes',
          name: 'data',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getFunds',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'receiver',
        },
        {
          type: 'uint256',
          name: 'amount',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'getMyEth',
      constant: false,
      payable: false,
      inputs: [],
      outputs: [],
    },
    {
      type: 'function',
      name: 'getRoleAdmin',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
      ],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getRoleMember',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'uint256',
          name: 'index',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getRoleMemberCount',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'grantRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'hasRole',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'hasSchainContract',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractManagerOfSkaleManagerValue',
        },
        {
          type: 'address',
          name: 'newMessageProxy',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractManagerOfSkaleManagerValue',
        },
        {
          type: 'address',
          name: 'linkerValue',
        },
        {
          type: 'address',
          name: 'messageProxyValue',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'newContractManagerOfSkaleManager',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'isAgentAuthorized',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'sender',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'isSchainOwner',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'sender',
        },
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'isWhitelisted',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'linker',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'messageProxy',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'postMessage',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'sender',
        },
        {
          type: 'bytes',
          name: 'data',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'removeSchainContract',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'renounceRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'revokeRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'schainLinks',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'supportsInterface',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes4',
          name: 'interfaceId',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'transferredAmount',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
  ],
  deposit_box_erc20_address: '0x8fB1A35bB6fB9c47Fb5065BE5062cB8dC1687669',
  deposit_box_erc20_abi: [
    {
      type: 'error',
      name: 'Empty',
      inputs: [],
    },
    {
      type: 'error',
      name: 'OutOfBounds',
      inputs: [],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'ArbitrageDurationIsChanged',
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
          indexed: true,
        },
        {
          type: 'uint256',
          name: 'oldValue',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'newValue',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'BigTransferDelayIsChanged',
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
          indexed: true,
        },
        {
          type: 'uint256',
          name: 'oldValue',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'newValue',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'BigTransferThresholdIsChanged',
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
          indexed: true,
        },
        {
          type: 'address',
          name: 'token',
          indexed: true,
        },
        {
          type: 'uint256',
          name: 'oldValue',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'newValue',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'ERC20TokenAdded',
      inputs: [
        {
          type: 'string',
          name: 'schainName',
          indexed: false,
        },
        {
          type: 'address',
          name: 'contractOnMainnet',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'ERC20TokenReady',
      inputs: [
        {
          type: 'address',
          name: 'contractOnMainnet',
          indexed: true,
        },
        {
          type: 'uint256',
          name: 'amount',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'Escalated',
      inputs: [
        {
          type: 'uint256',
          name: 'id',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'Initialized',
      inputs: [
        {
          type: 'uint8',
          name: 'version',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleAdminChanged',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'bytes32',
          name: 'previousAdminRole',
          indexed: true,
        },
        {
          type: 'bytes32',
          name: 'newAdminRole',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleGranted',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'address',
          name: 'account',
          indexed: true,
        },
        {
          type: 'address',
          name: 'sender',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleRevoked',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'address',
          name: 'account',
          indexed: true,
        },
        {
          type: 'address',
          name: 'sender',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'TransferDelayed',
      inputs: [
        {
          type: 'uint256',
          name: 'id',
          indexed: false,
        },
        {
          type: 'address',
          name: 'receiver',
          indexed: false,
        },
        {
          type: 'address',
          name: 'token',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'amount',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'TransferSkipped',
      inputs: [
        {
          type: 'uint256',
          name: 'id',
          indexed: false,
        },
      ],
    },
    {
      type: 'function',
      name: 'ARBITER_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'DEFAULT_ADMIN_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'DEPOSIT_BOX_MANAGER_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'LINKER_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'addERC20TokenByOwner',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc20OnMainnet',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'addSchainContract',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'contractReceiver',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'contractManagerOfSkaleManager',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'delayedTransfers',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: 'receiver',
        },
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'token',
        },
        {
          type: 'uint256',
          name: 'amount',
        },
        {
          type: 'uint256',
          name: 'untilTimestamp',
        },
        {
          type: 'uint8',
          name: 'status',
        },
      ],
    },
    {
      type: 'function',
      name: 'delayedTransfersByReceiver',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'int128',
          name: '_begin',
        },
        {
          type: 'int128',
          name: '_end',
        },
      ],
    },
    {
      type: 'function',
      name: 'delayedTransfersSize',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'depositERC20',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc20OnMainnet',
        },
        {
          type: 'uint256',
          name: 'amount',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'depositERC20Direct',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc20OnMainnet',
        },
        {
          type: 'uint256',
          name: 'amount',
        },
        {
          type: 'address',
          name: 'receiver',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'disableWhitelist',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'doTransfer',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'token',
        },
        {
          type: 'address',
          name: 'receiver',
        },
        {
          type: 'uint256',
          name: 'amount',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'enableWhitelist',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'escalate',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'transferId',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'gasPayer',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'sender',
        },
        {
          type: 'bytes',
          name: 'data',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getArbitrageDuration',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getBigTransferThreshold',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'token',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getDelayedAmount',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'receiver',
        },
        {
          type: 'address',
          name: 'token',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'value',
        },
      ],
    },
    {
      type: 'function',
      name: 'getFunds',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc20OnMainnet',
        },
        {
          type: 'address',
          name: 'receiver',
        },
        {
          type: 'uint256',
          name: 'amount',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'getNextUnlockTimestamp',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'receiver',
        },
        {
          type: 'address',
          name: 'token',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'unlockTimestamp',
        },
      ],
    },
    {
      type: 'function',
      name: 'getRoleAdmin',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
      ],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getRoleMember',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'uint256',
          name: 'index',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getRoleMemberCount',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getSchainToAllERC20',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'uint256',
          name: 'from',
        },
        {
          type: 'uint256',
          name: 'to',
        },
      ],
      outputs: [
        {
          type: 'address[]',
          name: 'tokensInRange',
        },
      ],
    },
    {
      type: 'function',
      name: 'getSchainToAllERC20Length',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getSchainToERC20',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc20OnMainnet',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getTimeDelay',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getTrustedReceiver',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'uint256',
          name: 'index',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getTrustedReceiversAmount',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'grantRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'hasRole',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'hasSchainContract',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractManagerOfSkaleManagerValue',
        },
        {
          type: 'address',
          name: 'newMessageProxy',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractManagerOfSkaleManagerValue',
        },
        {
          type: 'address',
          name: 'linkerValue',
        },
        {
          type: 'address',
          name: 'messageProxyValue',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'newContractManagerOfSkaleManager',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'isAgentAuthorized',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'sender',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'isReceiverTrusted',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'receiver',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'isSchainOwner',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'sender',
        },
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'isWhitelisted',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'linker',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'messageProxy',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'postMessage',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'sender',
        },
        {
          type: 'bytes',
          name: 'data',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'rejectTransfer',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'transferId',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'removeSchainContract',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'renounceRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'retrieve',
      constant: false,
      payable: false,
      inputs: [],
      outputs: [],
    },
    {
      type: 'function',
      name: 'retrieveFor',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'receiver',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'revokeRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'schainLinks',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'setArbitrageDuration',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'uint256',
          name: 'delayInSeconds',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setBigTransferDelay',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'uint256',
          name: 'delayInSeconds',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setBigTransferValue',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'token',
        },
        {
          type: 'uint256',
          name: 'value',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'stopTrustingReceiver',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'receiver',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'supportsInterface',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes4',
          name: 'interfaceId',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'transferredAmount',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: '',
        },
        {
          type: 'address',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'trustReceiver',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'receiver',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'validateTransfer',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'transferId',
        },
      ],
      outputs: [],
    },
  ],
  deposit_box_erc721_address: '0x7343d31eb99Fd31424bcca9f0a7EAFBc1F515f2d',
  deposit_box_erc721_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'ERC721TokenAdded',
      inputs: [
        {
          type: 'string',
          name: 'schainName',
          indexed: false,
        },
        {
          type: 'address',
          name: 'contractOnMainnet',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'ERC721TokenReady',
      inputs: [
        {
          type: 'address',
          name: 'contractOnMainnet',
          indexed: true,
        },
        {
          type: 'uint256',
          name: 'tokenId',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'Initialized',
      inputs: [
        {
          type: 'uint8',
          name: 'version',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleAdminChanged',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'bytes32',
          name: 'previousAdminRole',
          indexed: true,
        },
        {
          type: 'bytes32',
          name: 'newAdminRole',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleGranted',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'address',
          name: 'account',
          indexed: true,
        },
        {
          type: 'address',
          name: 'sender',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleRevoked',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'address',
          name: 'account',
          indexed: true,
        },
        {
          type: 'address',
          name: 'sender',
          indexed: true,
        },
      ],
    },
    {
      type: 'function',
      name: 'DEFAULT_ADMIN_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'DEPOSIT_BOX_MANAGER_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'LINKER_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'addERC721TokenByOwner',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc721OnMainnet',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'addSchainContract',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'contractReceiver',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'contractManagerOfSkaleManager',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'depositERC721',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc721OnMainnet',
        },
        {
          type: 'uint256',
          name: 'tokenId',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'depositERC721Direct',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc721OnMainnet',
        },
        {
          type: 'uint256',
          name: 'tokenId',
        },
        {
          type: 'address',
          name: 'receiver',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'disableWhitelist',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'enableWhitelist',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'gasPayer',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'sender',
        },
        {
          type: 'bytes',
          name: 'data',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getFunds',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc721OnMainnet',
        },
        {
          type: 'address',
          name: 'receiver',
        },
        {
          type: 'uint256',
          name: 'tokenId',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'getRoleAdmin',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
      ],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getRoleMember',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'uint256',
          name: 'index',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getRoleMemberCount',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getSchainToAllERC721',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'uint256',
          name: 'from',
        },
        {
          type: 'uint256',
          name: 'to',
        },
      ],
      outputs: [
        {
          type: 'address[]',
          name: 'tokensInRange',
        },
      ],
    },
    {
      type: 'function',
      name: 'getSchainToAllERC721Length',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getSchainToERC721',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc721OnMainnet',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'grantRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'hasRole',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'hasSchainContract',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractManagerOfSkaleManagerValue',
        },
        {
          type: 'address',
          name: 'newMessageProxy',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractManagerOfSkaleManagerValue',
        },
        {
          type: 'address',
          name: 'linkerValue',
        },
        {
          type: 'address',
          name: 'messageProxyValue',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'newContractManagerOfSkaleManager',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'isAgentAuthorized',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'sender',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'isSchainOwner',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'sender',
        },
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'isWhitelisted',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'linker',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'messageProxy',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'postMessage',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'sender',
        },
        {
          type: 'bytes',
          name: 'data',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'removeSchainContract',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'renounceRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'revokeRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'schainLinks',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'supportsInterface',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes4',
          name: 'interfaceId',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'transferredAmount',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: '',
        },
        {
          type: 'uint256',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
  ],
  deposit_box_erc1155_address: '0x3C02FdEe8E05B6dc4d44a6555b3ff5762D03871a',
  deposit_box_erc1155_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'ERC1155TokenAdded',
      inputs: [
        {
          type: 'string',
          name: 'schainName',
          indexed: false,
        },
        {
          type: 'address',
          name: 'contractOnMainnet',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'ERC1155TokenReady',
      inputs: [
        {
          type: 'address',
          name: 'contractOnMainnet',
          indexed: true,
        },
        {
          type: 'uint256[]',
          name: 'ids',
          indexed: false,
        },
        {
          type: 'uint256[]',
          name: 'amounts',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'Initialized',
      inputs: [
        {
          type: 'uint8',
          name: 'version',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleAdminChanged',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'bytes32',
          name: 'previousAdminRole',
          indexed: true,
        },
        {
          type: 'bytes32',
          name: 'newAdminRole',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleGranted',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'address',
          name: 'account',
          indexed: true,
        },
        {
          type: 'address',
          name: 'sender',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleRevoked',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'address',
          name: 'account',
          indexed: true,
        },
        {
          type: 'address',
          name: 'sender',
          indexed: true,
        },
      ],
    },
    {
      type: 'function',
      name: 'DEFAULT_ADMIN_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'DEPOSIT_BOX_MANAGER_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'LINKER_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'addERC1155TokenByOwner',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc1155OnMainnet',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'addSchainContract',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'contractReceiver',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'contractManagerOfSkaleManager',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'depositERC1155',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc1155OnMainnet',
        },
        {
          type: 'uint256',
          name: 'id',
        },
        {
          type: 'uint256',
          name: 'amount',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'depositERC1155Batch',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc1155OnMainnet',
        },
        {
          type: 'uint256[]',
          name: 'ids',
        },
        {
          type: 'uint256[]',
          name: 'amounts',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'depositERC1155BatchDirect',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc1155OnMainnet',
        },
        {
          type: 'uint256[]',
          name: 'ids',
        },
        {
          type: 'uint256[]',
          name: 'amounts',
        },
        {
          type: 'address',
          name: 'receiver',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'depositERC1155Direct',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc1155OnMainnet',
        },
        {
          type: 'uint256',
          name: 'id',
        },
        {
          type: 'uint256',
          name: 'amount',
        },
        {
          type: 'address',
          name: 'receiver',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'disableWhitelist',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'enableWhitelist',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'gasPayer',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'sender',
        },
        {
          type: 'bytes',
          name: 'data',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getFunds',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc1155OnMainnet',
        },
        {
          type: 'address',
          name: 'receiver',
        },
        {
          type: 'uint256[]',
          name: 'ids',
        },
        {
          type: 'uint256[]',
          name: 'amounts',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'getRoleAdmin',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
      ],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getRoleMember',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'uint256',
          name: 'index',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getRoleMemberCount',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getSchainToAllERC1155',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'uint256',
          name: 'from',
        },
        {
          type: 'uint256',
          name: 'to',
        },
      ],
      outputs: [
        {
          type: 'address[]',
          name: 'tokensInRange',
        },
      ],
    },
    {
      type: 'function',
      name: 'getSchainToAllERC1155Length',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getSchainToERC1155',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc1155OnMainnet',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'grantRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'hasRole',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'hasSchainContract',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractManagerOfSkaleManagerValue',
        },
        {
          type: 'address',
          name: 'newMessageProxy',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractManagerOfSkaleManagerValue',
        },
        {
          type: 'address',
          name: 'linkerValue',
        },
        {
          type: 'address',
          name: 'messageProxyValue',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'newContractManagerOfSkaleManager',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'isAgentAuthorized',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'sender',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'isSchainOwner',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'sender',
        },
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'isWhitelisted',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'linker',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'messageProxy',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'onERC1155BatchReceived',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'operator',
        },
        {
          type: 'address',
          name: '',
        },
        {
          type: 'uint256[]',
          name: '',
        },
        {
          type: 'uint256[]',
          name: '',
        },
        {
          type: 'bytes',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'bytes4',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'onERC1155Received',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'operator',
        },
        {
          type: 'address',
          name: '',
        },
        {
          type: 'uint256',
          name: '',
        },
        {
          type: 'uint256',
          name: '',
        },
        {
          type: 'bytes',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'bytes4',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'postMessage',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'sender',
        },
        {
          type: 'bytes',
          name: 'data',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'removeSchainContract',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'renounceRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'revokeRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'schainLinks',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'supportsInterface',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes4',
          name: 'interfaceId',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'transferredAmount',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: '',
        },
        {
          type: 'address',
          name: '',
        },
        {
          type: 'uint256',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
  ],
  deposit_box_erc721_with_metadata_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'ERC721TokenAdded',
      inputs: [
        {
          type: 'string',
          name: 'schainName',
          indexed: false,
        },
        {
          type: 'address',
          name: 'contractOnMainnet',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'ERC721TokenReady',
      inputs: [
        {
          type: 'address',
          name: 'contractOnMainnet',
          indexed: true,
        },
        {
          type: 'uint256',
          name: 'tokenId',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'Initialized',
      inputs: [
        {
          type: 'uint8',
          name: 'version',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleAdminChanged',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'bytes32',
          name: 'previousAdminRole',
          indexed: true,
        },
        {
          type: 'bytes32',
          name: 'newAdminRole',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleGranted',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'address',
          name: 'account',
          indexed: true,
        },
        {
          type: 'address',
          name: 'sender',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RoleRevoked',
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
          indexed: true,
        },
        {
          type: 'address',
          name: 'account',
          indexed: true,
        },
        {
          type: 'address',
          name: 'sender',
          indexed: true,
        },
      ],
    },
    {
      type: 'function',
      name: 'DEFAULT_ADMIN_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'DEPOSIT_BOX_MANAGER_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'LINKER_ROLE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'addERC721TokenByOwner',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc721OnMainnet',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'addSchainContract',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'contractReceiver',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'contractManagerOfSkaleManager',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'depositERC721',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc721OnMainnet',
        },
        {
          type: 'uint256',
          name: 'tokenId',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'depositERC721Direct',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc721OnMainnet',
        },
        {
          type: 'uint256',
          name: 'tokenId',
        },
        {
          type: 'address',
          name: 'receiver',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'disableWhitelist',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'enableWhitelist',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'gasPayer',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'sender',
        },
        {
          type: 'bytes',
          name: 'data',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getFunds',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc721OnMainnet',
        },
        {
          type: 'address',
          name: 'receiver',
        },
        {
          type: 'uint256',
          name: 'tokenId',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'getRoleAdmin',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
      ],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getRoleMember',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'uint256',
          name: 'index',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getRoleMemberCount',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getSchainToAllERC721',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'uint256',
          name: 'from',
        },
        {
          type: 'uint256',
          name: 'to',
        },
      ],
      outputs: [
        {
          type: 'address[]',
          name: 'tokensInRange',
        },
      ],
    },
    {
      type: 'function',
      name: 'getSchainToAllERC721Length',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getSchainToERC721',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
        {
          type: 'address',
          name: 'erc721OnMainnet',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'grantRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'hasRole',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'hasSchainContract',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractManagerOfSkaleManagerValue',
        },
        {
          type: 'address',
          name: 'newMessageProxy',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractManagerOfSkaleManagerValue',
        },
        {
          type: 'address',
          name: 'linkerValue',
        },
        {
          type: 'address',
          name: 'messageProxyValue',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'newContractManagerOfSkaleManager',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'isAgentAuthorized',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'sender',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'isSchainOwner',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'sender',
        },
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'isWhitelisted',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'linker',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'messageProxy',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'postMessage',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'sender',
        },
        {
          type: 'bytes',
          name: 'data',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'removeSchainContract',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'schainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'renounceRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'revokeRole',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'role',
        },
        {
          type: 'address',
          name: 'account',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'schainLinks',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'supportsInterface',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes4',
          name: 'interfaceId',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'transferredAmount',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: '',
        },
        {
          type: 'uint256',
          name: '',
        },
      ],
      outputs: [
        {
          type: 'bytes32',
          name: '',
        },
      ],
    },
  ],
  deposit_box_erc721_with_metadata_address:
    '0x9f8196D864ee9476bF8DBE68aD07cc555d6B7986',
} as const;
