export class CreateEventDto {
  fromTime: Date;
  toTime: Date;
  eventName: string;
  eventDescription: string;
  userId: number;

  constructor(
    fromTime: Date,
    toTime: Date,
    eventName: string,
    userId: number,
    eventDescription: string
  ) {
    this.fromTime = fromTime;
    this.toTime = toTime;
    this.eventName = eventName;
    this.userId = userId;
    this.eventDescription = eventDescription;
  }
}
