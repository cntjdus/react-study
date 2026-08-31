const flipCard =
  document.querySelector("#flipCard");

const helloButton =
  document.querySelector("#helloButton");

const backButton =
  document.querySelector("#backButton");


helloButton.addEventListener(
  "click",
  function () {

    flipCard.classList.add("flipped");

  }
);


backButton.addEventListener(
  "click",
  function () {

    flipCard.classList.remove("flipped");

  }
);