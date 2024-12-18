/* jshint esversion: 11 */

//access the game div
const gameBoard = document.querySelector("#game");

//access audio files
let flipSound = new Audio('assets/audio/flip-card-sound.mp3');
let winningSound = new Audio('assets/audio/winning-sound.mp3');

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

//get the leaderboard modal element 
let leaderboardModal = new bootstrap.Modal(document.getElementById('leaderboard-modal'));

//get the success modal element 
let successModal = new bootstrap.Modal(document.getElementById('success-modal'));

//get theme modal element 
let themeModal = new bootstrap.Modal(document.getElementById('theme-modal'));

//get themes options buttons
let fruitsBtn = document.getElementById('fruits-btn');
fruitsBtn.addEventListener('click', updateTheme);
let animalsBtn = document.getElementById('animals-btn');
animalsBtn.addEventListener('click', updateTheme);
let smileyBtn = document.getElementById('smiley-btn');
smileyBtn.addEventListener('click', updateTheme);
let activitiesBtn = document.getElementById('activities-btn');
activitiesBtn.addEventListener('click', updateTheme);

//get "choose theme" button
let changeThemeBtn = document.getElementById('theme-btn');
changeThemeBtn.addEventListener('click', showThemeModal);

//get "show leaderboard" button
let leaderboardBtn = document.getElementById('leaderboard-btn');
leaderboardBtn.addEventListener('click', showLeaderboardModal);

//declare current level
let currentLevel = 1;

//declare the highest level solved by the user
let highestActiveLevel = 1;

//declare numberOfImages
let numberOfImages = highestActiveLevel + 1;

//declare flag to detect if the timer started or not
let isTimerLunched = false;

//get next button in the modal to redirect to next level
let nextBtn = document.getElementById('next-btn');
nextBtn.addEventListener('click', openNextLevel);

//get restart level button
let restartBtn = document.getElementById('refresh-btn');
restartBtn.addEventListener('click', restartLevel);

//get sound control (on/off) button
let soundBtn = document.getElementById('sound-btn');
soundBtn.addEventListener('click', onSoundClick);

//declare timer variables
let isSoundOn = false;
let seconds = 0;
let minutes = 0;
let appendMinutes = document.getElementById("minutes");
let appendSeconds = document.getElementById("seconds");
let Interval;

//get the value of the highest level solved by the user from local storage if available
let storedHighestActiveLevel = localStorage.getItem("highestActiveLevel");
if (storedHighestActiveLevel) {
    //update highestActiveLevel variable with the stored value
    highestActiveLevel = storedHighestActiveLevel;
    currentLevel = storedHighestActiveLevel;
    numberOfImages = Number(highestActiveLevel) + 1;
}

//get the value of the chosen theme from local storage
let chosenTheme = "";
let storedTheme = localStorage.getItem("theme");
if (storedTheme) {
    chosenTheme = storedTheme;
}

//this array to store the least time for each level (10 levels)
let leaderboardArray = ["", "", "", "", "", "", "", "", "", ""];

