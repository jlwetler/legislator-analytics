import { Legislator } from "../../src/domain/legislator.entity";

describe("Legislator", () => {
  let legislator: Legislator;

  beforeEach(() => {
    legislator = new Legislator(1, "Test Legislator");
  });

  test("should initialize a Legislator", () => {
    expect(legislator["supportedBills"]).toBe(0);
    expect(legislator["opposedBills"]).toBe(0);
  });

  test("should increment supportedBills", () => {
    legislator.incrementSupportedBills();
    expect(legislator["supportedBills"]).toBe(1);

    legislator.incrementSupportedBills();
    expect(legislator["supportedBills"]).toBe(2);
  });

  test("should increment opposedBills", () => {
    legislator.incrementOpposedBills();
    expect(legislator["opposedBills"]).toBe(1);

    legislator.incrementOpposedBills();
    expect(legislator["opposedBills"]).toBe(2);
  });
});
