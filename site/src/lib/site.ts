export const SITE = {
  name: 'whistle-ctl',
  tagline: 'Drive Whistle rule groups from your terminal',
  description:
    'A tiny, dependency-free CLI over the Whistle Local Agent API. Add, select, unselect and re-order rule groups instantly — no w2 restart, no web UI, no Node glue code.',
  npmUrl: 'https://www.npmjs.com/package/whistle-ctl',
  repoUrl: 'https://github.com/xiaowulang-turbo/whistle-ctl',
  docsUrl: 'https://wproxy.org/docs/extensions/api.html',
  installCmd: 'npm install -g whistle-ctl',
} as const;

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Quickstart', href: '#quickstart' },
  { label: 'Commands', href: '#commands' },
  { label: 'Compare', href: '#compare' },
] as const;

export const FEATURES = [
  {
    icon: 'Zap',
    title: 'Instant, no restart',
    body: 'add / select / unselect / top take effect immediately through the Local Agent API. No w2 restart, no stale-rule surprises between edits.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Additive selection, safe by default',
    body: 'select is additive in multi-select mode — your existing active rule groups are never silently deselected. Built on the official bin/api contract.',
  },
  {
    icon: 'Package',
    title: 'Zero-dependency, self-contained',
    body: 'Plain Node stdlib, no runtime deps. Resolves the Whistle API module dynamically via w2 root bin/api — no hardcoded version paths.',
  },
  {
    icon: 'FileCode2',
    title: 'JSON-safe rule bodies',
    body: 'Rules are sent as JSON, avoiding the multi-line urlencode corruption that silently empties rule groups when using plain curl against the rules API.',
  },
  {
    icon: 'Workflow',
    title: 'CLI + library, one source',
    body: 'Use it as a command or import loadApi() in your own scripts and agents. The module auto-authenticates from the Whistle config — no extra tokens.',
  },
  {
    icon: 'ShieldAlert',
    title: 'Honest boundaries',
    body: 'No update API exists upstream, so editing an existing rule group still uses w2 add --force. whistle-ctl clearly scopes what it can and cannot do.',
  },
] as const;

export const COMMANDS = [
  {
    cmd: 'whistle-ctl list [--json]',
    desc: 'List all rule groups with their selected state.',
  },
  {
    cmd: 'whistle-ctl status',
    desc: 'Show rule-engine status: laterRulesFirst / multiSelect / active groups.',
  },
  {
    cmd: 'whistle-ctl get <name>',
    desc: 'Print the content of one rule group.',
  },
  {
    cmd: 'whistle-ctl add <name> --file rules.txt [--select] [--top]',
    desc: 'Create or overwrite a group from a plain-text rules file. Flags: select it now, move it to the top.',
  },
  {
    cmd: 'whistle-ctl select <name>',
    desc: 'Enable a group. Immediate — additive in multi-select mode.',
  },
  {
    cmd: 'whistle-ctl unselect <name>',
    desc: 'Disable a group without touching the others. Immediate.',
  },
  {
    cmd: 'whistle-ctl top <name>',
    desc: 'Move a group above all others so its rules win. Immediate.',
  },
  {
    cmd: 'whistle-ctl rm <name>',
    desc: 'Delete a group. Falls back to file removal + w2 restart (upstream has no remove).',
  },
] as const;

export type TerminalLine = {
  prompt?: string
  cmd?: string
  out?: string
  comment?: string
}

export const TERMINAL_LINES: TerminalLine[] = [
  { comment: '# rules as plain text, no JS module.exports needed' },
  { prompt: '$', cmd: 'cat > /tmp/mock.txt <<EOF\n> example.com file:///tmp/mock.json lineProps://important\n> EOF' },
  { comment: '# create + select + move to top — instant, additive' },
  { prompt: '$', cmd: 'whistle-ctl add review-mock --file /tmp/mock.txt --select --top' },
  { out: 'OK: rule group written: review-mock (selected) (moved to top)' },
  { comment: '# verify & toggle while reviewing' },
  { prompt: '$', cmd: 'whistle-ctl list | grep review-mock' },
  { out: '* review-mock                     (selected)' },
  { prompt: '$', cmd: 'whistle-ctl unselect review-mock' },
  { out: 'OK: unselected: review-mock' },
  { prompt: '$', cmd: 'whistle-ctl select review-mock' },
  { out: 'OK: selected: review-mock' },
  { comment: '# done — clean up' },
  { prompt: '$', cmd: 'whistle-ctl rm review-mock' },
  { out: 'OK: rule file deleted: review-mock\nOK: whistle restarted' },
];

export const COMPARE_ROWS: {
  feature: string;
  whistleCtl: string;
  w2Add: string;
  localApiRaw: string;
}[] = [
  {
    feature: 'Add rule group',
    whistleCtl: 'whistle-ctl add <name> --file',
    w2Add: 'w2 add --force .whistle.js (JS object format)',
    localApiRaw: 'require("whistle/bin/api").rules.add(...)',
  },
  {
    feature: 'No restart to apply',
    whistleCtl: 'Yes — instant',
    w2Add: 'No — needs w2 restart',
    localApiRaw: 'Yes (but you write the Node glue)',
  },
  {
    feature: 'Select a group',
    whistleCtl: 'whistle-ctl select <name>',
    w2Add: 'Manual (file/properties edits)',
    localApiRaw: 'api.rules.select(name)',
  },
  {
    feature: 'Multi-line body safety',
    whistleCtl: 'JSON body — safe',
    w2Add: 'JS object — safe',
    localApiRaw: 'JSON body — safe',
  },
  {
    feature: 'Multi-select additive',
    whistleCtl: 'Yes',
    w2Add: 'n/a',
    localApiRaw: 'Yes (API behavior)',
  },
  {
    feature: 'Dependencies',
    whistleCtl: 'Zero',
    w2Add: 'Bundled with whistle',
    localApiRaw: 'Zero',
  },
] as const;
