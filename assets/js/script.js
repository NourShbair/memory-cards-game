//access the game div
const gameBoard = document.querySelector("#game");

//declare current images list on cards
let currentImages = [];

//declare cardsArray
let cardsArray = [];

//declare imagesArray
let imagesArray = [];

let fruitsArray = ["🍉", "🍓", "🥝", "🍏", "🍇", "🍒", "🍑", "🫐", "🍐", "🍍", "🥥"];
let animalsArray = ["🦄", "🐠", "🐕", "🐮", "🐭", "🐰", "🐿️", "🦩", "🐥", "🦜", "🦋"];
let smileysArray = ["🤓", "🥰", "🤩", "😂", "😎", "😜", "😍", "🤑", "😄", "😋", "😉"];
let activitiesArray = ["⚽", "🥎", "🏀", "🎾", "⚾", "🎱", "🎮", "🎿", "🎲", "🪀", "⛳"];

//declare the state of all cards
let openedCardsArray = [];
let closedCardsArray = [];

//declare boolean flag to check if this is the first or the second click on the same round
let isSecondClick = false;

//declare card variable which is the opened card in the same round
let openedCard = null;

// Get the leaderboard modal element 
var leaderboardModal = new bootstrap.Modal(document.getElementById('leaderboard-modal'));

// Get the success modal element 
var successModal = new bootstrap.Modal(document.getElementById('success-modal'));

// Get theme modal element 
var themeModal = new bootstrap.Modal(document.getElementById('theme-modal'));

// Get themes options buttons
let fruitsBtn = document.getElementById('fruits-btn');
fruitsBtn.addEventListener('click', updateTheme);
let animalsBtn = document.getElementById('animals-btn');
animalsBtn.addEventListener('click', updateTheme);
let smileyBtn = document.getElementById('smiley-btn');
smileyBtn.addEventListener('click', updateTheme);
let activitiesBtn = document.getElementById('activities-btn');
activitiesBtn.addEventListener('click', updateTheme);

let changeThemeBtn = document.getElementById('theme-btn');
changeThemeBtn.addEventListener('click', showThemeModal);

let leaderboardBtn = document.getElementById('leaderboard-btn');
leaderboardBtn.addEventListener('click', showLeaderboardModal);

//declare numberOfImages
let currentLevel = 1;
let numberOfImages = currentLevel + 1;


let isTimerLunched = false;

//Get next level button
let nextBtn = document.getElementById('next-btn');
nextBtn.addEventListener('click', openNextLevel);

//Get restart button
let restartBtn = document.getElementById('refresh-btn');
restartBtn.addEventListener('click', restartLevel);

//Get sound button
let soundBtn = document.getElementById('sound-btn');
soundBtn.addEventListener('click', onSoundClick);

//access audio files
let flipSound = new Audio('flip-card-sound.mp3');
let winningSound = new Audio('winning-sound.mp3');

let isSoundOn = false;
let seconds = 00;
let minutes = 00;
let appendMinutes = document.getElementById("minutes")
let appendSeconds = document.getElementById("seconds")
let Interval;

let storedCurrentLevel = localStorage.getItem("currentLevel");
if (storedCurrentLevel) {
    currentLevel = storedCurrentLevel;
    numberOfImages = Number(currentLevel) + 1;
}
let chosenTheme = "";
let storedTheme = localStorage.getItem("theme");
if (storedTheme) {
    chosenTheme = storedTheme;
} else {
    showThemeModal();
}
let leaderboardArray = [];
let leaderboardObject = {
    level: "",
    time: ""
}

