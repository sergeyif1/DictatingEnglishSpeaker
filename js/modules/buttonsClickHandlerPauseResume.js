import myModule from "./myModule.js";

let currentButton2;

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

const buttonsClickHandlerPauseResume = {
  handleClick2: function (event) {
    const target = event.target;
    currentButton2 = target.id;

    switch (target.className) {
      case "pause":
        console.log("Pause button clicked");
        speechSynthesis.pause();
        myModule.pause();
        break;
      case "resume":
        console.log("Resume button clicked");
        speechSynthesis.resume();
        myModule.resume();
        break;
      default:
        console.log(`Unhandled class: ${target.className}`);
    }
  },
};

export { currentButton2 };
export default buttonsClickHandlerPauseResume;
