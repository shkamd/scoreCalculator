var selectedOvers = 4;
var target;

function onLoadReset(){
    localStorage.removeItem('selectedOvers')
    localStorage.removeItem('target');
}

function changeOvers(condition){
    const chooseOversInput = document.querySelector('.overs-input');
    if(condition=='inc'){
        chooseOversInput.value++;
    }else
    if(condition=='dec'){
        if(chooseOversInput.value>1){
            chooseOversInput.value--;
        }
    }
    selectedOvers = parseInt(chooseOversInput.value);
}

const selectInningsDiv = document.querySelector('.select-innings-div');
const secondInningsDiv = document.querySelector('.second-innings-div');
const creditsBox = document.querySelector('.credits');

function showSecondInningsDiv(){
    selectInningsDiv.style.display = "none";
    secondInningsDiv.style.display = "block";
    creditsBox.style.display = "none";
}

function showSelectInningsDiv(){
    selectInningsDiv.style.display = "block";
    secondInningsDiv.style.display = "none";
    creditsBox.style.display = "block";
}

const enterTargetInput = document.querySelector('.enter-target-input');

function startCalculator(condition){
    if(condition=='first-innings'){
        localStorage.setItem('selectedOvers',selectedOvers);
        localStorage.removeItem('target');
        localStorage.setItem('targetType','first')
        localStorage.setItem("uniqueId",generateString(6));
        window.location.href = 'scoreCalculator.html';
    }else
    if(condition=='second-innings'){
        target = enterTargetInput.value;
        localStorage.setItem('selectedOvers',selectedOvers);
        localStorage.setItem('target',target);
        localStorage.setItem('targetType','second')
        localStorage.setItem("uniqueId",generateString(6));
        window.location.href = 'scoreCalculator.html';
    }
}

const backBtn = document.querySelector('.back-btn');
const startBtn = document.querySelector('.start-btn');

function enableStartButton(){
    if(enterTargetInput.value>0){
        backBtn.style.display = "none";
        startBtn.style.display = "block";
    }else
    if(enterTargetInput.value<1 || enterTargetInput.value==''){
        backBtn.style.display = "block";
        startBtn.style.display = "none";
    }
}

// program to generate random strings

// declare all characters
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}