//this function draw the cards on the screen depending on specific number as parameter, and use of css grid system to handle responsivness
function drawCards(number) {
    let cardsContainer = document.createElement("div");
    //add bootstrap classes to the container div
    cardsContainer.classList.add("container", "text-center");
    gameBoard.appendChild(cardsContainer);
    const cardsCount = 2 * number;
    let row = document.createElement("div");
    //add bootstrap classes to row div
    row.classList.add("row", "row-cols-sm-4", "row-cols-4", "row-cols-md-6", "row-cols-lg-8", "d-felx", "justify-content-center");
    cardsContainer.appendChild(row);
    for (let i = 0; i < cardsCount; i++) {
        let column = document.createElement("div");
        //add bootstrap class to column div
        column.classList.add("col", "g-sm-4", "g-4", "g-md-4", "g-lg-5", "square");
        row.appendChild(column);
        let card = document.createElement("div");
        //add unique id to each card
        card.id = "card" + i
        //add classes to card div and implement them in css file
        card.classList.add("card", "square", "unflipped");
        card.addEventListener('click', flip);
        card.addEventListener('click', onCardClick);
        column.appendChild(card);
        cardsArray.push(card);
        closedCardsArray.push(card);
        currentImages.push("");
    }
    let levelNumberLabel = document.getElementById('level-number');
    levelNumberLabel.textContent = "Level " + currentLevel;
}

//this function draw timeline for levels to allow user navigate between solved levels, using of css grid system to handle responsivness
function drawLevelsTimeline() {
    const levelsTimeLine = document.querySelector("#levels-timeline");
    let timelineContainer = document.createElement("div");
    //add bootstrap classes to the container div
    timelineContainer.classList.add("container", "text-center", "justify-content-center", "align-items-center");
    levelsTimeLine.appendChild(timelineContainer);
    let row = document.createElement("div");
    //add bootstrap classes to row div
    row.classList.add("row", "row-cols-10", "gx-2");
    timelineContainer.appendChild(row);
    //draw 10 button (levels) on timeline
    for (let i = 0; i < 10; i++) {

        let column = document.createElement("div");
        //add bootstrap class to column div
        column.classList.add("col");
        row.appendChild(column);

        let levelButton = document.createElement("div");
        //add unique id to each button
        let levelBtnID = "level-" + (i + 1) + "-button";
        levelButton.id = levelBtnID;
        //add classes to card div and implement them in css file
        levelButton.classList.add("level-button", "square");
        if (i < currentLevel) {
            levelButton.classList.add("enabled");
            levelButton.addEventListener('click', onLevelClick);
        } else {
            levelButton.classList.add("disabled");
        }
        column.appendChild(levelButton);
        document.getElementById(levelBtnID).textContent = i + 1;
    }
}
//open level when clicked from timeline
function onLevelClick(btn) {
    let levelButton = btn.target;
    let clickedLevel = levelButton.textContent;
    openLevel(clickedLevel);

}
//flip the card
function flip(card) {
    let cardDiv = card.target;
    if (cardDiv === openedCard) {
        //if click on the same card again
    } else {
        if (isSoundOn) {
            flipSound.play();
        }
        cardDiv.classList.toggle("unflipped");
        cardDiv.classList.toggle("flipped");
    }
}

//shuffle the images and distribute them on cards
function distributeImages() {

    //initialize and declare index array 
    let indexArray = [];
    for (let i = 0; i < cardsArray.length; i++) {
        indexArray.push(i);
    }
    shuffle(indexArray);
    //fill the cards array with images (each two cards have the same image)
    for (let i = 0; i < numberOfImages; i++) {

        let shuffledIndex1 = Number(indexArray[i]);
        let shuffledIndex2 = Number(indexArray[i + numberOfImages]);
        cardsArray[shuffledIndex1].textContent = imagesArray[i];
        cardsArray[shuffledIndex2].textContent = imagesArray[i];
        currentImages[shuffledIndex1] = imagesArray[i];
        currentImages[shuffledIndex2] = imagesArray[i];
    }
}

//this function to shuffle any array items
function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

