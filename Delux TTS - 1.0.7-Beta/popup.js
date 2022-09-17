/* console.log("laddar popup.js"); */
// Init SpeechSynth API
const synth = window.speechSynthesis;
const speech = new SpeechSynthesisUtterance(); 

// Gets text from background script to popup script
if (chrome.storage != null){
chrome.storage.local.get(['key'], function(result) {
  if (result.key != null){
   let dataKey = result.key;
    document.getElementById("text-to-speech").value = dataKey;
  }
});
   
       // Remove items under a certain key
   chrome.storage.local.remove(['key'], (result) => {
 /*     console.log('Removed items for the key'); */
   });

  }
// check and create a menu of all voices on the system
   function populateVoiceList() {
    if(typeof speechSynthesis === 'undefined') {
      return;
    }
  
    var voices = speechSynthesis.getVoices();
  
    for(var i = 0; i < voices.length; i++) {
      var option = document.createElement('option');
      option.textContent = voices[i].name;
      option.value = voices[i].lang;
  
      if(voices[i].default) {
        option.textContent;
      }
    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name); 
      document.getElementById("lang").appendChild(option);
    }
  }
  
  populateVoiceList();
  if (typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
//standard utsende
document.getElementById("start").style.display = 'block'

 document.getElementById("pause").style.display = 'none'
document.getElementById("cancel").style.display = 'none'
document.getElementById("resume").style.display = 'none'
document.getElementById("error").style.display = 'none'
document.getElementById("ttsplay").style.display = 'none'

let userLang = navigator.language;
document.getElementById("lang_def").innerHTML = "("+userLang+")";

document.getElementById("start").onclick = function () {
  let msg_text = document.getElementById("text-to-speech").value;
  let lang_x = document.getElementById("lang").value;
  let checkBox = document.getElementById("lang_def-check");
  if(document.getElementById("text-to-speech").value){


    document.getElementById("error").style.display = 'none';
    document.getElementById("ttsplay").style.display = 'block'
        

   document.getElementById("start").style.display = 'none';
   document.getElementById("pause").style.display = 'block';
   document.getElementById("cancel").style.display = 'block';

          
   if (checkBox.checked == true){
     speech.lang = userLang;
     if (userLang === 'undefined') {
      synth.cancel();
      document.getElementById("error").style.display = 'block';
      document.getElementById("error").style.color = 'red';
      document.getElementById("error-text").innerHTML = 'Your language does not seem to exist. if you are using an older device, your language may not be available';
    
    }
      } else {
        
      
     speech.lang = lang_x;
         }
         var lang = speech.lang;

   var CHARACTER_LIMIT = 200;
   
   var text = msg_text;
   
       speak(text, lang)
   
       function speak(text, lang) {
   
         //Support for multipart text (there is a limit on characters)
         var multipartText = [];
   
         if (text.length > CHARACTER_LIMIT) {
   
           var tmptxt = text;
   
           while (tmptxt.length > CHARACTER_LIMIT) {
   
             //Split by common phrase delimiters
             var p = tmptxt.search(/[:!?.;]+/);
             var part = '';
   
             //Coludn't split by priority characters, try commas
             if (p == -1 || p >= CHARACTER_LIMIT) {
               p = tmptxt.search(/[,]+/);
             }
   
             //Couldn't split by normal characters, then we use spaces
             if (p == -1 || p >= CHARACTER_LIMIT) {
   
               var words = tmptxt.split(' ');
   
               for (var i = 0; i < words.length; i++) {
   
                 if (part.length + words[i].length + 1 > CHARACTER_LIMIT)
                   break;
   
                 part += (i != 0 ? ' ' : '') + words[i];
   
               }
   
             } else {
   
               part = tmptxt.substr(0, p + 1);
   
             }
   
             tmptxt = tmptxt.substr(part.length, tmptxt.length - part.length);
   
             multipartText.push(part);
             //console.log(part.length + " - " + part);
   
           }
   
           //Add the remaining text
           if (tmptxt.length > 0) {
             multipartText.push(tmptxt);
           }
   
         } else {
   
           //Small text
           multipartText.push(text);
         }
   
   
         //Play multipart text
         for (var i = 0; i < multipartText.length; i++) {
   
   
           //Create msg object
           var msg = new SpeechSynthesisUtterance();
           //msg.volume = 1; // 0 to 1
           let pitch_x = document.getElementById("pitch").value;
           let rate_x = document.getElementById("rate").value;
           msg.pitch = pitch_x;
           msg.rate = rate_x;
           msg.text = multipartText[i];
           msg.speak = multipartText;
           msg.lang = lang;
           msg.onend = self.OnFinishedPlaying;
           msg.onerror = function (e) {
            document.getElementById("error").style.display = 'block';
            document.getElementById("error").style.color = 'red';
            document.getElementById("error-text").innerHTML = 'something went wrong';
           };
           /*GC*/
           msg.onstart = function (e) {
             var curenttxt = e.currentTarget.text;
           };

           speechSynthesis.speak(msg);

         }
         msg.onend = function (e) {
          document.getElementById("start").style.display = 'block';
        
          document.getElementById("ttsplay").style.display = 'none'
          document.getElementById("pause").style.display = 'none';
          document.getElementById("cancel").style.display = 'none';
          document.getElementById("resume").style.display = 'none';
        };
       }
   


  }else{

    document.getElementById("error").style.display = 'block';
    document.getElementById("error").style.color = 'red';
    document.getElementById("error-text").innerHTML = 'You must type something in the text box';
  }


}


            document.querySelector("#pause").addEventListener("click", () => {
              synth.pause();
              document.getElementById("pause").style.display = 'none';
              document.getElementById("resume").style.display = 'block';
            });

            document.querySelector("#resume").addEventListener("click", () => {
              synth.resume();
              document.getElementById("pause").style.display = 'block';
              document.getElementById("resume").style.display = 'none';
            });

            document.querySelector("#cancel").addEventListener("click", () => {
              synth.cancel();
              document.getElementById("start").style.display = 'block';

              document.getElementById("pause").style.display = 'none';
              document.getElementById("cancel").style.display = 'none';
              document.getElementById("resume").style.display = 'none';
            });