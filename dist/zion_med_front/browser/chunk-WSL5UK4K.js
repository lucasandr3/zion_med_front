import {
  HttpErrorResponse
} from "./chunk-GRLISYEV.js";

// src/app/core/utils/billing-blocked-error.ts
function isBillingBlockedError(err) {
  const http = err instanceof HttpErrorResponse ? err : null;
  if (http?.status !== 403)
    return false;
  const code = http.error?.code;
  return code === "billing_blocked";
}

export {
  isBillingBlockedError
};
//# sourceMappingURL=chunk-WSL5UK4K.js.map