//declare driber object to implement guide tour
let driverObj;

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
    //draw the cards on the screen and give them the appropriate classes
    for (let i = 0; i < cardsCount; i++) {
        let column = document.createElement("div");
        //add bootstrap class to column div
        column.classList.add("col", "g-sm-4", "g-4", "g-md-4", "g-lg-5", "square");
        row.appendChild(column);
        let card = document.createElement("div");
        //add unique id to each card
        card.id = "card" + i;
        //add classes to card div and implement them in css file
        card.classList.add("card", "square", "unflipped");
        card.addEventListener('click', flip);
        card.addEventListener('click', onCardClick);
        column.appendChild(card);
        cardsArray.push(card);
        closedCardsArray.push(card);
        currentImages.push("");
    }
    //update the level number on the screen in each level
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
        if (i < highestActiveLevel) {
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
    //while there remain elements to shuffle
    while (currentIndex != 0) {
        //pick a remaining element
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        //and swap it with the current element
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}

//this function to handle the click on the card
function onCardClick(card) {
    function unflipCards() {
        //Function executed after 1 second
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
    //start the timer
    if (!isTimerLunched) {
        launchTimer();
        isTimerLunched = true;
    }
    //check if this is the first or second click on the same round
    let cardDiv = card.target;
    if (!isSecondClick) {
        //this is for the first click on the same round
        isSecondClick = true;
        openedCard = cardDiv;

    } else if (cardDiv === openedCard) {
        //if click on the same card again (do nothing)
    } else {
        //this is for the second click on the same round
        isSecondClick = false;
        if (openedCard.textContent === cardDiv.textContent) {
            //if both clicked cards are the same (keep them flipped and make them not clickable)
            cardDiv.classList.add("flipped");
            cardDiv.classList.remove("unflipped");
            cardDiv.removeEventListener('click', flip);
            cardDiv.removeEventListener('click', onCardClick);
            openedCard.classList.add("flipped");
            openedCard.classList.remove("unflipped");
            openedCard.removeEventListener('click', flip);
            openedCard.removeEventListener('click', onCardClick);
            //push both cards to openedCardsArray to save game board status
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

            //make delay for 1s to show the second card before unflip it 
            setTimeout(unflipCards, 1000);
        }
    }
    checkLastRound();
}

function checkLastRound() {
    //check if all cards are flipped successfully
    if (openedCardsArray.length == cardsArray.length) {
        //play the winning sound if user enable the sound
        if (isSoundOn) {
            //reduce the Volume to 40%
            winningSound.volume = 0.4;
            winningSound.play();
        }
        //update the local storage with the level and the time
        let storedLeaderboard = localStorage.getItem("leaderboard");
        if (storedLeaderboard) {
            leaderboardArray = JSON.parse(storedLeaderboard);
            let storedCurrentLevelTime = leaderboardArray[currentLevel - 1];
            //convert the stored time (if available) to second to compare the stored time (if available) with the current time
            let storedCurrentLevelTimeSplited = storedCurrentLevelTime ? storedCurrentLevelTime.split(":") : "";
            let storedCurrentLevelTimeInSeconds = storedCurrentLevelTimeSplited ? (Number(storedCurrentLevelTimeSplited[0]) * 60) + (Number(storedCurrentLevelTimeSplited[1])) : "";
            let currentLevelTimeInSeconds = (Number(minutes) * 60) + Number(seconds);
            if ((storedCurrentLevelTimeInSeconds == "") || (currentLevelTimeInSeconds < storedCurrentLevelTimeInSeconds)) {
                leaderboardArray[currentLevel - 1] =  appendMinutes.innerHTML + ":" + appendSeconds.innerHTML;
            }
        }
        else {
            leaderboardArray[currentLevel - 1] = appendMinutes.innerHTML + ":" + appendSeconds.innerHTML;
        }
        //update the leaderboard with the new values
        let stringifiedLeaderboardArray = JSON.stringify(leaderboardArray);
        localStorage.setItem("leaderboard", stringifiedLeaderboardArray);
        //reset the timer
        resetTimer();
        //check if it's the last level
        if (highestActiveLevel == 10) {
            //show the user his leaderboard in all levels
            showLeaderboardModal();
        }
        else {
            //allow user to go to next level
            successModal.show();
        }
    }
}

//open next level when pass the level successfully
function openNextLevel() {
    //hide the modal after click on "next" button
    successModal.hide();
    //increment the level
    currentLevel++;
    numberOfImages = currentLevel + 1;
    //clear arrays and variables content
    cardsArray = [];
    openedCardsArray = [];
    closedCardsArray = [];
    isSecondClick = false;
    openedCard = null;
    gameBoard.textContent = "";
    resetTimer();

    //draw the cards of the new level
    drawCards(numberOfImages);
    distributeImages();

    let storedHighestActiveLevel = localStorage.getItem("highestActiveLevel");
    if (storedHighestActiveLevel < currentLevel) {
        //update levels timeline and local storage with the new level
        highestActiveLevel = currentLevel;
        localStorage.setItem("highestActiveLevel", highestActiveLevel);
        let levelBtnID = "level-" + highestActiveLevel + "-button";
        let levelButton = document.getElementById(levelBtnID);
        levelButton.classList.remove("disabled");
        levelButton.classList.add("enabled");
    }
}

//this function to clear the content of variables and re-draw the cards
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

//this function to open sepecific level when click on one of the enabled level buttons
function openLevel(number) {
    // highestActiveLevel = number;
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
    //if the user click on theme button during the guide tour
    let isGuideTourLunched = localStorage.getItem("isGuideTourLunched");

    if (driverObj && !isGuideTourLunched) {
        //move to next step in the tour
        driverObj.moveNext();
    } else {
        //if the user click on theme button outside the guide tour
        themeModal.show();
    }
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
    if (isTimerLunched) {
        restartLevel();
    }
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

    //if the user update theme during the guide tour
    if (driverObj) {
        //move to next step in the tour
        driverObj.moveNext();
    }
}

function showLeaderboardModal() {
    //if the user click on leaderboard button during the guide tour
    let isGuideTourLunched = localStorage.getItem("isGuideTourLunched");
    if (driverObj && !isGuideTourLunched) {
        //move to next step in the tour
        driverObj.moveNext();
    } else {
        //if the user click on leaderboard button outside the guide tour

        //get the divs of levels and least time for each level
        let levelNumberDiv = document.getElementById("level-number-section");
        let leastTimePerLevelDiv = document.getElementById("least-time-per-level-section");
        //get the stored values in leaderboard in local storage
        let storedLeaderboard = localStorage.getItem("leaderboard");
        let storedLeaderboardArray = JSON.parse(storedLeaderboard);
        //get the no previous winnings div
        let noWinsDiv = document.getElementById("no-previous-wins");
        if (storedLeaderboardArray) {
            //if there is at least one level completed successfully
            levelNumberDiv.style = "";
            leastTimePerLevelDiv.style = "";
            let length;
            //check if it is the last level of the game, highestActiveLevel will stay 10 and not incremented
            if (highestActiveLevel == 10){
                length = 10;
            }else{
                length = Number(highestActiveLevel-1);
            }
            for (let i = 0; i < length; i++) {
                noWinsDiv.style.display = "none";
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
                timeLabel.textContent = storedLeaderboardArray[i];
            }
        } else {
            //if there is no previous winning
            levelNumberDiv.style.display = "none";
            leastTimePerLevelDiv.style.display = "none";
            noWinsDiv.textContent = "You didn't win any game yet!";

        }
        //show the modal after filling with the suitable data
        leaderboardModal.show();
    }
}

//timer functions implementation
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

        if (minutes <= 9) {
            appendMinutes.innerHTML = "0" + minutes;
        }
        if (minutes > 9) {
            appendMinutes.innerHTML = minutes;
        }
    }
}

