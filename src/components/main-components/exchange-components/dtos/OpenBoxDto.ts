export class OpenBoxDto {
  id: number;

  openBoxCode: string;

  constructor(id: number, openBoxCode: string) {
    this.id = id;
    this.openBoxCode = openBoxCode;
  }
}
