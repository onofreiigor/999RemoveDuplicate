$("#clickme").click(
  function()
    {
        console.log("click me");
        let msg = 
        {
            txt: "button"
        }
        chrome.tabs.sendMessage(1, msg);
    });

