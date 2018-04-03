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
var minSimilar = 90;
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
            if (StringCompare(parsedItems[j].title, title) >= minSimilar && StringCompare(parsedItems[j].desc, desc) >= minSimilar)
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
            //var similar = StringCompare("test2", "test2");
            duplicateCount++;
        }
    }

    alert("Duplicate Count: " + duplicateCount);
}

function StringCompare(str1, str2)
{
    var prcStep = 0;
    var prcSimilar = 0;
    var main = "";
    var second = "";
    if (str1.length >= str2.length)
    {
        main = str1;
        second = str2;
    }
    else
    {
        main = str2;
        second = str1;
    }

    prcStep = 100 / main.length;
    for (var i = 0; i < second.length; i++)
    {
        if (main[i] == second[i])
        {
            prcSimilar += prcStep;
        }
    }

    return prcSimilar;
}