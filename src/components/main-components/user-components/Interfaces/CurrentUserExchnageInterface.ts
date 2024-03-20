export interface CurrentUserExchnageInterface {
  creatorId: number;
  pickUpPersonId: number;
  numberOfItems: number;
  friendName: string;
  exchangeName: string;
  id: number;
  pickUpDate?: Date | null;
  exchangeState: string;
}
