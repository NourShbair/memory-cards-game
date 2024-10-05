//access the game div
const gameBoard = document.querySelector("#game");

//declare cardsArray
let cardsArray = [];

//declare imagesArray
let imagesArray = ["🍉", "🍓", "🥝", "🍏", "🍇", "🍒", "🍑", "🫐", "🍐", "🍍"];

//declare numberOfImages
let numberOfImages = 10;

//declare boolean flag to check if this is the first or the second click on the same turn
let isSecondClick = false;

//declare card variable which is the opened card in the same turn
let openedCard=null;

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
        card.classList.add("card", "p-3", "square", "flipped");
        card.addEventListener('click', flip);
        card.addEventListener('click', onCardClick);
        column.appendChild(card);
        cardsArray.push(card);
    }
}

//flip the card
function flip(card) {
    let cardDiv = card.target;
    cardDiv.classList.toggle("unflipped");
    cardDiv.classList.toggle("flipped");
}

//shuffle the images and distribute them on cards
function distributeImages() {

    //initialize and declare index array 
    let indexArray = [];
    for (let i = 0; i < cardsArray.length; i++) {
        indexArray.push(i);
    }
    shuffle(indexArray);

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

function onCardClick(card){
    let cardDiv = card.target;
if(!isSecondClick){
    isSecondClick=true;
    openedCard = cardDiv;
}else{
    isSecondClick=false;
    console.log(openedCard.textContent);
    console.log(cardDiv.textContent);

    if(openedCard.textContent === cardDiv.textContent){
       console.log("Success Turn");
    }else{
        console.log("Failed Turn");
    }
}

}

drawCards(numberOfImages);
distributeImages();