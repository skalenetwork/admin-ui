<div align="center" style="background: black; color: white; padding: 20px 0; border-radius: 5px; background: black url('https://global-uploads.webflow.com/625c39b93541414104a1d654/6278d9990c924b03af8b372c_skl-poster-00001.jpg') no-repeat fixed 80%; background-size: cover">
<h2 style="color: white;">
<img valign="middle" src="public/logo.png" alt="skale" width="48" /><br>
SKALE Chain Admin Dashboard
</h2>
<span style="font-size: small; padding: 2px 10px; letter-spacing: 2px; color: white; border-radius: 3px; font-weight: 700">CODE CONSTITUTION</span>
</div>

# Provisions

## Builds

- `vite` is fast with no magical ESM support, use polyfills

Example

```ts
import nodePolyfills from "rollup-plugin-polyfill-node";

resolve: {
    alias: {
        "@": path.resolve(__dirname, "./src"),
        "web3": 'web3/dist/web3.min.js'
    }
},
build: {
    outDir: './dist',
    rollupOptions: {
        plugins: [
            nodePolyfills()
        ]
    },
    commonjsOptions: {
        transformMixedEsModules: true
    }
}
```

## UI

- Headless only, combine `radix-ui` and `headless-ui`

- Style as needed with tailwind

## Forms

- With `react-hook-form` always use `FormContext`

## Wallets

- Only complete pack worth it is `ethers` + `wagmi` + `rainbowkit`
