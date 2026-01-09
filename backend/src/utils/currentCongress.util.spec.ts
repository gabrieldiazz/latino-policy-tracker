import { currentCongressYear } from "./currentCongress.util";

describe("currentCongressYear", () => {
	it("should return the correct congress year on an even year before Jan 3", () => {
		expect(currentCongressYear(new Date("2024-01-01"))).toBe(118);
	});
	it("should return the correct congress year on an even year on Jan 3", () => {
		expect(currentCongressYear(new Date("2024-01-03"))).toBe(118);
	});
	it("should return the correct congress year on an even year after Jan 3", () => {
		expect(currentCongressYear(new Date("2024-07-04"))).toBe(118);
	});
	it("should return the correct congress year on an odd year but before Jan 3", () => {
		expect(currentCongressYear(new Date("2025-01-02"))).toBe(118);
	});
	it("should return the correct congress year on an odd year on Jan 3", () => {
		expect(currentCongressYear(new Date("2025-01-03"))).toBe(119);
	});
	it("should return the correct congress year on an odd year after Jan 3", () => {
		expect(currentCongressYear(new Date("2025-07-04"))).toBe(119);
	});
});
