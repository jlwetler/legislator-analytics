import { CsvReaderImpl } from "src/infra/repository/csv-reader.repository";

describe("CsvReaderImpl", () => {
  const csvReader = new CsvReaderImpl();

  it("should return legislators", () => {
    const legislators = csvReader.getLegislators();
    expect(legislators).toEqual(
      expect.arrayContaining([
        { id: "904789", name: "Rep. Don Bacon (R-NE-2)" },
        { id: "1603850", name: "Rep. Jamaal Bowman (D-NY-16)" },
        { id: "1852382", name: "Rep. Cori Bush (D-MO-1)" },
      ]),
    );
  });

  it("should return bills", () => {
    const bills = csvReader.getBills();
    expect(bills).toEqual([
      { id: "2952375", sponsor_id: "412211", title: "H.R. 5376: Build Back Better Act" },
      { id: "2900994", sponsor_id: "400100", title: "H.R. 3684: Infrastructure Investment and Jobs Act" },
    ]);
  });

  it("should return votes", () => {
    const votes = csvReader.getVotes();
    expect(votes).toEqual([
      { id: "3314452", bill_id: "2900994" },
      { id: "3321166", bill_id: "2952375" },
    ]);
  });

  it("should return vote results", () => {
    const voteResults = csvReader.getVoteResults();
    expect(voteResults).toEqual(
      expect.arrayContaining([
        { id: "92516784", legislator_id: "400440", vote_id: "3321166", vote_type: "2" },
        { id: "92516770", legislator_id: "17941", vote_id: "3321166", vote_type: "2" },
        { id: "92516711", legislator_id: "412487", vote_id: "3321166", vote_type: "2" },
      ]),
    );
  });
});
