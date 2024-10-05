//access the game div
const gameBoard = document.querySelector("#game");

//this function draw the cards on the screen depending on specific number as parameter, and use of css grid system to handle responsivness
function drawCards(number) {
    let cardsContainer = document.createElement("div");
    //add bootstrap classes to the container div
    cardsContainer.classList.add("container", "text-center");
    gameBoard.appendChild(cardsContainer);
    let row = document.createElement("div");
    //add bootstrap classes to row div
    row.classList.add("row", "row-cols-2", "row-cols-lg-4","g-2", "g-lg-3");
    cardsContainer.appendChild(row);
    const cardsCount = 2 * number;
    for (let i = 0; i < cardsCount; i++) {
        let column = document.createElement("div");
        //add bootstrap class to column div
        column.classList.add("col");
        row.appendChild(column);
        let card = document.createElement("div");
        //add classes to card div and implement them in css file
        card.classList.add("p-3", "square", "unflipped");
        column.appendChild(card);
    }
}

drawCards(4);
