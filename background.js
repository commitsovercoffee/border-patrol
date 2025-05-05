function toggleTitle(title) {
  if (title === "Show Outlines") {
    browser.browserAction.setTitle({ title: "Hide Outlines" });
  } else {
    browser.browserAction.setTitle({ title: "Show Outlines" });
  }
}

browser.browserAction.onClicked.addListener(() => {
  let title = browser.browserAction.getTitle({});
  title.then(toggleTitle);
});
