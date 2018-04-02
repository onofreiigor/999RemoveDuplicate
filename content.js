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
var parsedItems = [];

function RemoveDublicateFrom999()
{
    var duplicateCount = 0;
    
    var adItems = $("#js-ads-container").children("ul.ads-list-detail:first").children("li");
    var parsedItems = [];
    console.log("List: " + adItems.length);
    
    for (var i = 0; i < adItems.length; i++)
    {
        var itemId;
        //var src = $(adItems[i]).children("div.ads-list-detail-item-thumb:first").children("a:first").children("img:first").attr("src");
        var title = $(adItems[i]).children("div.ads-list-detail-item-title:first").children("a:first").text();
        var desc = $(adItems[i]).children("div.ads-list-detail-item-intro:first").text();
        //console.log("Img src: " + src);
        //console.log("Title: " + title);
        //console.log("Desc: " + desc);
        
        var flag = false;

        for (var j = 0; j < parsedItems.length; j++)
        {
            if (parsedItems[j].title == title && parsedItems[j].desc == desc)
            {
                flag = true;
                break;
            }
        }

        if (flag == false)
        {
            parsedItems.push({title: title, desc: desc});  
        }
        else
        {
            $(adItems[i]).hide();
            duplicateCount++;
        }
    }

    alert("Duplicate Count: " + duplicateCount);
}

function CheckIfExist(title, desc)
{
    for (var j = 0; j < parsedItems.length; j++)
    {
        if (parsedItems[j].title == title && parsedItems[j].desc == desc)
        {
            return true;
        }
    }

    return false;
}