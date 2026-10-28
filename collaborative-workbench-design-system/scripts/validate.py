"""Validate portable resource links and original theme contracts (stdlib only)."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def luminance(color):
    channels = [int(color[i:i+2], 16) / 255 for i in (1, 3, 5)]
    linear = [c / 12.92 if c <= .04045 else ((c + .055) / 1.055) ** 2.4 for c in channels]
    return sum(c * w for c, w in zip(linear, (.2126, .7152, .0722)))


def contrast(a, b):
    values = sorted((luminance(a), luminance(b)))
    return (values[1] + .05) / (values[0] + .05)


def main():
    for file in ROOT.rglob('*.md'):
        for link in re.findall(r'\[[^\]]*\]\(([^)]+)\)', file.read_text(encoding='utf8')):
            if '://' not in link and not link.startswith('#'):
                assert (file.parent / link.split('#')[0]).exists(), (file, link)
    data = json.loads((ROOT / 'assets/tokens.json').read_text(encoding='utf8'))
    css = (ROOT / 'assets/tokens.css').read_text(encoding='utf8')
    for theme, colors in data['themes'].items():
        block = re.search(r'\[data-theme="' + theme + r'"\]\s*\{([^}]+)', css)[1]
        for name, value in colors.items():
            assert f'--cwb-{name}: {value};' in block, (theme, name)
        pairs = [(fg, bg, 4.5) for fg in ('text', 'muted', 'success', 'warning', 'danger')
                 for bg in ('surface', 'canvas', 'selected')]
        pairs += [('onAccent', 'accent', 4.5), ('accent', 'surface', 3),
                  ('control', 'surface', 3), ('control', 'canvas', 3)]
        for fg, bg, minimum in pairs:
            ratio = contrast(colors[fg], colors[bg])
            assert ratio >= minimum, (theme, fg, bg, round(ratio, 2), minimum)
        print(f'{theme}: {len(pairs)} contrast pairs passed; CSS synchronized')
    html = (ROOT / 'assets/preview.html').read_text(encoding='utf8')
    assert not re.search(r'(?:src|href)=[\"\']https?://', html), 'Preview must work offline'
    print('Relative links and offline resource boundary passed')


if __name__ == '__main__':
    main()
