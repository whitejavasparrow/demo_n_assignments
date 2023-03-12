"use strict";

const dataPanel = document.querySelector("#data-panel");

let currentNums = [];
let currentSuits = [];
let numLog = [];

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
    const cardColor = ["♠", "❤︎"].includes(el.split(" ")[0]) ? "red" : "black";
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

let clickCnt = 0;
dataPanel.addEventListener("click", (event) => {
  if (clickCnt === 0) {
    const target1 = event.target;
    target1.style.backgroundColor = "hotpink";
    currentNums.push(Number(target1.children[0].children[0].innerText));
    currentSuits.push(target1.children[0].children[1].innerText);

    clickCnt++;
  } else if (clickCnt === 1) {
    const target2 = event.target;
    target2.style.backgroundColor = "yellow";
    currentNums.push(Number(target2.children[0].children[0].innerText));
    currentSuits.push(target2.children[0].children[1].innerText);

    if (
      currentNums[0] === currentNums[1] &&
      currentSuits[0] !== currentSuits[1]
    ) {
      numLog.push(currentNums[0]);
      console.log("You have found pairs of ", numLog);
      clickCnt++;
    } else {
      clickCnt = 0;
      currentNums = [];
      currentSuits = [];
      console.log("Pairs not found.");
    }
  } else if (clickCnt > 1) {
    const target1 = event.target;
    if (target1.matches(".card")) {
      target1.style.backgroundColor = "hotpink";
      currentNums = [Number(target1.children[0].children[0].innerText)];
      currentSuits = [target1.children[0].children[1].innerText];
      clickCnt = 1;
    } else {
      console.log("Something might happen!");
    }
  }
  console.log(currentSuits);
});
