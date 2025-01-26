export class Bill {
  private supporters = 0;
  private opposers = 0;

  constructor(
    public id: number,
    public title: string,
    public primarySponsor: string,
  ) {}

  incrementSupporters() {
    this.supporters += 1;
  }

  incrementOpposers() {
    this.opposers += 1;
  }
}
