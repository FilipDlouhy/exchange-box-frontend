interface ExchangeUserInterafce {
  name: string;
  id: number;
  imageURL?: string;
}

export interface ItemSimpleInterafce {
  length?: number;
  width?: number;
  height?: number;
  name: string;
  weightInGrams: number;
  id: number;
  imageUrl?: string;
}

export interface FullExchangeInterafce {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  pickUpDate?: Date;
  price?: number;
  timeElapsedSincePickUpDate?: Date;
  items?: ItemSimpleInterafce[];
  friend: ExchangeUserInterafce;
  boxSize: string;
  name: string;
  exchangeState: string;
  longitude: number;
  latitude: number;
}
