import Card from '@/components/Card/Card';
import Stepper from '@/components/Stepper/Stepper';
import Field from '@/elements/Field/Field';
import { NiceAddress } from '@/elements/NiceAddress';
import { ABI } from '@/features/network/abi/abi';
import { CONTRACT } from '@/features/network/contract';
import { useExplorer } from '@/features/network/hooks';
import { NETWORK } from '@/features/network/literals';
import ImaConnectToken from '@/screens/ImaConnectToken/ImaConnectToken';
import Prelay from '@/screens/Prelay';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams, useSearchParams } from 'react-router-dom';
import { tw } from 'twind';

import * as addresses from '@/features/network/address';

const wildcardAddresses = Object.values(addresses).map((x) => x.toLowerCase());

function liteEncodeAbiFunctions(abi) {
  return abi
    .filter((a) => a.type === 'function')
    .map((i) => `${i.name};${i.inputs?.length};${i.outputs?.length}`);
}

const wildcardLiteEncodedAbis = Object.entries(CONTRACT)
  .filter(([id, c]) => c.network === NETWORK.SKALE)
  .map(([id, c]) => ABI[id])
  .concat([])
  .map((oneAbi) => {
    return liteEncodeAbiFunctions(oneAbi);
  });

export default function ImaMapToken() {
  const { chainName } = useParams();
  const [searchParam] = useSearchParams();

  const standard = (searchParam.get('standard') || '').toUpperCase();

  const targetIsMainnet = chainName === 'ethereum';

  const [originTokens] = useExplorer([
    {
      module: 'contract',
      action: 'listcontracts',
      args: {
        page: '1',
        offset: '100',
        filter: 'verified',
      },
    },
  ]);

  const originTokensFiltered: { address: string; name: string }[] =
    originTokens.isSuccess && originTokens?.data?.result
      ? originTokens.data.result
          .filter((c) => {
            const matchable = liteEncodeAbiFunctions(JSON.parse(c['ABI']));
            const abiMatches = wildcardLiteEncodedAbis.some((wildcard) => {
              const foundInWildcard = matchable.filter((func) =>
                wildcard.includes(func),
              ).length;
              const ratio = foundInWildcard / wildcard.length;
              return ratio > 0.9;
            });
            abiMatches && console.log('catches', abiMatches, c.ContractName);
            c['ContractName'] === 'TransparentUpgradeableProxy' &&
              console.log('Proxythingy', matchable);
            return (
              !abiMatches &&
              !wildcardAddresses.includes(c.Address.toLowerCase())
            );
          })
          .map((c: { Address: string; ContractName: string }) => ({
            address: c.Address,
            name: c.ContractName,
          }))
      : [];

  // const { api } = useContractApi({
  //   id: 'TOKEN_MANAGER_LINKER',
  // });

  type OriginTokenData = {
    originContractAddress: string;
  };

  const form1 = useForm<OriginTokenData>({
    mode: 'all',
    reValidateMode: 'onChange',
    defaultValues: {
      originContractAddress: '',
    },
  });

  const steps: Parameters<typeof Stepper>['0']['steps'] = standard
    ? [
        {
          id: 'select-origin',
          label: 'Select origin token',
          content: ({ stepNext, stepPrev }) => (
            <FormProvider {...form1}>
              <form
                onSubmit={form1.handleSubmit(
                  (data) => {
                    window.alert(JSON.stringify(data));
                    stepNext();
                  },
                  (err) => {
                    window.alert(JSON.stringify(err));
                  },
                )}
              >
                <div className="flex flex-col justify-center h-full w-3/4 m-auto flex-wrap">
                  <p className="font-medium pb-8">
                    Available tokens on origin:
                  </p>
                  <div className="flex flex-col h-32 overflow-auto ">
                    {originTokens.isFetching || originTokens.isLoading ? (
                      <Prelay>
                        <span className="animate-bounce px-2">ʕ￫ᴥ￩ʔ</span>{' '}
                        Holdon... Bera fetching alot of tokens!
                      </Prelay>
                    ) : (
                      [...originTokensFiltered].map((token) => (
                        <button
                          key={token.address}
                          className={tw(
                            'p-2 rounded-lg transition-all delay-75 mx-2',
                            token.address ===
                              form1.watch('originContractAddress')
                              ? 'bg-[var(--slate1)]'
                              : 'hover:bg-[var(--slate)]',
                          )}
                          onClick={(e) => {
                            e.preventDefault();
                            form1.setValue(
                              'originContractAddress',
                              token.address,
                            );
                          }}
                        >
                          <NiceAddress
                            address={token.address}
                            label={token.name}
                          />
                        </button>
                      ))
                    )}
                  </div>
                  <div className="text-center py-4 flex flex-row justify-center items-center gap-4">
                    <div className="bg-[var(--gray8)] w-1/6 h-[1px]"></div>
                    <p className="font-semibold">OR</p>
                    <div className="bg-[var(--gray8)] w-1/6 h-[1px]"></div>
                  </div>
                  <Field<OriginTokenData>
                    className="w-1/2"
                    control={() => <input type="text"></input>}
                    name="originContractAddress"
                    label="Contract Address"
                    placeholder="0x..."
                    required="Please provide the address for token on origin chain"
                    pattern={{
                      value: /^0x[a-fA-F0-9]{40}$/,
                      message: 'Address is invalid',
                    }}
                  />
                  <button className="btn" type="submit">
                    Next
                  </button>
                </div>
              </form>
            </FormProvider>
          ),
        },
        {
          id: 'select-target',
          label: `Add ${standard} token`,
          content: () => <div>Select Target</div>,
        },
        {
          id: 'set-permissions',
          label: `Set permissions`,
          content: () => <div>Set Permissions</div>,
        },
        {
          id: 'map-token',
          label: `Map token`,
          content: () => <div>Map token</div>,
        },
      ]
    : [];
  return standard ? (
    <div className="grid h-full w-full rounded-lg bg-[var(--white)]">
      <Card full heading={`Add ${standard} with ${chainName}`}>
        <Stepper
          steps={steps}
          className="h-full grid grid-rows-[max-content_1fr]"
        />
      </Card>
    </div>
  ) : (
    <ImaConnectToken />
  );
}
