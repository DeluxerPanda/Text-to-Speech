
    chrome.runtime.onInstalled.addListener(() => {
      var contextMenuItem = {
          "id": "Delux", 
          "title":"Text till tal \"%s\"",
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
            title: "Text till tal",
            message: "hello there! du kan nu få texten upp läst. klicka på Delux Extention logan uppe i hörnet "
            +info.selectionText,
          });
          chrome.storage.sync.clear();
        chrome.notifications.clear(
          "Delux-notification"
        );
        console.log('Avisering klar!');
        if (info.selectionText == null){
          chrome.storage.sync.clear();
          chrome.notifications.create(
            "Delux-notification",
            {
              type: "basic",
              iconUrl: "icon.png",
              title: "Text till tal",
              message: "något gick fel",
            });
            
        }else{
          
        
          chrome.storage.sync.set({key: word}, function() {
            console.log(word);
          });
       

        }

      });});