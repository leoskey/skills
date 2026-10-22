"""Validate the portable design pack with Python's standard library."""
import json
import re
import struct
from pathlib import Path
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parents[1]


def require(condition, message):
    if not condition:
        raise ValueError(message)


def validate_token(token, name):
    kind, value = token['$type'], token['$value']
    if kind == 'color':
        require(value['colorSpace'] == 'srgb', name + ': expected sRGB')
        require(len(value['components']) == 3, name + ': expected three channels')
        require(all(isinstance(v, (int, float)) and 0 <= v <= 1 for v in value['components']), name + ': channel out of range')
        require(0 <= value['alpha'] <= 1, name + ': alpha out of range')
    elif kind in ('dimension', 'duration'):
        require(value['unit'] == ('px' if kind == 'dimension' else 'ms'), name + ': wrong unit')
        require(isinstance(value['value'], (int, float)) and value['value'] >= 0, name + ': negative size')
    elif kind == 'fontFamily':
        require(value == 'VarLiveSans', name + ': unknown font')
    elif kind == 'fontWeight':
        require(value in (400, 500, 600, 700), name + ': unsupported design weight')
    elif kind == 'typography':
        validate_token({'$type': 'fontFamily', '$value': value['fontFamily']}, name)
        validate_token({'$type': 'fontWeight', '$value': value['fontWeight']}, name)
        for dimension in ('fontSize', 'letterSpacing'):
            validate_token({'$type': 'dimension', '$value': value[dimension]}, name)
        require(value['fontSize']['value'] >= 12, name + ': text too small')
        require(1.2 <= value['lineHeight'] <= 2, name + ': invalid line height')
    else:
        raise ValueError(name + ': unsupported token type ' + str(kind))


def flatten(node, prefix=''):
    if '$value' in node:
        validate_token(node, prefix)
        return {prefix: node}
    result = {}
    for key, value in node.items():
        if not key.startswith('$'):
            result.update(flatten(value, prefix + '.' + key if prefix else key))
    return result


def luminance(token):
    channels = token['$value']['components']
    values = [c / 12.92 if c <= 0.04045 else ((c + .055) / 1.055) ** 2.4 for c in channels]
    return sum(c * weight for c, weight in zip(values, (.2126, .7152, .0722)))


def main():
    tokens = flatten(json.loads((ROOT / 'assets/tokens.json').read_text(encoding='utf-8')))
    for foreground, background, minimum in [
        ('text.primary', 'background', 4.5), ('text.primary', 'surfaceRaised', 4.5),
        ('text.secondary', 'surface', 4.5), ('text.muted', 'surfaceRaised', 4.5),
        ('action.onPrimary', 'action.primary', 4.5), ('action.onPrimary', 'action.primaryPressed', 4.5),
        ('border.control', 'surfaceRaised', 3), ('focus', 'surface', 3),
        *[(f'status.{status}', 'surfaceRaised', 4.5) for status in ('success', 'warning', 'danger', 'info')],
    ]:
        a, b = sorted([luminance(tokens['color.' + foreground]), luminance(tokens['color.' + background])])
        ratio = (b + .05) / (a + .05)
        require(ratio >= minimum, f'{foreground}/{background}: contrast {ratio:.2f} < {minimum}')

    for document in ROOT.rglob('*.md'):
        content = document.read_text(encoding='utf-8')
        for target in re.findall(r'\[[^\]]+\]\(([^)]+)\)', content):
            if not target.startswith(('https://', 'http://', '#')):
                require((document.parent / target.split('#')[0]).exists(), f'{document.name}: missing link {target}')

    font = (ROOT / 'assets/fonts/NotoSansTC-Variable.ttf').read_bytes()
    require(font[:4] == b'\x00\x01\x00\x00', 'Invalid TrueType font')
    count = struct.unpack_from('>H', font, 4)[0]
    tables = {}
    for index in range(count):
        tag, _, offset, length = struct.unpack_from('>4sIII', font, 12 + index * 16)
        require(offset + length <= len(font), 'Truncated font table')
        tables[tag] = offset
    require(all(tag in tables for tag in (b'cmap', b'name', b'fvar')), 'Missing variable font tables')
    base = tables[b'fvar']
    axes_offset, _, axes_count, axis_size = struct.unpack_from('>HHHH', font, base + 4)
    axes = {}
    for index in range(axes_count):
        tag, low, default, high = struct.unpack_from('>4siii', font, base + axes_offset + index * axis_size)
        axes[tag] = (low / 65536, default / 65536, high / 65536)
    require(b'wght' in axes and axes[b'wght'][0] <= 400 and axes[b'wght'][2] >= 700, 'Missing required font weights')
    require('SIL OPEN FONT LICENSE' in (ROOT / 'assets/fonts/OFL.txt').read_text(encoding='utf-8'), 'Font license missing')
    require((ROOT / 'assets/logo.png').read_bytes().startswith(b'\x89PNG'), 'Logo missing')
    require((ROOT / 'references/desktop-preview.webp').read_bytes()[:4] == b'RIFF', 'Reference screenshot missing')
    icons = list((ROOT / 'assets/icons').glob('*.svg'))
    require(len(icons) == 21, 'Missing icon assets')
    for file in icons:
        svg = ElementTree.parse(file).getroot()
        require(svg.attrib.get('viewBox') == '0 0 24 24', file.name + ': inconsistent icon grid')
        require(svg.attrib.get('stroke') == 'currentColor', file.name + ': hardcoded icon color')
    for name in ('fighting', 'hospital', 'zombie', 'treasure', 'duel'):
        require((ROOT / f'assets/games/{name}.jpg').read_bytes().startswith(b'\xff\xd8'), 'Missing game image ' + name)
    print(f'PASS: {len(tokens)} tokens, 12 contrast pairs, local links, variable font, license, logo, 21 icons and 5 game images.')


if __name__ == '__main__':
    main()
