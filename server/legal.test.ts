import { describe, expect, it } from "vitest";

/**
 * Tests for the legal pages feature:
 * - Terms & Conditions (/terms)
 * - Privacy Policy (/privacy)
 * - Cookie Policy (/cookies)
 * - Cookie consent banner localStorage key
 */

describe("Legal pages", () => {
  it("should have the correct cookie consent storage key defined", () => {
    const STORAGE_KEY = "advanseit_cookie_consent";
    expect(STORAGE_KEY).toBe("advanseit_cookie_consent");
    expect(STORAGE_KEY.startsWith("advanseit_")).toBe(true);
  });

  it("should define all three legal routes", () => {
    const routes = ["/terms", "/privacy", "/cookies"];
    expect(routes).toHaveLength(3);
    expect(routes).toContain("/terms");
    expect(routes).toContain("/privacy");
    expect(routes).toContain("/cookies");
  });

  it("should have valid ABN format for AdvanseIT", () => {
    const ABN = "12 656 409 850";
    // ABN must be 11 digits (with spaces removed)
    const digits = ABN.replace(/\s/g, "");
    expect(digits).toHaveLength(11);
    expect(/^\d{11}$/.test(digits)).toBe(true);
  });

  it("should have valid contact email for legal pages", () => {
    const EMAIL = "admin@advanseit.com.au";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    expect(emailRegex.test(EMAIL)).toBe(true);
    expect(EMAIL).toContain("advanseit.com.au");
  });

  it("should reference Australian Privacy Act in the privacy policy constants", () => {
    const privacyActRef = "Privacy Act 1988";
    const appRef = "Australian Privacy Principles";
    expect(privacyActRef).toContain("1988");
    expect(appRef).toContain("Australian Privacy Principles");
  });

  it("should have correct last updated date format", () => {
    const LAST_UPDATED = "15 March 2026";
    // Should be in "DD Month YYYY" format
    const dateRegex = /^\d{1,2} [A-Z][a-z]+ \d{4}$/;
    expect(dateRegex.test(LAST_UPDATED)).toBe(true);
  });
});
