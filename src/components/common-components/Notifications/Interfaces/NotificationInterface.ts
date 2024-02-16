export interface INotification {
  id?: number;
  text: string;
  userId: number;
  createdAt: Date;
  initials: string;
  seen: boolean;
}
