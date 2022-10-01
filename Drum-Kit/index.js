function handleClick() {
  console.log(this);
  this.style.color = "red";
}

var w, a, s, d, j, k, l;

for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
  var drum = document
    .querySelectorAll("button")
    [i].addEventListener("click", function (){
        var buttonInnerHTML =this.innerHTML;
        test(buttonInnerHTML);
    });

  function test(i) {
    buttonAnimation(i);
    switch (i) {
      case "w":
        var crash = new Audio("/Drum-Kit/sounds/crash.mp3");
         crash.play();
        break;
      case "a":
        var kickBass = new Audio("/Drum-Kit/sounds/kick-bass.mp3");
         kickBass.play();
        break;
      case "s":
        var snare = new Audio("/Drum-Kit/sounds/snare.mp3");
        snare.play();
        break;
      case "d":
        var tom1 = new Audio("/Drum-Kit/sounds/tom-1.mp3");
         tom1.play();
        break;
      case "j":
        var tom2 = new Audio("/Drum-Kit/sounds/tom-2.mp3");
        tom2.play();
        break;
      case "k":
        var tom3 = new Audio("/Drum-Kit/sounds/tom-3.mp3");
         tom3.play();
        break;
      case "l":
        var tom4 = new Audio("/Drum-Kit/sounds/tom-4.mp3");
        tom4.play(); 
        break;
      default:
    }
  }

  document.addEventListener("keydown", function (event) {
    log(event.key);
    test(event.key);
  });
}
function buttonAnimation(currentKey){
  var activebtn = document.querySelector("."+ currentKey);
  activebtn.classList.add("pressed");
  setTimeout(function(){
    activebtn.classList.remove("pressed");
  },0.1);
}


function log(a){
    console.log(a);
}