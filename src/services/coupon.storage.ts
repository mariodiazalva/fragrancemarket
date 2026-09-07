export const COUPON_STORAGE_KEY = "elova.coupon.v1";

function canUseBrowserStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function readStoredCoupon(): string {
  if (!canUseBrowserStorage()) {
    return "";
  }

  try {
    return window.localStorage.getItem(COUPON_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

export function writeStoredCoupon(code: string) {
  if (!canUseBrowserStorage()) {
    return;
  }

  try {
    if (code.trim()) {
      window.localStorage.setItem(COUPON_STORAGE_KEY, code);
    } else {
      window.localStorage.removeItem(COUPON_STORAGE_KEY);
    }
  } catch {
    // Ignore quota or private-mode failures.
  }
}
