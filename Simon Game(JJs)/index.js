var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;

function nextSequence(){
    $("h1").text("level "+ level);
    level ++;
    var randomNumber= Math.floor(4*Math.random());
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(60).fadeIn(80);
    playSounds(randomChosenColor);
}

$('.btn').click(function(){
    var userChosenColor = this.getAttribute('id');
    userClickedPattern.push(userChosenColor);
    playSounds(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

$(document).keypress(function(){
    if( $('h1').text()=="Press A Key to Start") nextSequence();
    else if($('h1').text()=='Game Over, Press Any Key to Restart') nextSequence();
})

function checkAnswer(i){
    if (gamePattern[i]==userClickedPattern[i]){
        console.log('wow');
        if(i==(level-1)){
            console.log('levelup');
            userClickedPattern=[];
            setTimeout(function(){
                nextSequence()
            },1000);
        }
        else return;
    } 
    else if(i==(level+1)){
        console.log('levelup');
        userClickedPattern=[];
        nextSequence();
    }
    else{
        console.log(userClickedPattern);
        console.log(gamePattern);
        userClickedPattern=[];
        level=0;
        wrong();
    } 
}

function animatePress(currentColor){
    $('#'+currentColor).addClass('pressed');
    setTimeout(function(){
        $('#'+currentColor).removeClass('pressed');
    }, 100);
}

function playSounds(x){
    switch (x){
        case "red" :
            var r=new Audio('sounds/red.mp3');
            r.play();
            break;
        case "blue" :
            var b=new Audio('sounds/blue.mp3');
            b.play();
            break;
        case "green" :
            var g=new Audio('sounds/green.mp3');
            g.play();
            break;
        case "yellow" :
            var y=new Audio('sounds/yellow.mp3');
            y.play();
            break;
    }
}

function wrong(){
    var w=new Audio('sounds/wrong.mp3');
    w.play();
    $('body').addClass('game-over');
    setTimeout(function(){
        $('body').removeClass('game-over')
    },200);
    $('h1').text('Game Over, Press Any Key to Restart');
}

