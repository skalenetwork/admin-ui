export default function Multisig() {
  return (
    <div
      className="grid h-full w-full grid-rows-[50px_auto] grid-cols-[7fr_3fr]"
      style={{ gridTemplateRows: '50px auto', gridTemplateColumns: '7fr 3fr' }}
    >
      <div
        data-id="toolbar:wallet_select"
        data-s="0"
        className="col-span-full"
      ></div>
      <div data-id="scene" className="row-span-2 grid grid-cols-3 grid-rows-4">
        <div data-id="wallet_balance" data-s="0"></div>
        <div data-id="count_confirms" data-s="0"></div>
        <div data-id="count_owners" data-s="0"></div>
        <div data-id="count_txs" data-s="0"></div>
        <div data-id="count_pend_txs" data-s="0"></div>
        <div data-id="count_exe_txs" data-s="0"></div>
        <div
          data-id="list_owners"
          data-s="0"
          className="col-span-full row-start-3 row-end-5"
        ></div>
      </div>
      <div data-id="list_txs" data-s="0" className="row-span-2"></div>
    </div>
  );
}
