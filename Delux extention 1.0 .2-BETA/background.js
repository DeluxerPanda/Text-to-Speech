console.log("laddar background.js");
    chrome.runtime.onInstalled.addListener(() => {
      var contextMenuItem = {
          "id": "Delux", 
          "title":"Text till tal \"%s\"",
          "contexts": ["selection"]
      }
  
      chrome.contextMenus.create(contextMenuItem);
  
      chrome.contextMenus.onClicked.addListener(function(info, tab){
      // Completely clear the storage. All items are removed.
     chrome.storage.local.clear(() => {
     console.log('Tar brot alla gammla ord');
    });
         var word = info.selectionText;
         
        chrome.notifications.create(
          "Delux-notification",
          {
            type: "basic",
            iconUrl: "icon.png",
            title: "Text till tal",
            message: "Hej där! du kan nu få texten upp läst. klicka på Delux Extention logan uppe i hörnet"
          });
        chrome.notifications.clear(
          "Delux-notification"
        );
        console.log('Avisering klar!');
        if (info.selectionText == null){
          chrome.notifications.create(
            "Delux-notification",
            {
              type: "basic",
              iconUrl: "icon.png",
              title: "Text till tal",
              message: "något gick fel",
            });
            chrome.notifications.clear(
              "Delux-notification"
            );
            
        }else{
          
          chrome.storage.local.set({key: word}, function() {
            console.log(word);

          });
       

        }

      });});