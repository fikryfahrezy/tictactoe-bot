/* eslint-disable */
import { build } from "esbuild";

Promise.all(
	[
		build({
			entryPoints: ["index.ts"],
			outfile: "dist/index.mjs",
			format: "esm",
		}),
		build({
			entryPoints: ["index.ts"],
			format: "cjs",
			outfile: "dist/index.cjs",
		}),
	],
).catch(() => process.exit(1))
