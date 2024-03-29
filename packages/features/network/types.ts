export type ChainManifestItem = {
  alias: string; // branded chain name (required)
  background: string; // background color (required)
  category: 'apps' | 'games'; // category: apps | games (required)
  url?: string; // url for dapp (optional)
  minSfuelWei?: string; // minimum allowed sFUEL (optional)
  faucetUrl?: string; // chain faucet URL (optional)
  description?: string; // description (optional)
};
export type NetworkType = 'mainnet' | 'staging';
export type ConnectionStatus = 'full' | 'origin' | 'target' | 'none';

export type RoleFragment = {
  type: 'function';
  name: `${string}_ROLE`;
} & (
  | {
      stateMutability: 'view';
    }
  | { constant: true }
);
