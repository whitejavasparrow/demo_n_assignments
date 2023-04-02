// dynamically generate rgb slider
const colors = ["r", "g", "b"];

for (let i in colors) {
  let colorTemplate = `
    <label class="label-color" for="${colors[i]}">${colors[
    i
  ].toUpperCase()}:</label>
    <input type="range" min="0" max="255" class="d rgb-${colors[i]}" value=102>
    <p class="color-num-text">102</p>
    <div class="color-block rgb-${colors[i]}"></div>`;
  const colorContainer = document.querySelectorAll(".color-container")[i];
  colorContainer.innerHTML = colorTemplate;
  // console.log(colorTemplate);
}

// event delegation: num
const inputElement = document.querySelector("#rgb-form");
inputElement.addEventListener("input", function (event) {
  const target = event.target;

  const outputElement = target.nextElementSibling;
  outputElement.textContent = target.value;

  const colorBlockElement = target.nextElementSibling.nextElementSibling;
  const colorBlockHex = Number(target.value).toString(16);

  if (target.matches(".rgb-r")) {
    colorBlockElement.style.backgroundColor = `#${colorBlockHex}0000`;
  }
  if (target.matches(".rgb-g")) {
    colorBlockElement.style.backgroundColor = `#00${colorBlockHex}00`;
  }
  if (target.matches(".rgb-b")) {
    colorBlockElement.style.backgroundColor = `#0000${colorBlockHex}`;
  }
});

// event delegation: hex
const btnSubmit = document.querySelector("#btn-submit");
btnSubmit.addEventListener("click", function (event) {
  event.preventDefault();
  const changedColorNums = document.querySelectorAll(
    ".color-container p.color-num-text"
  );
  const firstTwo = Number(changedColorNums[0].textContent).toString(16);
  const middleTwo = Number(changedColorNums[1].textContent).toString(16);
  const lastTwo = Number(changedColorNums[2].textContent).toString(16);

  const hex = "#" + firstTwo + middleTwo + lastTwo;

  const bodyElement = document.querySelector("body");
  bodyElement.style.backgroundColor = hex;

  const hexContainer = document.querySelector(".hex-container");
  hexContainer.innerText = hex;
});
