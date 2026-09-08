#!/usr/bin/env node
/**
 * whistle-ctl — CLI over the Whistle Local Agent API (whistle >= 2.10.7)
 *
 * Whistle exposes a programmatic module at `bin/api` (auto-authenticated,
 * talks to its own /cgi-bin/* endpoints). Its rule operations
 * (add/select/unselect/moveToTop) take effect immediately WITHOUT `w2 restart`,
 * and `add` uses a JSON body (no urlencode multi-line corruption).
 *
 * This package wraps that module into a small command-line tool so scripts,
 * CI and AI agents can drive Whistle rules without writing Node glue.
 *
 * Requires: global `whistle` >= 2.10.7, running (`w2 start`), `w2` on PATH.
 *
 * Also usable as a library: `const { loadApi } = require('whistle-ctl')`.
 */
'use strict';

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execSync } = require('child_process');

const MIN_VERSION = '2.10.7';

function fail(msg) {
  console.error(`Error: ${msg}`);
  process.exit(1);
}
function ok(msg) {
  console.log(`OK: ${msg}`);
}
function info(msg) {
  console.log(`Note: ${msg}`);
}

// ── Whistle API module resolution ──────────────────────────────────────
function resolveApi() {
  let apiPath;
  try {
    apiPath = execSync('w2 root bin/api', { encoding: 'utf8' }).trim();
  } catch (e) {
    fail(`\`w2\` is not available (${(e.stderr || e.message || '').toString().trim() || 'whistle not installed?'}).\nRun: npm install -g whistle (>= ${MIN_VERSION})`);
  }
  let api;
  try {
    // bin/api auto-reads credentials from the whistle config (Basic Auth).
    api = require(apiPath);
  } catch (e) {
    fail(`Cannot load Whistle Local Agent API (${apiPath}): ${e.message}\nNeed whistle >= ${MIN_VERSION} and a running instance (\`w2 start\`).`);
  }
  return api;
}

function compareVersions(a, b) {
  const pa = a.split('.').map(Number);
  const pb = b.split('.').map(Number);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] || 0) !== (pb[i] || 0)) {
      return (pa[i] || 0) > (pb[i] || 0) ? 1 : -1;
    }
  }
  return 0;
}

function checkVersion() {
  let raw;
  try {
    raw = execSync('w2 --version', { encoding: 'utf8' }).trim();
  } catch (e) {
    fail(`\`w2\` is not available. Run: npm install -g whistle (>= ${MIN_VERSION})`);
  }
  const m = raw.match(/(\d+\.\d+\.\d+)/);
  const ver = m ? m[1] : raw;
  if (compareVersions(ver, MIN_VERSION) < 0) {
    fail(`Whistle version must be >= ${MIN_VERSION} (found ${ver}). Upgrade: npm install -g whistle@latest`);
  }
  return ver;
}

// ── Rules storage dir (used by `rm`, API has no remove) ─────────────────
function rulesDir() {
  const dataDir = process.env.WHISTLE_DATA_DIR || path.join(os.homedir(), '.WhistleAppData', '.whistle');
  return path.join(dataDir, 'rules');
}

function removeRuleFile(name) {
  const dir = path.join(rulesDir(), 'files');
  if (!fs.existsSync(dir)) {
    return false;
  }
  const hit = fs.readdirSync(dir).find((f) => f.replace(/^\d+\./, '') === name);
  if (hit) {
    fs.unlinkSync(path.join(dir, hit));
    return true;
  }
  return false;
}

function removeFromProperties(name) {
  const propsFile = path.join(rulesDir(), 'properties');
  if (!fs.existsSync(propsFile)) {
    return;
  }
  let data;
  try {
    data = JSON.parse(fs.readFileSync(propsFile, 'utf8'));
  } catch (e) {
    return;
  }
  let changed = false;
  ['filesOrder', 'selectedList'].forEach((key) => {
    if (Array.isArray(data[key])) {
      const next = data[key].filter((n) => n !== name);
      if (next.length !== data[key].length) {
        data[key] = next;
        changed = true;
      }
    }
  });
  if (changed) {
    fs.writeFileSync(propsFile, JSON.stringify(data, null, 2), 'utf8');
  }
}

// ── Commands ───────────────────────────────────────────────────────────
function cmdVersion() {
  console.log(checkVersion());
}

function cmdList(json) {
  const api = resolveApi();
  api.rules.getList().then((list) => {
    if (json) {
      console.log(JSON.stringify(list, null, 2));
      return;
    }
    const pad = Math.max(0, ...list.map((r) => r.name.length)) + 2;
    list.forEach((r) => {
      console.log(`${r.selected ? '*' : ' '} ${r.name.padEnd(pad)}${r.selected ? '(selected)' : ''}`);
    });
    info(`${list.length} rule group(s)`);
  }).catch((e) => fail(e.message));
}

function cmdStatus() {
  const api = resolveApi();
  api.rules.getStatus().then((st) => {
    console.log(`laterRulesFirst: ${st.laterRulesFirst}`);
    console.log(`multiSelect:     ${st.multiSelect}`);
    console.log(`disabled:        ${!!st.disabled}`);
    const sel = st.list.filter((r) => r.selected).map((r) => r.name);
    console.log(`selected(${sel.length}): ${sel.join(' | ') || '(none)'}`);
  }).catch((e) => fail(e.message));
}

