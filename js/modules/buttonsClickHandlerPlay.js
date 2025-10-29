import { activCheckBox } from "./IdDataControl.js";
import myModule from "./myModule.js";
import countNwords from "./countNwords.js";
import countdown from "./countdownTimer.js";

document.addEventListener("keydown", function (event) {
  //   if (event.key === "Enter") {
  //     event.preventDefault();
  //   }
});

// window.speechSynthesis.cancel();

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

        document.activeElement.blur();

        const scrollY = window.scrollY;
        setTimeout(() => window.scrollTo(0, scrollY), 50);

        const secInput = document.querySelector("#gap");
        if (secInput) {
          const sec = Number(secInput.value);
          countdown(sec, sec);
        }

        break;
      default:
    }
  },
};

const getCurrentButton1 = () => currentButton1;

export { getCurrentButton1 };
export default buttonsClickHandlerPlay;