function resetTimer() {
    isTimerLunched = false;
    clearInterval(Interval);
    minutes = "00";
    seconds = "00";
    appendMinutes.innerHTML = minutes;
    appendSeconds.innerHTML = seconds;
}

function initGame() {
    drawCards(numberOfImages);
    drawLevelsTimeline();
    updateTheme();
}

//start the guide tour if it's not lucnched before
let isGuideTourLunched = localStorage.getItem("isGuideTourLunched");
if (!isGuideTourLunched) {
    setTimeout(lunchGuideTour, 500);
    showThemeModal();
}

function lunchGuideTour() {
    //implementation of user guide tour
    const driver = window.driver.js.driver;
    driverObj = driver({
        showProgress: true,
        allowClose: true,
        steps: [
            {
                element: '#theme-modal-content', 
                popover: {
                    title: 'Pick Your Favourite Theme ', 
                    description: 'The chosen theme will be applied on the flipped cards.',
                    onNextClick: () => {
                        themeModal.hide();
                        driverObj.moveNext();
                    },
                    side: "bottom", 
                    align: 'center'
                }
            },
            { 
                element: '#card0',
                popover: { 
                    title: 'Click To Flip', 
                    description: 'To flip the card you have to click on two cards per turn and try to choose matched cards.',
                    onPrevClick: () => {
                        themeModal.show();
                        driverObj.movePrevious();
                    },
                    side: "left", 
                    align: 'start' } },
            { 
                element: '#levels-timeline', 
                popover: { 
                    title: 'Levels Progress', 
                    description: 'You can check your progress through the game levels on this section.', 
                    side: "bottom", 
                    align: 'start' } },
            { 
                element: '#controllers', 
                popover: { 
                    title: 'Game Controllers', 
                    description: 'In this section you can control the sound (on/off), change the theme, restart the game and check your winning leaderboard.', 
                    onNextClick: () => {
                        localStorage.setItem("isGuideTourLunched", true);
                        driverObj.moveNext();
                    },
                    side: "bottom", 
                    align: 'start' } },
            { popover: { 
                title: 'Enjoy!', 
                description: 'Let\'s play and enjoy the game!',
             } }
        ],
        // onDestroyStarted is called when the user tries to exit the tour
        onDestroyStarted: () => {
            if (!driverObj.hasNextStep() || confirm("Are you sure you want to exit the tour?")) {
                localStorage.setItem("isGuideTourLunched", true);
                driverObj.destroy();
            }
        },
    });
    driverObj.drive();
}

initGame();
