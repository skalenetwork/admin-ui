export type ChainManifestItem = {
  alias: string; // branded chain name (required)
  background: string; // background color (required)
  category: 'apps' | 'games'; // category: apps | games (required)
  url?: string; // url for dapp (optional)
  minSfuelWei?: string; // minimum allowed sFUEL (optional)
  faucetUrl?: string; // chain faucet URL (optional)
  description?: string; // description (optional)
};
