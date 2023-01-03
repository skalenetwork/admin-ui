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

<img src="./public/mascot.png" style="border-radius: 5px; display: block" align="left" width="124" height="124">

To build a flying car that actually flies:

- Make sure that the car is drivable at all times.

- Ensure that the modularity inspires _maintainable_ reusability.

- Meditate.
  <br clear="both">

# :package: Features Usage

In current micro-mono hybrid architecture, screens being HOC compositions of stateless components, forward the context of features they consume.

:crystal_ball: It might help to think of screens as portals of stateful features. These portals depend on a redux store provider up the tree.

This directly enables:

1. Portability of client-agnostic stateful features, and submodules.
2. Portability of stateful screens (react) through _"bring your own redux store"_ strategy.

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
import { store } from './store';
import ChainAnalytics from '@/screens/ChainAnalytics/ChainAnalytics';

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

# Links

## Consumables

- [skale.js](https://github.com/Dirt-Road-Development/skale.js)

- [IMA-js](https://github.com/skalenetwork/ima-js)

- [RPC Support Spec](https://github.com/skalenetwork/skaled/blob/docs-v3.14.x/docs/modules/ROOT/pages/json-rpc-interface.adoc)

## Notable Projects

- [Multisig Wallet CLI](https://github.com/skalenetwork/multisigwallet-cli)

- [Metaport](https://github.com/skalenetwork/metaport)

- [Network UI](https://github.com/skalenetwork/network-ui)

- [Filestorage UI](https://github.com/skalenetwork/filestorage-ui)
