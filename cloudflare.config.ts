
import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  accountId:"bd51f8dbea6e6e1aa77c91f0f6d0c88c",
  worker: defineWorker({
    name: "free-biodata-makers",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-10-30",
    compatibilityFlags: ["nodejs_compat"],
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
       VINEXT_KV_CACHE: bindings.kv(),
    },
  }),
});
