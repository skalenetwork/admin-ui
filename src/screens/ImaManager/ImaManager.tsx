import Stepper from '@/components/Stepper/Stepper';

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
    <div className="grid h-full w-full rounded-lg bg-[var(--white)]">
      <Stepper steps={steps} />
      {/* <div data-id="main"></div>
      <div data-id="collapse"></div> */}
    </div>
  );
}
