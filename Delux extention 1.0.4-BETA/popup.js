console.log("laddar popup.js");

chrome.storage.local.get(['key'], function(result) {
  console.log(result.key);
  if (result.key != null){
   let dataKey = result.key;
    document.getElementById("text-to-speech").value = dataKey;
  } 
});
      // Completely clear the storage. All items are removed.
      chrome.storage.local.clear(() => {
        console.log('Tar brot alla gammla ord med clear');
       });
   
       // Remove items under a certain key
   chrome.storage.local.remove(['key'], (result) => {
     console.log('Removed items for the key');
   });

document.getElementById("pause").style.display = 'none'
document.getElementById("cancel").style.display = 'none'
document.getElementById("resume").style.display = 'none'
document.getElementById("error").style.display = 'none'



let speech = new SpeechSynthesisUtterance();
let userLang = navigator.language;

document.getElementById("lang_def").innerHTML = userLang;

document.getElementById("start").onclick = function () {
  if(document.getElementById("text-to-speech").value){
    document.getElementById("error").style.display = 'none';
        
        var checkBox = document.getElementById("lang_def-check");
        
        var text = document.getElementById("text");

    let msg = document.getElementById("text-to-speech").value;

   document.getElementById("start").style.display = 'none';
   document.getElementById("pause").style.display = 'block';
   document.getElementById("cancel").style.display = 'block';
   let pitch_x = document.getElementById("pitch").value;
   let rate_x = document.getElementById("rate").value;
          
           if (checkBox.checked == true){
            speech.lang = userLang;
        } else {
            let lang_x = document.getElementById("lang").value;
            speech.lang = lang_x;
        }
   speech.text = msg;
   speech.pitch = pitch_x;
   speech.rate = rate_x;
   window.speechSynthesis.speak(speech);
   
  }else{
    document.getElementById("error").style.display = 'block';
  }
}
              
            document.querySelector("#pause").addEventListener("click", () => {
              window.speechSynthesis.pause();
              document.getElementById("pause").style.display = 'none';
              document.getElementById("resume").style.display = 'block';
            });

            document.querySelector("#resume").addEventListener("click", () => {
              window.speechSynthesis.resume();
              document.getElementById("pause").style.display = 'block';
              document.getElementById("resume").style.display = 'none';
            });

            document.querySelector("#cancel").addEventListener("click", () => {
              window.speechSynthesis.cancel();
              document.getElementById("start").style.display = 'block';

              document.getElementById("pause").style.display = 'none';
              document.getElementById("cancel").style.display = 'none';
              document.getElementById("resume").style.display = 'none';
            });

          if (window.speechSynthesis.cancel()) {
            document.getElementById("start").style.display = 'block';
          }