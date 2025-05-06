// Initialization ~ Cold start.
let tabs = browser.tabs.query({});
tabs.then((tabs) => {
  for (let tab of tabs) {
    initializeBrowserAction(tab);
  }
});

// Initialize browser action ~ set title.
function initializeBrowserAction(tab) {
  browser.browserAction.setTitle({ title: "Show Outlines" });
}

// Each time a tab is updated, reset browser action for that tab.
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializeBrowserAction(tab);
});

const tabStates = {};

const tagColors = {
  // Text-related elements
  a: "#6B8E23",
  abbr: "#4682B4",
  acronym: "#DAA520",
  address: "#32CD32",
  article: "#00CED1",
  aside: "#8A2BE2",
  b: "#FF6347",
  bdi: "#9ACD32",
  bdo: "#DC143C",
  big: "#FF1493",
  blockquote: "#008080",
  p: "#D2691E",
  pre: "#8B4513",
  q: "#00FA9A",
  s: "#F08080",
  samp: "#B22222",
  strong: "#FFD700",
  sub: "#4B0082",
  summary: "#8B008B",
  sup: "#FF4500",
  tt: "#9932CC",
  u: "#7FFF00",
  var: "#FF8C00",
  wbr: "#FF69B4",

  // Forms and interactive elements
  button: "#20B2AA",
  input: "#B0C4DE",
  label: "#2F4F4F",
  select: "#DCDCDC",
  textarea: "#A9A9A9",
  option: "#C71585",
  optgroup: "#8A2BE2",
  output: "#F4A460",
  fieldset: "#708090",
  legend: "#6A5ACD",
  details: "#006400",
  datalist: "#7FFF00",
  meter: "#ADFF2F",
  progress: "#FF6347",
  keygen: "#3CB371",

  // Structural elements
  div: "#4682B4",
  dl: "#B0E0E6",
  dt: "#F08080",
  dd: "#FA8072",
  span: "#8B4513",
  nav: "#D3D3D3",
  header: "#F4A460",
  footer: "#2F4F4F",
  main: "#B0C4DE",
  section: "#DCDCDC",
  figure: "#8A2BE2",
  figcaption: "#DB7093",
  hgroup: "#C71585",
  h1: "#8B0000",
  h2: "#B22222",
  h3: "#FF4500",
  h4: "#FF6347",
  h5: "#FF1493",
  h6: "#D2691E",

  // Table-related elements
  table: "#FFD700",
  caption: "#FF6347",
  col: "#ADFF2F",
  colgroup: "#D3D3D3",
  tr: "#F4A460",
  th: "#FF4500",
  td: "#8A2BE2",
  thead: "#FFD700",
  tbody: "#32CD32",
  tfoot: "#8B0000",

  // Links and media elements
  audio: "#008080",
  video: "#FF1493",
  img: "#F08080",
  picture: "#00CED1",
  source: "#C71585",
  iframe: "#B0E0E6",
  map: "#FF8C00",
  area: "#D2691E",
  track: "#FF6347",
  object: "#B22222",

  // Inline-style elements
  style: "#2F4F4F",
  script: "#A52A2A",
  noscript: "#800000",
  noembed: "#D3D3D3",
  marquee: "#00FA9A",
  font: "#6A5ACD",
  base: "#20B2AA",

  // Embedded content
  embed: "#8B008B",
  frame: "#D2691E",
  frameset: "#FF8C00",
  object: "#B0C4DE",

  // Meta and metadata elements
  meta: "#8B0000",
  title: "#2E8B57",
  head: "#FFD700",
  noframes: "#D3D3D3",

  // Dialog-related elements
  dialog: "#FF4500",
  details: "#3CB371",
  summary: "#D2691E",

  // Scripting elements
  template: "#A52A2A",
  slot: "#B0E0E6",

  // Form control elements
  form: "#C71585",
  input: "#DCDCDC",
  button: "#32CD32",
  select: "#FFD700",
  textarea: "#B0C4DE",
  label: "#8A2BE2",
  legend: "#D2691E",

  // Global and miscellaneous elements
  html: "#D3D3D3",
  body: "#F4A460",
  script: "#DC143C",
  style: "#F0E68C",

  // Links and navigation elements
  menu: "#20B2AA",
  nav: "#006400",

  // Miscellaneous elements
  rb: "#C71585",
  rp: "#32CD32",
  rt: "#8B4513",
  rtc: "#FF6347",
  ruby: "#B22222",
  time: "#FFD700",
  tfoot: "#D2691E",
  tframe: "#8A2BE2",
  tag: "#FF8C00",
};

const outlineCSS = {
  code: Object.entries(tagColors)
    .map(([tag, color]) => `${tag} { box-shadow: inset 0 0 0 0.5px ${color}; }`)
    .join("\n"),
};

// Toggle extension :
browser.browserAction.onClicked.addListener(async (tab) => {
  const tabId = tab.id;
  const isActive = tabStates[tabId] || false;

  try {
    if (!isActive) {
      // Show outlines & tooltip.
      await browser.tabs.insertCSS(tabId, outlineCSS);
      await browser.tabs.executeScript(tabId, { file: "tooltip.js" });
      await browser.tabs.executeScript(tabId, { file: "deprecated.js" });
      await browser.browserAction.setTitle({ tabId, title: "Hide Outlines" });
    } else {
      // Hide outlines & tooltip.
      await browser.tabs.removeCSS(tabId, outlineCSS);
      await browser.tabs.executeScript(tabId, {
        code: `
          if (window.lacewing_tooltipHandler) {
            document.removeEventListener("mousemove", window.lacewing_tooltipHandler);
            window.lacewing_tooltipHandler = null;
          }
          if (window.lacewing_tooltip) {
            window.lacewing_tooltip.remove();
            window.lacewing_tooltip = null;
          }
        `,
      });
      await browser.tabs.executeScript(tabId, {
        code: `
          (function() {
            const style = document.getElementById("lacewing-deprecated-style");
            if (style) style.remove();
            const labels = document.querySelectorAll(".lacewing-deprecated-label");
            for (const label of labels) {
              label.remove();
            }
          })();
        `,
      });
      await browser.browserAction.setTitle({ tabId, title: "Show Outlines" });
    }
    tabStates[tabId] = !isActive;
  } catch (err) {
    console.error("toggle error:", err);
  }
});
