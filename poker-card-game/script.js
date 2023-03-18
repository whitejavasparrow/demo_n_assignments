"use strict";

const backgroundOriginal =
  "url(https://images.unsplash.com/photo-1584282000185-87fb204a83d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=972&q=80)";

const backgroundFlipped =
  "url(https://images.unsplash.com/photo-1531131141161-ecdfb1858dd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)";

const dataPanel = document.querySelector("#data-panel");

let targets = [];
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

const addData = (target) => {
  targets.push(target);
  currentNums.push(+target.children[0].children[0].innerText);
  currentSuits.push(target.children[0].children[1].innerText);

  if (targets.length > 2) {
    console.log("not working");
  }
};

let clickCnt = 0;
dataPanel.addEventListener("click", (event) => {
  if (event.target.matches(".card")) {
    const target = event.target;
    if (clickCnt === 0) {
      addData(target);
      showCard(target);
      clickCnt++;
    } else if (clickCnt === 1) {
      addData(target);
      showCard(target);
      clickCnt = 0;

      if (
        currentNums[0] === currentNums[1] &&
        currentSuits[0] !== currentSuits[1]
      ) {
        numLog.push(currentNums[0]);
        console.log("You have found pairs of ", numLog);
        showCard(targets[0]);
        showCard(targets[1]);
      } else {
        hideCard(targets[0]);
        hideCard(targets[1]);
        console.log("Pairs not found.");
      }

      targets = [];
      currentNums = [];
      currentSuits = [];
    }
  }
});
