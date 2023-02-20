import { useSContractReads } from '@/features/network/hooks';

export function useStorageSpace() {
  const { data: dataRead } = useSContractReads('FILESTORAGE', {
    reads: [
      {
        name: 'getTotalStorageSpace',
      },
      {
        name: 'getTotalReservedSpace',
      },
    ],
  });
  const output = {
    totalStorageSpace: dataRead?.[0]?.toNumber(),
    totalReservedSpace: dataRead?.[0]?.toNumber(),
  };
  return output;
}