function onCardClick(card) {
    if (!isTimerLunched) {
        launchTimer();
        isTimerLunched = true;
    }
    let cardDiv = card.target;
    if (!isSecondClick) {
        //this is for the first click on the same round
        isSecondClick = true;
        openedCard = cardDiv;

    } else if (cardDiv === openedCard) {
        //if click on the same card again

    } else {
        isSecondClick = false;

        //this is for the second click on the same round
        if (openedCard.textContent === cardDiv.textContent) {
            //if both clicked cards are the same
            cardDiv.classList.add("flipped");
            cardDiv.classList.remove("unflipped");
            cardDiv.removeEventListener('click', flip);
            cardDiv.removeEventListener('click', onCardClick);

            openedCard.classList.add("flipped");
            openedCard.classList.remove("unflipped");
            openedCard.removeEventListener('click', flip);
            openedCard.removeEventListener('click', onCardClick);

            //push both cards to stateArray to save game board status
            openedCardsArray.push(openedCard);
            openedCardsArray.push(cardDiv);

        } else {
            //prevent other cards from being clickable
            for (let i = 0; i < closedCardsArray.length; i++) {
                let card = closedCardsArray[i];
                card.removeEventListener('click', flip);
                card.removeEventListener('click', onCardClick);
            }
            //if both clicked cards are different
            cardDiv.classList.add("flipped");
            cardDiv.classList.remove("unflipped");
            //make delay to show the second card before unflip it 
            function unflipCards() {
                //Function executed after 1.5 seconds
                cardDiv.classList.add("unflipped");
                cardDiv.classList.remove("flipped");
                openedCard.classList.add("unflipped");
                openedCard.classList.remove("flipped");
                for (let i = 0; i < closedCardsArray.length; i++) {
                    let card = closedCardsArray[i];
                    card.addEventListener('click', flip);
                    card.addEventListener('click', onCardClick);
                }
            }
            setTimeout(unflipCards, 1000);
        }
    }
    checkLastRound();
}

function checkLastRound() {
    //check if all cards are flipped successfully
    if (openedCardsArray.length == cardsArray.length) {
        if (isSoundOn) {
            winningSound.play();
        }
        let leaderboardObject = {
            level: currentLevel,
            time: minutes + ":" + seconds
        }
        let storedLeaderboard = localStorage.getItem("leaderboard");
        if(storedLeaderboard){
            leaderboardArray = JSON.parse(storedLeaderboard);

        }else{
            leaderboardArray = [];
        }
        leaderboardArray.push(leaderboardObject);

        let stringiedLeaderboardArray = JSON.stringify(leaderboardArray);
        localStorage.setItem("leaderboard", stringiedLeaderboardArray);
        successModal.show();
        stopTimer();
    }
}

function openNextLevel() {
    if (currentLevel == 10) {
        //check if it's the last level
    }
    else {
        currentLevel++;
        successModal.hide();
        numberOfImages = numberOfImages + 1;
        cardsArray = [];
        openedCardsArray = [];
        closedCardsArray = [];
        isSecondClick = false;
        openedCard = null;
        gameBoard.textContent = "";
        drawCards(numberOfImages);
        distributeImages();
        resetTimer();
    }
    let storedCurrentLevel = localStorage.getItem("currentLevel");
    if (storedCurrentLevel < currentLevel) {
        //update levels timeline and local storage with the new level
        localStorage.setItem("currentLevel", currentLevel);
        let levelBtnID = "level-" + currentLevel + "-button";
        let levelButton = document.getElementById(levelBtnID);
        levelButton.classList.remove("disabled");
        levelButton.classList.add("enabled");

    }
}
function restartLevel() {
    cardsArray = [];
    openedCardsArray = [];
    closedCardsArray = [];
    isSecondClick = false;
    openedCard = null;
    gameBoard.textContent = "";
    drawCards(numberOfImages);
    distributeImages();
    resetTimer();
}

function openLevel(number) {
    currentLevel = number;
    numberOfImages = Number(currentLevel) + 1;
    cardsArray = [];
    openedCardsArray = [];
    closedCardsArray = [];
    isSecondClick = false;
    openedCard = null;
    gameBoard.textContent = "";
    drawCards(numberOfImages);
    distributeImages();
    resetTimer();

}

