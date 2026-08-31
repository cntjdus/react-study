const helloButton =
  document.querySelector("#helloButton");

const intro =
  document.querySelector("#intro");

helloButton.addEventListener(
  "click",
  function () {

    intro.textContent =
      "반가워요! 👋 제 자기소개 페이지에 방문해주셔서 감사합니다.";

    helloButton.textContent =
      "Nice to meet you ✨";
  }
);