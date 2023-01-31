import Card from '@/components/Card/Card';
import Stepper from '@/components/Stepper/Stepper';
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
        <div>
          <p>Select Origin: {chainName}</p>
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
    <div className="grid h-full w-full grid-rows-2 rounded-lg bg-[var(--white)]">
      <Card heading={`Add ${standard} with ${chainName}`}>
        <Stepper steps={steps} />
      </Card>
    </div>
  );
}
