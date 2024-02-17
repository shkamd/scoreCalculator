if(!localStorage.getItem('uniqueId')){
    window.location.href = 'index.html';
}
var isWicket = false;
var score = parseInt(localStorage.getItem('score')) || 0;
var wickets = parseInt(localStorage.getItem('wickets')) || 0;
var overs = parseInt(localStorage.getItem('overs')) || 0;
var overBall = parseInt(localStorage.getItem('overBall')) || 0;
var totalovers = parseInt(localStorage.getItem('selectedOvers')) || 8;
var previousBallRuns = 0;
var ballsLeft = parseInt(localStorage.getItem('ballsLeft')) || totalovers*6;
var targetScore = parseInt(localStorage.getItem('target')) || null;

if(localStorage.getItem('targetType') == "first"){
    document.getElementById('ballsLeft').style.display = "block";
    document.getElementById('targetText').style.display = "none";
}else
if(localStorage.getItem('targetType') == "second"){
    document.getElementById('ballsLeft').style.display = "none";
    document.getElementById('targetText').style.display = "block";
}

function updateScore(condition){
    if(condition=='One'){
        increaseBalls();
        increaseScore(1);
    }else
    if(condition=='Two'){
        increaseBalls();      
        increaseScore(2);        
    }else
    if(condition=='Three'){
        increaseBalls();  
        increaseScore(3);        
    }else
    if(condition=='Four'){
        increaseBalls();
        increaseScore(4);       
    }else
    if(condition=='Six'){
        increaseBalls();
        increaseScore(6);       
    }else
    if(condition=='Dot'){
        increaseBalls();
        increaseScore(0);        
    }else
    if(condition=='Wide'){
        increaseScore(1);        
    }else
    if(condition=='Wicket'){
        increaseBalls();        
        wickets++;
        localStorage.setItem('wickets',wickets);
        document.getElementById('wickets').innerHTML = wickets;
        isWicket = true;
    }else
    if(condition=='NoBall'){
        increaseScore(1);        
    }
}

function increaseScore(runs){
    isWicket = false;
    score = score + runs;
    localStorage.setItem('score',score);
    previousBallRuns = runs;
    document.getElementById('score').innerHTML = score;
    if(targetScore!=0){
        targetScore = targetScore - runs;
        localStorage.setItem('target',targetScore);
        if(targetScore<0 && targetScore!=null){
            targetScore = 0;
            localStorage.setItem('target',targetScore);
        }
        document.getElementById('targetScore').innerHTML = targetScore;
    }
    if(targetScore==0 && localStorage.getItem('targetType')=="second"){
        document.getElementById('pop-up-text').innerHTML = "Match has been ended!";
        document.querySelector('.popup-div').style.display = "flex";
        document.getElementById('puba').style.display = "block";
        document.getElementById('pubd').style.display = "none";
        document.getElementById('pubc').style.display = "none";
        document.getElementById('pubb').style.display = "block";
    }
}

function increaseBalls(){
    isWicket = false;
    if(overBall!=5){
        overBall++;
        localStorage.setItem('overBall',overBall);
        localStorage.setItem('overs',overs);
        document.getElementById('overs').innerHTML = overs+"."+overBall;
    }
    else{
        overBall = 0;
        localStorage.setItem('overBall',overBall);
        overs++;
        localStorage.setItem('overs',overs);
        document.getElementById('overs').innerHTML = overs+"."+overBall;
        if(overs == totalovers){
            document.getElementById('pop-up-text').innerHTML = "Match has been ended!";
            document.querySelector('.popup-div').style.display = "flex";
            document.getElementById('puba').style.display = "block";
            document.getElementById('pubd').style.display = "none";
            document.getElementById('pubc').style.display = "none";
            document.getElementById('pubb').style.display = "block";
        }
    }
    if(ballsLeft!=0){
        ballsLeft--;
        localStorage.setItem('ballsLeft',ballsLeft);
        document.getElementById('ballsLeftValueA').innerHTML = ballsLeft;
        document.getElementById('ballsLeftValueB').innerHTML = ballsLeft;
    }
}

function decreaseBall(){
    if(overBall!=0){
        overBall--;
        document.getElementById('overs').innerHTML = overs+"."+overBall;
    }
    else{
        if(overs!=0 && overBall==0){
            overBall = 5;
        }
        if(overs!=0){
            overs--;
        }
        document.getElementById('overs').innerHTML = overs+"."+overBall;
    }
}

function deleteBall(){
    document.getElementById('pop-up-text').innerHTML = "Are you sure want to go to previous ball ?";
    document.querySelector('.popup-div').style.display = "flex";
    document.getElementById('puba').style.display = "none";
    document.getElementById('pubd').style.display = "block";
    document.getElementById('pubc').style.display = "block";
    document.getElementById('pubb').style.display = "none";
}

function reset(){
    if(isWicket==false){
        score = score - previousBallRuns;
        localStorage.setItem('score',score);
        document.getElementById('score').innerHTML = score;
        previousBallRuns = 0;
        decreaseBall();
        ballsLeft++;
        localStorage.setItem('ballsLeft',ballsLeft);
        document.getElementById('ballsLeftValueA').innerHTML = ballsLeft;
        document.getElementById('ballsLeftValueB').innerHTML = ballsLeft;     
        if(localStorage.getItem('targetType')=="second"){
            targetScore = targetScore + previousBallRuns;
            localStorage.setItem('target',targetScore);
            document.getElementById('targetScore').innerHTML = targetScore;
        }   
    }
    if(wickets!=0 && isWicket==true){
        wickets--;
        localStorage.setItem('wickets',wickets);
        decreaseBall();
        ballsLeft++;
        localStorage.setItem('ballsLeft',ballsLeft);
        document.getElementById('ballsLeftValueA').innerHTML = ballsLeft;
        document.getElementById('ballsLeftValueB').innerHTML = ballsLeft;        
    }
    document.getElementById('wickets').innerHTML = wickets;
    document.querySelector('.popup-div').style.display = "none";
}

function endMatch(){
    document.getElementById('pop-up-text').innerHTML = "Are you sure want to end this match ?";
    document.querySelector('.popup-div').style.display = "flex";
    document.getElementById('puba').style.display = "block";
    document.getElementById('pubd').style.display = "block";
    document.getElementById('pubc').style.display = "none";
    document.getElementById('pubb').style.display = "none";
}

function closeMatch(){
    localStorage.removeItem('score');
    localStorage.removeItem('overBall');
    localStorage.removeItem('overs');
    localStorage.removeItem('wickets');
    localStorage.removeItem('selectedOvers');
    localStorage.removeItem('target');
    localStorage.removeItem('ballsLeft');
    localStorage.removeItem('uniqueId');
    window.location.href = 'index.html';
    document.querySelector('.popup-div').style.display = "none";
}

function closePopup(){
    document.querySelector('.popup-div').style.display = "none";
    document.getElementById('puba').style.display = "none";
    document.getElementById('pubd').style.display = "none";
    document.getElementById('pubc').style.display = "none";
    document.getElementById('pubb').style.display = "none";
}

function etst(){
    document.getElementById('pop-up-text').innerHTML = "Match has been ended!";
    document.querySelector('.popup-div').style.display = "flex";
    document.getElementById('puba').style.display = "block";
    document.getElementById('pubd').style.display = "none";
    document.getElementById('pubc').style.display = "none";
    document.getElementById('pubb').style.display = "block";
}