function dice (){
    var random = Math.floor(Math.random()*6);
    return random+1;
}
var player1 =dice();
var player2=dice();

function setdice(){
    document.querySelectorAll("img")[0].setAttribute("src","/Dice-Challenge/images/dice"+player1+".png");
    document.querySelectorAll("img")[1].setAttribute("src","/Dice-Challenge/images/dice"+player2+".png");

    if(player1>player2){
        document.querySelector("h1").innerHTML=("Player 1 has won");
    }else if(player1<player2){
        document.querySelector("h1").innerHTML=("Player 2 has won");
    }else{
        document.querySelector("h1").innerHTML=("Draw");
    }
}

setdice(player1,player2);