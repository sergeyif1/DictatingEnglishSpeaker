import IdDataHandler from "./IdDataHandler.js";

let currentButton;

const buttonsClickHandler = {
  handleClick: function (event) {
    const target = event.target;
    currentButton = target.id;
    // console.log(`Clicked button: ${target.id}, class: ${target.className}`);

    switch (target.className) {
      case "play":
        speechSynthesis.cancel();
        IdDataHandler.existingUseID(target, currentButton);
        console.log("Play button clicked");
        // setTimeout(() => {
        //   console.log(
        //     "After play - speaking:",
        //     speechSynthesis.speaking,
        //     ", paused:",
        //     speechSynthesis.paused
        //   );
        // }, 1000); // проверка состояния через 1 секунду после запуска синтеза речи
        break;
      case "pause":
        console.log("Pause button clicked");
        // console.log(
        //   "Before pause - speaking:",
        //   speechSynthesis.speaking,
        //   ", paused:",
        //   speechSynthesis.paused
        // );
        speechSynthesis.pause();
        // setTimeout(() => {
        //   console.log(
        //     "After pause - speaking:",
        //     speechSynthesis.speaking,
        //     ", paused:",
        //     speechSynthesis.paused
        //   );
        // }, 500); // проверка состояния через 0.5 секунды после паузы
        IdDataHandler.pause();
        break;
      case "resume":
        console.log("Resume button clicked");
        if (speechSynthesis.paused) {
          speechSynthesis.resume();
          console.log("Speech synthesis resumed");
          IdDataHandler.resume();
        } else {
          console.log("Speech synthesis is not paused, cannot resume");
        }
        break;
      default:
        console.log(`Unhandled class: ${target.className}`);
    }
  },
};

export { currentButton };
export default buttonsClickHandler;
