import { Bill } from "../../src/domain/bill.entity";

describe("Bill", () => {
  let bill: Bill;

  beforeEach(() => {
    bill = new Bill(1, "Test Bill", "John Doe");
  });

  test("should initialize a Bill", () => {
    expect(bill["supporters"]).toBe(0);
    expect(bill["opposers"]).toBe(0);
  });

  test("should increment supporters", () => {
    bill.incrementSupporters();
    expect(bill["supporters"]).toBe(1);

    bill.incrementSupporters();
    expect(bill["supporters"]).toBe(2);
  });

  test("should increment opposers", () => {
    bill.incrementOpposers();
    expect(bill["opposers"]).toBe(1);

    bill.incrementOpposers();
    expect(bill["opposers"]).toBe(2);
  });
});
