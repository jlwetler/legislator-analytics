export class Legislator {
  public supportedBills = 0;
  public opposedBills = 0;

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
