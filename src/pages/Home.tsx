export default function Home() {
  return (
    <div className="grid h-full grid-rows-[1fr_3fr]">
      <div className="grid grid-cols-2">
        <div data-id="blocks"></div>
        <div data-id="total_gas_save"></div>
      </div>
      <div className="grid grid-cols-3">
        <div className="grid grid-rows-[3fr_2fr]">
          <div data-id="active_users"></div>
          <div data-id="ima_pool"></div>
        </div>
        <div data-id="transactions+chart"></div>
        <div data-id="gas_save+chart"></div>
      </div>
    </div>
  );
}