function showThemeModal() {
    // restartLevel();
    themeModal.show();
}

//toggle sound option (turn on/off)
function onSoundClick() {
    let soundBtnOn = document.getElementById("sound-on");
    let soundBtnOff = document.getElementById("sound-off");
    if (isSoundOn) {
        soundBtnOff.style.display = "block";
        soundBtnOn.style.display = "none";

    } else {
        soundBtnOff.style.display = "none";
        soundBtnOn.style.display = "block";
    }
    isSoundOn = !isSoundOn;

}

//choose cards theme by user
function updateTheme(btn) {
    let btnID = "";
    if (btn) {
        btnID = btn.target.id;
    }
    if ((btnID == "activities-btn") || (storedTheme == "activities")) {
        imagesArray = activitiesArray;
        chosenTheme = "activities";
    } else if ((btnID == "smiley-btn") || (storedTheme == "smileys")) {
        imagesArray = smileysArray;
        chosenTheme = "smileys";
    } else if ((btnID == "animals-btn") || (storedTheme == "animals")) {
        imagesArray = animalsArray;
        chosenTheme = "animals";
    } else {
        //default case
        imagesArray = fruitsArray;
        chosenTheme = "fruits";
    }
    localStorage.setItem("theme", chosenTheme);
    themeModal.hide();
    distributeImages();
}

function showLeaderboardModal() {
    let levelNumberDiv = document.getElementById("level-number-section");
    let leastTimePerLevelDiv = document.getElementById("least-time-per-level-section");
    let storedLeaderboard = localStorage.getItem("leaderboard");
    let storedLeaderboardArray = JSON.parse(storedLeaderboard);
    // let timeArray = storedLeaderboardArray.map( (item) => item.time);
    let noWinsDiv = document.getElementById("no-previous-wins");

    if (storedLeaderboardArray) {
        for (let i = 0; i < storedLeaderboardArray.length; i++) {
            noWinsDiv.style.display="none";
            let levelChildDiv = document.createElement("div");
            let levelID = "level-number-" + i;
            levelChildDiv.id = levelID;
            levelNumberDiv.appendChild(levelChildDiv);
            let timeChildDiv = document.createElement("div");
            let timeID = "time" + i;
            timeChildDiv.id = timeID;
            leastTimePerLevelDiv.appendChild(timeChildDiv);

            let levelNumberLabel = document.getElementById(levelID);
            levelNumberLabel.textContent = "Level " + Number(i + 1);

            let timeLabel = document.getElementById(timeID);
            timeLabel.textContent = storedLeaderboardArray[i]["time"];
        }
    } else {
        levelNumberDiv.style.display="none";
        leastTimePerLevelDiv.style.display="none";
        noWinsDiv.textContent = "You didn't win any game yet!";
        
    }
    leaderboardModal.show();

}

function launchTimer() {
    clearInterval(Interval);
    Interval = setInterval(startTimer, 1000);
}

function startTimer() {
    seconds++;
    if (seconds <= 9) {
        appendSeconds.innerHTML = "0" + seconds;
    }
    if (seconds > 9) {
        appendSeconds.innerHTML = seconds;
    }
    if (seconds > 59) {
        minutes++;
        appendMinutes.innerHTML = "0" + minutes;
        seconds = 0;
        appendSeconds.innerHTML = "0" + 0;
    }
    if (minutes <= 9) {
        appendMinutes.innerHTML = "0" + minutes;
    }
    if (minutes > 9) {
        appendMinutes.innerHTML = minutes;
    }
}

function stopTimer() {
    clearInterval(Interval);
}

function resetTimer() {
    isTimerLunched = false;
    clearInterval(Interval);
    minutes = "00";
    seconds = "00";
    appendMinutes.innerHTML = minutes;
    appendSeconds.innerHTML = seconds;
}
drawCards(numberOfImages);
drawLevelsTimeline();
updateTheme();
