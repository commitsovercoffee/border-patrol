// Initialization ~ Cold start.
let gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
  for (let tab of tabs) {
    initializeBrowserAction(tab);
  }
});

// Initialize browser action: set title.
function initializeBrowserAction(tab) {
  browser.browserAction.setTitle({ title: "Show Outlines" });
}

// Each time a tab is updated, reset browser action for that tab.
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializeBrowserAction(tab);
});

// Toggle title when browser action i.e extension, is clicked.
browser.browserAction.onClicked.addListener(() => {
  let title = browser.browserAction.getTitle({});
  title.then(toggleTitle);
});

function toggleTitle(title) {
  if (title === "Show Outlines") {
    browser.tabs.insertCSS(outlineCSS);
    browser.browserAction.setTitle({ title: "Hide Outlines" });
  } else {
    browser.tabs.removeCSS(outlineCSS);
    browser.browserAction.setTitle({ title: "Show Outlines" });
  }
}

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
