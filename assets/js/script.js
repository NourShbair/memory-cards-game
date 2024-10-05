const gameBoard = document.querySelector("#game");

function drawCards(number) {
    const cardsCount = 2 * number;
    for (let i = 0; i < cardsCount; i++) {
        let card = document.createElement("div");
        card.classList.add("square", "uflipped");
        gameBoard.appendChild(card);
    }

}

drawCards(4);