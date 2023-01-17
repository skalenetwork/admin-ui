type KeyedAlertToggle = (toKey?: string) => (open: boolean) => void;

export type AlertProps = {
  id?: string;
  alertKey: string;
  toggleAlert: KeyedAlertToggle;
};

export type WidgetWithAlertProps = {} & Required<AlertProps>;