function cmdGet(name) {
  const api = resolveApi();
  api.rules.get(name).then((item) => {
    const value = item && typeof item === 'object' ? item.value : item; // api.get returns {value}
    if (value == null) {
      fail(`rule group not found: ${name}`);
    }
    console.log(`=== ${name} ===`);
    console.log(value);
  }).catch((e) => fail(e.message));
}

function readRulesValue(inline, filePath) {
  if (filePath) {
    try {
      return fs.readFileSync(filePath, 'utf8');
    } catch (e) {
      fail(`cannot read rules file ${filePath}: ${e.message}`);
    }
  }
  return inline || '';
}

function cmdAdd(name, inline, opts) {
  const api = resolveApi();
  const value = readRulesValue(inline, opts.file);
  const third = opts.select ? { selected: true, addToTop: !!opts.top } : undefined;
  api.rules.add(name, value, third).then(() => {
    ok(`rule group written: ${name}${opts.select ? ' (selected)' : ''}${opts.top ? ' (moved to top)' : ''}`);
  }).catch((e) => fail(e.message));
}

function cmdSelectUnselect(name, select) {
  const api = resolveApi();
  const action = select ? api.rules.select(name) : api.rules.unselect(name);
  action.then((ret) => {
    if (ret === false) {
      return fail(`rule group not found: ${name}`);
    }
    ok(`${select ? 'selected' : 'unselected'}: ${name}`);
  }).catch((e) => fail(e.message));
}

function cmdTop(name) {
  const api = resolveApi();
  api.rules.moveToTop(name).then((ret) => {
    if (ret === false) {
      return fail(`rule group not found: ${name}`);
    }
    ok(`moved to top: ${name}`);
  }).catch((e) => fail(e.message));
}

function cmdRm(name) {
  const removed = removeRuleFile(name);
  removeFromProperties(name);
  if (!removed) {
    info(`no rule file found: ${name} (properties cleaned anyway)`);
  } else {
    ok(`rule file deleted: ${name}`);
  }
  try {
    execSync('w2 restart', { stdio: 'ignore' });
    ok('whistle restarted');
  } catch (e) {
    info('run `w2 restart` manually to apply the deletion');
  }
}

// ── Arg parsing ────────────────────────────────────────────────────────
const args = process.argv.slice(2);

const USAGE = `Usage: whistle-ctl <command> [args] [--json|--select|--top|--file <path>]

Commands:
  version                          Print the detected whistle version
  list [--json]                    List all rule groups with selected state
  status                           Show rule-engine status (multiSelect / selected)
  get <name>                       Print a rule group's content
  add <name> [--file <path>] [--select] [--top]   Create/overwrite a rule group
                                       - rules text from --file (plain text, safe) or inline arg
                                       - --select: also select it (multi-select: additive)
                                       - --top:    move it above existing groups
  select <name>                    Select (enable) a rule group — immediate, no restart
  unselect <name>                  Unselect (disable) a rule group — immediate, no restart
  top <name>                       Move a rule group to the top — immediate, no restart
  rm <name>                        Delete a rule group (API has no remove: file delete + w2 restart)
  -h, --help                       Show this help

Notes:
  * add/select/unselect/top take effect immediately (no w2 restart needed).
  * To edit the CONTENT of an existing rule group, this tool cannot help
    (the API has no update) — use \`w2 add --force .whistle.js\` instead.
  * rm requires a moment (restarts whistle).`;

function parseOpts(rest) {
  const opts = { select: false, top: false, json: false, file: null };
  const positional = [];
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === '--select') opts.select = true;
    else if (a === '--top') opts.top = true;
    else if (a === '--json') opts.json = true;
    else if (a === '--file') opts.file = rest[++i];
    else if (a === '-h' || a === '--help') { console.log(USAGE); process.exit(0); }
    else positional.push(a);
  }
  return { opts, positional };
}

function main() {
  if (!args.length || args[0] === '-h' || args[0] === '--help') {
    console.log(USAGE);
    return;
  }
  const cmd = args[0];
  const rest = args.slice(1);
  const { opts, positional } = parseOpts(rest);

  switch (cmd) {
    case 'version': cmdVersion(); break;
    case 'list': cmdList(opts.json); break;
    case 'status': cmdStatus(); break;
    case 'get': positional[0] ? cmdGet(positional[0]) : fail('missing <name>'); break;
    case 'add': positional[0] ? cmdAdd(positional[0], positional[1], opts) : fail('missing <name>'); break;
    case 'select': positional[0] ? cmdSelectUnselect(positional[0], true) : fail('missing <name>'); break;
    case 'unselect': positional[0] ? cmdSelectUnselect(positional[0], false) : fail('missing <name>'); break;
    case 'top': positional[0] ? cmdTop(positional[0]) : fail('missing <name>'); break;
    case 'rm': positional[0] ? cmdRm(positional[0]) : fail('missing <name>'); break;
    default: fail(`unknown command: ${cmd}\n\n${USAGE}`);
  }
}

module.exports = { loadApi: resolveApi, resolveApi };
if (require.main === module) {
  main();
}
