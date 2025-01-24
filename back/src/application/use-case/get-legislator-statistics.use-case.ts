import { Inject } from "@nestjs/common";
import { CSV_READER, CsvReader } from "../repository/csv-reader-repository.interface";
import { Legislator } from "src/domain/legislator.entity";

export default class GetLegislatorStatistics {
  constructor(@Inject(CSV_READER) readonly csvReader: CsvReader) {}

  execute(): Legislator[] {
    const legislatorsData = this.csvReader.getLegislators();
    const voteResults = this.csvReader.getVoteResults();

    const legislators = new Map<string, Legislator>();
    legislatorsData.forEach((data) => {
      legislators.set(data.id, new Legislator(Number(data.id), data.name));
    });

    voteResults.forEach((voteResult) => {
      const legislator = legislators.get(voteResult.legislator_id);
      if (legislator && voteResult.vote_type === "1") legislator.incrementSupportedBills();
      if (legislator && voteResult.vote_type === "2") legislator.incrementOpposedBills();
    });

    return Array.from(legislators.values());
  }
}
