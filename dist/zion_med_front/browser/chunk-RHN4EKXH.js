import {
  environment
} from "./chunk-IBJWGIJV.js";

// src/app/core/utils/absolute-media-url.ts
function absoluteMediaUrl(href) {
  if (href == null)
    return null;
  const u = String(href).trim();
  if (!u)
    return null;
  if (/^(https?:|blob:|data:)/i.test(u))
    return u;
  const base = environment.apiUrl.replace(/\/$/, "");
  return u.startsWith("/") ? `${base}${u}` : `${base}/${u}`;
}

export {
  absoluteMediaUrl
};
//# sourceMappingURL=chunk-RHN4EKXH.js.map
