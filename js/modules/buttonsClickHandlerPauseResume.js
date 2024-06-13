import myModule from "./myModule.js";

let currentButton2;

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
        console.log("Speech synthesis resumed");
        myModule.resume();
        break;
      default:
        console.log(`Unhandled class: ${target.className}`);
    }
  },
};

export { currentButton2 };
export default buttonsClickHandlerPauseResume;
