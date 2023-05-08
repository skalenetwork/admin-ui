export const StepComplete = () => {
  return (
    <div className="w-1/2 m-auto flex h-full flex-col justify-center gap-4">
      <h3 className="text-[#B16F0A] text-center">
        You have finished mapping your token!
      </h3>
      <div className="flex flex-col gap-4 justify-center items-center">
        <Link className="btn text-center w-64" to="/ima_manager">
          Map another token
        </Link>
        <Link className="btn text-center w-64" to="/ima_manager/connect">
          Connect a new chain
        </Link>
        <Link className="btn text-center w-64" to="/">
          Go to dashboard
        </Link>
      </div>
    </div>
  );
};
