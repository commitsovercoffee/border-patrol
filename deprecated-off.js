(() => {
  const STYLE_ID = "deprecated-style-by-border-patrol";
  const CLASS_NAME = "deprecated-label-by-border-patrol";

  // Remove existing style.
  const existingStyle = document.getElementById(STYLE_ID);
  if (existingStyle) existingStyle.remove();

  // Remove existing deprecated labels.
  const existingLabels = document.getElementsByClassName(CLASS_NAME);
  while (existingLabels.length > 0) {
    existingLabels[0].remove();
  }
})();
