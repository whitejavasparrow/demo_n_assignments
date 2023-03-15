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

const showCard = (target) => {
  target.style.backgroundImage = backgroundFlipped;
  target.children[0].style.display = "block";
};

const hideCard = (target) => {
  target.style.backgroundImage = backgroundOriginal;
  target.children[0].style.display = "none";
};

let clickCnt = 0;
dataPanel.addEventListener("click", (event) => {
  if (event.target.matches(".card")) {
    if (clickCnt === 0) {
      const target1 = event.target;
      showCard(target1);

let clickCnt = 0;
dataPanel.addEventListener("click", (event) => {
  if (event.target.matches(".card")) {
    if (clickCnt === 0) {
      const target = event.target;
      addData(target);
      showCard(target);
      clickCnt++;
    } else if (clickCnt === 1) {
      const target2 = event.target;
      showCard(target2);

      if (
        currentNums[0] === currentNums[1] &&
        currentSuits[0] !== currentSuits[1]
      ) {
        numLog.push(currentNums[0]);
        console.log("You have found pairs of ", numLog);

        if (targets.length > 2) {
          targets.forEach((el) => hideCard(el));
        }
        clickCnt++;
      } else {
        targets.forEach((el) => hideCard(el));
        clickCnt = 0;

        targets = [];
        currentNums = [];
        currentSuits = [];

        console.log("Pairs not found.");
      }
    } else if (clickCnt > 1) {
      const target1 = event.target;
      if (target1.matches(".card")) {
        target1.style.backgroundImage = backgroundFlipped;
        target1.children[0].style.display = "block";

        targets = [target1];
        currentNums = [+target1.children[0].children[0].innerText];
        currentSuits = [target1.children[0].children[1].innerText];

        clickCnt = 1;
      } else {
        console.log("Something might happen!");
      }
    }
  }
});