import myModule from "./myModule.js";

const inputElements = document.querySelectorAll(".form-point");
const gapElement = document.querySelector("#gap");

const IdDataHandler = {
  existingUseID: function (target, currentButton) {
    const useID = inputElements[0].value;
    // console.log("нужное id найдено", useID);
    const sec = Number(gapElement.value) * 1000;
    // console.log("нужное sec найдено", sec);
    myModule.words(useID, sec, currentButton);
  },
};

export default IdDataHandler;
