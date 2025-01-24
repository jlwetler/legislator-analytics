export interface CsvReader {
  getLegislators(): LegislatorDTO[];
  getBills(): BillDTO[];
  getVotes(): VoteDTO[];
  getVoteResults(): VoteResultDTO[];
}

export const CSV_READER = Symbol("CSV_READER");

export type LegislatorDTO = {
  id: string;
  name: string;
};

export type BillDTO = {
  id: string;
  title: string;
  sponsor_id: string;
};

export type VoteDTO = {
  id: string;
  bill_id: string;
};

export type VoteResultDTO = {
  id: string;
  legislator_id: string;
  vote_id: string;
  vote_type: string;
};
