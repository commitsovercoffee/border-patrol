(() => {
  const DEPRECATED_TAGS = [
    // As per https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements
    "acronym",
    "big",
    "center",
    "dir",
    "font",
    "frame",
    "frameset",
    "marquee",
    "nobr",
    "noembed",
    "noframes",
    "param",
    "plaintext",
    "rb",
    "rtc",
    "strike",
    "tt",
    "xmp",
  ];

  const STYLE_ID = "deprecated-style-by-border-patrol";
  const CLASS_NAME = "deprecated-class-by-border-patrol";

  // Remove existing style.
  const existingStyle = document.getElementById(STYLE_ID);
  if (existingStyle) existingStyle.remove();

  // Remove existing deprecated labels.
  const existingLabels = document.getElementsByClassName(CLASS_NAME);
  while (existingLabels.length > 0) {
    existingLabels[0].remove();
  }

  // Create style.
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
        ${DEPRECATED_TAGS.join(",")} {
          outline: 1px dashed #FF0000 !important;
          background: rgba(255, 0, 0, 0.2) !important;
          position: relative !important;
        }

        .${CLASS_NAME} {
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2px 6px;
          background: rgba(0, 0, 0, 0.8);
          color: white;
          font-size: 12px;
          font-weight: bold;
          font-family: sans-serif;
          z-index: 9999;
          pointer-events: none;
        }
      `;
  document.head.appendChild(style);

  // Create deprecated labels.
  DEPRECATED_TAGS.forEach((tag) => {
    const elements = document.querySelectorAll(tag);
    elements.forEach((el) => {
      const div = document.createElement("div");
      div.className = CLASS_NAME;
      div.textContent = "DEPRECATED";
      el.appendChild(div);
    });
  });
})();
