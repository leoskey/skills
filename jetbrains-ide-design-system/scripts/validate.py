"""Validate package invariants, source provenance and designated color pairings."""
import hashlib
import json
from pathlib import Path
import re
from generate import outputs

ROOT = Path(__file__).resolve().parents[1]

def contrast(fg, bg):
    def luminance(color):
        rgb = [int(color[i:i+2], 16) / 255 for i in (1, 3, 5)]
        rgb = [v / 12.92 if v <= .04045 else ((v + .055) / 1.055) ** 2.4 for v in rgb]
        return sum(a*b for a, b in zip(rgb, [.2126, .7152, .0722]))
    a, b = sorted((luminance(fg), luminance(bg)))
    return (b + .05) / (a + .05)

def validate():
    errors, checks, ratios = [], 0, []
    def check(ok, message):
        nonlocal checks
        checks += 1
        if not ok:
            errors.append(message)
    tokens = json.loads((ROOT / 'assets/tokens.json').read_text(encoding='utf-8'))
    lock = json.loads((ROOT / 'assets/source-lock.json').read_text(encoding='utf-8'))
    for item in lock['files']:
        path = ROOT / item['path']
        check(path.is_file() and hashlib.sha256(path.read_bytes()).hexdigest() == item['sha256'], 'Source hash mismatch: ' + item['path'])
    for mode in ['light', 'dark']:
        raw = json.loads((ROOT / f'assets/upstream/ManyIslands{mode.title()}.theme.json').read_text(encoding='utf-8'))
        palette = raw['colors']
        for name, value in tokens['colors'].items():
            result, seen = value['source'], set()
            while result in palette and result not in seen:
                seen.add(result)
                result = palette[result]
            check(result.upper() == value[mode], f'{mode}/{name} differs from official source')
        def flatten(data, prefix=''):
            result = {}
            for key, value in data.items():
                if isinstance(value, dict):
                    result.update(flatten(value, prefix + key + '.'))
                else:
                    result[prefix + key] = value
            return result
        ui = flatten(raw['ui'])
        metrics = tokens['metrics']
        for name, key, factor, subtract in [('islandRadius','Island.arc',.5,0), ('islandRadiusCompact','Island.arc.compact',.5,0), ('islandGap','Island.borderWidth',1,1), ('islandGapCompact','Island.borderWidth.compact',1,1), ('treeRow','Tree.rowHeight',1,0)]:
            check(metrics[name]['value'] == ui[key] * factor - subtract, f'Geometry source mismatch: {name}')
        pairs = [('text','editor'), ('muted','editor'), ('muted','window'), ('text','panel'), ('text','popup'), ('text','selection'), ('text','tab'), ('onAccent','accent'), ('onAccent','accentHover'), ('link','panel'), ('error','editor'), ('warning','editor'), ('success','editor'), ('text','errorBackground'), ('text','warningBackground'), ('text','successBackground')]
        for fg, bg in pairs:
            ratio = contrast(tokens['colors'][fg][mode], tokens['colors'][bg][mode])
            ratios.append({'mode': mode, 'foreground': fg, 'background': bg, 'ratio': round(ratio, 2)})
            check(ratio >= 4.5, f'Text contrast below 4.5: {mode} {fg}/{bg} = {ratio:.2f}')
    for path, expected in outputs(ROOT).items():
        p = ROOT / path
        check(p.is_file() and p.read_text(encoding='utf-8') == expected, 'Stale generated file: ' + path)
    skill = (ROOT / 'SKILL.md').read_text(encoding='utf-8')
    check(skill.startswith('---\nname: jetbrains-ide-design-system\n'), 'Invalid skill name/frontmatter')
    check('description:' in skill.split('---')[1], 'Missing description')
    for doc in ROOT.rglob('*.md'):
        content = doc.read_text(encoding='utf-8')
        for target in re.findall(r'\]\(([^)]+)\)', content):
            if '://' in target or target.startswith('#'):
                continue
            check((doc.parent / target.split('#')[0]).exists(), f'Broken link in {doc.name}: {target}')
        check(not re.search(r'[A-Z]:[\\/]|/Users/|/home/', content), 'Machine-specific path in ' + doc.name)
    for needed in ['INSTALL.md', 'THIRD_PARTY_NOTICES.md', 'agents/openai.yaml', 'licenses/Apache-2.0.txt', 'licenses/Inter-OFL.txt', 'licenses/JetBrainsMono-OFL.txt', 'licenses/NotoSansSC-OFL.txt', 'assets/web/index.html', 'assets/flutter/lib/main.dart', 'assets/flutter/test/widget_test.dart']:
        check((ROOT / needed).is_file(), 'Missing ' + needed)
    return {'passed': not errors, 'checks': checks, 'textContrastPairs': ratios, 'errors': errors}

if __name__ == '__main__':
    report = validate()
    print(json.dumps(report, indent=2))
    raise SystemExit(0 if report['passed'] else 1)
