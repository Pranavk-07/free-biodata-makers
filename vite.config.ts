 
import { defineConfig } from "vite";
import vinext from "vinext";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { kvDataAdapter } from "@vinext/cloudflare/cache/kv-data-adapter";

export default defineConfig({
  plugins: [
    vinext({
      cache: {
        data: kvDataAdapter(),
      },
    }),
    tailwindcss(),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
});
