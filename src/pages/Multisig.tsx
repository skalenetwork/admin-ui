export default function Multisig() {
  return (
    <div className="grid h-full w-full grid-rows-[50px_auto] grid-cols-[7fr_3fr]">
      <div data-id="toolbar:wallet_select" className="col-span-full"></div>
      <div data-id="scene" className="row-span-2 grid grid-cols-3 grid-rows-4">
        <div data-id="wallet_balance"></div>
        <div data-id="count_confirms"></div>
        <div data-id="count_owners"></div>
        <div data-id="count_txs"></div>
        <div data-id="count_pend_txs"></div>
        <div data-id="count_exe_txs"></div>
        <div
          data-id="list_owners"
          className="col-span-full row-start-3 row-end-5"
        ></div>
      </div>
      <div data-id="list_txs" className="row-span-2"></div>
    </div>
  );
}
