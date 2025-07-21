import { activCheckBox } from "./IdDataControl.js";
import myModule from "./myModule.js";
import countNwords from "./countNwords.js";

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

window.speechSynthesis.cancel();

let currentButton1;

const buttonsClickHandlerPlay = {
  handleClick1: function (event) {
    const target = event.target;
    currentButton1 = target.id;

    switch (target.className) {
      case "play":
        activCheckBox();
        countNwords.nWord();
        myModule.words();

        break;
      default:
    }
  },
};

const getCurrentButton1 = () => currentButton1;

export { getCurrentButton1 };
export default buttonsClickHandlerPlay;
