import { ABI } from '@/features/network/abi/abi';
import { CONTRACT } from '@/features/network/contract';
import { useExplorer } from '@/features/network/hooks';
import { NETWORK, TOKEN_STANDARD } from '@/features/network/literals';
import { ethers } from 'ethers';
import { toSentenceCase } from '../../../utils';

export function useHistory({
  network = NETWORK.ETHEREUM,
}: {
  network?: typeof NETWORK.ETHEREUM | typeof NETWORK.SKALE;
}) {
  const standards = [
    TOKEN_STANDARD.ERC20,
    TOKEN_STANDARD.ERC721,
    TOKEN_STANDARD.ERC1155,
  ];
  const ifaces = standards.map(
    ({ name }) =>
      new ethers.utils.Interface(ABI[`TOKEN_MANAGER_${name.toUpperCase()}`]),
  );
  const props = standards.map(({ name, label }) => ({
    module: 'logs',
    action: 'getLogs',
    args: {
      address: CONTRACT[`TOKEN_MANAGER_${name.toUpperCase()}`].address,
      fromBlock: '0',
      toBlock: 'latest',
    },
  }));

  const explorerLogs = useExplorer(props);
  const eventTuple = explorerLogs.map((explorerLogs, index) => {
    const iface = ifaces[index];
    return iface && explorerLogs.isSuccess
      ? (explorerLogs?.data?.result as []).map(function (
          log: Omit<ethers.providers.Log, 'blockHash'> & { timeStamp: string },
          index: number,
        ) {
          // filter because rpc fetched logs don't have null members in topic
          log.topics = log.topics.filter((topic) => topic !== null);
          let parsedLog;
          try {
            parsedLog = iface.parseLog(log);
          } catch (e) {
            parsedLog = { name: 'unknown' };
          }
          return {
            timestamp: ethers.BigNumber.from(log.timeStamp).toNumber(),
            name: parsedLog.name,
            label: toSentenceCase(parsedLog.name),
            value: log.data,
            params: parsedLog.args,
          };
        })
      : [];
  });

  const events = [...eventTuple[0], ...eventTuple[1], ...eventTuple[2]].sort(
    (a, b) => b.timestamp - a.timestamp,
  );

  return {
    events,
  };
}
