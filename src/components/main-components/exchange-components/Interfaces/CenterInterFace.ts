export interface CenterInterface {
  latitude: number;
  longitude: number;
  id: string;
  front: Front;
}
interface Front {
  id: number;
  numberOfTasksInFront: number;
  totalNumberOfTasks: number;
  numberOfLargeBoxes: number;
  numberOfMediumBoxes: number;
  numberOfSmallBoxes: number;
  numberOfLargeBoxesTotal: number;
  numberOfMediumBoxesTotal: number;
  numberOfSmallBoxesTotal: number;
}
