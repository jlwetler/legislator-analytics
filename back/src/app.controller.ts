import { Controller, Get } from "@nestjs/common";
import GetLegislatorStatistics from "./application/use-case/get-legislator-statistics.use-case";
import GetBillStatistics from "./application/use-case/get-bill-statistics.use-case";

@Controller()
export class AppController {
  constructor(
    private readonly getLegislatorStatisticsUseCase: GetLegislatorStatistics,
    private readonly getBillStatisticsUseCase: GetBillStatistics,
  ) {}

  @Get("legislator")
  getLegislatorStatistics() {
    return this.getLegislatorStatisticsUseCase.execute();
  }

  @Get("bill")
  getBillStatisctics() {
    return this.getBillStatisticsUseCase.execute();
  }
}
