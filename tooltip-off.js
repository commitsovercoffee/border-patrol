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
})();
