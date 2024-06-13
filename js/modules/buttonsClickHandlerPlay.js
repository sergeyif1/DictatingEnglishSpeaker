import IdDataHandler from "./IdDataHandler.js";

let currentButton1;

const buttonsClickHandlerPlay = {
  handleClick1: function (event) {
    const target = event.target;
    currentButton1 = target.id;

    switch (target.className) {
      case "play":
        speechSynthesis.cancel();
        IdDataHandler.existingUseID();
        console.log("Play button clicked");

        console.log(currentButton1);

        break;
      default:
        console.log(`Unhandled class: ${target.className}`);
    }
  },
};

const getCurrentButton1 = () => currentButton1;

export { getCurrentButton1 };
export default buttonsClickHandlerPlay;
