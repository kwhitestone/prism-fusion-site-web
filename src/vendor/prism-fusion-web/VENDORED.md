# Vendored Prism Fusion Web

- Upstream: `git@github.com:kwhitestone/prism-fusion.git`
- Source commit: `894bd823028076d6b43e4edd08a3823e8820149f`
- Source checkout: `prism-fusion-site/prism-fusion/src/web`
- Site baseline: `5442b593c769aa9c857c7f39efa165e87d0f182e`
- License: upstream MIT license retained in `LICENSE`.

This is the site's actual build baseline, not the newer framework in the
nucleagent workspace. The framework checkout itself is read-only.

The import retains `src/`, `build/`, `types/`, `env-web.d.ts`,
`package.json` (provenance/build metadata only), `LICENSE`, and
`tests/fixtures/provider-lifecycle.ts` required by the retained tests. It includes
the app shell, routing, stores, layouts, login UI, styles, directives,
builtin addons and plugin runtime, including dynamically loaded modules.
`FILES.sha256` is the complete imported-file list with upstream SHA-256
hashes, before local formatting. Paths are relative to this directory.

Local changes: ESLint/Prettier formatting only. Root Vite and TypeScript
aliases resolve `@`, `@build` and `prism-fusion-web` inside this tree.
The upstream lint and formatting configs are copied to the repository root;
the declaration-file ignore pattern is made recursive for this new location.
The vendor package is not a workspace dependency and installs no hooks.

Future slimming should first trace static imports and Vite glob imports,
then remove unused shell/build modules with login, plugin registration,
menu and callback regression checks. Do not upgrade this snapshot as part
of repository extraction. Upgrade it explicitly against a reviewed upstream
commit and regenerate the inventory.
