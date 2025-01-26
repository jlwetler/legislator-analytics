import { Module } from "@nestjs/common";
import { AppController } from "./infra/controller/app.controller";
import { CsvReaderImpl } from "./infra/repository/csv-reader.repository";
import GetLegislatorStatistics from "./application/use-case/get-legislator-statistics.use-case";
import { CSV_READER } from "./application/repository/csv-reader-repository.interface";
import GetBillStatistics from "./application/use-case/get-bill-statistics.use-case";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [GetLegislatorStatistics, GetBillStatistics, { provide: CSV_READER, useClass: CsvReaderImpl }],
})
export class AppModule {}
