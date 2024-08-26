export async function isPWAInstalled(): Promise<boolean> {
  // Check for iOS Safari
  if (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in window.navigator && window.navigator.standalone)
  ) {
    return true;
  }

  // Check for other platforms (Android, Chrome, etc.)
  if (
    "getInstalledRelatedApps" in navigator &&
    typeof navigator.getInstalledRelatedApps === "function"
  ) {
    const relatedApps = await navigator.getInstalledRelatedApps();
    return relatedApps.length > 0;
  }

  return false;
}
