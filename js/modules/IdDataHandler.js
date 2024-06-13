import myModule from "./myModule.js";

const inputElements = document.querySelectorAll(".form-point");
const gapElement = document.querySelector("#gap");

const IdDataHandler = {
  existingUseID: function () {
    const useID = inputElements[0].value;
    const sec = Number(gapElement.value) * 1000;
    myModule.words(useID, sec);

    // console.log("нужное id найдено", useID);
    // console.log("нужное sec найдено", sec);
  },
};

export default IdDataHandler;
