type KeyedAlertToggle = (toKey?: string) => (open: boolean) => void;

export type WidgetWithAlertProps = {
  id: string;
  alertKey: string;
  toggleAlert: KeyedAlertToggle;
};
