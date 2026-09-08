# whistle-ctl

[![npm](https://img.shields.io/npm/v/whistle-ctl)](https://www.npmjs.com/package/whistle-ctl)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A tiny CLI over the [Whistle Local Agent API](https://wproxy.org/docs/extensions/api.html) (whistle `>= 2.10.7`).

Whistle exposes a programmatic Node module (`bin/api`) that lets you manage rule groups, plugins,
values and captured sessions **without touching the web UI or restarting the proxy**. Its rule
operations (`add` / `select` / `unselect` / `moveToTop`) take effect **immediately — no
`w2 restart` needed**, and `add` uses a JSON body (immune to the multi-line urlencode corruption
that bites plain `curl` calls).

`whistle-ctl` wraps that module into a small, dependency-free command-line tool so scripts, CI
pipelines and AI agents can drive Whistle rules with one line.

> **Website** — see the landing page in [`site/`](./site) (React + Vite + Tailwind).

## Why this exists

The official API is Node-only. If you live in a terminal (shell scripts, agents), you otherwise
end up writing throwaway `node -e "require(...).rules.add(...)"` glue. This package gives you a
stable, documented command surface instead.

It intentionally covers **rule groups** (the highest-frequency operation: switching mocks /
environments). For the full API surface (sessions, frames, plugins, values, HTTPS certs) use the
module directly:

```js
const { loadApi } = require('whistle-ctl');
const api = await loadApi();
const sessions = await api.network.getSessions({ subUrl: '/api', method: 'POST' });
```

## Requirements

- Node `>= 14`
- Global `whistle` `>= 2.10.7` and **running** (`w2 start`), with `w2` on `PATH`
- The tool auto-authenticates by reading the whistle config (no extra credentials needed)

```bash
npm install -g whistle@latest   # upgrade if needed
w2 start                        # ensure the proxy is running
```

## Install

```bash
npm install -g whistle-ctl
# or run from a clone without installing
node bin/whistle-ctl.js -h
```

## Usage

```bash
whistle-ctl version                        # detected whistle version
whistle-ctl list [--json]                  # all rule groups + selected state
whistle-ctl status                         # engine status (multiSelect / selected list)
whistle-ctl get <name>                     # print a rule group's content
whistle-ctl add <name> --file rules.txt --select --top
whistle-ctl select <name>                  # enable — immediate, no restart
whistle-ctl unselect <name>                # disable — immediate, no restart
whistle-ctl top <name>                     # move above other groups — immediate
whistle-ctl rm <name>                      # delete (file-level + w2 restart)
```

### Typical mock workflow

```bash
# 1. Write rules as plain text (no JS module.exports needed)
cat > /tmp/mock_rules.txt <<'EOF'
# explanation comment
https://example.com/api file:///abs/path/mock.json lineProps://important
EOF

# 2. Create + select + bring to top (multi-select mode is additive — safe)
whistle-ctl add my-mock-group --file /tmp/mock_rules.txt --select --top

# 3. Verify
whistle-ctl list | grep my-mock-group

# 4. Toggle off/on while reviewing
whistle-ctl unselect my-mock-group
whistle-ctl select  my-mock-group

# 5. Cleanup
whistle-ctl rm my-mock-group
```

## Command semantics & gotchas

| Command | Effective immediately? | Notes |
|---|---|---|
| `add` / `select` / `unselect` / `top` | ✅ no restart | multi-select `select` is **additive** — never deselects other active groups |
| `get` | read | returns the group's content |
| `rm` | ⚠️ restarts whistle | the API has no `remove`; deletion falls back to removing the rule file + cleaning `properties`, then `w2 restart` |
| `add` with existing name | overwrite | same as `w2 add --force` semantics |

**Known limitation**: the Local Agent API has **no `update` for the content of an existing rule
group**. To modify a group that already exists (e.g. comment out one line of a long-lived project
group), use the classic `w2 add --force .whistle.js` (file must export `{ name, rules }`) or edit
via the web UI.

## Library usage

```js
const { loadApi } = require('whistle-ctl');

(async () => {
  const api = await loadApi();
  await api.rules.add('demo', 'example.com http://127.0.0.1:3000', { selected: true, addToTop: true });
  const list = await api.rules.getList();
  console.log(list.filter((r) => r.selected).map((r) => r.name));
})();
```

## License

MIT
