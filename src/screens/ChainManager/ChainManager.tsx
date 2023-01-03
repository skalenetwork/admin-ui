import Card from '@/components/Card/Card';

export default function ChainManager() {
  return (
    <>
      <div className="grid h-full w-full grid-cols-2 grid-rows-3">
        <div data-id="contract_deploy" data-s="1">
          <Card
            full
            heading={
              <>
                Free Contract Deployment{' '}
                <span className="ml-6 text-sm text-[var(--green6)]">
                  Enabled
                </span>
              </>
            }
          >
            <div className="flex h-full flex-col justify-around">
              <p className="text-[var(--gray10)]">
                Authorization to deploy contracts on the chain is removed.
                <br />
                Anybody can deploy contracts on the chain!
              </p>
              <center>
                <button className="btn-wide">Disable FCD</button>
              </center>
            </div>
          </Card>
        </div>
        <div data-id="mtm" data-s="0"></div>
        <div data-id="filestorage" data-s="0"></div>
        <div data-id="chainlist" data-s="0"></div>
        <div data-id="chain_metadata" data-s="0"></div>
      </div>
    </>
  );
}
