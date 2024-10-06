//access the game div
const gameBoard = document.querySelector("#game");

//declare cardsArray
let cardsArray = [];

//declare imagesArray
let imagesArray = [];

let fruitsArray = ["🍉", "🍓", "🥝", "🍏", "🍇", "🍒", "🍑", "🫐", "🍐", "🍍"];
let animalsArray = ["🐥", "🐠", "🐕", "🐮", "🐭", "🐰", "🐿️", "🦩", "🦄", "🦜"];
let flagsArray = ["🇵🇸", "🇪🇬", "🇯🇵", "🇶🇦", "🇸🇾", "🇸🇩", "🇮🇪", "🇬🇧", "🇹🇷", "🇹🇳"];
let activitiesArray = ["⚽", "🥎", "🏀", "🎾", "⚾", "🎱", "🎮", "🎿", "🎲", "🪀"];

//declare the state of all cards
let openedCardsArray = [];
let closedCardsArray = [];

//declare numberOfImages
let numberOfImages = 4;

//declare boolean flag to check if this is the first or the second click on the same round
let isSecondClick = false;

//declare card variable which is the opened card in the same round
let openedCard = null;

// Get the success modal element 
var successModal = new bootstrap.Modal(document.getElementById('successModal'));

// Get theme modal element 
var themeModal = new bootstrap.Modal(document.getElementById('themeModal'));

// Get themes options buttons
let fruitsBtn = document.getElementById('fruitsBtn');
fruitsBtn.addEventListener('click', updateTheme);
let animalsBtn = document.getElementById('animalsBtn');
animalsBtn.addEventListener('click', updateTheme);
let flagsBtn = document.getElementById('flagsBtn');
flagsBtn.addEventListener('click', updateTheme);
let activitiesBtn = document.getElementById('activitiesBtn');
activitiesBtn.addEventListener('click', updateTheme);

//this function draw the cards on the screen depending on specific number as parameter, and use of css grid system to handle responsivness
function drawCards(number) {

    let cardsContainer = document.createElement("div");
    //add bootstrap classes to the container div
    cardsContainer.classList.add("container", "text-center");
    gameBoard.appendChild(cardsContainer);

    let row = document.createElement("div");
    //add bootstrap classes to row div
    row.classList.add("row", "row-cols-3", "row-cols-lg-4", "g-2", "g-lg-3");
    cardsContainer.appendChild(row);

    const cardsCount = 2 * number;

    for (let i = 0; i < cardsCount; i++) {

        let column = document.createElement("div");
        //add bootstrap class to column div
        column.classList.add("col");
        row.appendChild(column);

        let card = document.createElement("div");
        //add unique id to each card
        card.id = "card" + i
        //add classes to card div and implement them in css file
        card.classList.add("card", "p-3", "square", "unflipped");
        card.addEventListener('click', flip);
        card.addEventListener('click', onCardClick);
        column.appendChild(card);
        cardsArray.push(card);
        closedCardsArray.push(card);
    }
}

//flip the card
function flip(card) {
    let cardDiv = card.target;
    if (cardDiv === openedCard) {
        //if click on the same card again
    } else {
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
            setTimeout(unflipCards, 1500);

        }
    }
    checkLastRound();
}

function checkLastRound() {
    //check if all cards are flipped successfully
    if (openedCardsArray.length == cardsArray.length) {
        successModal.show();
    }
}



//choose cards theme by user
function updateTheme(btn) {
    let btnID = btn.target.id;
    if (btnID == "activitiesBtn") {
        imagesArray = activitiesArray;
    } else if (btnID == "flagsBtn") {
        imagesArray = flagsArray;
    } else if (btnID == "animalsBtn") {
        imagesArray = animalsArray;
    } else if (btnID == "fruitsBtn") {
        imagesArray = fruitsArray;
    }
    themeModal.hide();
    distributeImages();
}

drawCards(numberOfImages);
themeModal.show();
