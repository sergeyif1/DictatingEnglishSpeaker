import myModule from "./myModule";

const inputElement = document.querySelector(".form-point");
const pintSec = document.querySelector("#gap");

const IdDataHandler = {
  existingUseID: function (target, currentButton) {
    const useID = inputElement.value;
    const sec = Number(pintSec.value) * 1000;
    myModule.words(useID, sec, currentButton);
  },
  pause: function () {
    myModule.pause();
  },
  resume: function () {
    myModule.resume();
  },
};

export default IdDataHandler;
