import { animate, inView } from "motion";

// Counts [data-count] numbers up from zero the first time they scroll into view.
// The real value is server-rendered, so without JS (or with reduced motion) nothing changes.
function initCounters() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const format = new Intl.NumberFormat("en-GB");

  document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    if (!Number.isFinite(target)) return;

    inView(
      el,
      () => {
        animate(0, target, {
          duration: 1.6,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (v) => (el.textContent = format.format(Math.round(v))),
        });
      },
      { amount: 0.6 }
    );
  });
}

initCounters();
