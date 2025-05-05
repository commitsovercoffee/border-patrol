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
  div: "blue",
  p: "green",
  span: "orange",
  section: "purple",
  header: "teal",
  footer: "darkred",
  nav: "brown",
  article: "darkorange",
  main: "darkgreen",
  aside: "indigo",
  h1: "crimson",
  h2: "tomato",
  h3: "goldenrod",
  a: "dodgerblue",
  ul: "darkcyan",
  li: "darkviolet",
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
      await browser.browserAction.setTitle({ tabId, title: "Show Outlines" });
    }
    tabStates[tabId] = !isActive;
  } catch (err) {
    console.error("toggle error:", err);
  }
});
