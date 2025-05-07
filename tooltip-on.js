(() => {
  const STYLE_ID = "tooltip-style-by-border-patrol";
  const CLASS_NAME = "tooltip-class-by-border-patrol";

  // Remove existing style.
  const existingStyle = document.getElementById(STYLE_ID);
  if (existingStyle) existingStyle.remove();

  // Remove existing tooltip.
  const existingTooltip = document.querySelector(`.${CLASS_NAME}`);
  if (existingTooltip) existingTooltip.remove();

  // Remove existing handler/listener.
  if (window.tooltipHandler) {
    document.removeEventListener("mousemove", window.tooltipHandler);
    delete window.tooltipHandler;
  }

  // Create style.
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
      .${CLASS_NAME} {
         position: fixed;
         pointer-events: none;
         background: rgba(0,0,0,0.75);
         color: #fff;
         padding: 4px 8px;
         border-radius: 4px;
         font-size: 12px;
         z-index: 999999;
         font-family: monospace;
       }
    `;
  document.head.appendChild(style);

  // Create tooltip.
  const tooltip = document.createElement("div");
  tooltip.className = CLASS_NAME;
  document.body.appendChild(tooltip);

  // Create handler/listener.
  window.tooltipHandler = (e) => {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el) return;
    const tag = el.tagName.toLowerCase();
    const classStr = typeof el.className === "string" ? el.className : "";
    const classes = classStr ? `.${classStr.trim().replace(/\s+/g, ".")}` : "";
    tooltip.textContent = `${tag}${classes}`;
    tooltip.style.top = `${e.clientY + 12}px`;
    tooltip.style.left = `${e.clientX + 12}px`;
  };
  document.addEventListener("mousemove", window.tooltipHandler);
})();
