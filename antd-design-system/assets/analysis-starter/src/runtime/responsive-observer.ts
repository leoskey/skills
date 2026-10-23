// The separate responsive preview renders these DOM measurements below each iframe.
if (
  new URLSearchParams(location.search).get("preview") === "mobile" &&
  parent !== window
) {
  const report = () => {
    const width = innerWidth;
    const problematic = Array.from(
      document.querySelectorAll<HTMLElement>(
        "input,textarea,.ant-card,.ant-form-item",
      ),
    )
      .filter((e) => {
        const r = e.getBoundingClientRect();
        if (
          !r.width ||
          !r.height ||
          getComputedStyle(e).visibility === "hidden"
        )
          return false;
        if (
          e.closest(".ant-table-container,.ant-table-content,.ant-table-body")
        )
          return false;
        return r.x < -2 || r.right > width + 2;
      })
      .map((e) => ({
        tag: e.tagName,
        cls: e.className.slice(0, 90),
        x: Math.round(e.getBoundingClientRect().x),
        width: Math.round(e.getBoundingClientRect().width),
      }))
      .slice(0, 12);
    parent.postMessage(
      {
        kind: "responsive-preview",
        path: location.hash.slice(1),
        viewport: [innerWidth, innerHeight],
        documentWidth: document.documentElement.scrollWidth,
        loaded: !!document.querySelector(".ant-card,.ant-result,form"),
        fontLoaded: document.fonts.check("14px AlibabaSans"),
        title: document.title,
        problematic,
      },
      location.origin,
    );
  };
  setInterval(report, 1000);
  window.addEventListener("hashchange", report);
  setTimeout(report, 600);
}
