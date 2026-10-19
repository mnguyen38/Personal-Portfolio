// Write-ups open in a side reader addressed by the URL hash, e.g. `#work/options-backtester`,
// so they can be linked to directly and closed with the browser's Back button.
const PREFIX = "#work/";

export function writeupHref(id: string) {
  return `${PREFIX}${id}`;
}

export function writeupIdFromHash(hash: string): string | null {
  return hash.startsWith(PREFIX) ? decodeURIComponent(hash.slice(PREFIX.length)) : null;
}

export function openWriteup(id: string) {
  window.location.hash = writeupHref(id).slice(1);
}

// Swap to another write-up without piling up history entries.
export function replaceWriteup(id: string | null) {
  history.replaceState(history.state, "", id ? writeupHref(id) : "#work");
  window.dispatchEvent(new HashChangeEvent("hashchange"));
}
