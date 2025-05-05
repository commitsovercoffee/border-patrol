if (!window.lacewing_tooltip) {
  const lacewing_tooltip = document.createElement("div");
  lacewing_tooltip.style.position = "fixed";
  lacewing_tooltip.style.pointerEvents = "none";
  lacewing_tooltip.style.background = "rgba(0,0,0,0.75)";
  lacewing_tooltip.style.color = "#fff";
  lacewing_tooltip.style.padding = "4px 8px";
  lacewing_tooltip.style.borderRadius = "4px";
  lacewing_tooltip.style.fontSize = "12px";
  lacewing_tooltip.style.zIndex = "999999";
  lacewing_tooltip.style.fontFamily = "monospace";
  document.body.appendChild(lacewing_tooltip);

  window.lacewing_tooltip = lacewing_tooltip;

  window.lacewing_tooltipHandler = (e) => {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el) return;

    const tag = el.tagName.toLowerCase();
    const classes = el.className
      ? `.${el.className.trim().replace(/\s+/g, ".")}`
      : "";
    lacewing_tooltip.textContent = `${tag}${classes}`;
    lacewing_tooltip.style.top = `${e.clientY + 12}px`;
    lacewing_tooltip.style.left = `${e.clientX + 12}px`;
  };

  document.addEventListener("mousemove", window.lacewing_tooltipHandler);
}
