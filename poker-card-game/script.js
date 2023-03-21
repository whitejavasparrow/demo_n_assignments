"use strict";

const backgroundOriginal =
  "url(https://images.unsplash.com/photo-1584282000185-87fb204a83d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=972&q=80)";

const backgroundFlipped =
  "url(https://images.unsplash.com/photo-1531131141161-ecdfb1858dd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)";

const dataPanel = document.querySelector("#data-panel");

let currentTargets = [];
let currentNums = [];
let currentSuits = [];

const generateCards = () => {
  const suits = ["♠", "❤︎", "♦", "♣"];
  let cards = [];
  for (const suit of suits) {
    let cnt = 0;
    while (cnt < 13) {
      cards.push(`${suit} ${cnt + 1}`);
      cnt++;
    }
  }
  return cards;
};

const shuffleCards = (cards) => {
  return cards.sort((a, b) => 0.5 - Math.random());
  // https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj
};

function generateHTML(cards) {
  let rawHTML = "";
  cards.forEach((el) => {
    const [cardSuit, cardNum] = el.split(" ");
    const cardColor = ["❤︎", "♦"].includes(el.split(" ")[0]) ? "red" : "black";
    rawHTML += `
    <div class="card">
      <div class="card-content">
        <span class="card-num">${cardNum}</span>
        <span class="card-suit suit-color-${cardColor}">${cardSuit}</span>
        <span class="card-num-reversed">${cardNum}</span>
      </div>
    </div>
  `;
  });
  dataPanel.innerHTML = rawHTML;
}

const cards = generateHTML(shuffleCards(generateCards()));

/////

let clickCnt = 0;
dataPanel.addEventListener("click", function (event) {
  const target = event.target;
  if (clickCnt === 0 && target.matches(".card")) {
    clickCnt++;

    currentTargets.push(target);
    currentNums.push(target.children[0].children[0].textContent);
    currentSuits.push(target.children[0].children[1].textContent);
  } else if (clickCnt === 1 && target.matches(".card")) {
    clickCnt = 0;
    currentTargets.push(target);
    currentNums.push(target.children[0].children[0].textContent);
    currentSuits.push(target.children[0].children[1].textContent);

    if (
      currentNums[0] === currentNums[1] &&
      currentSuits[0] !== currentSuits[1]
    ) {
      console.log(`There is a match: ${currentNums[0]}`);
    }
  } else if (clickCnt > 1) {
    currentTargets = [target];
    currentNums = [target.children[0].children[0].textContent];
    currentSuits = [target.children[0].children[1].textContent];
    clickCnt = 1;
  }
});
