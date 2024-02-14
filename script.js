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
        window.location.href = 'scoreCalculator.html';
    }else
    if(condition=='second-innings'){
        target = enterTargetInput.value;
        localStorage.setItem('selectedOvers',selectedOvers);
        localStorage.setItem('target',target);
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