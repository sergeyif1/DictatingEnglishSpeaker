import buttonsClickHandler from "./modules/buttonsClickHandler";
import { voices } from "./modules/getUtterance";

document.addEventListener("keydown", function (KeyboardEvent) {
  // console.log(KeyboardEvent.key);
  if (KeyboardEvent.key === "Enter") {
    KeyboardEvent.preventDefault();
  }
});

but1.addEventListener("click", (event) => {
  buttonsClickHandler.handleClick(event);
});

but2.addEventListener("click", (event) => {
  buttonsClickHandler.handleClick(event);
});

voices();
