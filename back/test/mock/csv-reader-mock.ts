import { CsvReader } from "src/application/repository/csv-reader-repository.interface";

export class CsvReaderMock implements CsvReader {
  getLegislators() {
    return [
      { id: "1", name: "Legislator 1" },
      { id: "2", name: "Legislator 2" },
      { id: "3", name: "Legislator 3" },
    ];
  }
  getBills() {
    return [
      {
        id: "11",
        title: "Test Bill",
        sponsor_id: "1",
      },
    ];
  }
  getVotes() {
    return [
      { id: "1", bill_id: "11" },
      { id: "2", bill_id: "11" },
      { id: "3", bill_id: "11" },
    ];
  }
  getVoteResults() {
    return [
      { id: "1", legislator_id: "1", vote_id: "1", vote_type: "1" },
      { id: "2", legislator_id: "2", vote_id: "2", vote_type: "1" },
      { id: "3", legislator_id: "3", vote_id: "3", vote_type: "2" },
    ];
  }
}
