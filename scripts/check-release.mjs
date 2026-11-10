import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

// Exercise the pure selector without fetching GitHub or starting a web server.
const source = readFileSync(new URL("../lib/releases.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const sandbox = {
  exports: {},
  URL,
  require(id) {
    assert.equal(id, "./site-config");
    return { releasePage: "https://github.com/swi-parth-ft/cheese-releases/releases/latest" };
  },
};
vm.runInNewContext(compiled, sandbox, { filename: "releases.js" });
const { selectMacRelease } = sandbox.exports;
const app = {
  name: "Cheese-0.5.1-171-arm64.zip",
  browser_download_url: "https://github.com/swi-parth-ft/cheese-releases/releases/download/mac-0.5.1-171/Cheese-0.5.1-171-arm64.zip",
  size: 218_532_150,
};
const release = (assets) => ({ name: "Cheese 0.5.1 (171)", assets });
const checks = [
  ["selects the full Apple silicon app and exposes its release details", () => {
    const selected = selectMacRelease(release([app]));
    assert.equal(selected.name, "Cheese 0.5.1 (171)");
    assert.equal(selected.version, "0.5.1");
    assert.equal(selected.sizeMB, 219);
    assert.equal(selected.downloadURL, app.browser_download_url);
  }],
  ["skips the update-only archive even when it appears first", () => {
    const updater = { ...app, name: "Cheese-Update-Setup.zip" };
    assert.equal(selectMacRelease(release([updater])), null);
    assert.equal(selectMacRelease(release([updater, app])).downloadURL, app.browser_download_url);
  }],
  ["rejects legacy DMG assets", () => {
    assert.equal(selectMacRelease(release([{ ...app, name: "Cheese.dmg" }])), null);
  }],
  ["rejects an untrusted host and non-HTTPS URLs", () => {
    for (const url of [
      "https://github.com.evil.test/swi-parth-ft/cheese-releases/releases/download/file",
      "http://github.com/swi-parth-ft/cheese-releases/releases/download/file",
    ]) assert.equal(selectMacRelease(release([{ ...app, browser_download_url: url }])), null);
  }],
  ["rejects downloads outside the configured repository", () => {
    assert.equal(selectMacRelease(release([{ ...app, browser_download_url: "https://github.com/other/repo/releases/download/file" }])), null);
  }],
  ["rejects credential-bearing download URLs", () => {
    assert.equal(selectMacRelease(release([{ ...app, browser_download_url: "https://user:pass@github.com/swi-parth-ft/cheese-releases/releases/download/file" }])), null);
  }],
  ["handles a missing or malformed API asset without throwing", () => {
    for (const data of [null, {}, { assets: "invalid" }, release([]), release([null, {}, { name: app.name }])]) {
      assert.equal(selectMacRelease(data), null);
    }
  }],
];
for (const [name, check] of checks) {
  check();
  console.log(`PASS ${name}`);
}
console.log(`${checks.length} release-selection checks passed.`);
