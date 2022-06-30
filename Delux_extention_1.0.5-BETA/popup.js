console.log("laddar popup.js");
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
     console.log('Removed items for the key');
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

 document.getElementById("pause").style.display = 'none'
document.getElementById("cancel").style.display = 'none'
document.getElementById("resume").style.display = 'none'
document.getElementById("error").style.display = 'none'
let userLang = navigator.language;

document.getElementById("lang_def").innerHTML = "("+userLang+")";

document.getElementById("start").onclick = function () {
  if(document.getElementById("text-to-speech").value){
    document.getElementById("error").style.display = 'none';
        
        let checkBox = document.getElementById("lang_def-check");

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
      console.log(lang_x);
          
         }



   speech.text = msg;
   speech.pitch = pitch_x;
   speech.rate = rate_x;
   synth.speak(speech);

  }else{

    document.getElementById("error").style.display = 'block';
    document.getElementById("error").style.color = 'red';
    document.getElementById("error").innerHTML = 'Can not read this!';
  }


}
speech.addEventListener('end', function(event) {
  document.getElementById("start").style.display = 'block';

  document.getElementById("pause").style.display = 'none';
  document.getElementById("cancel").style.display = 'none';
  document.getElementById("resume").style.display = 'none';
});


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