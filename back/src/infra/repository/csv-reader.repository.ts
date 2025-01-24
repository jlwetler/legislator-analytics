import { Injectable } from "@nestjs/common";
import { readFileSync } from "fs";
import { join } from "path";
import {
  BillDTO,
  CsvReader,
  LegislatorDTO,
  VoteDTO,
  VoteResultDTO,
} from "src/application/repository/csv-reader-repository.interface";

@Injectable()
export class CsvReaderImpl implements CsvReader {
  getLegislators(): LegislatorDTO[] {
    return this.loadCsv("../../../csv/legislators.csv");
  }

  getBills(): BillDTO[] {
    return this.loadCsv("../../../csv/bills.csv");
  }

  getVotes(): VoteDTO[] {
    return this.loadCsv("../../../csv/votes.csv");
  }

  getVoteResults(): VoteResultDTO[] {
    return this.loadCsv("../../../csv/vote_results.csv");
  }

  private loadCsv(filePath: string): any[] {
    const fullPath = join(__dirname, filePath);
    const data = readFileSync(fullPath, "utf-8")
      .split("\n")
      .filter((row) => row.trim());

    const [headerRow, ...dataRows] = data;
    const headers = headerRow.split(",").map((header) => header.trim());

    return dataRows.map((row) =>
      row.split(",").reduce((obj, value, index) => {
        obj[headers[index]] = value.trim();
        return obj;
      }, {}),
    );
  }
}
