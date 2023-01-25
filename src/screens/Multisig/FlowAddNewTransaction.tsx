import Dialog from '@/components/Dialog/Dialog';
import { Switch } from '@/components/Switch/Switch';
import Field from '@/elements/Field/Field';
import { useMultisig } from '@/features/multisig/hooks';
import { Abi, AbiFunction, AbiParameter, AbiType } from 'abitype';
import { ethers } from 'ethers';
import {
  useState,
  useLayoutEffect,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import {
  useForm,
  FormProvider,
  useWatch,
  useFieldArray,
} from 'react-hook-form';
import { toSentenceCase } from '../../utils';
import { useSigner, useAccount, useBalance } from 'wagmi';
import { AlertProps } from '../ChainManager/types';
import { MultisigOwner } from './MultisigOwner';
import { NiceAddress } from './NiceAddress';

import { addresses } from '@/features/network/addresses';
import { ConfigControllerABI } from '@/features/network/abi-configcontroller';
import { MarionetteABI } from '@/features/network/abi-marionette';
import { MultisigWalletABI } from '@/features/network/abi-multisigwallet';

export type InfoFormData = {
  contractAddress: string;
  contractABI: string;
  contractMethod: string;
  hexMode: boolean;
  hexData?: string;
  parameters: { name: string; type: string; value: string }[];
  encoded: string;
};

export type AdvancedFormData = {
  nonce: number;
  gasAmount: number;
};

export type DataOut = InfoFormData & AdvancedFormData;

const predeployedAddresses = {
  ConfigController: addresses.SCHAIN_CONFIG_CONTROLLER_ADDRESS,
  Marionette: addresses.SCHAIN_MARIONETTE_ADDRESS,
  Etherbase: addresses.SCHAIN_ETHERBASE_ADDRESS,
  MultisigWallet: addresses.SCHAIN_MULTISIG_WALLET_ADDRESS,
  Context: addresses.SCHAIN_CONTEXT_ADDRESS,
} as const;

const predeployedAbis = {
  ConfigController: JSON.stringify(ConfigControllerABI),
  Marionette: JSON.stringify(MarionetteABI),
  MultisigWallet: JSON.stringify(MultisigWalletABI),
} as const;

export function FlowAddNewTransaction({
  id = 'add_new_transaction',
  alertKey,
  toggleAlert,
  onSubmit,
}: AlertProps & { onSubmit: (data: DataOut) => void }) {
  const [step, setStep] = useState(1);

  const account = useAccount();
  const balance = useBalance({
    address: account.address,
  });

  // reset
  useLayoutEffect(() => {
    if (alertKey !== id) {
      window.setTimeout(() => {
        setStep(1);
        // add forms reset here
      }, 1000);
    }
  }, [alertKey]);

  const form = [
    useForm<InfoFormData>({
      mode: 'all',
      reValidateMode: 'onChange',
      defaultValues: {
        contractMethod: '',
        contractABI: '[]',
        encoded: '',
      },
    }),
    useForm<AdvancedFormData>({
      mode: 'all',
      reValidateMode: 'onChange',
      defaultValues: {
        nonce: 1,
        gasAmount: 450213,
      },
    }),
  ] as const;

  const { fields, append, remove, insert, replace } = useFieldArray({
    control: form[0].control,
    name: 'parameters',
  });

  const infoForm = form[0].watch();

  const {
    contractAddress,
    contractABI,
    contractMethod,
    hexMode,
    hexData,
    parameters,
  } = infoForm;

  const contractFunctions = useMemo(() => {
    if (form[0].getFieldState('contractABI').invalid) {
      return [];
    }
    try {
      let abi: Abi = JSON.parse(infoForm.contractABI);
      return (
        abi.filter((item) => item.type === 'function') as AbiFunction[]
      ).map((definition: AbiFunction) => {
        let formattedParams = [];
        let canonicalParams = [];
        for (let input in definition.inputs) {
          formattedParams.push(input.type + ' ' + input.name);
          canonicalParams.push(input.type);
        }
        const canonical = `${canonicalParams.join(',')}`;
        const formatted = `${formattedParams.join(', ')}`;
        return {
          definition,
          argsCanonical: canonical,
          argsFormatted: formatted,
          label: toSentenceCase(definition.name),
        };
      });
    } catch (e) {
      console.error(e);
      return [];
    }
  }, [infoForm.contractABI]);

  const contractFunction = useMemo(() => {
    return contractFunctions.find((f) => f.definition.name === contractMethod);
  }, [contractFunctions, contractMethod]);

  const contractInterface = useMemo(() => {
    if (form[0].getFieldState('contractABI').invalid) return;
    try {
      return new ethers.utils.Interface(contractABI);
    } catch (e) {}
  }, [form[0].getFieldState('contractABI').invalid, contractABI]);

  /**
   * Set contract ABI if predeployed contract address used
   */
  useEffect(() => {
    if (!contractAddress) return;
    const key = Object.keys(predeployedAddresses).find(
      (key) =>
        predeployedAddresses[key].toLowerCase() ===
        contractAddress.toLocaleLowerCase(),
    );
    if (key) {
      form[0].setValue('contractABI', predeployedAbis[key] || '');
      form[0].trigger('contractABI');
    }
  }, [contractAddress]);

  /**
   * Set fields based on contract function
   */
  useEffect(() => {
    replace([]); // clear params because reset won't
    form[0].resetField('parameters'); // this should clear array by itself, but doesn't
    if (!contractFunction) return;
    // @todo: re-evaluate this immediate set after reset
    const data = contractFunction?.definition.inputs.map((input, index) => ({
      name: input.name || `${index} - ${input.type}`,
      type: input.type,
      value: input.type === 'bool' ? false : '',
    }));
    data && replace(data);
  }, [contractFunction]);

  /**
   * Prepare final hex encoded data
   */
  const [encodedValue, encodedValueError] = useMemo(() => {
    let data;
    let error;
    try {
      data = hexMode
        ? hexData
        : contractMethod && contractInterface
        ? contractInterface.encodeFunctionData(
            contractMethod,
            parameters?.length
              ? parameters.map((param) => param.value)
              : undefined,
          )
        : '';
    } catch (e) {
      error = {
        reason: e.reason,
        code: e.code,
        argument: e.argument,
        value: e.value,
      };
    }
    return [data, error];
  }, [hexMode, contractInterface, contractMethod, JSON.stringify(parameters)]);

  form[0].register('encoded', {
    required: true,
  });

  useEffect(() => {
    if (!encodedValue) return;
    form[0].setValue('encoded', encodedValue);
    form[0].trigger('encoded');
  }, [encodedValue]);

  useEffect(() => {
    if (!encodedValueError) {
      form[0].clearErrors('encoded');
    } else {
      form[0].setError('encoded', {
        message: `"${encodedValueError.argument}=${encodedValueError.value}" is ${encodedValueError.reason}`,
      });
    }
  }, [encodedValueError]);

  const handleFinalSubmit = useCallback(
    (lastFormData) => {
      const data = {
        ...form[0].getValues(),
        ...form[1].getValues(),
      };
      onSubmit(data);
      console.log('handleFinalSubmit', data);
      toggleAlert(id)(false);
    },
    [form],
  );

  return (
    <Dialog
      trigger={
        <p className="cursor-pointer text-[var(--primary)]">
          +{' '}
          <span className="underline underline-offset-4 hover:underline-offset-2">
            New Transaction
          </span>
        </p>
      }
      title={`Add new transaction`}
      description={`Step ${step} of 2`}
      open={alertKey === id}
      onOpenChange={toggleAlert(id)}
      activeStep={step}
      steps={[
        {
          onSubmit: form[0].handleSubmit(
            (data) => {
              console.log(data);
              setStep((step) => step + 1);
              return data;
            },
            (err) => console.error(err),
          ),
          actionElement: ({ className }) => (
            <input
              type="submit"
              className={`${className}`}
              value="Next"
              disabled={!form[0].formState.isValid}
            />
          ),
          content: (
            <FormProvider {...form[0]}>
              <div>
                <div className="pb-4">
                  <p className="pb-4 text-sm">Contract interaction</p>
                  {account.address ? (
                    <NiceAddress
                      address={account.address as string}
                      balance={`${balance.data?.formatted} ${balance.data?.symbol}`}
                      copyable
                    />
                  ) : (
                    <p className="sm">Not signed in</p>
                  )}
                </div>
                <div className="w-3/4">
                  <Field<InfoFormData>
                    control={() => <input type="text" />}
                    name="contractAddress"
                    label="Contract Address"
                    placeholder="Contract Address"
                    setValueAs={(val: string) =>
                      val.includes('0x')
                        ? val
                        : predeployedAddresses[val] || val
                    }
                    pattern={{
                      value: /^0x[a-fA-F0-9]{40}$/,
                      message: 'Address is invalid',
                    }}
                    required="Please provide a contract address"
                  />
                  <Field<InfoFormData>
                    control={() => (
                      <textarea
                        className="scrollbar font-mono text-sm"
                        rows={5}
                      />
                    )}
                    name="contractABI"
                    label="Contract ABI"
                    placeholder="Contract ABI"
                    required="Context ABI is required"
                    setValueAs={(val) => {
                      try {
                        return JSON.stringify(JSON.parse(val), undefined, 2);
                      } catch (e) {}
                      return val;
                    }}
                    validate={(val) => {
                      let what: boolean | string = true;
                      try {
                        JSON.parse(val);
                      } catch (e) {
                        what = 'ABI is not a valid JSON';
                      }
                      return what;
                    }}
                  />
                  <Field<InfoFormData>
                    control={() => <input type="checkbox" />}
                    name="hexMode"
                    label="Use custom data (hex encoded)"
                  />
                  {hexMode ? (
                    <Field<InfoFormData>
                      control={() => <input type="text" />}
                      name="hexData"
                      label="Hex Data"
                      placeholder="0x.."
                      required={hexMode ? 'Message is required' : false}
                      disabled={!hexMode}
                    />
                  ) : (
                    <>
                      <Field<InfoFormData>
                        control={() => (
                          <select>
                            {contractFunctions.map((signature) => (
                              <option value={signature.definition.name}>
                                {signature.label}
                              </option>
                            ))}
                          </select>
                        )}
                        name="contractMethod"
                        label="Function"
                        placeholder="Contract function"
                        required="You do need to invoke a function!"
                        disabled={
                          form[0].getFieldState('contractABI').invalid ||
                          (contractABI && contractABI === '[]')
                        }
                      />
                      {fields.length ? (
                        fields.map((field, index) => (
                          <Field<InfoFormData>
                            key={field.id}
                            control={() => (
                              <input
                                type={
                                  field.type === 'bool'
                                    ? 'checkbox'
                                    : field.type.includes('uint')
                                    ? 'number'
                                    : 'text'
                                }
                              />
                            )}
                            name={`parameters.${index}.value` as const}
                            label={field.name}
                            placeholder={field.type}
                            required={!hexMode && `${field.name} is required`}
                          />
                        ))
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </div>
                <div className="max-w-[400px]">
                  {form[0].getFieldState('encoded').error && (
                    <p className="text-xs text-red-500">
                      <span className="font-medium">Param Errors:</span>{' '}
                      {form[0].getFieldState('encoded').error?.message}
                    </p>
                  )}
                </div>
              </div>
            </FormProvider>
          ),
        },
        {
          onSubmit: form[1].handleSubmit(handleFinalSubmit),
          actionElement: ({ className }) => (
            <input type="submit" className={`${className}`} value="Submit" />
          ),
          cancelElement: ({ className }) => (
            <div
              className={`${className}`}
              onClick={(e) => setStep((value) => value - 1)}
            >
              Back
            </div>
          ),
          content: (
            <div className="w-[600px]">
              <div className="grid w-full gap-y-2">
                <p className="font-medium">Details:</p>
                <div>
                  <p className="text-[var(--gray10)]">Contract address</p>
                  <NiceAddress
                    address={form[0].getValues('contractAddress')}
                    copyable
                  />
                </div>
                {!hexMode ? (
                  <>
                    <div>
                      <p className="text-[var(--gray10)]">Method</p>
                      <span className="font-mono">
                        {form[0].getValues('contractMethod')}
                      </span>
                    </div>
                    {(form[0].getValues('parameters') || []).map((param) => (
                      <div>
                        <p className="text-[var(--gray10)]">{param.name}</p>
                        <span className="font-mono">"{param.value}"</span>
                      </div>
                    ))}
                  </>
                ) : (
                  <></>
                )}
                <div>
                  <p className="text-[var(--gray10)]">Data (hex)</p>
                  <textarea
                    autoCorrect="off"
                    spellCheck="false"
                    readOnly
                    className="scrollbar w-full bg-[var(--gray1)] p-2 font-mono"
                  >
                    {form[0].getValues('encoded')}
                  </textarea>
                </div>
                <div>
                  <FormProvider {...form[1]}>
                    <p className="text-[var(--gray10)]">Advanced parameters</p>
                    <div>
                      <Field<AdvancedFormData>
                        control={() => <input type="number" />}
                        name="nonce"
                        label="Nonce"
                        placeholder="Nonce"
                        min={1}
                        required="Transaction nonce is required"
                        valueAsNumber={true}
                      />
                      <Field<AdvancedFormData>
                        control={() => <input type="number" />}
                        name="gasAmount"
                        label="Gas Amount"
                        placeholder="Gas Amount"
                        required="Gas amount is required"
                        valueAsNumber={true}
                      />
                    </div>
                  </FormProvider>
                  <p className="center py-2 text-[var(--gray10)]">
                    Please comfirm transaction creation with your currently
                    connected wallet
                  </p>
                </div>
              </div>
            </div>
          ),
        },
      ]}
    ></Dialog>
  );
}
