import IdDataHandler from "./IdDataHandler.js";
import myModule from "./myModule.js";

let currentButton;

const buttonsClickHandler = {
  handleClick: function (event) {
    const target = event.target;
    currentButton = target.id;

    switch (target.className) {
      case "play":
        speechSynthesis.cancel();
        IdDataHandler.existingUseID(target, currentButton);
        console.log("Play button clicked");
        break;
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

export { currentButton };
export default buttonsClickHandler;
