import { Legislator } from "./legislator.entity";

export class Bill {
  constructor(
    public id: number,
    public title: string,
    public primarySponsorId: Legislator["id"],
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
