(() => {
  const deprecatedTags = [
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

  const styleId = "lacewing-deprecated-style";
  if (document.getElementById(styleId)) return; // Avoid reinjecting

  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
     ${deprecatedTags.join(",")} {
       outline: 1px dashed #FF0000 !important;
       background: rgba(255, 0, 0, 0.2) !important;
       position: relative !important;
     }

     .lacewing-deprecated-label {
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

  // Add "Deprecated" label inside each element
  deprecatedTags.forEach((tag) => {
    const elements = document.querySelectorAll(tag);
    elements.forEach((el) => {
      const label = document.createElement("div");
      label.className = "lacewing-deprecated-label";
      label.textContent = "DEPRECATED";
      el.appendChild(label);
    });
  });
})();
