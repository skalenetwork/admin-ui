import { ConnectionStatus } from '@/features/network/types';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export const FormattedPeerChain = ({
  name,
  connectionStatus,
}: {
  name: string;
  connectionStatus: ConnectionStatus;
}) => (
  <div className="flex flex-row items-start justify-start gap-2">
    {connectionStatus === 'target' && (
      <div className="h-6 w-6 text-[var(--primary)]">
        <ExclamationCircleIcon />
      </div>
    )}
    <div className="flex flex-col gap-4">
      <h5 className="font-medium">{name}</h5>
      <div className="flex items-center gap-2">
        <svg
          width="14"
          height="12"
          viewBox="0 0 14 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {connectionStatus === 'origin' || connectionStatus === 'full' ? (
            <path
              d="M6 10C6 11.1046 5.07999 12.0326 4.03621 11.6713C1.68693 10.8579 0 8.62595 0 6C0 3.37405 1.68693 1.14211 4.03621 0.328744C5.07999 -0.0326319 6 0.895431 6 2V10Z"
              fill="var(--green10)"
            />
          ) : (
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M0 6C0 8.97446 2.16441 11.4434 5.00419 11.9177C5.54892 12.0087 6 11.5523 6 11V11C6 10.4477 5.54533 10.0128 5.01012 9.87657C3.27976 9.43606 2 7.86748 2 6C2 4.13252 3.27976 2.56394 5.01012 2.12343C5.54533 1.98717 6 1.55228 6 1V1C6 0.447715 5.54893 -0.00873472 5.00419 0.0822574C2.16441 0.556609 0 3.02554 0 6Z"
              fill="var(--red10)"
            />
          )}
          {connectionStatus === 'target' || connectionStatus === 'full' ? (
            <path
              d="M8 10C8 11.1046 8.92001 12.0326 9.96379 11.6713C12.3131 10.8579 14 8.62595 14 6C14 3.37405 12.3131 1.14211 9.96379 0.328744C8.92001 -0.0326319 8 0.895431 8 2V10Z"
              fill="var(--green10)"
            />
          ) : (
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14 5.92936C14 8.90382 11.8356 11.3727 8.99581 11.8471C8.45108 11.9381 8 11.4816 8 10.9294V10.9294C8 10.3771 8.45467 9.94219 8.98988 9.80593C10.7202 9.36542 12 7.79684 12 5.92936C12 4.06188 10.7202 2.4933 8.98988 2.05279C8.45467 1.91653 8 1.48164 8 0.929359V0.929359C8 0.377074 8.45107 -0.0793755 8.99581 0.0116166C11.8356 0.485968 14 2.9549 14 5.92936Z"
              fill="var(--red10)"
            />
          )}
        </svg>
        <span className="text-sm text-[var(--slate10)]">
          {connectionStatus === 'full'
            ? 'Connected'
            : connectionStatus === 'origin'
            ? 'Partially connected'
            : connectionStatus === 'target'
            ? 'Request for connection'
            : 'Not connected'}
        </span>

        {/* <svg
          width="14"
          height="12"
          viewBox="0 0 14 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0 6C0 8.97446 2.16441 11.4434 5.00419 11.9177C5.54892 12.0087 6 11.5523 6 11V11C6 10.4477 5.54533 10.0128 5.01012 9.87657C3.27976 9.43606 2 7.86748 2 6C2 4.13252 3.27976 2.56394 5.01012 2.12343C5.54533 1.98717 6 1.55228 6 1V1C6 0.447715 5.54893 -0.00873472 5.00419 0.0822574C2.16441 0.556609 0 3.02554 0 6Z"
            fill="#299764"
          />
        </svg> */}

        {/* <svg
          width="30"
          height="19"
          viewBox="0 0 30 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.48645 13.2857H13.0894V15H6.48645C4.96874 15 3.51319 14.413 2.44001 13.3682C1.36682 12.3233 0.763916 10.9062 0.763916 9.42857C0.763916 7.95094 1.36682 6.53382 2.44001 5.48898C3.51319 4.44413 4.96874 3.85714 6.48645 3.85714H11.4783L8.75786 1.20857L10.008 0L14.8502 4.71429L10.008 9.42857L8.76666 8.22L11.4783 5.57143H6.48645C4.28548 5.57143 2.5247 7.28571 2.5247 9.42857C2.5247 11.5714 4.28548 13.2857 6.48645 13.2857Z"
            fill={
              connectionStatus === 'full' || connectionStatus === 'origin'
                ? 'var(--green10)'
                : 'var(--red10)'
            }
          />
          <path
            d="M29.9426 9.57143C29.9426 11.0491 29.3397 12.4662 28.2665 13.511C27.1933 14.5559 25.7377 15.1429 24.22 15.1429H19.2282L21.9486 17.7914L20.6985 19L15.8563 14.2857L20.6985 9.57143L21.9398 10.78L19.2282 13.4286H24.22C26.421 13.4286 28.1818 11.7143 28.1818 9.57143C28.1818 7.42857 26.421 5.71429 24.22 5.71429H17.6171V4H24.22C25.7377 4 27.1933 4.58699 28.2665 5.63183C29.3397 6.67668 29.9426 8.09379 29.9426 9.57143Z"
            fill={
              connectionStatus === 'full' || connectionStatus === 'target'
                ? 'var(--green10)'
                : 'var(--red10)'
            }
          />
        </svg> */}
      </div>
    </div>
  </div>
);
