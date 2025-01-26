import * as request from "supertest";
import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "../../src/app.controller";
import { AppModule } from "../../src/app.module";
import { CSV_READER } from "../../src/application/repository/csv-reader-repository.interface";
import { CsvReaderMock } from "../mock/csv-reader-mock";
import GetLegislatorStatistics from "src/application/use-case/get-legislator-statistics.use-case";
import GetBillStatistics from "src/application/use-case/get-bill-statistics.use-case";

describe("AppController (integration)", () => {
  let app;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AppController],
      providers: [{ provide: CSV_READER, useClass: CsvReaderMock }, GetLegislatorStatistics, GetBillStatistics],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /legislator - should return legislator statistics", async () => {
    const response = await request(app.getHttpServer()).get("/legislator").expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: 1,
          name: "Legislator 1",
          supportedBills: 1,
          opposedBills: 0,
        },
        {
          id: 2,
          name: "Legislator 2",
          supportedBills: 1,
          opposedBills: 0,
        },
        {
          id: 3,
          name: "Legislator 3",
          supportedBills: 0,
          opposedBills: 1,
        },
      ]),
    );
  });

  it("GET /bill - should return bill statistics", async () => {
    const response = await request(app.getHttpServer()).get("/bill").expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        {
          id: 11,
          title: "Test Bill",
          primarySponsor: "Legislator 1",
          supporters: 2,
          opposers: 1,
        },
      ]),
    );
  });
});
