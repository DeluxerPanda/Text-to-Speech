let pitch = document.getElementById("pitch");
let pitchbutton = document.getElementById("pitch-button");
document.getElementById("pitch-button").style.display = 'none';
pitch.addEventListener("click", () => {

        document.getElementById("pitch-button").style.display = 'block';
        
    });
    pitchbutton.addEventListener("click", () => {
        document.getElementById("pitch").value = 1;
        document.getElementById("pitch-button").style.display = 'none';
        });



        let rate = document.getElementById("rate");
        let ratebutton = document.getElementById("rate-button");
        document.getElementById("rate-button").style.display = 'none';
        rate.addEventListener("click", () => {
 
             document.getElementById("rate-button").style.display = 'block';
            
            });
            ratebutton.addEventListener("click", () => {
                document.getElementById("rate").value = 0.8;
                document.getElementById("rate-button").style.display = 'none';
                });



// Get the modal
var modal = document.getElementById("error");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close-error")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}