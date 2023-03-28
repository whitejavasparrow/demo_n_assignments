const Symbols = [
  "https://assets-lighthouse.alphacamp.co/uploads/image/file/17989/__.png", // 黑桃
  "https://assets-lighthouse.alphacamp.co/uploads/image/file/17992/heart.png", // 愛心
  "https://assets-lighthouse.alphacamp.co/uploads/image/file/17991/diamonds.png", // 方塊
  "https://assets-lighthouse.alphacamp.co/uploads/image/file/17988/__.png", // 梅花
];
const view = {
  getCardElement(index) {
    const number = this.transformNumber((index % 13) + 1);
    const symbol = Symbols[Math.floor(index / 13)];
    return `
      <div class="card">
        <p>${number}</p>
        <img src="${symbol}" />
        <p>${number}</p>
      </div>`;
  },
  transformNumber(number) {
    switch (number) {
      case 1:
        return "A";
      case 11:
        return "J";
      case 12:
        return "Q";
      case 13:
        return "K";
      default:
        return number;
    }
  },
  displayCards() {
    const rootElement = document.querySelector("#cards");
    rootElement.innerHTML = Array.from(Array(52).keys())
      .map((index) => this.getCardElement(index))
      .join("");
  },
};
view.displayCards();
