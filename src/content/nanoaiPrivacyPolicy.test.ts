import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { remainingNanoProviders } from "../../netlify/bridge/nano-publisher-profiles";

const policy = readFileSync(resolve("public/nanoai/privacy/index.html"), "utf8");
const text = policy.replace(/\s+/g, " ");

describe("NanoAI privacy policy", () => {
  it("lists every Google scope the sign-in bridge can request", () => {
    // Google verification compares the consent screen with this page, so a scope added to the bridge must be disclosed here.
    const scopes = Object.values(remainingNanoProviders).filter(provider => provider.issuer === "https://accounts.google.com").flatMap(provider => provider.allowedScopes);
    expect(scopes.length).toBeGreaterThan(15);
    for (const scope of new Set(scopes)) expect(text).toContain(scope);
  });

  it("makes the Limited Use and AI training commitments Google requires", () => {
    for (const required of [
      "Google API Services User Data Policy",
      "including the Limited Use requirements",
      "does not use Google Workspace data to develop, improve, or train generalized or non-personalized AI or machine-learning models",
      "don't use it for advertising",
      "myaccount.google.com/connections",
    ]) expect(text).toContain(required);
  });

  it("describes where NanoAI's data actually goes", () => {
    for (const required of [
      "Nano Cloud stores no request content",
      "Microsoft Azure",
      "plugins.omega2ai.com",
      "doesn't store or log authorization codes or tokens",
      "Stored in NanoAI's data folder on your PC",
      "asks you to approve it first",
    ]) expect(text).toContain(required);
    // These describe a different product's desktop flow and would be untrue for NanoAI.
    for (const untrue of ["does not operate an intermediary server", "held only in memory", "does not use or accept a Google OAuth client secret"]) expect(text).not.toContain(untrue);
  });

  it("is linked from the NanoAI page and the company policy", () => {
    expect(readFileSync(resolve("nanoai/index.html"), "utf8")).toContain('href="/nanoai/privacy/"');
    expect(readFileSync(resolve("public/privacy/index.html"), "utf8")).toContain('href="/nanoai/privacy/"');
  });
});
