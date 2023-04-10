import { formatDate } from "../helpers/formatDate";

describe("formatDate", () => {
  it("should format the date correctly", () => {
    const input = "2023-04-10T00:00:00Z";
    const output = "April 10, 2023";
    expect(formatDate(input)).toBe(output);
  });

  it("should return the correct date when given different inputs", () => {
    const input1 = "2000-01-01T00:00:00Z";
    const output1 = "January 1, 2000";
    expect(formatDate(input1)).toBe(output1);

    const input2 = "1995-12-31T00:00:00Z";
    const output2 = "December 31, 1995";
    expect(formatDate(input2)).toBe(output2);
  });
});
