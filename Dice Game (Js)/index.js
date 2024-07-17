var player1=prompt("Player1 enter your name")
var player2=prompt("Player2 enter your name")

var random= Math.floor(1+(6*Math.random()))
var a="images/dice"+random+".png"
var random2= Math.floor(1+(6*Math.random()))
var b="images/dice"+random2+".png"
document.querySelector("img.img1").setAttribute("src",a)
document.querySelector("img.img2").setAttribute("src",b)

if(random>random2){
    var output= player1 + "Wins"
    document.querySelector("h1").innerText= output;
}
else if(random2>random){
    var output= player2 + "Wins"
    document.querySelector("h1").innerText= output;
}





















