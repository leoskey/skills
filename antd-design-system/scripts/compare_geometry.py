"""Compare matching layout anchors from read-only browser observations."""
import argparse
import json
from pathlib import Path

def compare(reference, candidate, tolerance):
    failures=[]
    if reference['viewport'] != candidate['viewport']:
        failures.append({'anchor':'viewport','reference':reference['viewport'],'candidate':candidate['viewport']})
    if reference.get('shell') != candidate.get('shell'):
        failures.append({'anchor':'shell','reference':reference.get('shell'),'candidate':candidate.get('shell')})
    if not reference['cards']:
        failures.append({'anchor':'cards','reason':'reference has no content anchors'})
    if all(isinstance(x.get('scrollY'),(int,float)) for x in [reference,candidate]) and abs(reference['scrollY']-candidate['scrollY'])>tolerance:
        failures.append({'anchor':'scrollY','reference':reference['scrollY'],'candidate':candidate['scrollY']})
    if reference.get('fontLoaded') is False or candidate.get('fontLoaded') is False:
        failures.append({'anchor':'fontLoaded','reference':reference.get('fontLoaded'),'candidate':candidate.get('fontLoaded')})
    pairs=[('header',reference['header'],candidate['header']),('sider',reference['sider'],candidate['sider'])]
    if len(reference['cards'])!=len(candidate['cards']):
        failures.append({'anchor':'card-count','reference':len(reference['cards']),'candidate':len(candidate['cards'])})
    pairs.extend((f'card:{r["title"]}',r,c) for r,c in zip(reference['cards'],candidate['cards']))
    for ref,cur in zip(reference['cards'],candidate['cards']):
        if ref['title']!=cur['title']:
            failures.append({'anchor':'card-title','reference':ref['title'],'candidate':cur['title']})
    deltas=[]
    for name,ref,cur in pairs:
        if ref is None and cur is None and reference.get('shell')=='standalone' and name in {'header','sider'}:
            continue
        if ref is None or cur is None:
            failures.append({'anchor':name,'reason':'missing'})
            continue
        values={key:round(cur[key]-ref[key],4) for key in ['x','y','width','height']}
        deltas.append({'anchor':name,'delta':values})
        if any(abs(value)>tolerance for value in values.values()):
            failures.append({'anchor':name,'delta':values})
    return {'passed':not failures,'tolerancePx':tolerance,'deltas':deltas,'failures':failures,'scope':'Geometry only; screenshots and interaction need separate review.'}

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('reference',type=Path)
    parser.add_argument('candidate',type=Path)
    parser.add_argument('--tolerance',type=float,default=2)
    parser.add_argument('--output',type=Path)
    args=parser.parse_args()
    result=compare(json.loads(args.reference.read_text(encoding='utf-8')),json.loads(args.candidate.read_text(encoding='utf-8')),args.tolerance)
    value=json.dumps(result,ensure_ascii=False,indent=2)+'\n'
    if args.output:args.output.write_text(value,encoding='utf-8')
    print(value)
    raise SystemExit(0 if result['passed'] else 1)

if __name__=='__main__':main()
