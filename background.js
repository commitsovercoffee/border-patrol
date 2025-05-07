function executeScript(file, message) {
  function onExecuted(result) {
    console.log(message);
  }

  function onError(error) {
    console.log(`Border Patrol Error: ${error}`);
  }

  const executing = browser.tabs.executeScript({
    file: file,
    allFrames: true,
  });
  executing.then(onExecuted, onError);
}

function toggleOutlines(title, tabId) {
  if (title === "Show Outlines") {
    executeScript("outline-on.js", "Added Outlines.");
    executeScript("deprecated-on.js", "Added Deprecated Hints.");
    executeScript("tooltip-on.js", "Added Tag Tooltips.");
    browser.browserAction.setTitle({ tabId: tabId, title: "Hide Outlines" });
  } else {
    executeScript("outline-off.js", "Removed Outlines.");
    executeScript("deprecated-off.js", "Removes Deprecated Hints.");
    executeScript("tooltip-off.js", "Border Patrol : Removed Tag Tooltips.");
    browser.browserAction.setTitle({ tabId: tabId, title: "Show Outlines" });
  }
}

// When user clicks extension icon ...
browser.browserAction.onClicked.addListener((tab) => {
  // fetch the extension title ...
  browser.browserAction.getTitle({ tabId: tab.id }).then((title) => {
    // ... and accordingly toggle outlines.
    toggleOutlines(title, tab.id);
  });
});
