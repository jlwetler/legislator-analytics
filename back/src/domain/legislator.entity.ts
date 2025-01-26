export class Legislator {
  private supportedBills = 0;
  private opposedBills = 0;

  constructor(
    public id: number,
    public name: string,
  ) {}

  incrementSupportedBills() {
    this.supportedBills += 1;
  }

  incrementOpposedBills() {
    this.opposedBills += 1;
  }
}
