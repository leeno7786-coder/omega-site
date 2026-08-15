import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const privacyPolicy = readFileSync(resolve("public/privacy/index.html"), "utf8");
const normalizedPrivacyPolicy = privacyPolicy.replace(/\s+/g, " ");

describe("Google Workspace privacy disclosure", () => {
  it("describes the shipped desktop OAuth and data-flow boundaries", () => {
    for (const required of [
      "OAuth 2.0 Authorization Code flow with PKCE",
      "does not use or accept a Google OAuth client secret",
      "held only in memory by the local provider process",
      "directly from your device to Google's HTTPS API endpoints",
      "https://www.googleapis.com/auth/gmail.modify",
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/tasks",
      "https://www.googleapis.com/auth/drive",
      "Google API Services User Data Policy",
      "Limited Use requirements",
      "not used to train shared or generalized AI models",
    ]) {
      expect(normalizedPrivacyPolicy).toContain(required);
    }
  });

  it("does not describe the retired native connector architecture", () => {
    for (const retired of [
      "connector vault",
      "connection passphrase",
      "SourceLedger",
      "standing work",
      "approved grant",
      "Google OAuth client secret (owner-configured once)",
    ]) {
      expect(privacyPolicy).not.toContain(retired);
    }
  });
});
