import { describe, expect, it } from 'vitest';

import { useConnect } from 'wagmi';
import { act, actConnect, renderHook } from '../test';
import { useSContractWrite } from './hooks';

function useSContractWriteWithConnect(
  id: Parameters<typeof useSContractWrite>[0],
  config: Parameters<typeof useSContractWrite>[1],
) {
  return {
    connect: useConnect(),
    contractWrite: useSContractWrite(id, config),
  };
}

describe('useContractWrite', () => {
  describe('mounts', () => {
    it('is in the right shape', async () => {
      const { result } = renderHook(() =>
        useSContractWrite('CONFIG_CONTROLLER', {
          name: 'enableMTM',
          request: undefined,
        }),
      );
      const { current } = result;
      expect(current).toHaveProperty('eoa');
      expect(current).toHaveProperty('mnm');
      expect(current.mnm.action).toBe('wait-auth');
      expect(current).toMatchObject({
        action: 'eoa',
        errorOnPrepare: null,
        isErrorOnPrepare: false,
        isConfirmed: false,
        isFailed: false,
        mnm: {
          action: 'wait-auth',
        },
      });
    });
  });

  describe.todo('auhtorization', () => {});

  describe.todo('return value', () => {
    describe.todo('writeAsync', () => {
      it('prepared', async () => {
        const utils = renderHook(() =>
          useSContractWriteWithConnect('CONFIG_CONTROLLER', {
            name: 'enableMTM',
          }),
        );

        const { result, waitFor } = utils;
        await actConnect({ utils });

        await waitFor(() =>
          expect(result.current.contractWrite.writeAsync).toBeDefined(),
        );

        await act(async () => {
          const res = await result.current.contractWrite.writeAsync?.();
          expect(res?.hash).toBeDefined();
        });

        await waitFor(() =>
          expect(result.current.contractWrite.isSuccess).toBeTruthy(),
        );

        const { data, variables, ...res } = result.current.contractWrite;
        expect(data).toBeDefined();
        expect(data?.hash).toBeDefined();
        expect(variables).toBeDefined();
      });

      it('throws error', async () => {
        const utils = renderHook(() =>
          useSContractWriteWithConnect('CONFIG_CONTROLLER', {
            name: 'enableMTM',
          }),
        );

        const { result, waitFor } = utils;
        await actConnect({ utils });

        await act(async () => {
          await expect(
            result.current.contractWrite.writeAsync?.(),
          ).rejects.toThrowErrorMatchingInlineSnapshot('');
        });
        await waitFor(() =>
          expect(result.current.contractWrite.isError).toBeTruthy(),
        );
      });
    });
  });
});
