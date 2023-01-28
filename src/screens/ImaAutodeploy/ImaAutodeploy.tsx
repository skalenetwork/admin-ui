import Card from '@/components/Card/Card';
import Stepper from '@/components/Stepper/Stepper';

const SingleConfig = ({
  title,
  status,
  onClick,
}: {
  title: string;
  status: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="flex flex-row items-center rounded-lg border py-2 px-4">
      <div>
        <h6 className="font-medium">{title}</h6>
        {status == true ? (
          <p className="text-sm leading-none text-[var(--green7)]">Enabled</p>
        ) : (
          <p className="text-sm leading-none text-[var(--red7)]">Disabled</p>
        )}
      </div>
      <div className="ml-auto">
        {status == true ? (
          <button className="negative w-36" onClick={onClick}>
            Disable
          </button>
        ) : (
          <button className="positive w-36" onClick={onClick}>
            Enable
          </button>
        )}
      </div>
    </div>
  );
};

export default function ImaAutodeploy() {
  return (
    <div className="grid h-full w-full rounded-lg bg-[var(--white)] p-4">
      <Card
        full
        className="max-w-lg"
        heading="SKALE Chain automatic deployment manager"
      >
        <div className="py-4">
          <SingleConfig
            title="ERC1155 Token Manager"
            status={true}
            onClick={() => {}}
          />
        </div>
      </Card>
    </div>
  );
}
