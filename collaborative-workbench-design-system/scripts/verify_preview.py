import json
from pathlib import Path
import argparse
parser=argparse.ArgumentParser(description='Requires playwright; uses an existing Chromium browser.')
parser.add_argument('--browser',required=True,help='Path to Chromium or Chrome executable')
parser.add_argument('--output',required=True,help='Screenshot/report directory outside the skill')
args=parser.parse_args()
from playwright.sync_api import sync_playwright

skill=Path(__file__).resolve().parents[1]
out=Path(args.output).resolve()
out.mkdir(parents=True,exist_ok=True)
report=[]
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=args.browser,headless=True)
    for width in (1440,900,390):
        page=browser.new_page(viewport={'width':width,'height':1000},reduced_motion='reduce')
        errors=[]
        page.on('pageerror',lambda err:errors.append(str(err)))
        page.goto((skill/'assets/preview.html').as_uri())
        for theme in ('light','dark'):
            if page.locator('body').get_attribute('data-theme')!=theme: page.locator('#theme').click()
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),width
            page.screenshot(path=str(out/f'{width}-{theme}.png'),full_page=True)
            metrics=page.locator('h1').evaluate('(el)=>({font:getComputedStyle(el).fontSize,lineHeight:getComputedStyle(el).lineHeight,width:el.getBoundingClientRect().width})')
            report.append({'width':width,'theme':theme,'h1':metrics})
        page.locator('#query').fill('不存在')
        assert page.locator('#empty').is_visible()
        page.locator('#clear').click()
        assert page.locator('.record').count()==3
        page.locator('[data-id="2"]').click()
        assert '自动化' in page.locator('#owner').inner_text()
        if width==390:
            assert page.locator('#detail-title').evaluate('(el)=>el===document.activeElement')
            page.screenshot(path=str(out/'390-detail.png'),full_page=True)
        page.locator('#complete').click()
        assert page.locator('#detail-status').inner_text()=='已完成'
        if width==390:
            page.locator('#back').click()
            assert page.locator('[data-id="2"]').evaluate('(el)=>el===document.activeElement')
        page.locator('#create').click()
        assert page.locator('#title').evaluate('(el)=>el===document.activeElement')
        page.locator('#form button[type="submit"]').click()
        assert page.locator('#error').is_visible()
        page.locator('#title').fill('<script>长标题测试</script>'+'协作记录'*15)
        page.keyboard.press('Shift+Tab')
        assert page.locator('#dialog').evaluate('(el)=>el.contains(document.activeElement)')
        page.keyboard.press('Escape')
        assert not page.locator('#dialog').is_visible()
        assert page.locator('#create').evaluate('(el)=>el===document.activeElement')
        page.locator('#create').click()
        page.locator('#title').fill('<script>长标题测试</script>'+'协作记录'*15)
        page.locator('#form button[type="submit"]').click()
        assert not page.locator('#dialog').is_visible()
        assert '<script>' in page.locator('#detail-title').inner_text()
        assert page.locator('.record').count()==4
        page.screenshot(path=str(out/f'{width}-created.png'),full_page=True)
        assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
        page.reload()
        assert page.locator('.record').count()==3
        assert not errors,errors
        page.close()
    # Initial system theme and 720px reflow; native browser zoom is not simulated.
    page=browser.new_page(viewport={'width':1440,'height':1000},color_scheme='dark')
    page.goto((skill/'assets/preview.html').as_uri())
    assert page.locator('body').get_attribute('data-theme')=='dark'
    page.set_viewport_size({'width':720,'height':1000})
    assert page.evaluate('document.documentElement.scrollWidth<=innerWidth')
    page.screenshot(path=str(out/'reflow-720.png'),full_page=True)
    browser.close()
(out/'report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8')
print('Passed 3 viewports × 2 themes, search/empty/clear, selection, completion, create/validation, dialog Escape/focus, mobile return, reload reset, long text, system dark, 720px reflow (200% desktop-width equivalent); no page errors.')
