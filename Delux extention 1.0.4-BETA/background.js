console.log("laddar background.js");
    chrome.runtime.onInstalled.addListener(() => {
      var contextMenuItem = {
          "id": "Delux", 
          "title":"Text to speech \"%s\"",
          "contexts": ["selection"]
      }
  
      chrome.contextMenus.create(contextMenuItem);
  
      chrome.contextMenus.onClicked.addListener(function(info, tab){


         var word = info.selectionText;
         
        chrome.notifications.create(
          "Delux-notification",
          {
            type: "basic",
            iconUrl: "icon.png",
            title: "Text to speech",
            message: "Hello there! You can now have the text read aloud. click on the Delux Extention logo in the top corner"
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
              message: "something went wrong",
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
