<div align="center" style="background: black; color: white; padding: 20px 0; border-radius: 5px;">
<h2 style="color: white;">
<img valign="middle" src="https://raw.githubusercontent.com/skalenetwork/admin-ui/main/public/logo.png" alt="skale" width="48" /><br>
SKALE Chain — Admin UI
</h2>
<span style="font-size: small; padding: 2px 10px; letter-spacing: 2px; color: white; border-radius: 3px; font-weight: 700">DEVELOPER GUIDE</span>
</div>

# Install

Use node version ^18.12

```bash
yarn
yarn dev
```

# Prelude

<img src="https://raw.githubusercontent.com/skalenetwork/admin-ui/main/public/mascot.png" style="border-radius: 5px; display: block" align="left" width="136" height="136">

To build a flying car that actually flies:

- Make sure that the car is drivable at all times.

- Ensure that the modularity inspires _maintainable_ reusability.

- Meditate.

<br clear="both">

# Exposed Packages

Following are being built along-side `admin-ui` app specifically for re-usability across ecosystem.

- `src/features`
- `src/screens`
- `src/components`: Reusable common components on SKALE's design system, built with headless accessible libraries
- `src/elements`: JSX UI Elements (ideally framework-agnostic)
- `src/types`

# :package: Features

Features are an implementation detail of the _app-level usability_ of the network capabilities. All features expose vanilla-ts, as well as react hooks that function within a provided `wagmi`+`react-query` context (built-in caching).

Following is the architecture breakdown of the founding feature.

## Network feature

`@/features/network`

A groundwork extensively supporting typescript interfaces across network building blocks.

- Use typed contracts
- Use utility APIs on top of contracts
- Use convenience hooks

Network feature builds a configuration layer into it, with interfaces that may be extended as needed, though persisting a base structure and scope.

### Configuration: Constants

None-to-slow-changing data

- **`address.ts`** All unique preset addresses
- **`chains/*.ts`** Recognized SChains using a standard `Chain` type, IDed by `chainName`.

### Configuration: Manifests

Slow-to-medium-changing data

Manifests are typed exports and currently hand-compiled. These should evolve to be compile-targets of releases made within `skalenetwork/*`.

First class TypeScript support allows dynamic typing from ABIs enabling TS compatibility with core packages like `ethers` and `abitype`.

- **`manifest.ts`** Re-export of manifests and utility methods

- **`contract.ts`** Entry point of all manifests with indexed contracts (origin of `ContractId`) and relevant types

- **`abi/abi.ts`** Re-export of individual ABIs `abi/abi-*.ts`, indexed by `ContractId`

- **`api.ts`** Re-export of standard initiators for individual APIs imported from various ecosystem libraries, indexed by `ContractId`

> Why redistribute JSON ABIs as .ts files? We need the narrowest `Abi` type, producible by a `const` assertion. TS currently doesn't _(want to)_ support JSON `as const` https://github.com/microsoft/TypeScript/issues/32063

Example usage of exposed getters:

```ts
const address = getSContractProp('CONFIG_CONTROLLER', 'address');

const abi = getAbi('CONFIG_CONTROLLER');

build.contractIdFromAddress(address);

const { abi, address } = build.addressAbiPair('CONFIG_CONTROLLER');
```

### Configuration: Registry

Medium-to-fast changing data

Registry points to files published externally to feature scope, from any source. It dynamically fetches source data in runtime, produces the parsed object and exposes predefined types for it. Just kidding... it's currently not exactly that organized, but it's an easy implementation, and when the use cases extend from barely 2 this is a good mental model for quick implementation. Following is already implemented though.

Presently registered metadata includes:

- chainlists
- `skale-network`: `metadata/mainnet/chains.json`
- `admin-ui`: `metadata/roles.json`

> Note: All configuration is scalable to allow a versioned design, which will make up for a more diligent network feature.

# :crystal_ball: Screens

