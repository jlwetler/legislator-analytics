import { Inject } from "@nestjs/common";
import { CSV_READER, CsvReader, LegislatorDTO, VoteDTO } from "../repository/csv-reader-repository.interface";
import { Bill } from "src/domain/bill.entity";

export default class GetBillStatistics {
  constructor(@Inject(CSV_READER) readonly csvReader: CsvReader) {}

  execute(): Bill[] {
    const legislatorsData = this.csvReader.getLegislators();
    const billsData = this.csvReader.getBills();
    const votesData = this.csvReader.getVotes();
    const voteResults = this.csvReader.getVoteResults();

    const legislators = new Map<string, LegislatorDTO>();
    legislatorsData.forEach((legislator) => {
      legislators.set(legislator.id, legislator);
    });

    const votes = new Map<string, VoteDTO>();
    votesData.forEach((vote) => {
      votes.set(vote.id, vote);
    });

    const bills = new Map<string, Bill>();
    billsData.forEach((bill) => {
      const sponsor = legislators.get(bill.sponsor_id);
      bills.set(bill.id, new Bill(Number(bill.id), bill.title, sponsor?.name || "Unknow"));
    });

    voteResults.forEach((voteResult) => {
      const vote = votes.get(voteResult.vote_id);
      const bill = bills.get(vote.bill_id);

      if (vote && bill && voteResult.vote_type === "1") bill.incrementSupporters();

      if (vote && bill && voteResult.vote_type === "2") bill.incrementOpposers();
    });

    return Array.from(bills.values());
  }
}
