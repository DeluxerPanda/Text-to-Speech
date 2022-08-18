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



