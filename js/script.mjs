import controlCheckBox from "./modules/controlCheckBox.js";
import buttonsClickHandlerPlay from "./modules/buttonsClickHandlerPlay.js";
import buttonsClickHandlerPauseResume from "./modules/buttonsClickHandlerPauseResume.js";
import { voices } from "./modules/getUtterance.js";

voices();

//запуск с обновлением списка доступных голосов
window.speechSynthesis.onvoiceschanged = voices;

const but1 = document.getElementById("but1");
const but2 = document.getElementById("but2");
const but3 = document.getElementById("but3");
const but5 = document.getElementById("but5");
const resumeButton = document.getElementById("resumeButton");

but1.addEventListener("click", (event) => {
  buttonsClickHandlerPlay.handleClick1(event);
});
but2.addEventListener("click", (event) => {
  buttonsClickHandlerPlay.handleClick1(event);
});
but5.addEventListener("click", (event) => {
  buttonsClickHandlerPauseResume.handleClick2(event);
});
resumeButton.addEventListener("click", (event) => {
  buttonsClickHandlerPauseResume.handleClick2(event);
});

but3.addEventListener("click", () => {
  setTimeout(() => {
    location.reload();
  }, 1000);
});

controlCheckBox();
