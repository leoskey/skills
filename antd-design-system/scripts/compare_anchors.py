"""Compare observed anchors, viewport, fonts and scroll without hiding raw deltas."""
import argparse,json
from pathlib import Path
def compare(reference,candidate,tolerance=2):
 failures=[];deltas=[]
 if reference.get('viewport')!=candidate.get('viewport'):failures.append({'anchor':'viewport','reason':'mismatch'})
 if not reference.get('fontLoaded') or not candidate.get('fontLoaded'):failures.append({'anchor':'fontLoaded','reason':'font not loaded'})
 if abs(reference.get('scrollY',0)-candidate.get('scrollY',0))>tolerance:failures.append({'anchor':'scrollY','reason':'mismatch'})
 if abs(reference.get('scrollX',0)-candidate.get('scrollX',0))>tolerance:failures.append({'anchor':'scrollX','reason':'mismatch'})
 rm={x['key']:x for x in reference.get('anchors',[])};cm={x['key']:x for x in candidate.get('anchors',[])}
 if not rm or not cm:failures.append({'anchor':'anchors','reason':'empty'})
 for k in sorted(rm.keys()|cm.keys()):
  if k not in rm or k not in cm:failures.append({'anchor':k,'reason':'missing counterpart'});continue
  delta={n:round(cm[k][n]-rm[k][n],3) for n in ['x','y','width','height']};deltas.append({'anchor':k,'delta':delta})
  if any(abs(x)>tolerance for x in delta.values()):failures.append({'anchor':k,'delta':delta})
 return {'passed':not failures,'tolerancePx':tolerance,'deltas':deltas,'failures':failures,'scope':'Geometry only; review screenshots and record semantic/data/version differences independently.'}
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('reference',type=Path);p.add_argument('candidate',type=Path);p.add_argument('--tolerance',type=float,default=2);a=p.parse_args()
 print(json.dumps(compare(json.loads(a.reference.read_text(encoding='utf-8')),json.loads(a.candidate.read_text(encoding='utf-8')),a.tolerance),ensure_ascii=False,indent=2))
