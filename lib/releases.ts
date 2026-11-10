import { releasePage } from "./site-config";
export type MacRelease = {
  name: string;
  version: string;
  sizeMB: number;
  downloadURL: string;
  releaseURL: string;
};
let cached: { value: MacRelease; expires: number } | undefined;
/** Only full Apple silicon app archives qualify; the update-setup archive is not an installer. */
export function selectMacRelease(data: unknown): MacRelease | null {
  if (!data || typeof data !== "object") return null;
  const release = data as { name?: unknown; assets?: unknown };
  if (!Array.isArray(release.assets)) return null;
  for (const asset of release.assets) {
    if (
      !asset ||
      typeof asset.name !== "string" ||
      typeof asset.browser_download_url !== "string"
    )
      continue;
    const match = /^Cheese-([\d.]+)-\d+-arm64\.zip$/.exec(asset.name);
    if (!match) continue;
    try {
      const url = new URL(asset.browser_download_url);
      if (
        url.origin !== "https://github.com" ||
        !url.pathname.startsWith(
          "/swi-parth-ft/cheese-releases/releases/download/",
        ) ||
        url.username ||
        url.password
      )
        continue;
      return {
        name:
          typeof release.name === "string"
            ? release.name
            : `Cheese ${match[1]}`,
        version: match[1],
        sizeMB: Math.round(Number(asset.size || 0) / 1e6),
        downloadURL: url.href,
        releaseURL: releasePage,
      };
    } catch {
      continue;
    }
  }
  return null;
}
export async function getMacRelease(): Promise<MacRelease | null> {
  if (cached && cached.expires > Date.now()) return cached.value;
  try {
    const response = await fetch(
      "https://api.github.com/repos/swi-parth-ft/cheese-releases/releases/latest",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "Cheese-Website",
        },
        signal: AbortSignal.timeout(4500),
      },
    );
    if (!response.ok) return cached?.value ?? null;
    const value = selectMacRelease(await response.json());
    if (value) cached = { value, expires: Date.now() + 5 * 60_000 };
    return value ?? cached?.value ?? null;
  } catch {
    return cached?.value ?? null;
  }
}
