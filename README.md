<div align="center" style="background: black; color: white; padding: 20px 0; border-radius: 5px;">
<h2 style="color: white;">
<img valign="middle" src="public/logo.png" alt="skale" width="48" /><br>
SKALE Chain — Admin UI
</h2>
<span style="font-size: small; padding: 2px 10px; letter-spacing: 2px; color: white; border-radius: 3px; font-weight: 700">DEVELOPER GUIDE</span>
</div>

# Install

```bash
yarn
yarn dev
```

# Prelude

<img src="./public/mascot.png" style="border-radius: 5px; display: block" align="left" width="136" height="136">

To build a flying car that actually flies:

- Make sure that the car is drivable at all times.

- Ensure that the modularity inspires _maintainable_ reusability.

- Meditate.

<br clear="both">

# :package: Features

Features are an implementation detail of the application-level usability of the network capabilities.

## Network feature

A groundwork extensively supporting typescript interfaces across network building blocks.

Core contracts are assigned IDs which are keys to:

- Typed ABIs
- 1st derivative wrappers (APIs)
- Roles

# :crystal_ball: Screens

In current micro-mono hybrid architecture, screens are HOC compositions of stateless `elements`.

:crystal_ball: It might help to think of screens as portals of stateful features.

This directly enables:

1. Portability of client-agnostic stateful features, and submodules.
2. Portability of stateful screens (react).

## Use via screens @ react

Dependency: `react-redux`, `tailwindcss`

**`store.js`**

```ts
import { context as analytics } from '@/screens/ChainAnalytics/ChainAnalytics';

export const store = configureStore({
  reducer: {
    ...analytics,
  },
});
```

**`view.jsx`**

```tsx
import ChainAnalytics from '@/screens/ChainAnalytics/ChainAnalytics';
import { store } from './store';

function View() {
  return (
    <Provider store={store}>
      <ChainAnalytics />
    </Provider>
  );
}
```

> Note: This can potentially evolve to zero-config with implicit reducer injection if in favor of usability

## [WIP] Use directly @ react

◼️ Within `react-redux` `<Provider store={store}>` context

```jsx
import { context, useAnalytics } from '@/features/analytics';

const { scope, reducers } = context;

export const store = configureStore({
  reducer: {
    ...reducers,
  },
});

function View() {
  useAnalytics(); // loads into store
  return <Provider store={store}></Provider>;
}
```

◼️ The submodules without any external store

```jsx
import { useBlockHistory, useWalletHistory } from '@/features/analytics';
```

# Exposed Packages

Following are being built along-side `admin-ui` app specifically for re-usability across ecosystem.

- `src/features`
- `src/screens`
- `src/components`: Reusable common components on SKALE's design system, built with headless accessible libraries
- `src/elements`: JSX UI Elements (ideally framework-agnostic)
- `src/types`

# Concept: Managing access control

Existing primary

```ts
export type ContractDetail = {
  type: ContractType;
  key: string;
  name: string;
  address: `0x${string}`;
};

export const CONTRACT = {
  [:ContractManifestId]: ContractDetail
} as const satisfies ContractManifest;
```

Precedent

```ts
// ~ pseudo-ts

export const ABI = {...} as const
satisfies { [key in ContractManifestId]: Abi }
```

Proposed extension

**`role.ts`**

```ts
// ~ pseudo-ts

type RoleFromContract<TContractId extends ContractId>; // extract from ts ABI (const)

type RoleId<TContractId extends ContractId> = Array<[TContractId, RoleFromContract<TContractId>]>

type RoleDetail = {
  key: string; // making role another possible vector in requests caching layer
  name: string; // basically RoleKey but not implicitly
  description: string;
}

// manfest const ROLE to be satisfied by
type RoleManifest = {
  [contractId as ContractId]: {
    [contractRoleId as RoleFromContract<contractId>]: RoleDetail
  }
}
```

> Note: Keys across the constants and types represent getters on contracts

### Advanced ACL rules (scope-overflow):

Identify members of contracts

```matlab
AddressableMember[] ⊆ filter(type:function && output*.type:address)`
```

`AddressibleMember` is a single or multi-address getter, which becomes candidate for `RoleDetail.owners[]`, `RoleDetail.granters[]` and `RoleDetail.grantees[]`. Each set could have further conditions, demanding an ACL tree, manually maintained or statically generated from contracts (modifier analysis).

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
