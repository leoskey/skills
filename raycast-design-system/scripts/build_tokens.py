#!/usr/bin/env python3
"""Generate the packaged CSS from semantic JSON; standard library only."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def build():
    data = json.loads((ROOT / 'assets/tokens.json').read_text(encoding='utf-8'))
    shared, themes = data['shared'], data['themes']
    if set(themes) != {'dark', 'light'} or set(themes['dark']) != set(themes['light']):
        raise ValueError('Dark and light themes must define exactly the same roles')
    if set(shared) & set(themes['dark']):
        raise ValueError('Shared and theme token names must not overlap')
    for group in [shared, *themes.values()]:
        for key, value in group.items():
            if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', key):
                raise ValueError('Invalid token name: ' + key)
            if not isinstance(value, str) or any(c in value for c in ';{}\n\r'):
                raise ValueError('Invalid CSS token value: ' + key)
    def variables(group):
        return '\n'.join(f'  --rc-{key}: {value};' for key, value in group.items())
    css = ('/* Generated from tokens.json by scripts/build_tokens.py.\n'
           ' * Independent Raycast-inspired values; see references/sources.md. */\n'
           '.rc-theme {\n' + variables(shared) + '\n' + variables(themes['dark']) + '\n'
           '  color-scheme: dark;\n'
           '  color: var(--rc-text); background: var(--rc-bg);\n'
           '  font: var(--rc-font-regular) var(--rc-text-md)/var(--rc-line-body) var(--rc-font-sans);\n'
           '  font-synthesis: none; -webkit-font-smoothing: antialiased;\n}\n'
           '.rc-theme[data-theme="light"] {\n' + variables(themes['light']) + '\n'
           '  color-scheme: light;\n}\n'
           '.rc-theme, .rc-theme *, .rc-theme *::before, .rc-theme *::after { box-sizing: border-box; }\n'
           '.rc-theme :focus-visible { outline: 2px solid var(--rc-focus); outline-offset: 3px; }\n')
    output = ROOT / 'assets/tokens.css'
    output.write_text(css, encoding='utf-8')
    print(f'Generated {output.name}: {len(shared)} shared tokens, {len(themes["dark"])} roles per theme')

if __name__ == '__main__':
    build()