In current micro-mono hybrid architecture, screens are HOC compositions of stateless `elements`.

:crystal_ball: It might help to think of screens as portals of stateful features.

This directly enables:

1. Portability of client-agnostic stateful features, and submodules.
2. Portability of stateful screens (react).

# SDK Usage

@ v0.3 packages are unbundled exports i.e. they can only be used as direct imports into TS projects. [TO BE TESTED]

## Install

```sh
yarn add skalenetwork/admin-ui
```

## Setup

All react hooks are operational only within `wagmi` context.

```tsx
/** in your entrypoint file **/

// within main renderer
<WagmiConfig client={wagmiClient}>
  <App />
</WagmiConfig>
```

Refer to [wagmi docs](https://wagmi.sh/react/getting-started) for complete setup example.

## Examples

- **Read** from pre-deployed contract

```tsx
// single-read
const { data } = useSContractRead('TOKEN_MANAGER_ERC20', {
  name: 'automaticDeploy',
});

// multi-read fits best with TS for similarly typed return values
const { data, status, refetch } = useSContractReads('CONFIG_CONTROLLER', {
  reads: [
    {
      name: 'isMTMEnabled',
    },
    {
      name: 'isFCDEnabled',
    },
  ],
});
```

- **Write** to pre-deployed contract

```ts
import { useSContractWrite } from '@skalenetwork/admin-ui/features';

const writer = useSContractWrite('TOKEN_MANAGER_LINKER', {
  name: 'connectSChain',
  args: ['staging-aware-chief-gianfar']
});

const handleSubmit = useCallback(() => {
  write?.write();
}. [writer.write]);

const handleSubmitWithConfirm = useCallback(async () => {
  if(!writer.writeAsync) return;
  await writer.writeAsync(true);
}, [writer.writeAsync]);

```

What's in the writer?

```tsx
// writer exposes full state through lifecycle of contract mutation

const { eoa, mnm, ...rest } = writer;

// eoa = writer with Externally Owned Account as signer
// mnm = writer with Multisig Owner as signer

// rest is copy of either eoa or mnm depending on current authorization

// exposing default outputs of useContractWrite from wagmi and some extras

const { action, multisigData, receipt, isConfirmed, isFailed } = rest;

const isUsingExternallyOwnedAccount = action === 'eoa';

const isUsingMultisigConfirm = action === 'confirm';
const isUsingMultisigExecute = action === 'execute';
const isUsingMultisigSubmit = action === 'submit';

const countMultisigConfirmations = multisigData?.countConfirmed;
const countMultisigRequiredConfirmations = multisigData?.countRequired;
```

- **Guard** UI actions from unready writer

```jsx
<button disabled={!!writer.writeAsync}>Guarded Action</button>
```

---

# @next

`@/features/icm`

Among features, ICM (inter-chain messaging) is a domain that would horizontally complete `@/features`.

Diagram highlighting typical cross-chain interaction. On the contrary, arbitrary message passing is more suitable for `icm` whereas `multsig` could be one of the consumers of `icm` when supporting foreign multisigs.
![](./public/icm.png)

# Links

## Consumables

- [skale.js](https://github.com/Dirt-Road-Development/skale.js)

- [IMA-js](https://github.com/skalenetwork/ima-js)

- [RPC Support Spec](https://github.com/skalenetwork/skaled/blob/docs-v3.14.x/docs/modules/ROOT/pages/json-rpc-interface.adoc)

- [Staging Network List](http://staging-v3.skalenodes.com/#/)

- [Mainnet Network List](http://mainnet.skalenodes.com/#/)

## Notable Projects

- [Multisig Wallet CLI](https://github.com/skalenetwork/multisigwallet-cli)

- [Metaport](https://github.com/skalenetwork/metaport)

- [Network UI](https://github.com/skalenetwork/network-ui)

- [Filestorage UI](https://github.com/skalenetwork/filestorage-ui)
