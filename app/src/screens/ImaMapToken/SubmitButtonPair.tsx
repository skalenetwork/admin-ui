import { CaretLeftIcon } from '@radix-ui/react-icons';
import { tw } from 'twind';

export const SubmitButtonPair = ({
  stepPrev,
  stepNext,
  text = 'Submit',
  isReady = false,
  isLoading = false,
}: {
  isReady: boolean;
  isLoading?: boolean;
  stepPrev?: () => void;
  stepNext?: () => void;
  text?: string;
}) => {
  return (
    <div className="flex items-center justify-center gap-4 py-4">
      {stepPrev && (
        <button
          className="btn btn-outline"
          onClick={(e) => {
            e.preventDefault();
            stepPrev();
          }}
        >
          <CaretLeftIcon />
        </button>
      )}
      <button
        className={tw('btn', isLoading ? 'loading' : '')}
        type="submit"
        disabled={!isReady || isLoading}
      >
        {text}
      </button>
    </div>
  );
};
