export class Bill {
  constructor(
    public id: number,
    public title: string,
    public primarySponsor: string,
    public supporters: number = 0,
    public opposers: number = 0,
  ) {}

  incrementSupporters() {
    this.supporters += 1;
  }

  incrementOpposers() {
    this.opposers += 1;
  }
}
