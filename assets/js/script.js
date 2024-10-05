//access the game div
const gameBoard = document.querySelector("#game");

//declare cardsArray
let cardsArray = [];

//declare imagesArray
let imagesArray = ["🍉", "🍓", "🥝", "🍏", "🍇", "🍒", "🍑", "🫐", "🍐", "🍍"];

//declare numberOfImages
let numberOfImages = 4;

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

    //... is dereferencing for the array before concatination
    let doubledImagesArray = [...imagesArray].concat(...imagesArray);
    shuffle(doubledImagesArray);

    for (let i = 0; i < numberOfImages; i++) {
        let shuffledIndex1 = Number(indexArray[i]);
        let shuffledIndex2 = Number(indexArray[i + numberOfImages]);
        console.log(shuffledIndex1);
        console.log(shuffledIndex2);
        console.log(cardsArray);
        cardsArray[shuffledIndex1].textContent = doubledImagesArray[i];
        cardsArray[shuffledIndex2].textContent = doubledImagesArray[i];

    }
}


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

drawCards(numberOfImages);
distributeImages();