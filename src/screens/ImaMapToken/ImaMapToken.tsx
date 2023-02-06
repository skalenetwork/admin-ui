import Card from '@/components/Card/Card';
import Stepper from '@/components/Stepper/Stepper';
import { NiceAddress } from '@/elements/NiceAddress';
import { useParams, useSearchParams } from 'react-router-dom';

export default function ImaMapToken() {
  const { chainName } = useParams();
  const [searchParam] = useSearchParams();

  const standard = (searchParam.get('standard') || '').toUpperCase();

  const steps = [
    {
      id: 'select-origin',
      label: 'Select origin token',
      content: (
        <div className="flex flex-col justify-center h-full w-3/4 m-auto">
          <p className="font-medium pb-8">Available tokens on {chainName}:</p>
          <NiceAddress
            className="gap-1"
            address="0xF3a2eEBcad289dC01acFBa45eDC34b"
            label="USDC"
            iconUrl="/logo.png"
          />
        </div>
      ),
    },
    {
      id: 'select-target',
      label: `Add ${standard} token`,
      content: <div>Select Target</div>,
    },
    {
      id: 'set-permissions',
      label: `Set permissions`,
      content: <div>Set Permissions</div>,
    },
    {
      id: 'map-token',
      label: `Map token`,
      content: <div>Map token</div>,
    },
  ];
  return (
    <div className="grid h-full w-full rounded-lg bg-[var(--white)]">
      <Card full heading={`Add ${standard} with ${chainName}`}>
        <Stepper
          steps={steps}
          className="h-full grid grid-rows-[max-content_1fr]"
        />
      </Card>
    </div>
  );
}
