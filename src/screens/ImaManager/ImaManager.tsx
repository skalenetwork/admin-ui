import Card from '@/components/Card/Card';
import Stepper from '@/components/Stepper/Stepper';

const TransactionItem = ({id, actionText, author, blocksElapsed}: {id: string, actionText: string; author: string, blocksElapsed?: number}) => {
  return (
    <div className='flex flex-col bg-[var(--slate4)] text-[var(--slate12)] px-12 py-2 rounded-lg'>
      <div>{id} - {actionText} by {author}</div>
      <div className="text-sm text-[var(--slate8)]">About {blocksElapsed} blocks ago</div>
    </div>
  )

}

export default function ImaManager() {
  const steps = [
    {
      id: 'select-origin',
      label: 'Select Origin',
      content: (
        <div>
          <p>Select Origin</p>
        </div>
      ),
    },
    {
      id: 'select-target',
      label: 'Select Target',
      content: <div>Select Target</div>,
    },
  ];

  return (
    <div className="grid grid-rows-2 h-full w-full rounded-lg bg-[var(--white)]">
      <Card heading="Connected chains">
        <Stepper steps={steps} />
      </Card>
      <Card full heading="Recent transactions" bodyClass='scrollbar flex flex-col gap-3'>
        {[1,2,3,5,6,7,8].map(x => <TransactionItem id={x} actionText="Add ERC-20 Token" author="owner" blocksElapsed={20} />)}
      </Card>
      {/* <div data-id="main"></div>
      <div data-id="collapse"></div> */}
    </div>
  );
}
