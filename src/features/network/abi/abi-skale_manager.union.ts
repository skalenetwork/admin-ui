export default {
  bounty_abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'RoleGranted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'RoleRevoked',
      type: 'event',
    },
    {
      inputs: [],
      name: 'BOUNTY',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'DEFAULT_ADMIN_ROLE',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'STAGE_LENGTH',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'YEAR1_BOUNTY',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'YEAR2_BOUNTY',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'YEAR3_BOUNTY',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'YEAR4_BOUNTY',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'YEAR5_BOUNTY',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'YEAR6_BOUNTY',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'bountyReduction',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'contractManager',
      outputs: [
        {
          internalType: 'contract ContractManager',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
      ],
      name: 'getRoleAdmin',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'uint256',
          name: 'index',
          type: 'uint256',
        },
      ],
      name: 'getRoleMember',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
      ],
      name: 'getRoleMemberCount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'grantRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'hasRole',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'renounceRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'revokeRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'nodeIndex',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'downtime',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'latency',
          type: 'uint256',
        },
      ],
      name: 'getBounty',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'enableBountyReduction',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'disableBountyReduction',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'nodeIndex',
          type: 'uint256',
        },
      ],
      name: 'calculateNormalBounty',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'contractManagerAddress',
          type: 'address',
        },
      ],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
  bounty_address: '0x9E50E47cC08535Ee61AE47aCFEA20abb1925Bd4C',
  bounty_v2_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'BountyReduction',
      inputs: [
        {
          type: 'bool',
          name: 'status',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'NodeCreationWindowWasChanged',
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
      name: 'BOUNTY_REDUCTION_MANAGER_ROLE',
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
      name: 'BOUNTY_WINDOW_SECONDS',
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
      name: 'EPOCHS_PER_YEAR',
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
      name: 'SECONDS_PER_DAY',
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
      name: 'YEAR1_BOUNTY',
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
      name: 'YEAR2_BOUNTY',
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
      name: 'YEAR3_BOUNTY',
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
      name: 'YEAR4_BOUNTY',
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
      name: 'YEAR5_BOUNTY',
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
      name: 'YEAR6_BOUNTY',
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
      name: 'bountyReduction',
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
      name: 'calculateBounty',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'contractManager',
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
      name: 'disableBountyReduction',
      constant: false,
      payable: false,
      inputs: [],
      outputs: [],
    },
    {
      type: 'function',
      name: 'enableBountyReduction',
      constant: false,
      payable: false,
      inputs: [],
      outputs: [],
    },
    {
      type: 'function',
      name: 'estimateBounty',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'getEffectiveDelegatedSum',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint256[]',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getNextRewardTimestamp',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'handleDelegationAdd',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'amount',
        },
        {
          type: 'uint256',
          name: 'month',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'handleDelegationRemoving',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'amount',
        },
        {
          type: 'uint256',
          name: 'month',
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
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractManagerAddress',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'nodeCreationWindowSeconds',
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
      name: 'nodesByValidator',
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
          type: 'uint256',
          name: '',
        },
      ],
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
      name: 'setNodeCreationWindowSeconds',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'window',
        },
      ],
      outputs: [],
    },
  ],
  bounty_v2_address: '0x801BA194f775a6CB0B5759FdDCe6A35e401787BF',
  constants_holder_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'ConstantUpdated',
      inputs: [
        {
          type: 'bytes32',
          name: 'constantHash',
          indexed: true,
        },
        {
          type: 'uint256',
          name: 'previousValue',
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
      name: 'ADJUSTMENT_SPEED',
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
      name: 'ALRIGHT_DELTA',
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
      name: 'BOUNTY_LOCKUP_MONTHS',
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
      name: 'BROADCAST_DELTA',
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
      name: 'COMPLAINT_BAD_DATA_DELTA',
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
      name: 'COMPLAINT_DELTA',
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
      name: 'CONSTANTS_HOLDER_MANAGER_ROLE',
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
      name: 'COOLDOWN_TIME',
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
      name: 'DOWNTIME_THRESHOLD_PART',
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
      name: 'LARGE_DIVISOR',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint8',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'MEDIUM_DIVISOR',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint8',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'MEDIUM_TEST_DIVISOR',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint8',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'MIN_PRICE',
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
      name: 'MSR_REDUCING_COEFFICIENT',
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
      name: 'NODE_DEPOSIT',
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
      name: 'NUMBER_OF_MONITORS',
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
      name: 'NUMBER_OF_NODES_FOR_MEDIUM_TEST_SCHAIN',
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
      name: 'NUMBER_OF_NODES_FOR_SCHAIN',
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
      name: 'NUMBER_OF_NODES_FOR_TEST_SCHAIN',
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
      name: 'OPTIMAL_LOAD_PERCENTAGE',
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
      name: 'PRE_RESPONSE_DELTA',
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
      name: 'RESPONSE_DELTA',
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
      name: 'SECONDS_TO_YEAR',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'SMALL_DIVISOR',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint8',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'TOTAL_SPACE_ON_NODE',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint8',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'allowableLatency',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'checkTime',
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
      name: 'complaintTimeLimit',
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
      name: 'contractManager',
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
      name: 'deltaPeriod',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'firstDelegationsMonth',
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
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractsAddress',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'launchTimestamp',
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
      name: 'limitValidatorsPerDelegator',
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
      name: 'minimalSchainLifetime',
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
      name: 'msr',
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
      name: 'proofOfUseDelegationPercentage',
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
      name: 'proofOfUseLockUpPeriodDays',
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
      name: 'rewardPeriod',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'rotationDelay',
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
      name: 'schainCreationTimeStamp',
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
      name: 'setCheckTime',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'newCheckTime',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setComplaintTimeLimit',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'timeLimit',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setLatency',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint32',
          name: 'newAllowableLatency',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setLaunchTimestamp',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'timestamp',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setLimitValidatorsPerDelegator',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'newLimit',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setMSR',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'newMSR',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setMinimalSchainLifetime',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'lifetime',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setPeriods',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint32',
          name: 'newRewardPeriod',
        },
        {
          type: 'uint32',
          name: 'newDeltaPeriod',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setProofOfUseDelegationPercentage',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'percentage',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setProofOfUseLockUpPeriod',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'periodDays',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setRotationDelay',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'newDelay',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setSchainCreationTimeStamp',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'timestamp',
        },
      ],
      outputs: [],
    },
  ],
  constants_holder_address: '0x3d30A62AceEB6720312c3318D28620194e749e38',
  contract_manager_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'ContractUpgraded',
      inputs: [
        {
          type: 'string',
          name: 'contractsName',
          indexed: false,
        },
        {
          type: 'address',
          name: 'contractsAddress',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'OwnershipTransferred',
      inputs: [
        {
          type: 'address',
          name: 'previousOwner',
          indexed: true,
        },
        {
          type: 'address',
          name: 'newOwner',
          indexed: true,
        },
      ],
    },
    {
      type: 'function',
      name: 'BOUNTY',
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
    {
      type: 'function',
      name: 'CONSTANTS_HOLDER',
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
    {
      type: 'function',
      name: 'DELEGATION_PERIOD_MANAGER',
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
    {
      type: 'function',
      name: 'PUNISHER',
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
    {
      type: 'function',
      name: 'SKALE_TOKEN',
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
    {
      type: 'function',
      name: 'TIME_HELPERS',
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
    {
      type: 'function',
      name: 'TOKEN_STATE',
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
    {
      type: 'function',
      name: 'VALIDATOR_SERVICE',
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
    {
      type: 'function',
      name: 'contracts',
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
      name: 'getBounty',
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
      name: 'getConstantsHolder',
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
      name: 'getContract',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'name',
        },
      ],
      outputs: [
        {
          type: 'address',
          name: 'contractAddress',
        },
      ],
    },
    {
      type: 'function',
      name: 'getDelegationPeriodManager',
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
      name: 'getPunisher',
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
      name: 'getSkaleToken',
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
      name: 'getTimeHelpers',
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
      name: 'getTokenState',
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
      name: 'getValidatorService',
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
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [],
      outputs: [],
    },
    {
      type: 'function',
      name: 'owner',
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
      name: 'renounceOwnership',
      constant: false,
      payable: false,
      inputs: [],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setContractsAddress',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'contractsName',
        },
        {
          type: 'address',
          name: 'newContractsAddress',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'transferOwnership',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'newOwner',
        },
      ],
      outputs: [],
    },
  ],
  contract_manager_address: '0xC04A10Fd5e6513242558f47331568aBD6185a310',
  decryption_abi: [
    {
      type: 'function',
      name: 'decrypt',
      constant: true,
      stateMutability: 'pure',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'cipherText',
        },
        {
          type: 'bytes32',
          name: 'key',
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
      name: 'encrypt',
      constant: true,
      stateMutability: 'pure',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'secretNumber',
        },
        {
          type: 'bytes32',
          name: 'key',
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
  decryption_address: '0x9257B149889A76c7A86BFfA5820f06FaBca3a9a1',
  delegation_controller_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'Confiscated',
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
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
      name: 'DelegationAccepted',
      inputs: [
        {
          type: 'uint256',
          name: 'delegationId',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'DelegationProposed',
      inputs: [
        {
          type: 'uint256',
          name: 'delegationId',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'DelegationRequestCanceledByUser',
      inputs: [
        {
          type: 'uint256',
          name: 'delegationId',
          indexed: false,
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
      name: 'SlashesProcessed',
      inputs: [
        {
          type: 'address',
          name: 'holder',
          indexed: true,
        },
        {
          type: 'uint256',
          name: 'limit',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'UndelegationRequested',
      inputs: [
        {
          type: 'uint256',
          name: 'delegationId',
          indexed: false,
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
      name: 'UNDELEGATION_PROHIBITION_WINDOW_SECONDS',
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
      name: 'acceptPendingDelegation',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'delegationId',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'cancelPendingDelegation',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'delegationId',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'confiscate',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
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
      name: 'contractManager',
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
      name: 'delegate',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
        {
          type: 'uint256',
          name: 'amount',
        },
        {
          type: 'uint256',
          name: 'delegationPeriod',
        },
        {
          type: 'string',
          name: 'info',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'delegations',
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
          name: 'holder',
        },
        {
          type: 'uint256',
          name: 'validatorId',
        },
        {
          type: 'uint256',
          name: 'amount',
        },
        {
          type: 'uint256',
          name: 'delegationPeriod',
        },
        {
          type: 'uint256',
          name: 'created',
        },
        {
          type: 'uint256',
          name: 'started',
        },
        {
          type: 'uint256',
          name: 'finished',
        },
        {
          type: 'string',
          name: 'info',
        },
      ],
    },
    {
      type: 'function',
      name: 'delegationsByHolder',
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
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'delegationsByValidator',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
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
    {
      type: 'function',
      name: 'getAndUpdateDelegatedAmount',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'holder',
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
      name: 'getAndUpdateDelegatedByHolderToValidatorNow',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'holder',
        },
        {
          type: 'uint256',
          name: 'validatorId',
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
      name: 'getAndUpdateDelegatedToValidatorNow',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
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
      name: 'getAndUpdateEffectiveDelegatedByHolderToValidator',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'holder',
        },
        {
          type: 'uint256',
          name: 'validatorId',
        },
        {
          type: 'uint256',
          name: 'month',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'effectiveDelegated',
        },
      ],
    },
    {
      type: 'function',
      name: 'getAndUpdateEffectiveDelegatedToValidator',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
        {
          type: 'uint256',
          name: 'month',
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
      name: 'getAndUpdateForbiddenForDelegationAmount',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'wallet',
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
      name: 'getAndUpdateLockedAmount',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'wallet',
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
      name: 'getDelegatedToValidator',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
        {
          type: 'uint256',
          name: 'month',
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
      name: 'getDelegation',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'delegationId',
        },
      ],
      outputs: [
        {
          type: 'tuple',
          components: [
            {
              type: 'address',
              name: 'holder',
            },
            {
              type: 'uint256',
              name: 'validatorId',
            },
            {
              type: 'uint256',
              name: 'amount',
            },
            {
              type: 'uint256',
              name: 'delegationPeriod',
            },
            {
              type: 'uint256',
              name: 'created',
            },
            {
              type: 'uint256',
              name: 'started',
            },
            {
              type: 'uint256',
              name: 'finished',
            },
            {
              type: 'string',
              name: 'info',
            },
          ],
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getDelegationsByHolderLength',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'holder',
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
      name: 'getDelegationsByValidatorLength',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
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
      name: 'getEffectiveDelegatedToValidator',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
        {
          type: 'uint256',
          name: 'month',
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
      name: 'getEffectiveDelegatedValuesByValidator',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
      ],
      outputs: [
        {
          type: 'uint256[]',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getFirstDelegationMonth',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'holder',
        },
        {
          type: 'uint256',
          name: 'validatorId',
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
      name: 'getLockedInPendingDelegations',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'holder',
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
      name: 'getState',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'delegationId',
        },
      ],
      outputs: [
        {
          type: 'uint8',
          name: 'state',
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
      name: 'hasUnprocessedSlashes',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'holder',
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
          name: 'contractsAddress',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'processAllSlashes',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'holder',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'processSlashes',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'holder',
        },
        {
          type: 'uint256',
          name: 'limit',
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
      name: 'requestUndelegation',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'delegationId',
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
  ],
  delegation_controller_address: '0x06dD71dAb27C1A3e0B172d53735f00Bf1a66Eb79',
  delegation_period_manager_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'DelegationPeriodWasSet',
      inputs: [
        {
          type: 'uint256',
          name: 'length',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'stakeMultiplier',
          indexed: false,
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
      name: 'DELEGATION_PERIOD_SETTER_ROLE',
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
      name: 'contractManager',
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
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractsAddress',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'isDelegationPeriodAllowed',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'monthsCount',
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
      name: 'setDelegationPeriod',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'monthsCount',
        },
        {
          type: 'uint256',
          name: 'stakeMultiplier',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'stakeMultipliers',
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
          type: 'uint256',
          name: '',
        },
      ],
    },
  ],
  delegation_period_manager_address:
    '0x54a663E39621D2E644F6B9b6966CDf66db973ab3',
  distributor_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'BountyWasPaid',
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
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
      name: 'WithdrawBounty',
      inputs: [
        {
          type: 'address',
          name: 'holder',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'validatorId',
          indexed: false,
        },
        {
          type: 'address',
          name: 'destination',
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
      name: 'WithdrawFee',
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
          indexed: false,
        },
        {
          type: 'address',
          name: 'destination',
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
      name: 'contractManager',
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
      name: 'getAndUpdateEarnedBountyAmount',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'earned',
        },
        {
          type: 'uint256',
          name: 'endMonth',
        },
      ],
    },
    {
      type: 'function',
      name: 'getAndUpdateEarnedBountyAmountOf',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'wallet',
        },
        {
          type: 'uint256',
          name: 'validatorId',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'earned',
        },
        {
          type: 'uint256',
          name: 'endMonth',
        },
      ],
    },
    {
      type: 'function',
      name: 'getEarnedFeeAmount',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint256',
          name: 'earned',
        },
        {
          type: 'uint256',
          name: 'endMonth',
        },
      ],
    },
    {
      type: 'function',
      name: 'getEarnedFeeAmountOf',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'earned',
        },
        {
          type: 'uint256',
          name: 'endMonth',
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
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractsAddress',
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
      name: 'tokensReceived',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: '',
        },
        {
          type: 'address',
          name: '',
        },
        {
          type: 'address',
          name: 'to',
        },
        {
          type: 'uint256',
          name: 'amount',
        },
        {
          type: 'bytes',
          name: 'userData',
        },
        {
          type: 'bytes',
          name: '',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'withdrawBounty',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
        {
          type: 'address',
          name: 'to',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'withdrawFee',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'to',
        },
      ],
      outputs: [],
    },
  ],
  distributor_address: '0x2a42Ccca55FdE8a9CA2D7f3C66fcddE99B4baB90',
  e_c_d_h_abi: [
    {
      type: 'function',
      name: 'deriveKey',
      constant: true,
      stateMutability: 'pure',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'privKey',
        },
        {
          type: 'uint256',
          name: 'pubX',
        },
        {
          type: 'uint256',
          name: 'pubY',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'qx',
        },
        {
          type: 'uint256',
          name: 'qy',
        },
      ],
    },
    {
      type: 'function',
      name: 'ecAdd',
      constant: true,
      stateMutability: 'pure',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'x1',
        },
        {
          type: 'uint256',
          name: 'y1',
        },
        {
          type: 'uint256',
          name: 'z1',
        },
        {
          type: 'uint256',
          name: 'x2',
        },
        {
          type: 'uint256',
          name: 'y2',
        },
        {
          type: 'uint256',
          name: 'z2',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'x3',
        },
        {
          type: 'uint256',
          name: 'y3',
        },
        {
          type: 'uint256',
          name: 'z3',
        },
      ],
    },
    {
      type: 'function',
      name: 'ecDouble',
      constant: true,
      stateMutability: 'pure',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'x1',
        },
        {
          type: 'uint256',
          name: 'y1',
        },
        {
          type: 'uint256',
          name: 'z1',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'x3',
        },
        {
          type: 'uint256',
          name: 'y3',
        },
        {
          type: 'uint256',
          name: 'z3',
        },
      ],
    },
    {
      type: 'function',
      name: 'ecMul',
      constant: true,
      stateMutability: 'pure',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'd',
        },
        {
          type: 'uint256',
          name: 'x1',
        },
        {
          type: 'uint256',
          name: 'y1',
        },
        {
          type: 'uint256',
          name: 'z1',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'x3',
        },
        {
          type: 'uint256',
          name: 'y3',
        },
        {
          type: 'uint256',
          name: 'z3',
        },
      ],
    },
    {
      type: 'function',
      name: 'inverse',
      constant: true,
      stateMutability: 'pure',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'a',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'invA',
        },
      ],
    },
    {
      type: 'function',
      name: 'jAdd',
      constant: true,
      stateMutability: 'pure',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'x1',
        },
        {
          type: 'uint256',
          name: 'z1',
        },
        {
          type: 'uint256',
          name: 'x2',
        },
        {
          type: 'uint256',
          name: 'z2',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'x3',
        },
        {
          type: 'uint256',
          name: 'z3',
        },
      ],
    },
    {
      type: 'function',
      name: 'jDiv',
      constant: true,
      stateMutability: 'pure',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'x1',
        },
        {
          type: 'uint256',
          name: 'z1',
        },
        {
          type: 'uint256',
          name: 'x2',
        },
        {
          type: 'uint256',
          name: 'z2',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'x3',
        },
        {
          type: 'uint256',
          name: 'z3',
        },
      ],
    },
    {
      type: 'function',
      name: 'jMul',
      constant: true,
      stateMutability: 'pure',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'x1',
        },
        {
          type: 'uint256',
          name: 'z1',
        },
        {
          type: 'uint256',
          name: 'x2',
        },
        {
          type: 'uint256',
          name: 'z2',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'x3',
        },
        {
          type: 'uint256',
          name: 'z3',
        },
      ],
    },
    {
      type: 'function',
      name: 'jSub',
      constant: true,
      stateMutability: 'pure',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'x1',
        },
        {
          type: 'uint256',
          name: 'z1',
        },
        {
          type: 'uint256',
          name: 'x2',
        },
        {
          type: 'uint256',
          name: 'z2',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'x3',
        },
        {
          type: 'uint256',
          name: 'z3',
        },
      ],
    },
    {
      type: 'function',
      name: 'publicKey',
      constant: true,
      stateMutability: 'pure',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'privKey',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'qx',
        },
        {
          type: 'uint256',
          name: 'qy',
        },
      ],
    },
  ],
  e_c_d_h_address: '0x1A77D7617f919e20F8E0fA98A292DEAF1072b77E',
  key_storage_abi: [
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
      name: 'adding',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'tuple',
          name: 'value',
          components: [
            {
              type: 'tuple',
              name: 'x',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
            {
              type: 'tuple',
              name: 'y',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
          ],
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'contractManager',
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
      name: 'deleteKey',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'finalizePublicKey',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'getAllPreviousPublicKeys',
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
          type: 'tuple[]',
          components: [
            {
              type: 'tuple',
              name: 'x',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
            {
              type: 'tuple',
              name: 'y',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
          ],
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getCommonPublicKey',
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
          type: 'tuple',
          components: [
            {
              type: 'tuple',
              name: 'x',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
            {
              type: 'tuple',
              name: 'y',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
          ],
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getPreviousPublicKey',
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
          type: 'tuple',
          components: [
            {
              type: 'tuple',
              name: 'x',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
            {
              type: 'tuple',
              name: 'y',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
          ],
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
      name: 'initPublicKeyInProgress',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
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
          name: 'contractsAddress',
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
  ],
  key_storage_address: '0x921a97c815E4E7508D1aD639b56A21E942a3a152',
  monitors_abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'forNodeIndex',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint32',
          name: 'averageDowntime',
          type: 'uint32',
        },
        {
          indexed: false,
          internalType: 'uint32',
          name: 'averageLatency',
          type: 'uint32',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'time',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'gasSpend',
          type: 'uint256',
        },
      ],
      name: 'MetricsCalculated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'nodeIndex',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'bytes32',
          name: 'monitorIndex',
          type: 'bytes32',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'numberOfMonitors',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256[]',
          name: 'nodesInGroup',
          type: 'uint256[]',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'time',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'gasSpend',
          type: 'uint256',
        },
      ],
      name: 'MonitorCreated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'bytes32',
          name: 'monitorIndex',
          type: 'bytes32',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'newNode',
          type: 'uint256',
        },
      ],
      name: 'MonitorRotated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'rewardPeriod',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'deltaPeriod',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'time',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'gasSpend',
          type: 'uint256',
        },
      ],
      name: 'PeriodsSet',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'RoleGranted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'RoleRevoked',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'uint256',
          name: 'fromMonitorIndex',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'uint256',
          name: 'toNodeIndex',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint32',
          name: 'downtime',
          type: 'uint32',
        },
        {
          indexed: false,
          internalType: 'uint32',
          name: 'latency',
          type: 'uint32',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'status',
          type: 'bool',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'previousBlockEvent',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'time',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'gasSpend',
          type: 'uint256',
        },
      ],
      name: 'VerdictSent',
      type: 'event',
    },
    {
      inputs: [],
      name: 'DEFAULT_ADMIN_ROLE',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'checkedNodes',
      outputs: [
        {
          internalType: 'uint256',
          name: 'nodeIndex',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'time',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'contractManager',
      outputs: [
        {
          internalType: 'contract ContractManager',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
      ],
      name: 'getRoleAdmin',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'uint256',
          name: 'index',
          type: 'uint256',
        },
      ],
      name: 'getRoleMember',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
      ],
      name: 'getRoleMemberCount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'grantRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'groupsForMonitors',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'hasRole',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      name: 'lastBountyBlocks',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      name: 'lastVerdictBlocks',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'renounceRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'revokeRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      name: 'verdicts',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'nodeIndex',
          type: 'uint256',
        },
      ],
      name: 'addMonitor',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'nodeIndex',
          type: 'uint256',
        },
      ],
      name: 'deleteMonitor',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'nodeIndex',
          type: 'uint256',
        },
      ],
      name: 'removeCheckedNodes',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'fromMonitorIndex',
          type: 'uint256',
        },
        {
          components: [
            {
              internalType: 'uint256',
              name: 'toNodeIndex',
              type: 'uint256',
            },
            {
              internalType: 'uint32',
              name: 'downtime',
              type: 'uint32',
            },
            {
              internalType: 'uint32',
              name: 'latency',
              type: 'uint32',
            },
          ],
          internalType: 'struct Monitors.Verdict',
          name: 'verdict',
          type: 'tuple',
        },
      ],
      name: 'sendVerdict',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'nodeIndex',
          type: 'uint256',
        },
      ],
      name: 'calculateMetrics',
      outputs: [
        {
          internalType: 'uint256',
          name: 'averageDowntime',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'averageLatency',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'nodeIndex',
          type: 'uint256',
        },
      ],
      name: 'setLastBountyBlock',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'monitorIndex',
          type: 'bytes32',
        },
      ],
      name: 'getCheckedArray',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'nodeIndex',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'time',
              type: 'uint256',
            },
            {
              internalType: 'bytes4',
              name: 'ip',
              type: 'bytes4',
            },
          ],
          internalType: 'struct Monitors.CheckedNodeWithIp[]',
          name: 'checkedNodesWithIp',
          type: 'tuple[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'nodeIndex',
          type: 'uint256',
        },
      ],
      name: 'getLastBountyBlock',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'monitorIndex',
          type: 'bytes32',
        },
      ],
      name: 'getNodesInGroup',
      outputs: [
        {
          internalType: 'uint256[]',
          name: '',
          type: 'uint256[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'monitorIndex',
          type: 'bytes32',
        },
      ],
      name: 'getNumberOfNodesInGroup',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newContractsAddress',
          type: 'address',
        },
      ],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'monitorIndex',
          type: 'bytes32',
        },
        {
          components: [
            {
              internalType: 'uint256',
              name: 'nodeIndex',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'time',
              type: 'uint256',
            },
          ],
          internalType: 'struct Monitors.CheckedNode',
          name: 'checkedNode',
          type: 'tuple',
        },
      ],
      name: 'addCheckedNode',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'nodeIndex',
          type: 'uint256',
        },
      ],
      name: 'getLastReceivedVerdictBlock',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'monitorIndex',
          type: 'bytes32',
        },
      ],
      name: 'getLengthOfMetrics',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ],
  monitors_address: '0xa801F37136A1588075069D9988D4dc2D5167f7b7',
  node_rotation_abi: [
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
      name: 'RotationDelaySkipped',
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
          indexed: true,
        },
      ],
    },
    {
      type: 'function',
      name: 'DEBUGGER_ROLE',
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
      name: 'contractManager',
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
      name: 'exitFromSchain',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [
        {
          type: 'bool',
          name: '',
        },
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'freezeSchains',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'getLeavingHistory',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [
        {
          type: 'tuple[]',
          components: [
            {
              type: 'bytes32',
              name: 'schainHash',
            },
            {
              type: 'uint256',
              name: 'finishedRotation',
            },
          ],
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getPreviousNode',
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
          name: 'nodeIndex',
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
      name: 'getRotation',
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
          type: 'tuple',
          components: [
            {
              type: 'uint256',
              name: 'nodeIndex',
            },
            {
              type: 'uint256',
              name: 'newNodeIndex',
            },
            {
              type: 'uint256',
              name: 'freezeUntil',
            },
            {
              type: 'uint256',
              name: 'rotationCounter',
            },
          ],
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
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'newContractsAddress',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'isNewNodeFound',
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
      name: 'isRotationInProgress',
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
      name: 'leavingHistory',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
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
          name: 'schainHash',
        },
        {
          type: 'uint256',
          name: 'finishedRotation',
        },
      ],
    },
    {
      type: 'function',
      name: 'removeRotation',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
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
      name: 'rotateNode',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'bool',
          name: 'shouldDelay',
        },
        {
          type: 'bool',
          name: 'isBadNode',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'newNode',
        },
      ],
    },
    {
      type: 'function',
      name: 'selectNodeToGroup',
      constant: false,
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
          name: 'nodeIndex',
        },
      ],
    },
    {
      type: 'function',
      name: 'skipRotationDelay',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'waitForNewNode',
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
  ],
  node_rotation_address: '0xEC4EA4802Cb323645B87441AEB5622c800d72CCd',
  nodes_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'ExitCompleted',
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'ExitInitialized',
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'startLeavingPeriod',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'IPChanged',
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
          indexed: true,
        },
        {
          type: 'bytes4',
          name: 'previousIP',
          indexed: false,
        },
        {
          type: 'bytes4',
          name: 'newIP',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'IncompliantNode',
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
          indexed: true,
        },
        {
          type: 'bool',
          name: 'status',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'MaintenanceNode',
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
          indexed: true,
        },
        {
          type: 'bool',
          name: 'status',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'NodeCreated',
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
          indexed: false,
        },
        {
          type: 'address',
          name: 'owner',
          indexed: false,
        },
        {
          type: 'string',
          name: 'name',
          indexed: false,
        },
        {
          type: 'bytes4',
          name: 'ip',
          indexed: false,
        },
        {
          type: 'bytes4',
          name: 'publicIP',
          indexed: false,
        },
        {
          type: 'uint16',
          name: 'port',
          indexed: false,
        },
        {
          type: 'uint16',
          name: 'nonce',
          indexed: false,
        },
        {
          type: 'string',
          name: 'domainName',
          indexed: false,
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
      name: 'COMPLIANCE_ROLE',
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
      name: 'NODE_MANAGER_ROLE',
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
      name: 'addSpaceToNode',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
        {
          type: 'uint8',
          name: 'space',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'changeIP',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
        {
          type: 'bytes4',
          name: 'newIP',
        },
        {
          type: 'bytes4',
          name: 'newPublicIP',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'changeNodeFinishTime',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
        {
          type: 'uint256',
          name: 'time',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'changeNodeLastRewardDate',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'checkPossibilityCreatingNode',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'nodeAddress',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'checkPossibilityToMaintainNode',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'completeExit',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'contractManager',
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
      name: 'countNodesWithFreeSpace',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint8',
          name: 'freeSpace',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'count',
        },
      ],
    },
    {
      type: 'function',
      name: 'createNode',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'from',
        },
        {
          type: 'tuple',
          name: 'params',
          components: [
            {
              type: 'string',
              name: 'name',
            },
            {
              type: 'bytes4',
              name: 'ip',
            },
            {
              type: 'bytes4',
              name: 'publicIp',
            },
            {
              type: 'uint16',
              name: 'port',
            },
            {
              type: 'bytes32[2]',
              name: 'publicKey',
            },
            {
              type: 'uint16',
              name: 'nonce',
            },
            {
              type: 'string',
              name: 'domainName',
            },
          ],
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'deleteNodeForValidator',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'domainNames',
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
          type: 'string',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getActiveNodeIds',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint256[]',
          name: 'activeNodeIds',
        },
      ],
    },
    {
      type: 'function',
      name: 'getNodeAddress',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'getNodeDomainName',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [
        {
          type: 'string',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getNodeFinishTime',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'getNodeIP',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'getNodeLastRewardDate',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'getNodeNextRewardDate',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'getNodePort',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [
        {
          type: 'uint16',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getNodePublicKey',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [
        {
          type: 'bytes32[2]',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getNodeStatus',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'getNumberOfNodes',
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
      name: 'getNumberOnlineNodes',
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
      name: 'getRandomNodeWithFreeSpace',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint8',
          name: 'freeSpace',
        },
        {
          type: 'tuple',
          name: 'randomGenerator',
          components: [
            {
              type: 'uint256',
              name: 'seed',
            },
          ],
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
      name: 'getValidatorId',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'getValidatorNodeIndexes',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
      ],
      outputs: [
        {
          type: 'uint256[]',
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
      name: 'incompliant',
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
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'initExit',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
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
          name: 'contractsAddress',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'isNodeActive',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'isNodeExist',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'from',
        },
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'isNodeInMaintenance',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'isNodeLeaving',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'isNodeLeft',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'isTimeForReward',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'makeNodeInvisible',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'makeNodeVisible',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'nodeIndexes',
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
          name: 'numberOfNodes',
        },
      ],
    },
    {
      type: 'function',
      name: 'nodes',
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
          type: 'string',
          name: 'name',
        },
        {
          type: 'bytes4',
          name: 'ip',
        },
        {
          type: 'bytes4',
          name: 'publicIP',
        },
        {
          type: 'uint16',
          name: 'port',
        },
        {
          type: 'uint256',
          name: 'startBlock',
        },
        {
          type: 'uint256',
          name: 'lastRewardDate',
        },
        {
          type: 'uint256',
          name: 'finishTime',
        },
        {
          type: 'uint8',
          name: 'status',
        },
        {
          type: 'uint256',
          name: 'validatorId',
        },
      ],
    },
    {
      type: 'function',
      name: 'nodesIPCheck',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes4',
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
      name: 'nodesNameCheck',
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
      name: 'nodesNameToIndex',
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
    {
      type: 'function',
      name: 'numberOfActiveNodes',
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
      name: 'numberOfLeavingNodes',
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
      name: 'numberOfLeftNodes',
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
      name: 'removeNodeFromInMaintenance',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'removeSpaceFromNode',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
        {
          type: 'uint8',
          name: 'space',
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
      name: 'setDomainName',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
        {
          type: 'string',
          name: 'domainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setNodeCompliant',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setNodeInMaintenance',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setNodeIncompliant',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'spaceOfNodes',
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
          type: 'uint8',
          name: 'freeSpace',
        },
        {
          type: 'uint256',
          name: 'indexInSpaceMap',
        },
      ],
    },
    {
      type: 'function',
      name: 'spaceToNodes',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint8',
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
    {
      type: 'function',
      name: 'validatorToNodeIndexes',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
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
  nodes_address: '0xD489665414D051336CE2F2C6e4184De0409e40ba',
  pricing_abi: [
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
      name: 'INITIAL_PRICE',
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
      name: 'adjustPrice',
      constant: false,
      payable: false,
      inputs: [],
      outputs: [],
    },
    {
      type: 'function',
      name: 'checkAllNodes',
      constant: false,
      payable: false,
      inputs: [],
      outputs: [],
    },
    {
      type: 'function',
      name: 'contractManager',
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
      name: 'getTotalLoadPercentage',
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
      name: 'initNodes',
      constant: false,
      payable: false,
      inputs: [],
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
          name: 'newContractsAddress',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'lastUpdated',
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
      name: 'price',
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
      name: 'totalNodes',
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
  ],
  pricing_address: '0x39c289a3EF68127C272dE21F3db67B0CDeCDFEE1',
  punisher_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'Forgive',
      inputs: [
        {
          type: 'address',
          name: 'wallet',
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
      name: 'Slash',
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
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
      name: 'FORGIVER_ROLE',
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
      name: 'contractManager',
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
      name: 'forgive',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'holder',
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
      name: 'getAndUpdateForbiddenForDelegationAmount',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'wallet',
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
      name: 'getAndUpdateLockedAmount',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'wallet',
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
      name: 'handleSlash',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'holder',
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
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractManagerAddress',
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
      name: 'slash',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
        {
          type: 'uint256',
          name: 'amount',
        },
      ],
      outputs: [],
    },
  ],
  punisher_address: '0xbcA0eCdD44203DE76AF389d5F9931015529b7F1E',
  schains_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'NodeAdded',
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'newNode',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'NodeRotated',
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'oldNode',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'newNode',
          indexed: false,
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
      name: 'SchainCreated',
      inputs: [
        {
          type: 'string',
          name: 'name',
          indexed: false,
        },
        {
          type: 'address',
          name: 'owner',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'partOfNode',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'lifetime',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'numberOfNodes',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'deposit',
          indexed: false,
        },
        {
          type: 'uint16',
          name: 'nonce',
          indexed: false,
        },
        {
          type: 'bytes32',
          name: 'schainHash',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'SchainDeleted',
      inputs: [
        {
          type: 'address',
          name: 'owner',
          indexed: false,
        },
        {
          type: 'string',
          name: 'name',
          indexed: false,
        },
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
      name: 'SchainNodes',
      inputs: [
        {
          type: 'string',
          name: 'name',
          indexed: false,
        },
        {
          type: 'bytes32',
          name: 'schainHash',
          indexed: false,
        },
        {
          type: 'uint256[]',
          name: 'nodesInGroup',
          indexed: false,
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
      name: 'SCHAIN_CREATOR_ROLE',
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
      name: 'addSchain',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'from',
        },
        {
          type: 'uint256',
          name: 'deposit',
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
      name: 'addSchainByFoundation',
      constant: false,
      stateMutability: 'payable',
      payable: true,
      inputs: [
        {
          type: 'uint256',
          name: 'lifetime',
        },
        {
          type: 'uint8',
          name: 'typeOfSchain',
        },
        {
          type: 'uint16',
          name: 'nonce',
        },
        {
          type: 'string',
          name: 'name',
        },
        {
          type: 'address',
          name: 'schainOwner',
        },
        {
          type: 'address',
          name: 'schainOriginator',
        },
        {
          type: 'tuple[]',
          name: 'options',
          components: [
            {
              type: 'string',
              name: 'name',
            },
            {
              type: 'bytes',
              name: 'value',
            },
          ],
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'contractManager',
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
      name: 'deleteSchain',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'from',
        },
        {
          type: 'string',
          name: 'name',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'deleteSchainByRoot',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'name',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'getOption',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'string',
          name: 'optionName',
        },
      ],
      outputs: [
        {
          type: 'bytes',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getOptions',
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
          type: 'tuple[]',
          components: [
            {
              type: 'string',
              name: 'name',
            },
            {
              type: 'bytes',
              name: 'value',
            },
          ],
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
      name: 'getSchainPrice',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'typeOfSchain',
        },
        {
          type: 'uint256',
          name: 'lifetime',
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
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'newContractsAddress',
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
      name: 'restartSchainCreation',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'name',
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
      name: 'verifySchainSignature',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'signatureA',
        },
        {
          type: 'uint256',
          name: 'signatureB',
        },
        {
          type: 'bytes32',
          name: 'hash',
        },
        {
          type: 'uint256',
          name: 'counter',
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
  ],
  schains_address: '0x0fCa003F483313869ee54e86B281348980B4cbf6',
  schains_internal_abi: [
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
      name: 'SchainTypeAdded',
      inputs: [
        {
          type: 'uint256',
          name: 'schainType',
          indexed: true,
        },
        {
          type: 'uint256',
          name: 'partOfNode',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'numberOfNodes',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'SchainTypeRemoved',
      inputs: [
        {
          type: 'uint256',
          name: 'schainType',
          indexed: true,
        },
      ],
    },
    {
      type: 'function',
      name: 'DEBUGGER_ROLE',
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
      name: 'GENERATION_MANAGER_ROLE',
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
      name: 'SCHAIN_TYPE_MANAGER_ROLE',
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
      name: 'addSchainForNode',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'nodes',
        },
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'addSchainType',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint8',
          name: 'partOfNode',
        },
        {
          type: 'uint256',
          name: 'numberOfNodes',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'changeLifetime',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'uint256',
          name: 'lifetime',
        },
        {
          type: 'uint256',
          name: 'deposit',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'checkException',
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
          name: 'nodeIndex',
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
      name: 'checkHoleForSchain',
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
          name: 'indexOfNode',
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
      name: 'checkSchainOnNode',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'contractManager',
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
      name: 'createGroupForSchain',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'uint256',
          name: 'numberOfNodes',
        },
        {
          type: 'uint8',
          name: 'partOfNode',
        },
      ],
      outputs: [
        {
          type: 'uint256[]',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'currentGeneration',
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
      name: 'deleteGroup',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'getActiveSchain',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'getActiveSchains',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [
        {
          type: 'bytes32[]',
          name: 'activeSchains',
        },
      ],
    },
    {
      type: 'function',
      name: 'getGeneration',
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
      name: 'getNodeIndexInGroup',
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
          name: 'nodeId',
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
      name: 'getNodesInGroup',
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
          type: 'uint256[]',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getNumberOfNodesInGroup',
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
      name: 'getSchainHashesByAddress',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'from',
        },
      ],
      outputs: [
        {
          type: 'bytes32[]',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getSchainHashesForNode',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [
        {
          type: 'bytes32[]',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getSchainIdsByAddress',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'from',
        },
      ],
      outputs: [
        {
          type: 'bytes32[]',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getSchainIdsForNode',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [
        {
          type: 'bytes32[]',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getSchainListSize',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'from',
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
      name: 'getSchainName',
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
          type: 'string',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getSchainOriginator',
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
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getSchainOwner',
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
          type: 'address',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getSchainType',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'typeOfSchain',
        },
      ],
      outputs: [
        {
          type: 'uint8',
          name: '',
        },
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getSchains',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'bytes32[]',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getSchainsPartOfNode',
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
          type: 'uint8',
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
      name: 'holesForNodes',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
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
    {
      type: 'function',
      name: 'holesForSchains',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
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
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'newContractsAddress',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'initializeSchain',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'name',
        },
        {
          type: 'address',
          name: 'from',
        },
        {
          type: 'address',
          name: 'originator',
        },
        {
          type: 'uint256',
          name: 'lifetime',
        },
        {
          type: 'uint256',
          name: 'deposit',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'initializeSchainAddresses',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'start',
        },
        {
          type: 'uint256',
          name: 'finish',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'isAnyFreeNode',
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
      name: 'isNodeAddressesInGroup',
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
      name: 'isOwnerAddress',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'from',
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
      name: 'isSchainActive',
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
      name: 'isSchainExist',
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
      name: 'isSchainNameAvailable',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'name',
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
      name: 'isTimeExpired',
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
      name: 'makeSchainNodesInvisible',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'makeSchainNodesVisible',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'newGeneration',
      constant: false,
      payable: false,
      inputs: [],
      outputs: [],
    },
    {
      type: 'function',
      name: 'numberOfSchainTypes',
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
      name: 'numberOfSchains',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint64',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'placeOfSchainOnNode',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
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
    {
      type: 'function',
      name: 'removeAllNodesFromSchainExceptions',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'removeHolesForSchain',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'removeNodeFromAllExceptionSchains',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'removeNodeFromExceptions',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'removeNodeFromSchain',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'removeSchain',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'from',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'removeSchainForNode',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
        {
          type: 'uint256',
          name: 'schainIndex',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'removeSchainType',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'typeOfSchain',
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
      name: 'schainIndexes',
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
    {
      type: 'function',
      name: 'schainTypes',
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
          type: 'uint8',
          name: 'partOfNode',
        },
        {
          type: 'uint256',
          name: 'numberOfNodes',
        },
      ],
    },
    {
      type: 'function',
      name: 'schains',
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
          type: 'string',
          name: 'name',
        },
        {
          type: 'address',
          name: 'owner',
        },
        {
          type: 'uint256',
          name: 'indexInOwnerList',
        },
        {
          type: 'uint8',
          name: 'partOfNode',
        },
        {
          type: 'uint256',
          name: 'lifetime',
        },
        {
          type: 'uint256',
          name: 'startDate',
        },
        {
          type: 'uint256',
          name: 'startBlock',
        },
        {
          type: 'uint256',
          name: 'deposit',
        },
        {
          type: 'uint64',
          name: 'index',
        },
        {
          type: 'uint256',
          name: 'generation',
        },
        {
          type: 'address',
          name: 'originator',
        },
      ],
    },
    {
      type: 'function',
      name: 'schainsAtSystem',
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
          type: 'bytes32',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'schainsForNodes',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
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
    {
      type: 'function',
      name: 'schainsGroups',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
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
    {
      type: 'function',
      name: 'setException',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setNodeInGroup',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setNumberOfSchainTypes',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'newNumberOfSchainTypes',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'sumOfSchainsResources',
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
      name: 'usedSchainNames',
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
  ],
  schains_internal_address: '0x836Df73065Cb143bdDF3106e46783d43C12C6012',
  skale_d_k_g_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'AllDataReceived',
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
          indexed: true,
        },
        {
          type: 'uint256',
          name: 'nodeIndex',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'BadGuy',
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'BroadcastAndKeyShare',
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
          indexed: true,
        },
        {
          type: 'uint256',
          name: 'fromNode',
          indexed: true,
        },
        {
          type: 'tuple[]',
          name: 'verificationVector',
          indexed: false,
          components: [
            {
              type: 'tuple',
              name: 'x',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
            {
              type: 'tuple',
              name: 'y',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
          ],
        },
        {
          type: 'tuple[]',
          name: 'secretKeyContribution',
          indexed: false,
          components: [
            {
              type: 'bytes32[2]',
              name: 'publicKey',
            },
            {
              type: 'bytes32',
              name: 'share',
            },
          ],
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'ChannelClosed',
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'ChannelOpened',
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'ComplaintError',
      inputs: [
        {
          type: 'string',
          name: 'error',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'ComplaintSent',
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
          indexed: true,
        },
        {
          type: 'uint256',
          name: 'fromNodeIndex',
          indexed: true,
        },
        {
          type: 'uint256',
          name: 'toNodeIndex',
          indexed: true,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'FailedDKG',
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
      name: 'NewGuy',
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
          indexed: false,
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
      name: 'SuccessfulDKG',
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
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
      name: 'alright',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'uint256',
          name: 'fromNodeIndex',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'broadcast',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
        {
          type: 'tuple[]',
          name: 'verificationVector',
          components: [
            {
              type: 'tuple',
              name: 'x',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
            {
              type: 'tuple',
              name: 'y',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
          ],
        },
        {
          type: 'tuple[]',
          name: 'secretKeyContribution',
          components: [
            {
              type: 'bytes32[2]',
              name: 'publicKey',
            },
            {
              type: 'bytes32',
              name: 'share',
            },
          ],
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'channels',
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
          name: 'active',
        },
        {
          type: 'uint256',
          name: 'n',
        },
        {
          type: 'uint256',
          name: 'startedBlockTimestamp',
        },
        {
          type: 'uint256',
          name: 'startedBlock',
        },
      ],
    },
    {
      type: 'function',
      name: 'checkAndReturnIndexInGroup',
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
          name: 'nodeIndex',
        },
        {
          type: 'bool',
          name: 'revertCheck',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: '',
        },
        {
          type: 'bool',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'complaint',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'uint256',
          name: 'fromNodeIndex',
        },
        {
          type: 'uint256',
          name: 'toNodeIndex',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'complaintBadData',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'uint256',
          name: 'fromNodeIndex',
        },
        {
          type: 'uint256',
          name: 'toNodeIndex',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'complaints',
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
          name: 'nodeToComplaint',
        },
        {
          type: 'uint256',
          name: 'fromNodeToComplaint',
        },
        {
          type: 'uint256',
          name: 'startComplaintBlockTimestamp',
        },
        {
          type: 'bool',
          name: 'isResponse',
        },
        {
          type: 'bytes32',
          name: 'keyShare',
        },
        {
          type: 'tuple',
          name: 'sumOfVerVec',
          components: [
            {
              type: 'tuple',
              name: 'x',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
            {
              type: 'tuple',
              name: 'y',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'function',
      name: 'contractManager',
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
      name: 'deleteChannel',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'dkgProcess',
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
          name: 'numberOfBroadcasted',
        },
        {
          type: 'uint256',
          name: 'numberOfCompleted',
        },
      ],
    },
    {
      type: 'function',
      name: 'finalizeSlashing',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'uint256',
          name: 'badNode',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'getAlrightStartedTime',
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
      name: 'getChannelStartedBlock',
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
      name: 'getChannelStartedTime',
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
      name: 'getComplaintData',
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
        {
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getComplaintStartedTime',
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
      name: 'getNumberOfBroadcasted',
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
      name: 'getNumberOfCompleted',
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
      name: 'getTimeOfLastSuccessfulDKG',
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
      name: 'hashData',
      constant: true,
      stateMutability: 'pure',
      payable: false,
      inputs: [
        {
          type: 'tuple[]',
          name: 'secretKeyContribution',
          components: [
            {
              type: 'bytes32[2]',
              name: 'publicKey',
            },
            {
              type: 'bytes32',
              name: 'share',
            },
          ],
        },
        {
          type: 'tuple[]',
          name: 'verificationVector',
          components: [
            {
              type: 'tuple',
              name: 'x',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
            {
              type: 'tuple',
              name: 'y',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
          ],
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
      name: 'hashedData',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'bytes32',
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
    {
      type: 'function',
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractsAddress',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'isAllDataReceived',
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
          name: 'nodeIndex',
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
      name: 'isAlrightPossible',
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
          name: 'nodeIndex',
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
      name: 'isBroadcastPossible',
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
          name: 'nodeIndex',
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
      name: 'isChannelOpened',
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
      name: 'isComplaintPossible',
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
          name: 'fromNodeIndex',
        },
        {
          type: 'uint256',
          name: 'toNodeIndex',
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
      name: 'isEveryoneBroadcasted',
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
      name: 'isLastDKGSuccessful',
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
      name: 'isNodeBroadcasted',
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
          name: 'nodeIndex',
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
      name: 'isPreResponsePossible',
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
          name: 'nodeIndex',
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
      name: 'isResponsePossible',
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
          name: 'nodeIndex',
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
      name: 'lastSuccessfulDKG',
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
    {
      type: 'function',
      name: 'openChannel',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'preResponse',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainId',
        },
        {
          type: 'uint256',
          name: 'fromNodeIndex',
        },
        {
          type: 'tuple[]',
          name: 'verificationVector',
          components: [
            {
              type: 'tuple',
              name: 'x',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
            {
              type: 'tuple',
              name: 'y',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
          ],
        },
        {
          type: 'tuple[]',
          name: 'verificationVectorMultiplication',
          components: [
            {
              type: 'tuple',
              name: 'x',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
            {
              type: 'tuple',
              name: 'y',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
          ],
        },
        {
          type: 'tuple[]',
          name: 'secretKeyContribution',
          components: [
            {
              type: 'bytes32[2]',
              name: 'publicKey',
            },
            {
              type: 'bytes32',
              name: 'share',
            },
          ],
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
      name: 'response',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'uint256',
          name: 'fromNodeIndex',
        },
        {
          type: 'uint256',
          name: 'secretNumber',
        },
        {
          type: 'tuple',
          name: 'multipliedShare',
          components: [
            {
              type: 'tuple',
              name: 'x',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
            {
              type: 'tuple',
              name: 'y',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
          ],
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
      name: 'setBadNode',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'uint256',
          name: 'nodeIndex',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setStartAlrightTimestamp',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'startAlrightTimestamp',
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
  skale_d_k_g_address: '0xfcc84F7b6d88d671C6a1841549c0b2E70110884f',
  skale_manager_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'BountyReceived',
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
          indexed: true,
        },
        {
          type: 'address',
          name: 'owner',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'averageDowntime',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'averageLatency',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'bounty',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'previousBlockEvent',
          indexed: false,
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
      name: 'ADMIN_ROLE',
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
      name: 'SCHAIN_REMOVAL_ROLE',
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
      name: 'contractManager',
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
      name: 'createNode',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint16',
          name: 'port',
        },
        {
          type: 'uint16',
          name: 'nonce',
        },
        {
          type: 'bytes4',
          name: 'ip',
        },
        {
          type: 'bytes4',
          name: 'publicIp',
        },
        {
          type: 'bytes32[2]',
          name: 'publicKey',
        },
        {
          type: 'string',
          name: 'name',
        },
        {
          type: 'string',
          name: 'domainName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'deleteSchain',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'name',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'deleteSchainByRoot',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'name',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'getBounty',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'newContractsAddress',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'nodeExit',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'nodeIndex',
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
      name: 'tokensReceived',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: '',
        },
        {
          type: 'address',
          name: 'from',
        },
        {
          type: 'address',
          name: 'to',
        },
        {
          type: 'uint256',
          name: 'value',
        },
        {
          type: 'bytes',
          name: 'userData',
        },
        {
          type: 'bytes',
          name: '',
        },
      ],
      outputs: [],
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
  skale_manager_address: '0x8b32F750966273cb6D804C02360F3E2743E2B511',
  skale_token_abi: [
    {
      inputs: [
        {
          internalType: 'address',
          name: 'contractsAddress',
          type: 'address',
        },
        {
          internalType: 'address[]',
          name: 'defOps',
          type: 'address[]',
        },
      ],
      signature: 'constructor',
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'owner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Approval',
      signature:
        '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'tokenHolder',
          type: 'address',
        },
      ],
      name: 'AuthorizedOperator',
      signature:
        '0xf4caeb2d6ca8932a215a353d0703c326ec2d81fc68170f320eb2ab49e9df61f9',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
        {
          indexed: false,
          internalType: 'bytes',
          name: 'operatorData',
          type: 'bytes',
        },
      ],
      name: 'Burned',
      signature:
        '0xa78a9be3a7b862d26933ad85fb11d80ef66b8f972d7cbba06621d583943a4098',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
        {
          indexed: false,
          internalType: 'bytes',
          name: 'operatorData',
          type: 'bytes',
        },
      ],
      name: 'Minted',
      signature:
        '0x2fe5be0146f74c5bce36c0b80911af6c7d86ff27e89d5cfa61fc681327954e5d',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'tokenHolder',
          type: 'address',
        },
      ],
      name: 'RevokedOperator',
      signature:
        '0x50546e66e5f44d728365dc3908c63bc5cfeeab470722c1677e3073a6ac294aa1',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'RoleGranted',
      signature:
        '0x2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'RoleRevoked',
      signature:
        '0xf6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
        {
          indexed: false,
          internalType: 'bytes',
          name: 'operatorData',
          type: 'bytes',
        },
      ],
      name: 'Sent',
      signature:
        '0x06b541ddaa720db2b10a4d0cdac39b8d360425fc073085fac19bc82614677987',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'Transfer',
      signature:
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
      type: 'event',
    },
    {
      constant: true,
      inputs: [],
      name: 'CAP',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      signature: '0xec81b483',
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'DECIMALS',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      signature: '0x2e0f2625',
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'DEFAULT_ADMIN_ROLE',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      signature: '0xa217fddf',
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'NAME',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      signature: '0xa3f4df7e',
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'SYMBOL',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      signature: '0xf76f8d78',
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: 'holder',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
      ],
      name: 'allowance',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      signature: '0xdd62ed3e',
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'spender',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'approve',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      signature: '0x095ea7b3',
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
      ],
      name: 'authorizeOperator',
      outputs: [],
      signature: '0x959b8c3f',
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: 'tokenHolder',
          type: 'address',
        },
      ],
      name: 'balanceOf',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      signature: '0x70a08231',
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'burn',
      outputs: [],
      signature: '0xfe9d9303',
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'contractManager',
      outputs: [
        {
          internalType: 'contract ContractManager',
          name: '',
          type: 'address',
        },
      ],
      signature: '0xb39e12cf',
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'decimals',
      outputs: [
        {
          internalType: 'uint8',
          name: '',
          type: 'uint8',
        },
      ],
      signature: '0x313ce567',
      stateMutability: 'pure',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'defaultOperators',
      outputs: [
        {
          internalType: 'address[]',
          name: '',
          type: 'address[]',
        },
      ],
      signature: '0x06e48538',
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
      ],
      name: 'getRoleAdmin',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      signature: '0x248a9ca3',
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'uint256',
          name: 'index',
          type: 'uint256',
        },
      ],
      name: 'getRoleMember',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      signature: '0x9010d07c',
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
      ],
      name: 'getRoleMemberCount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      signature: '0xca15c873',
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'grantRole',
      outputs: [],
      signature: '0x2f2ff15d',
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'granularity',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      signature: '0x556f0dc7',
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'hasRole',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      signature: '0x91d14854',
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'contractManagerAddress',
          type: 'address',
        },
      ],
      name: 'initialize',
      outputs: [],
      signature: '0xc4d66de8',
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'tokenHolder',
          type: 'address',
        },
      ],
      name: 'isOperatorFor',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      signature: '0xd95b6371',
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'name',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      signature: '0x06fdde03',
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
        {
          internalType: 'bytes',
          name: 'operatorData',
          type: 'bytes',
        },
      ],
      name: 'operatorBurn',
      outputs: [],
      signature: '0xfc673c4f',
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
        {
          internalType: 'bytes',
          name: 'operatorData',
          type: 'bytes',
        },
      ],
      name: 'operatorSend',
      outputs: [],
      signature: '0x62ad1b83',
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'renounceRole',
      outputs: [],
      signature: '0x36568abe',
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
      ],
      name: 'revokeOperator',
      outputs: [],
      signature: '0xfad8b32a',
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'revokeRole',
      outputs: [],
      signature: '0xd547741f',
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'data',
          type: 'bytes',
        },
      ],
      name: 'send',
      outputs: [],
      signature: '0x9bd9bbc6',
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'symbol',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      signature: '0x95d89b41',
      stateMutability: 'view',
      type: 'function',
    },
    {
      constant: true,
      inputs: [],
      name: 'totalSupply',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      signature: '0x18160ddd',
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'transfer',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      signature: '0xa9059cbb',
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'holder',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'recipient',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'transferFrom',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      signature: '0x23b872dd',
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'userData',
          type: 'bytes',
        },
        {
          internalType: 'bytes',
          name: 'operatorData',
          type: 'bytes',
        },
      ],
      name: 'mint',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      signature: '0xdcdc7dd0',
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'wallet',
          type: 'address',
        },
      ],
      name: 'getAndUpdateDelegatedAmount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      signature: '0x27040f68',
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'wallet',
          type: 'address',
        },
      ],
      name: 'getAndUpdateSlashedAmount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      signature: '0xb1cb105f',
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'wallet',
          type: 'address',
        },
      ],
      name: 'getAndUpdateLockedAmount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      signature: '0xfa8dacba',
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
  skale_token_address: '0x00c83aeCC790e8a4453e5dD3B0B4b3680501a7A7',
  skale_verifier_abi: [
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
      name: 'contractManager',
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
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'newContractsAddress',
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
      name: 'verify',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'tuple',
          name: 'signature',
          components: [
            {
              type: 'uint256',
              name: 'a',
            },
            {
              type: 'uint256',
              name: 'b',
            },
          ],
        },
        {
          type: 'bytes32',
          name: 'hash',
        },
        {
          type: 'uint256',
          name: 'counter',
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
          type: 'tuple',
          name: 'publicKey',
          components: [
            {
              type: 'tuple',
              name: 'x',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
            {
              type: 'tuple',
              name: 'y',
              components: [
                {
                  type: 'uint256',
                  name: 'a',
                },
                {
                  type: 'uint256',
                  name: 'b',
                },
              ],
            },
          ],
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
  skale_verifier_address: '0x32F50e2a898F14687f2a714D8b2D405317eB4641',
  slashing_table_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'PenaltyAdded',
      inputs: [
        {
          type: 'uint256',
          name: 'offenseHash',
          indexed: true,
        },
        {
          type: 'string',
          name: 'offense',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'penalty',
          indexed: false,
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
      name: 'PENALTY_SETTER_ROLE',
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
      name: 'contractManager',
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
      name: 'getPenalty',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'offense',
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
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractManagerAddress',
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
      name: 'setPenalty',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'offense',
        },
        {
          type: 'uint256',
          name: 'penalty',
        },
      ],
      outputs: [],
    },
  ],
  slashing_table_address: '0x1a7bB775611b58375a3177Dcf3D8E4f7F6d2ed4B',
  time_helpers_abi: [
    {
      type: 'function',
      name: 'addDays',
      constant: true,
      stateMutability: 'pure',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'fromTimestamp',
        },
        {
          type: 'uint256',
          name: 'n',
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
      name: 'addMonths',
      constant: true,
      stateMutability: 'pure',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'fromTimestamp',
        },
        {
          type: 'uint256',
          name: 'n',
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
      name: 'addYears',
      constant: true,
      stateMutability: 'pure',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'fromTimestamp',
        },
        {
          type: 'uint256',
          name: 'n',
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
      name: 'calculateProofOfUseLockEndTime',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'month',
        },
        {
          type: 'uint256',
          name: 'lockUpPeriodDays',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'timestamp',
        },
      ],
    },
    {
      type: 'function',
      name: 'getCurrentMonth',
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
      name: 'monthToTimestamp',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'month',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'timestamp',
        },
      ],
    },
    {
      type: 'function',
      name: 'timestampToMonth',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'timestamp',
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
      name: 'timestampToYear',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'timestamp',
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
  time_helpers_address: '0x05946b1b80ce4DE235350d8955c5c751860D5399',
  token_launch_locker_abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'holder',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Locked',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'RoleGranted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'RoleRevoked',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'holder',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Unlocked',
      type: 'event',
    },
    {
      inputs: [],
      name: 'DEFAULT_ADMIN_ROLE',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'contractManager',
      outputs: [
        {
          internalType: 'contract ContractManager',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
      ],
      name: 'getRoleAdmin',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'uint256',
          name: 'index',
          type: 'uint256',
        },
      ],
      name: 'getRoleMember',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
      ],
      name: 'getRoleMemberCount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'grantRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'hasRole',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'renounceRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'revokeRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'holder',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'lock',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'holder',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'delegationId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'month',
          type: 'uint256',
        },
      ],
      name: 'handleDelegationAdd',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'holder',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'delegationId',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'month',
          type: 'uint256',
        },
      ],
      name: 'handleDelegationRemoving',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'wallet',
          type: 'address',
        },
      ],
      name: 'getAndUpdateLockedAmount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'getAndUpdateForbiddenForDelegationAmount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'contractManagerAddress',
          type: 'address',
        },
      ],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
  token_launch_locker_address: '0x86F37Bb8245b71B959da5bDe3fec57Cb2a09545D',
  token_launch_manager_abi: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'holder',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'Approved',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'RoleGranted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'sender',
          type: 'address',
        },
      ],
      name: 'RoleRevoked',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'timestamp',
          type: 'uint256',
        },
      ],
      name: 'TokenLaunchIsCompleted',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'holder',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'TokensRetrieved',
      type: 'event',
    },
    {
      inputs: [],
      name: 'DEFAULT_ADMIN_ROLE',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'SELLER_ROLE',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'approved',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'contractManager',
      outputs: [
        {
          internalType: 'contract ContractManager',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
      ],
      name: 'getRoleAdmin',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'uint256',
          name: 'index',
          type: 'uint256',
        },
      ],
      name: 'getRoleMember',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
      ],
      name: 'getRoleMemberCount',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'grantRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'hasRole',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'renounceRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'role',
          type: 'bytes32',
        },
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'revokeRole',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'tokenLaunchIsCompleted',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'walletAddress',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'value',
          type: 'uint256',
        },
      ],
      name: 'approveTransfer',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address[]',
          name: 'walletAddress',
          type: 'address[]',
        },
        {
          internalType: 'uint256[]',
          name: 'value',
          type: 'uint256[]',
        },
      ],
      name: 'approveBatchOfTransfers',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'completeTokenLaunch',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'oldAddress',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'newAddress',
          type: 'address',
        },
      ],
      name: 'changeApprovalAddress',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'wallet',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'newValue',
          type: 'uint256',
        },
      ],
      name: 'changeApprovalValue',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'retrieve',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'operator',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'from',
          type: 'address',
        },
        {
          internalType: 'address',
          name: 'to',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: 'userData',
          type: 'bytes',
        },
        {
          internalType: 'bytes',
          name: 'operatorData',
          type: 'bytes',
        },
      ],
      name: 'tokensReceived',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'contractManagerAddress',
          type: 'address',
        },
      ],
      name: 'initialize',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],
  token_launch_manager_address: '0x96aA945360B76e18ea5a1cFf3Ebd9b5B8ffa518E',
  token_state_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'LockerWasAdded',
      inputs: [
        {
          type: 'string',
          name: 'locker',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'LockerWasRemoved',
      inputs: [
        {
          type: 'string',
          name: 'locker',
          indexed: false,
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
      name: 'LOCKER_MANAGER_ROLE',
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
      name: 'addLocker',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'locker',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'contractManager',
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
      name: 'getAndUpdateForbiddenForDelegationAmount',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'holder',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'amount',
        },
      ],
    },
    {
      type: 'function',
      name: 'getAndUpdateLockedAmount',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'holder',
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
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractManagerAddress',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'removeLocker',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'locker',
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
  ],
  token_state_address: '0x4eE5F270572285776814e32952446e9B7Ee15C86',
  validator_service_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'AcceptingNewRequests',
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
          indexed: true,
        },
        {
          type: 'bool',
          name: 'status',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'NodeAddressWasAdded',
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
          indexed: false,
        },
        {
          type: 'address',
          name: 'nodeAddress',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'NodeAddressWasRemoved',
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
          indexed: false,
        },
        {
          type: 'address',
          name: 'nodeAddress',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'RequestNewAddress',
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
          indexed: true,
        },
        {
          type: 'address',
          name: 'previousAddress',
          indexed: false,
        },
        {
          type: 'address',
          name: 'newAddress',
          indexed: false,
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
      name: 'SetMinimumDelegationAmount',
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
          indexed: true,
        },
        {
          type: 'uint256',
          name: 'previousMDA',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'newMDA',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'SetValidatorDescription',
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
          indexed: true,
        },
        {
          type: 'string',
          name: 'previousDescription',
          indexed: false,
        },
        {
          type: 'string',
          name: 'newDescription',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'SetValidatorName',
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
          indexed: true,
        },
        {
          type: 'string',
          name: 'previousName',
          indexed: false,
        },
        {
          type: 'string',
          name: 'newName',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'ValidatorAddressChanged',
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
          indexed: false,
        },
        {
          type: 'address',
          name: 'newAddress',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'ValidatorRegistered',
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'ValidatorWasDisabled',
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'ValidatorWasEnabled',
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'WhitelistDisabled',
      inputs: [
        {
          type: 'bool',
          name: 'status',
          indexed: false,
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
      name: 'VALIDATOR_MANAGER_ROLE',
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
      name: 'checkIfValidatorAddressExists',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'validatorAddress',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'checkValidatorAddressToId',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'validatorAddress',
        },
        {
          type: 'uint256',
          name: 'validatorId',
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
      name: 'checkValidatorCanReceiveDelegation',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
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
      name: 'confirmNewAddress',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'contractManager',
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
      name: 'disableValidator',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'disableWhitelist',
      constant: false,
      payable: false,
      inputs: [],
      outputs: [],
    },
    {
      type: 'function',
      name: 'enableValidator',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'getAndUpdateBondAmount',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
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
      name: 'getMyNodesAddresses',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'address[]',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getNodeAddresses',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
      ],
      outputs: [
        {
          type: 'address[]',
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
      name: 'getTrustedValidators',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [],
      outputs: [
        {
          type: 'uint256[]',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getValidator',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
      ],
      outputs: [
        {
          type: 'tuple',
          components: [
            {
              type: 'string',
              name: 'name',
            },
            {
              type: 'address',
              name: 'validatorAddress',
            },
            {
              type: 'address',
              name: 'requestedAddress',
            },
            {
              type: 'string',
              name: 'description',
            },
            {
              type: 'uint256',
              name: 'feeRate',
            },
            {
              type: 'uint256',
              name: 'registrationTime',
            },
            {
              type: 'uint256',
              name: 'minimumDelegationAmount',
            },
            {
              type: 'bool',
              name: 'acceptNewRequests',
            },
          ],
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getValidatorId',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'validatorAddress',
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
      name: 'getValidatorIdByNodeAddress',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'nodeAddress',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'validatorId',
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
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractManagerAddress',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'isAcceptingNewRequests',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
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
      name: 'isAuthorizedValidator',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
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
      name: 'linkNodeAddress',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'nodeAddress',
        },
        {
          type: 'bytes',
          name: 'sig',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'numberOfValidators',
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
      name: 'registerValidator',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'name',
        },
        {
          type: 'string',
          name: 'description',
        },
        {
          type: 'uint256',
          name: 'feeRate',
        },
        {
          type: 'uint256',
          name: 'minimumDelegationAmount',
        },
      ],
      outputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
      ],
    },
    {
      type: 'function',
      name: 'removeNodeAddress',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
        {
          type: 'address',
          name: 'nodeAddress',
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
      name: 'requestForNewAddress',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'newValidatorAddress',
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
      name: 'setValidatorDescription',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'newDescription',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setValidatorMDA',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'minimumDelegationAmount',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'setValidatorName',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'newName',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'startAcceptingNewRequests',
      constant: false,
      payable: false,
      inputs: [],
      outputs: [],
    },
    {
      type: 'function',
      name: 'stopAcceptingNewRequests',
      constant: false,
      payable: false,
      inputs: [],
      outputs: [],
    },
    {
      type: 'function',
      name: 'trustedValidatorsList',
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
          type: 'uint256',
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'unlinkNodeAddress',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'nodeAddress',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'useWhitelist',
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
      name: 'validatorAddressExists',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'validatorAddress',
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
      name: 'validatorExists',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
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
      name: 'validators',
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
          type: 'string',
          name: 'name',
        },
        {
          type: 'address',
          name: 'validatorAddress',
        },
        {
          type: 'address',
          name: 'requestedAddress',
        },
        {
          type: 'string',
          name: 'description',
        },
        {
          type: 'uint256',
          name: 'feeRate',
        },
        {
          type: 'uint256',
          name: 'registrationTime',
        },
        {
          type: 'uint256',
          name: 'minimumDelegationAmount',
        },
        {
          type: 'bool',
          name: 'acceptNewRequests',
        },
      ],
    },
  ],
  validator_service_address: '0x840C8122433A5AA7ad60C1Bcdc36AB9DcCF761a5',
  wallets_address: '0xbAec960713a6c41d391C93AE42128d72C916965f',
  wallets_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'NodeRefundedBySchain',
      inputs: [
        {
          type: 'address',
          name: 'node',
          indexed: false,
        },
        {
          type: 'bytes32',
          name: 'schainHash',
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
      name: 'NodeRefundedByValidator',
      inputs: [
        {
          type: 'address',
          name: 'node',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'validatorId',
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
      name: 'SchainWalletRecharged',
      inputs: [
        {
          type: 'address',
          name: 'sponsor',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'amount',
          indexed: false,
        },
        {
          type: 'bytes32',
          name: 'schainHash',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'ValidatorWalletRecharged',
      inputs: [
        {
          type: 'address',
          name: 'sponsor',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'amount',
          indexed: false,
        },
        {
          type: 'uint256',
          name: 'validatorId',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'WithdrawFromSchainWallet',
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
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
      name: 'WithdrawFromValidatorWallet',
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
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
      name: 'contractManager',
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
      name: 'getSchainBalance',
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
      name: 'getValidatorBalance',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
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
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractsAddress',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'rechargeSchainWallet',
      constant: false,
      stateMutability: 'payable',
      payable: true,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'rechargeValidatorWallet',
      constant: false,
      stateMutability: 'payable',
      payable: true,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'refundGasBySchain',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'bytes32',
          name: 'schainHash',
        },
        {
          type: 'address',
          name: 'spender',
        },
        {
          type: 'uint256',
          name: 'spentGas',
        },
        {
          type: 'bool',
          name: 'isDebt',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'refundGasByValidator',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
        {
          type: 'address',
          name: 'spender',
        },
        {
          type: 'uint256',
          name: 'spentGas',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'refundGasByValidatorToSchain',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'validatorId',
        },
        {
          type: 'bytes32',
          name: 'schainHash',
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
      name: 'withdrawFundsFromSchainWallet',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'schainOwner',
        },
        {
          type: 'bytes32',
          name: 'schainHash',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'withdrawFundsFromValidatorWallet',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'amount',
        },
      ],
      outputs: [],
    },
  ],
  sync_manager_abi: [
    {
      type: 'event',
      anonymous: false,
      name: 'IPRangeAdded',
      inputs: [
        {
          type: 'string',
          name: 'name',
          indexed: false,
        },
        {
          type: 'bytes4',
          name: 'startIP',
          indexed: false,
        },
        {
          type: 'bytes4',
          name: 'endIP',
          indexed: false,
        },
      ],
    },
    {
      type: 'event',
      anonymous: false,
      name: 'IPRangeRemoved',
      inputs: [
        {
          type: 'string',
          name: 'name',
          indexed: false,
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
      name: 'SYNC_MANAGER_ROLE',
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
      name: 'addIPRange',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'name',
        },
        {
          type: 'bytes4',
          name: 'startIP',
        },
        {
          type: 'bytes4',
          name: 'endIP',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'contractManager',
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
      name: 'getIPRangeByIndex',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'uint256',
          name: 'index',
        },
      ],
      outputs: [
        {
          type: 'tuple',
          components: [
            {
              type: 'bytes4',
              name: 'startIP',
            },
            {
              type: 'bytes4',
              name: 'endIP',
            },
          ],
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getIPRangeByName',
      constant: true,
      stateMutability: 'view',
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'name',
        },
      ],
      outputs: [
        {
          type: 'tuple',
          components: [
            {
              type: 'bytes4',
              name: 'startIP',
            },
            {
              type: 'bytes4',
              name: 'endIP',
            },
          ],
          name: '',
        },
      ],
    },
    {
      type: 'function',
      name: 'getIPRangesNumber',
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
      name: 'initialize',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'address',
          name: 'contractManagerAddress',
        },
      ],
      outputs: [],
    },
    {
      type: 'function',
      name: 'ipRanges',
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
          type: 'bytes4',
          name: 'startIP',
        },
        {
          type: 'bytes4',
          name: 'endIP',
        },
      ],
    },
    {
      type: 'function',
      name: 'removeIPRange',
      constant: false,
      payable: false,
      inputs: [
        {
          type: 'string',
          name: 'name',
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
  ],
  sync_manager_address: '0xBC896522b1649dc2e43bC093d08665822529d087',
} as const;
