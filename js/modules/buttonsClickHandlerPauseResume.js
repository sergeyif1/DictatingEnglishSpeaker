import myModule from "./myModule.js";

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

let currentButton2;

const buttonsClickHandlerPauseResume = {
  handleClick2: function (event) {
    const target = event.target;
    currentButton2 = target.id;

    switch (target.className) {
      case "pause":
        event.preventDefault();
        window.speechSynthesis.pause();
        myModule.pause();
        break;
      case "resume":
        event.preventDefault();
        window.speechSynthesis.resume();
        myModule.resume();
        break;
      default:
    }
  },
};

export { currentButton2 };
export default buttonsClickHandlerPauseResume;
