// content.js
$(document).ready(function()
{
    console.log("Main page loaded!");
});

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage (message, sender, sendResponse)
{
    console.log(message.txt);
    console.log(message.tabUrl);
    console.log(message.tabId);
    if (message.tabUrl.startsWith("https://999.md/"))
    {
        RemoveDublicateFrom999();
    }
    //RemoveDublicateFrom999();
}

var adCount = 0;
//var adItems = [];

function RemoveDublicateFrom999()
{

    var adItems = $("#js-ads-container").children("ul.ads-list-detail:first").children("li");
    console.log("Lis: " + adItems.length);
    adCount += adItems.length;
    console.log("Count: " + adCount);
    
    for (i = 0; i < adItems.length; i++)
    {
        //console.log($(adItems[i]).html());
        //$(adItems[i]).hide();
    }

    var item = {id: "", name: "", desc: ""};
    var items = [];

    //items.push(item);
    //items.push({id: "3", name: "test", desc: "test"});

    for (i = 0; i < items.length; i++)
    {
        console.log("Id: " + items[i].id);
        console.log("Name: " + items[i].name);
        console.log("Desc: " + items[i].desc);
    }
}