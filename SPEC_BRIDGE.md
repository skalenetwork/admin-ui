# Feature Specification - bridge

## Definitions

- `origin` chain is the chain in context of signer
- `target` chain is the foreign chain to perform peer actions with
- `peer` chains are connected either fully or partially

## Chain connections

### Peer discovery

`origin` is connected to `target`

```ts
TokenManagerLinker<`target`>.hasSchain(origin.name)
```

`target` is connected to `origin`

```ts
TokenManagerLinker<`origin`>.connectSChain(target.name)
```

#### Tokens

`origin` tokens mapped to `target`

```ts
MessageProxyForSchain.grantRole(
  CHAIN_CONNECTOR_ROLE,
  TokenManagerLinker.address,
);
```

### Peer communication

Access authorization

```ts

// network gate
MessageProxyForSchain.grantRole(CHAIN_CONNECTOR_ROLE, TokenManagerLinker.address)

// signer gate
TokenManagerLinker<`origin`>.hasRole(REGISTRAR_ROLE)
```

`origin` connects to `target` **OR** `origin` accepts `target` as a connection

```ts
TokenManagerLinker<`origin`>.connectSChain(target.name)
```

> For both of the above: What for other than schain (ethereum main or etc) (is it Twin?), if same, then what is `schainName` value?

#### Tokens

...

## IMA-js internal web3 usage

to maybe ponyfill from ethers provider (ahead of `ima-js/tree/feature/move-to-ethers-js/src`)

```ts

// most usage in transactions.js

web3.eth.Contract(abi, address)

web3.utils.toWei(...)
web3.utils.toBN(): BigNumber

{ rawTransaction } = web3.eth.accounts.signTransaction(tx, privateKey)

web3.eth.sendSignedTransaction(rawTransaction)

web3.eth.sendTransaction(rawTransaction)

{ address } = web3.eth.accounts.privateKeyToAccount(...)

web3.eth.getChainId(): number

web3.eth.getTransactionCount(address): number

web3.eth.getBlockNumber(): number

{ gasLimit } = web3.eth.getBlock(:number)

```
