import myModule from "./myModule";

const IdDataHandler = {
  existingUseID: function (currentButton) {
    const useID = inputElement.value;
    const sec = Number(pintSec.value) * 1000;
    myModule.words(useID, sec, currentButton);
  },
};
const inputElement = document.querySelector(".form-point");
const pintSec = document.querySelector("#gap");

export default IdDataHandler;
