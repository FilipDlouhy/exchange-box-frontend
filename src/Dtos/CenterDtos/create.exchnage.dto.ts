export class CreateUpdateExchangeDto {
  creatorId: number;
  pickUpPersonId: number;
  boxSize: string;
  name: string;
  itemIds: number[];
  centerId: number;
  pickUpDate: Date;
  constructor(
    creatorId: number,
    pickUpPersonId: number,
    boxSize: string,
    name: string,
    itemIds: number[],
    centerId: number,
    pickUpDate: Date
  ) {
    this.creatorId = creatorId;
    this.pickUpPersonId = pickUpPersonId;
    this.boxSize = boxSize;
    this.name = name;
    this.itemIds = itemIds;
    this.centerId = centerId;
    this.pickUpDate = pickUpDate;
  }
}
