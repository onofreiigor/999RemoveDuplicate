// background.js

console.log("PopUp loaded!");

chrome.browserAction.onClicked.addListener(popUpClick);

function popUpClick(tab)
{
  let msg = 
  {
    txt: "Popup Click!",
    tabUrl: "",
    tabId: tab.id
  }

  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs)
  {
    msg.tabUrl = tabs[0].url;
    chrome.tabs.sendMessage(tab.id, msg);
  });
}
