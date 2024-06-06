import buttonsClickHandler from "./modules/buttonsClickHandler";
import { voices } from "./modules/getUtterance";
import controlCheckBox from "./modules/controlCheckBox";

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

const but1 = document.getElementById("but1");
const but2 = document.getElementById("but2");

but1.addEventListener("click", (event) => {
  buttonsClickHandler.handleClick(event);
});

but2.addEventListener("click", (event) => {
  buttonsClickHandler.handleClick(event);
});

document.getElementById("but5").addEventListener("click", (event) => {
  buttonsClickHandler.handleClick(event);
});

document.getElementById("resumeButton").addEventListener("click", (event) => {
  buttonsClickHandler.handleClick(event);
});

voices();
controlCheckBox();
