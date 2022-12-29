<div align="center" style="background: black; color: white; padding: 20px 0; border-radius: 5px; background: black url('https://global-uploads.webflow.com/625c39b93541414104a1d654/6278d9990c924b03af8b372c_skl-poster-00001.jpg') no-repeat fixed 80%; background-size: cover">
<h2 style="color: white;">
<img valign="middle" src="public/logo.png" alt="skale" width="48" /><br>
SKALE Chain Admin Dashboard
</h2>
<span style="font-size: small; padding: 2px 10px; letter-spacing: 2px; color: white; border-radius: 3px; font-weight: 700">GUIDE</span>
</div>

# Install

```bash
yarn
yarn dev
```

# :package: Features Usage

In current micro-mono hybrid architecture, screens being HOC compositions of stateless components, forward the context of features they consume.

It might help to think of screens as portals of stateful features. These portals depend on a redux store provider up the tree.

This directly enables:

1. Portability of client-agnostic stateful features, and submodules.
2. Portability of stateful screens (react) through _"bring your own redux store"_ strategy.

Example use:

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
