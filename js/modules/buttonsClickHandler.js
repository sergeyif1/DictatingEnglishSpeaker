import IdDataHandler from "./IdDataHandler.js";

let currentButton;

const buttonsClickHandler = {
  handleClick: function (event) {
    const target = event.target;
    currentButton = target.id;
    // console.log(event.target, target.id);

    if (target && target.classList.contains(PLAY)) {
      switch (target.className) {
        case PLAY:
          speechSynthesis.cancel();
          IdDataHandler.existingUseID(target, currentButton);

          break;
      }
    }
  },
};

const PLAY = "play";

export { currentButton };
export default buttonsClickHandler;
